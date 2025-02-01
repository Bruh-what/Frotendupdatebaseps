import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Calendar, FileText } from "lucide-react";
import { Input } from "../../components/_Common/Input";
import { Textarea } from "../../components/_Common/TextArea";
import { Label } from "../../components/_Common/Label";
import { supabase } from "../../lib/supabaseClient";
import { PROSPONSER } from "../../https/config";

export default function CreateContractPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const opportunity = location.state?.opportunity;
  console.log("Received opportunity:", opportunity);

  const [formData, setFormData] = useState({
    athleteId: opportunity?.athleteId || "",
    sponsorId: "", // Will be set from auth
    opportunityId: opportunity?._id || "",
    sport: opportunity?.sport || "",
    totalPrice: opportunity?.priceAsk || "",
    milestones: Array(4)
      .fill()
      .map(() => ({
        description: "",
        status: "pending",
        dueDate: "",
      })),
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get sponsor details on component mount
  useEffect(() => {
    const getSponsorDetails = async () => {
      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

      if (sessionError) {
        setError("Authentication error. Please login again.");
        return;
      }

      if (sessionData?.session) {
        const sponsorId = sessionData.session.user.id;

        setFormData((prev) => ({
          ...prev,
          sponsorId: sponsorId,
        }));
      }
    };

    getSponsorDetails();
  }, []);

  const handleMilestoneChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      milestones: prev.milestones.map((milestone, i) =>
        i === index ? { ...milestone, [field]: value } : milestone
      ),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);

      // Get current session
      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

      if (sessionError) {
        throw new Error("Authentication error. Please login again.");
      }

      if (!sessionData.session) {
        throw new Error("No active session found. Please login.");
      }

      const token = sessionData.session.access_token;
      const sponsorId = sessionData.session.user.id;

      // Validate milestones
      if (formData.milestones.some((m) => !m.description || !m.dueDate)) {
        throw new Error(
          "All milestone descriptions and due dates are required"
        );
      }

      // Format the contract data to match the backend model
      const contractData = {
        athleteId: opportunity.athleteId,
        sponsorId: sponsorId,
        opportunityId: opportunity._id,
        opportunityTitle: opportunity.title,
        sport: opportunity.sport,
        totalPrice: parseFloat(formData.totalPrice),
        milestones: formData.milestones.map((milestone) => ({
          description: milestone.description,
          status: "pending",
          dueDate: new Date(milestone.dueDate),
        })),
        status: "pending",
      };

      console.log("Sending contract data:", contractData);

      // Make API call with authentication token
      const response = await PROSPONSER.post("/contracts", contractData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Contract created successfully:", response.data);

      // Create message with contract data
      // const messageData = {
      //   senderId: sponsorId,
      //   receiverId: opportunity.athleteId,
      //   content: `New contract offer for ${opportunity.title}`,
      //   messageType: "contract", // Add message type
      //   contractData: {
      //     _id: response.data._id,
      //     title: opportunity.title,
      //     sport: opportunity.sport,
      //     totalPrice: formData.totalPrice,
      //     milestones: formData.milestones,
      //     status: "pending",
      //     opportunityId: opportunity._id,
      //     athleteId: opportunity.athleteId,
      //     sponsorId: sponsorId,
      //   },
      // };

      // // Send message with contract data
      // await PROSPONSER.post("/messages", messageData, {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //     "Content-Type": "application/json",
      //   },
      // });

      // Navigate to success page or contracts list
      navigate("/contracts", {
        state: {
          success: true,
          message: "Contract created successfully",
        },
      });
    } catch (err) {
      console.error("Contract creation error:", err);
      setError(err.response?.data?.message || "Failed to create contract");
    } finally {
      setLoading(false);
    }
  };

  // Show loading state while checking for opportunity data
  if (!opportunity) {
    return (
      <div className="flex gap-6 p-6">
        <div className="flex-1 space-y-6 w-[800px]">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            No opportunity data found. Please select an opportunity first.
          </div>
          <button
            className="bg-gray-500 text-white py-2 px-6 rounded-full"
            onClick={() => navigate("/opportunities")}
          >
            Back to Opportunities
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-6 p-6">
      <div className="flex-1 space-y-6 w-[800px]">
        <h1 className="text-2xl font-semibold">Create a contract</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Opportunity Preview */}
        <div className="card bg-gray-50  rounded-lg shadow-md">
          <div className="card-content p-4">
            <div className="flex gap-4">
              <div className="flex-1 space-y-2">
                <h3 className="font-medium">Opportunity Details</h3>
                <p className="text-sm text-gray-600">
                  Title: {opportunity.title}
                </p>
                <p className="text-sm text-gray-600">
                  Athlete: {opportunity.athleteName}
                </p>
                <p className="text-sm text-gray-600">
                  Sport: {opportunity.sport}
                </p>
                <p className="text-sm text-gray-600">
                  Location: {opportunity.location}
                </p>
                <p className="text-sm text-gray-600">
                  Price Ask: ${opportunity.priceAsk}
                </p>
                <p className="text-sm text-gray-600">
                  Duration: {opportunity.duration} months
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contract Form */}
        <form onSubmit={handleSubmit} className="space-y-6 pb-8">
          <div className="space-y-2">
            <Label>Total Price</Label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-500">$</span>
              <Input
                type="number"
                value={formData.totalPrice}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    totalPrice: e.target.value,
                  }))
                }
                className="input pl-7 rounded-lg"
                required
              />
            </div>
          </div>

          {/* Milestones */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Milestones</h2>
            <div className="grid gap-4">
              {formData.milestones.map((milestone, i) => (
                <div key={i} className="space-y-2 border p-4 rounded-lg">
                  <h3 className="font-medium">Milestone {i + 1}</h3>

                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={milestone.description}
                      onChange={(e) =>
                        handleMilestoneChange(i, "description", e.target.value)
                      }
                      className="textarea min-h-[100px] rounded-lg"
                      placeholder="Enter milestone description"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Due Date</Label>
                    <div className="relative">
                      <Input
                        type="date"
                        value={milestone.dueDate}
                        onChange={(e) =>
                          handleMilestoneChange(i, "dueDate", e.target.value)
                        }
                        className="input"
                        required
                      />
                      <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-500" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="bg-[#4F46E5] w-full hover:bg-gray-100 text-white hover:text-gray-900 py-2 px-6 font-medium rounded-full shadow-xs"
            disabled={loading}
          >
            {loading ? "Creating contract..." : "Send contract"}
          </button>
        </form>
      </div>
    </div>
  );
}
