import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/_Common/Avatar";
import { Badge } from "../../components/_Common/Badge";
import { supabase } from "../../lib/supabaseClient";
import { Link } from "react-router-dom";
import { PROSPONSER } from "../../https/config";

export default function SponsorOpportunitiesPage() {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [athleteProfiles, setAthleteProfiles] = useState({});
  const navigate = useNavigate();

  const fetchAthleteAvatar = async (athleteId) => {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const response = await PROSPONSER.get(`/athletes/profile/${athleteId}`, {
        headers: {
          Authorization: `Bearer ${sessionData.session.access_token}`,
        },
      });
      setAthleteProfiles((prev) => ({
        ...prev,
        [athleteId]: response.data,
      }));
    } catch (error) {
      console.error("Error fetching athlete avatar:", error);
    }
  };

  const fetchOpportunities = async () => {
    try {
      setLoading(true);
      const { data: sessionData } = await supabase.auth.getSession();
      const response = await PROSPONSER.get("/opportunities/all", {
        headers: {
          Authorization: `Bearer ${sessionData.session.access_token}`,
        },
      });
      setOpportunities(response.data);

      response.data.forEach((opp) => {
        if (opp.athleteId) {
          fetchAthleteAvatar(opp.athleteId);
        }
      });
    } catch (error) {
      console.error("Error fetching opportunities:", error);
      setError("Failed to fetch opportunities.");
    } finally {
      setLoading(false);
    }
  };

  const handleContactClick = (opportunity) => {
    setSelectedOpportunity(opportunity);
    setShowMessageModal(true);
  };

  const handleSendMessage = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) throw new Error("No authenticated session");

      const messageData = {
        senderId: session.user.id,
        receiverId: selectedOpportunity.athleteId,
        senderName: session.user.user_metadata.full_name,
        receiverName: selectedOpportunity.athleteName,
        content: messageText,
        opportunityData: {
          athleteId: selectedOpportunity.athleteId,
          sponsorId: session.user.id,
          opportunityId: selectedOpportunity._id,
          sport: selectedOpportunity.sport,
          totalPrice: selectedOpportunity.priceAsk,
          title: selectedOpportunity.title,
          description: selectedOpportunity.description,
        },
      };

      const response = await PROSPONSER.post("/messages", messageData, {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        setShowMessageModal(false);
        setMessageText("");
        navigate("/messages", {
          state: {
            conversationId: response.data.conversationId,
            opportunityData: messageData.opportunityData,
          },
        });
      }
    } catch (error) {
      console.error("Send message error:", error);
      setError("Failed to send message.");
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, []);

  if (loading) return <div>Loading opportunities...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Sponsorship Opportunities</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {opportunities.map((opportunity) => (
          <div
            key={opportunity._id}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex items-center mb-4">
              <Avatar>
                <AvatarImage
                  src={
                    athleteProfiles[opportunity.athleteId]?.avatar ||
                    opportunity.athleteImage
                  }
                  alt={opportunity.athleteName}
                />
                <AvatarFallback>{opportunity.athleteName[0]}</AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <h3 className="font-semibold">{opportunity.athleteName}</h3>
                <p className="text-sm text-gray-500">{opportunity.sport}</p>
              </div>
            </div>

            <h4 className="font-medium mb-2">{opportunity.title}</h4>
            <p className="text-gray-600 mb-4">{opportunity.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {opportunity.tags?.map((tag, index) => (
                <Badge key={index} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            <button
              onClick={() => handleContactClick(opportunity)}
              className="bg-[#4F46E5] hover:bg-[#4338CA] text-white py-2 px-6 rounded-full"
            >
              Contact
            </button>
          </div>
        ))}
      </div>

      {showMessageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Send Message</h3>
            <textarea
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              className="w-full p-2 border rounded-md mb-4"
              placeholder="Type your message..."
              rows={4}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowMessageModal(false);
                  setMessageText("");
                }}
                className="px-4 py-2 rounded-full bg-gray-100 text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={handleSendMessage}
                disabled={!messageText.trim()}
                className="px-4 py-2 rounded-full bg-[#4F46E5] text-white hover:bg-[#4338CA] disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
