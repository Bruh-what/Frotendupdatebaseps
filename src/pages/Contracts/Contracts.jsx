import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../../components/_Common/Card";
import { Badge } from "../../components/_Common/Badge";
import { supabase } from "../../lib/supabaseClient";
import { PROSPONSER } from "../../https/config";
import { format, addMonths } from "date-fns";

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contracts.map((contract) => (
            <Card key={contract._id} className="overflow-hidden">
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-semibold">
                    {contract.opportunityTitle || "Untitled Opportunity"}
                  </h2>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      contract.status
                    )}`}
                  >
                    {contract.status.charAt(0).toUpperCase() +
                      contract.status.slice(1)}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Athlete</span>
                    <span className="font-medium">
                      {userProfiles[contract.athleteId]?.firstName}{" "}
                      {userProfiles[contract.athleteId]?.lastName}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Sponsor</span>
                    <span className="font-medium">
                      {userProfiles[contract.sponsorId]?.companyName}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Value</span>
                    <span className="font-medium">
                      ${contract.totalPrice?.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">End Date</span>
                    <span className="font-medium">
                      {format(
                        addMonths(
                          new Date(contract.createdAt),
                          contract.duration || 12
                        ),
                        "dd MMM yyyy"
                      )}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => navigate(`/contracts/${contract._id}`)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 py-2 px-4 rounded-full text-sm font-medium"
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
                      className="flex-1 bg-[#4F46E5] hover:bg-[#4338CA] text-white py-2 px-4 rounded-full text-sm font-medium"
                    >
                      Message{" "}
                      {userId === contract.athleteId ? "Sponsor" : "Athlete"}
                    </button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
