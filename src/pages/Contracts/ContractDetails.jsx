import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import axios from "axios";
import { format } from "date-fns";

export default function ContractDetails() {
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchContractDetails = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (!session) throw new Error("No authenticated session");

        const response = await axios.get(`/api/contracts/${id}`, {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.data) {
          setContract(response.data.data);
        }
      } catch (error) {
        setError("Failed to load contract details");
      } finally {
        setLoading(false);
      }
    };

    fetchContractDetails();
  }, [id]);

  if (loading) return <div className="p-6">Loading contract details...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!contract) return <div className="p-6">Contract not found</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm">
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold">
              {contract.sport} Contract
            </h1>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                contract.status === "active"
                  ? "bg-green-100 text-green-800"
                  : contract.status === "pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {contract.status.charAt(0).toUpperCase() +
                contract.status.slice(1)}
            </span>
          </div>
          <div className="flex gap-4 text-sm text-gray-500">
            <span>
              Created: {format(new Date(contract.createdAt), "MMM d, yyyy")}
            </span>
            <span>•</span>
            <span>ID: {contract.id}</span>
          </div>
        </div>

        {/* Contract Details */}
        <div className="p-6 border-b">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-medium mb-4">Parties</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Athlete ID</p>
                  <p className="font-medium">{contract.athleteId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Sponsor ID</p>
                  <p className="font-medium">{contract.sponsorId}</p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-medium mb-4">Duration</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Start Date</p>
                  <p className="font-medium">
                    {format(new Date(contract.duration.start), "MMM d, yyyy")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">End Date</p>
                  <p className="font-medium">
                    {format(new Date(contract.duration.end), "MMM d, yyyy")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Financial Details */}
        <div className="p-6 border-b">
          <h2 className="text-lg font-medium mb-4">Financial Details</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-500">Total Value</p>
              <p className="text-xl font-medium">
                ${contract.totalPrice.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Milestones</p>
              <p className="text-xl font-medium">{contract.totalMilestones}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Completed Milestones</p>
              <p className="text-xl font-medium">
                {contract.completedMilestones}
              </p>
            </div>
          </div>
        </div>

        {/* Milestones */}
        <div className="p-6">
          <h2 className="text-lg font-medium mb-6">Milestones</h2>
          <div className="space-y-4">
            {contract.milestones?.map((milestone, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 border rounded-lg"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-medium">
                  {index + 1}
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">Milestone {index + 1}</p>
                      <p className="text-gray-600 mt-1">
                        {milestone.description}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Due:{" "}
                        {format(new Date(milestone.dueDate), "MMM d, yyyy")}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        milestone.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {milestone.status.charAt(0).toUpperCase() +
                        milestone.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
