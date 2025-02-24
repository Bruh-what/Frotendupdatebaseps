import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../../components/_Common/Card";
import { Badge } from "../../components/_Common/Badge";
import { supabase } from "../../lib/supabaseClient";
import { PROSPONSER } from "../../https/config";
import { format, addMonths } from "date-fns";
import bikes from "../../assets/images/bikes1.png";

export default function ContractsPage() {
  const navigate = useNavigate();
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [acceptingId, setAcceptingId] = useState(null);
  const [userProfiles, setUserProfiles] = useState({});

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-600 text-white";
      case "active":
        return "bg-green-700 text-white";
      case "completed":
        return "bg-blue-600 text-white";
      case "cancelled":
        return "bg-red-600 text-white";
      default:
        return "bg-gray-600 text-white";
    }
  };

  const handleAcceptContract = async (contractId) => {
    try {
      setAcceptingId(contractId);
      const { data: sessionData } = await supabase.auth.getSession();

      await PROSPONSER.put(
        `/contracts/${contractId}/accept`,
        {},
        {
          headers: {
            Authorization: `Bearer ${sessionData.session.access_token}`,
          },
        }
      );

      fetchContracts();
    } catch (error) {
      console.error("Accept contract error:", error);
      setError("Failed to accept contract");
    } finally {
      setAcceptingId(null);
    }
  };

  const fetchContracts = async () => {
    try {
      setLoading(true);
      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

      if (sessionError) {
        setError("Authentication error. Please login again.");
        return;
      }

      if (!sessionData?.session) {
        setError("No active session. Please login.");
        return;
      }

      const userId = sessionData.session.user.id;
      const role = sessionData.session.user.user_metadata.role;

      setUserRole(role);
      setUserId(userId);

      const response = await PROSPONSER.get("/contracts", {
        headers: {
          Authorization: `Bearer ${sessionData.session.access_token}`,
        },
      });

      const filteredContracts = response.data.filter(
        (contract) =>
          contract.athleteId === userId || contract.sponsorId === userId
      );

      setContracts(filteredContracts);

      // Fetch profiles for all unique users
      const uniqueUserIds = [
        ...new Set([
          ...filteredContracts.map((c) => c.athleteId),
          ...filteredContracts.map((c) => c.sponsorId),
        ]),
      ];

      for (const id of uniqueUserIds) {
        try {
          const profileResponse = await PROSPONSER.get(
            `/athletes/profile/${id}`,
            {
              headers: {
                Authorization: `Bearer ${sessionData.session.access_token}`,
              },
            }
          );
          setUserProfiles((prev) => ({
            ...prev,
            [id]: profileResponse.data,
          }));
        } catch (err) {
          console.error(`Error fetching profile for ${id}:`, err);
        }
      }
    } catch (err) {
      console.error("Error fetching contracts:", err);
      setError(err.response?.data?.message || "Failed to load contracts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContracts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Contracts</h1>

      {contracts.length === 0 ? (
        <div className="text-center text-gray-500">No contracts found.</div>
      ) : (
        <div className="grid grid-cols-1 gap-6 w-full">
          {contracts.map((contract) => (
            <Card key={contract._id} className="overflow-hidden">
              <CardContent className="p-6 space-y-1  grid grid-cols-[200px,1fr,1fr] max-sm:grid-cols-1 max-md:grid-cols-1 max-lg:grid-cols-1 gap-8  justify-around ">
              <div className="w-full h-full ">
                  <img
                    src={bikes}
                    alt="bike1"
                    className="w-full h-full  object-cover"
                  />
                </div>

              

                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-2 justify-between items-start">
                    <h2 className="text-xl font-semibold">
                      {contract.opportunityTitle || "Untitled Opportunity"}
                    </h2>

                    <p className="text-md font-semibold">
                      {contract.opportunityTitle || "Untitled Opportunity"}
                    </p>
                   
                  </div>


                  <div>
                  <span className="text-[#1C2434]">Summer campaign</span>
                  </div>

                  <div>
              

                  <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        contract.status
                      )}`}
                    >
                      {contract.status.charAt(0).toUpperCase() +
                        contract.status.slice(1)}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex gap-2 text-sm">
                      <span className="font-medium">
                        {userProfiles[contract.athleteId]?.firstName}{" "}
                        {userProfiles[contract.athleteId]?.lastName}
                      </span>
                    </div>
                    <div className="flex gap-2 text-sm">
                      <span className="text-[#1C2434]">Sponsorship duration:</span>
                      <span className="font-medium">{format(
                          addMonths(
                            new Date(contract.createdAt),
                            contract.duration || 12
                          ),
                          "dd MMM yyyy"
                        )}</span>
                      {/* <span className="font-medium">
                        {userProfiles[contract.sponsorId]?.companyName}
                      </span> */}
                    </div>
                    <div className="flex gap-2 text-sm">
                      <span className="text-[#1C2434]">Budget:</span>
                      <span className="font-medium">
                        ${contract.totalPrice?.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex gap-2 text-sm">
                      <span className="text-[#1C2434]">In escrow:</span>
                      <span className="font-medium">
                      ${contract.totalPrice?.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  
                </div>


                <div className="">
                <div className="flex gap-3 pt-6 flex-col h-full justify-between">

                        <div>
                            <div className="flex gap-2 text-[#1C2434]">
                              <span>Sponsor rating:</span>
                              <div>
                              <div class="flex items-center">
    <svg class="w-4 h-4 text-[#FFBE19] ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
    <svg class="w-4 h-4 text-[#FFBE19] ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
    <svg class="w-4 h-4 text-[#FFBE19] ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
    <svg class="w-4 h-4 text-[#FFBE19] ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
    <svg class="w-4 h-4 text-[#FFBE19] ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
</div>
                              </div>
                            </div>

                            <div className="flex gap-2 text-[#1C2434]">
                              <span>Time left: </span>
                              <span className="font-medium">4 months</span>
                            </div>
                        </div>


                            {/* buton */}
                      
                      <div className="flex gap-3">

                      <button
                      onClick={() => navigate(`/contracts/${contract._id}`)}
                      className="flex-1 bg-gray-100 transition duration-2 hover:bg-gray-200 text-gray-900 py-2 px-4 rounded-full text-sm font-medium"
                    >
                      View Details
                    </button>

                    {/* {contract.athleteId === userId &&
                  contract.status === "pending" ? (
                    <button
                      onClick={() => handleAcceptContract(contract._id)}
                      disabled={acceptingId === contract._id}
                      className={`flex-1 ${
                        acceptingId === contract._id
                          ? "bg-green-300"
                          : "bg-green-700 hover:bg-green-800"
                      } text-white py-2 px-4 rounded-full text-sm font-medium`}
                    >
                      {acceptingId === contract._id
                        ? "Accepting..."
                        : "Accept Offer"}
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        navigate(
                          `/messages/${
                            userId === contract.athleteId
                              ? contract.sponsorId
                              : contract.athleteId
                          }`
                        )
                      }
                      className="flex-1 bg-[#4F46E5] hover:bg-[#4338CA] text-white py-2 px-4 rounded-full text-sm font-medium"
                    >
                      Message{" "}
                      {userId === contract.athleteId ? "Sponsor" : "Athlete"}
                    </button>
                  )} */}
                    {contract.athleteId === userId &&
                    contract.status === "pending" ? (
                      <button
                        onClick={() => handleAcceptContract(contract._id)}
                        disabled={acceptingId === contract._id}
                        className={`flex-1 ${
                          acceptingId === contract._id
                            ? "bg-green-300"
                            : "bg-green-700 hover:bg-green-800"
                        } text-white py-2 px-4 rounded-full text-sm font-medium`}
                      >
                        {acceptingId === contract._id
                          ? "Accepting..."
                          : "Accept Offer"}
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          // First fetch contracts for this conversation
                          const otherUserId =
                            userId === contract.athleteId
                              ? contract.sponsorId
                              : contract.athleteId;

                          // Pass both conversation and contracts data
                          navigate("/messages", {
                            state: {
                              selectedConversation: {
                                userId: otherUserId,
                                name:
                                  userId === contract.athleteId
                                    ? userProfiles[contract.sponsorId]
                                        ?.companyName || "Sponsor"
                                    : `${
                                        userProfiles[contract.athleteId]
                                          ?.firstName || ""
                                      } ${
                                        userProfiles[contract.athleteId]
                                          ?.lastName || ""
                                      }` || "Athlete",
                              },
                              // Pass the relevant contract for initialization
                              initialContracts: [contract],
                            },
                          });
                        }}
                        className="flex-1 bg-[#4F46E5] transition duration-2 hover:bg-[#4338CA] text-white px-4 rounded-full text-sm font-medium"
                      >
                        Message{" "}
                        {userId === contract.athleteId ? "Sponsor" : "Athlete"}
                      </button>
                    )}

                        
                      </div>
                   
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
