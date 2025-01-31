import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "../../components/_Common/Card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/_Common/Avatar";
import { Badge } from "../../components/_Common/Badge";
import { supabase } from "../../lib/supabaseClient";
import { PROSPONSER } from "../../https/config";

export default function MyOpportunitiesPage() {
  const [opportunities, setOpportunities] = useState([]);
  const [athleteProfiles, setAthleteProfiles] = useState({});

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
    const { data, error } = await supabase.auth.getSession();
    const token = data.session.access_token;
    let userid = data.session.user.id;

    const opportunityData = {
      athleteId: userid,
    };

    try {
      const response = await PROSPONSER.post(
        "/opportunities/getopportunities",
        opportunityData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOpportunities(response.data);

      // Fetch avatars after opportunities load
      response.data.forEach((opp) => {
        if (opp.athleteId) {
          fetchAthleteAvatar(opp.athleteId);
        }
      });
    } catch (error) {
      console.error("Error creating opportunity:", error);
      alert("Failed to create opportunity.");
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">My Sponsorship Opportunities</h1>
        <Link to="/CreateOpportunity">
          <button className="bg-[#4F46E5] hover:bg-gray-100 text-white hover:text-gray-900 py-2 px-6 rounded-full shadow-xs">
            Create Opportunity
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {opportunities.length === 0 ? (
          <div className="col-span-3 text-center text-lg text-gray-600">
            You have no created opportunities yet. Create one to get started!
          </div>
        ) : (
          opportunities.map((opportunity) => (
            <Card key={opportunity.id} className="overflow-hidden">
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold mb-2">
                  {opportunity.title}
                </h2>
                <p className="text-gray-600 mb-2">{opportunity.location}</p>
                <div className="flex items-center gap-2 mb-2">
                  {/* <Badge variant="secondary">{opportunity.sport}</Badge> */}
                  <Badge variant="outline">{opportunity.duration} Months</Badge>
                </div>
                <p className="text-lg font-bold">
                  ${opportunity.priceAsk.toLocaleString()}
                </p>
              </CardContent>
              <CardFooter className="bg-[#FEFEFE] p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage
                      src={athleteProfiles[opportunity.athleteId]?.avatar}
                      alt={opportunity.athleteName}
                    />
                    <AvatarFallback>
                      {opportunity.athleteName?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">
                    {opportunity.athleteName}
                  </span>
                </div>
                <Link
                  to={`/opportunities/${opportunity._id}`}
                  state={{ opportunity }}
                >
                  <button className="bg-[#4F46E5] hover:bg-gray-100 text-white hover:text-gray-900 py-2 px-6 rounded-full shadow-xs">
                    View Details
                  </button>
                </Link>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
