import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../components/_Common/Avatar';
import filterIcon from '../../assets/filter.svg';
import { Badge } from '../../components/_Common/Badge';
import { supabase } from '../../lib/supabaseClient';
import { Link } from 'react-router-dom';
import { PROSPONSER } from '../../https/config';

export default function SponsorOpportunitiesPage() {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [athleteProfiles, setAthleteProfiles] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [gender, setGender] = useState('Any');
  const [followerCount, setFollowerCount] = useState('');
  const [budget, setBudget] = useState('');
  const [tempBudget, setTempBudget] = useState('');
  const navigate = useNavigate();

  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesSearch =
      String(opp.priceAsk).includes(searchQuery) ||
      opp.athleteName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesBudget = budget === '' || opp.priceAsk <= Number(budget);

    return matchesSearch && matchesBudget;
  });

  const handleBudgetChange = (e) => {
    setTempBudget(e.target.value);
  };

  const applyBudgetFilter = () => {
    setBudget(tempBudget);
    setIsFilterModalOpen(false);
  };

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
      console.error('Error fetching athlete avatar:', error);
    }
  };

  const fetchOpportunities = async () => {
    try {
      setLoading(true);
      const { data: sessionData } = await supabase.auth.getSession();
      const authHeaders = {
        headers: {
          Authorization: `Bearer ${sessionData.session.access_token}`,
        },
      };

      const [opportunitiesRes, contractsRes] = await Promise.all([
        PROSPONSER.get('/opportunities/all', authHeaders),
        PROSPONSER.get('/contracts', authHeaders),
      ]);

      const activeContracts = contractsRes.data.filter(
        (contract) => contract.status === 'active'
      );

      const availableOpportunities = opportunitiesRes.data.filter(
        (opp) =>
          !activeContracts.some(
            (contract) => contract.opportunityId === opp._id
          )
      );

      setOpportunities(availableOpportunities);

      availableOpportunities.forEach((opp) => {
        if (opp.athleteId) {
          fetchAthleteAvatar(opp.athleteId);
        }
      });
    } catch (error) {
      console.error('Error fetching opportunities:', error);
      setError('Failed to fetch opportunities.');
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
      if (!session) throw new Error('No authenticated session');

      const messageData = {
        senderId: session.user.id,
        receiverId: selectedOpportunity.athleteId,
        senderName: session.user.user_metadata.full_name,
        receiverName: selectedOpportunity.athleteName,
        content: messageText,
        opportunityData: {
          athleteId: selectedOpportunity.athleteId,
          sponsorId: session.user.id,
          opportunityTitle: selectedOpportunity.title,
          opportunityId: selectedOpportunity._id,
          sport: selectedOpportunity.sport,
          totalPrice: selectedOpportunity.priceAsk,
          title: selectedOpportunity.title,
          description: selectedOpportunity.description,
        },
      };

      const response = await PROSPONSER.post('/messages', messageData, {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        setShowMessageModal(false);
        setMessageText('');

        navigate('/messages', {
          state: {
            selectedConversation: {
              userId: selectedOpportunity.athleteId,
              name: selectedOpportunity.athleteName,
            },
          },
        });
      }
    } catch (error) {
      console.error('Send message error:', error);
      setError('Failed to send message.');
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, []);

  if (loading)
    return (
      <div className="container flex justify-center mt-40">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  if (error) return <div>{error}</div>;

  return (
    <div className="container px-[32px] py-6 relative">
      <h1 className="text-3xl font-bold mb-6">Sponsorship Opportunities</h1>

      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search by sport..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-4 text-lg rounded-full border border-gray-300 bg-[#F9FAFB]"
        />
        <div className="absolute right-5 top-1/2 transform -translate-y-1/2">
          <div
            className="bg-[#ffff] cursor-pointer rounded-full w-[7rem] h-[2.5rem] border border-gray-300 flex items-center justify-center"
            onClick={() => setIsFilterModalOpen(!isFilterModalOpen)}
          >
            <img src={filterIcon} alt="Filter" className="w-[4rem] h-[4rem]" />
          </div>

          {isFilterModalOpen && (
            <div className=" absolute p-4 right-0  w-74 bg-white rounded-lg shadow-lg z-50">
              <div className="p-4">
                <div className="flex justify-between items-center w-full gap-2 m-4">
                  <h3 className="text-lg font-semibold">Filter</h3>
                  <button
                    onClick={() => {
                      setIsFilterModalOpen(false);
                      setBudget('100000000');
                    }}
                    className="px-4 py-1 rounded-full bg-black text-white"
                  >
                    Clear
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Budget
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      value={tempBudget}
                      onChange={handleBudgetChange}
                      className="w-full"
                    />
                    <p>Selected: ${tempBudget}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Gender
                    </label>
                    <div className="flex gap-2">
                      <button
                        className={`px-4 py-2 border rounded-[50px] ${
                          gender === 'Male'
                            ? 'bg-[#4736FB] text-white'
                            : 'bg-white text-black'
                        }`}
                        onClick={() => setGender('Male')}
                      >
                        Male
                      </button>
                      <button
                        className={`px-4 py-2 border rounded-[50px] ${
                          gender === 'Female'
                            ? 'bg-[#4736FB] text-white'
                            : 'bg-white text-black'
                        }`}
                        onClick={() => setGender('Female')}
                      >
                        Female
                      </button>
                      <button
                        className={`px-4 py-2 border rounded-[50px] ${
                          gender === 'Any'
                            ? 'bg-[#4736FB] text-white'
                            : 'bg-white text-black'
                        }`}
                        onClick={() => setGender('Any')}
                      >
                        Any
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Social Follower Count
                    </label>
                    <input
                      type="range"
                      onChange={(e) => setFollowerCount(e.target.value)}
                      className="w-full"
                    />
                    <p className="text-xs text-gray-500">
                      Selected: {followerCount}
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={applyBudgetFilter}
                      className="px-4 py-1 rounded-full bg-black text-white"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        className={`grid gap-4 ${
          filteredOpportunities.length === 1
            ? 'grid-cols-[350px]' // Fixed width if only one item
            : 'grid-cols-[repeat(auto-fit,minmax(260px,1fr))]'
        }`}
      >
        {filteredOpportunities.map((opportunity) => (
          <div
            key={opportunity._id}
            className="bg-white rounded-2xl border border-[#F3F4F6]  p-3"
          >
            <div className="flex justify-between">
              <h4 className="font-medium  text-[18px] capitalize">
                {opportunity.title}
              </h4>
              <p className="text-gray-600 mb-4 text-[14px] font-[600]">
                £{opportunity.priceAsk}
              </p>
            </div>

            <p className="text-sm mb-2 text-[12px] text-black font-[500] capitalize">
              {opportunity.sport}
            </p>

            <p className="text-gray-600 mb-4 text-sm min-h-[40px]">
              {opportunity.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {opportunity.tags?.map((tag, index) => (
                <Badge key={index} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex items-center flex-row  gap-2 justify-between max-[840px]:flex-col   max-sm:gap-0 overflow-hidden">
              <div className="flex items-center max-sm:mb-2 w-full ">
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

                <div className="ml-1 text-[8.89px]">
                  <h3 className="font-semibold text-[13px] max-sm:text-[11px]">
                    {opportunity.athleteName}
                  </h3>
                  <p className=" text-gray-500">
                    <Link
                      to={`/athlete/${opportunity.athleteId}`}
                      className="text-[12px] font-[500] capitalize"
                    >
                      View Profile
                    </Link>
                  </p>
                </div>
              </div>

              {/* button p */}
              <div className="p-2 w-full">
                <button
                  onClick={() => handleContactClick(opportunity)}
                  className="bg-black transition delay-50 ease-linear w-full hover:bg-[#4338CA] text-white text-[13px] max-md:text-[10px] py-1 px-6 rounded-full"
                >
                  Message
                </button>
              </div>
            </div>
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
                  setMessageText('');
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
