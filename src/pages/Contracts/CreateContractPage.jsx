// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Calendar, FileText } from "lucide-react";
// import { Input } from "../../components/_Common/Input";
// import { Textarea } from "../../components/_Common/TextArea";
// import { Label } from "../../components/_Common/Label";

// const CreateContractPage = () => {
//   const location = useLocation();
//   const { opportunityId, athleteId } = location.state;

//   // Use the opportunityId and athleteId to prefill the form fields
//   const [formFields, setFormFields] = useState({
//     opportunityId: opportunityId,
//     athleteId: athleteId,
//     // Other form fields...
//   });

//   // ...
// };

// import {
//   Calendar,
//   FileText,
//   SeparatorHorizontal,
//   SeparatorHorizontalIcon,
// } from "lucide-react";
// import { Input } from "../../components/_Common/Input";
// import { Textarea } from "../../components/_Common/TextArea";
// import { Label } from "../../components/_Common/Label";

// import { Card, CardContent } from "../../components/_Common/Card";
// import { Separator } from "../../components/_Common/Separator";

// export default function CreateContractPage() {
//   return (
//     <div className="flex gap-6 p-6">
//       {/* Main Content */}
//       <div className="flex-1 space-y-6 w-[800px] ">
//         <h1 className="text-2xl font-semibold">Create a contract</h1>

//         {/* Campaign Preview */}
//         <div className="card">
//           <div className="card-content p-4">
//             <div className="flex gap-4">
//               <img
//                 src="https://img.freepik.com/free-photo/snowboard-team-ski-slope_329181-5297.jpg?t=st=1734351513~exp=1734355113~hmac=3189674600b96605055b982e96a79cc4a1c4703e727ca5c5f29275338a3a7e6e&w=996"
//                 alt="Winter campaign"
//                 width={200}
//                 height={150}
//                 className="rounded-lg object-cover"
//               />
//               <div className="flex-1 space-y-2">
//                 <h3 className="font-medium">Winter campaign</h3>
//                 <div className="flex items-center gap-2">
//                   <div className="h-2 w-2 rounded-full bg-green-500" />
//                   <span className="text-sm text-green-600">Draft</span>
//                 </div>
//                 <p className="text-sm text-gray-600">
//                   Sponsorship duration: 04 months
//                 </p>
//                 <p className="text-sm text-gray-600">Budget: $1200</p>
//                 <div className="flex items-center gap-2 text-sm text-purple-600">
//                   <FileText className="h-4 w-4" />
//                   <a href="#" className="hover:underline">
//                     Read terms and conditions
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Contract Form */}
//         <div className="space-y-6 pb-8">
//           <div className="space-y-2">
//             <Label>Contract name</Label>
//             <Input
//               type="text"
//               className="input"
//               defaultValue="Instagram posts winter 2025"
//             />
//             <p className="text-sm text-gray-500">
//               This can be something that gives a general idea of your contract
//             </p>
//           </div>

//           <div className="space-y-2">
//             <label>Deliverables</label>
//             <Textarea
//               className="textarea min-h-[100px]"
//               defaultValue="10 instagram posts. 2x each week.

// Wear brand t-shirt in the 2025 cyclist championship."
//             />
//             <p className="text-sm text-gray-500">
//               Enter the exact contract deliverables
//             </p>
//           </div>

//           <div className="space-y-2">
//             <Label>Offer</Label>
//             <div className="relative">
//               <span className="absolute left-3 top-2.5 text-gray-500">$</span>
//               <Input type="text" className="input pl-7" defaultValue="1800" />
//             </div>
//             <p className="text-sm text-gray-500">
//               Total amount for the contract. Athletes receive 4 payments spread
//               across timeline.
//             </p>
//           </div>

//           <div className="space-y-2">
//             <Label>Timeline</Label>
//             <Input type="text" className="input" defaultValue="4 months" />
//             <p className="text-sm text-gray-500">
//               Total duration of the contract
//             </p>
//           </div>

//           <div className="space-y-2">
//             <Label>Start date</Label>
//             <div className="relative">
//               <Input type="text" className="input" defaultValue="12 Feb 2025" />
//               <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-500" />
//             </div>
//             <p className="text-sm text-gray-500">
//               Potential start date of the contract.
//             </p>
//           </div>

//           <div className="space-y-2">
//             <Label>End date</Label>
//             <div className="relative">
//               <Input type="text" className="input" defaultValue="12 Aug 2025" />
//               <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-500" />
//             </div>
//             <p className="text-sm text-gray-500">End date of the contract.</p>
//           </div>

//           {/* Milestones & Timeline */}
//           <div className="space-y-4">
//             <h2 className="text-xl font-semibold">Milestones & Timeline</h2>
//             <div className="grid gap-4 md:grid-cols-2">
//               {Array.from({ length: 4 }).map((_, i) => (
//                 <div className="space-y-2" key={i}>
//                   <h3 className="font-medium">
//                     Milestone {i + 1} - Due by 12-0{i + 1}-2025
//                   </h3>
//                   <p className="text-sm text-gray-500">Milestone amount</p>
//                   <div className="relative">
//                     <span className="absolute left-3 top-2.5 text-gray-500">
//                       $
//                     </span>
//                     <Input
//                       type="text"
//                       className="input pl-7"
//                       defaultValue="300"
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <button className="bg-[#4F46E5] w-full  hover:bg-gray-100 text-white hover:text-gray-900 py-2 px-6 font-medium rounded-full shadow-xs">
//             Send contract
//           </button>
//         </div>
//       </div>
//       {/* Right Sidebar */}
//       <div className="w-80 space-y-6">
//         <div>
//           <h2 className="text-xl font-semibold mb-4">Featured Sponsors</h2>
//           <div className="Card">
//             <div className="Card-content p-4">
//               <img
//                 src="https://images.unsplash.com/photo-1721248810577-ce2c601951c2?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//                 alt="Valvoline"
//                 width={300}
//                 height={200}
//                 className="w-full rounded-lg object-cover mb-3"
//               />
//               <h3 className="font-medium mb-2">Valvoline</h3>
//               <p className="text-sm text-gray-500">
//                 A high impact brand in the cars and motorbike space.
//               </p>
//             </div>
//           </div>
//         </div>

//         <div>
//           <h2 className="text-xl font-semibold mb-4">Announcements</h2>
//           <div className="space-y-4">
//             <div className="Card p-4 rounded-md bg-gray-900 text-white">
//               <h3 className="font-medium">Sponsorship trends</h3>
//               <p className="text-sm text-gray-300">
//                 A high impact brand in the cars and motorbike space.
//               </p>
//             </div>
//             <div>
//               <h3 className="font-medium hover:text-blue-600 cursor-pointer">
//                 Recent partnerships
//               </h3>
//               <p className="text-sm text-gray-500">
//                 A high impact brand in the cars and motorbike space.
//               </p>
//             </div>
//             <hr className="separator" />
//             <div>
//               <h3 className="font-medium hover:text-blue-600 cursor-pointer">
//                 Upcoming ProSponsor events
//               </h3>
//               <p className="text-sm text-gray-500">
//                 A high impact brand in the cars and motorbike space.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// working with data - auth to be implemented
// export default function CreateContractPage() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const opportunity = location.state?.opportunity; // Get the opportunity data passed from previous page

//   // Initialize form data with opportunity details
//   const [formData, setFormData] = useState({
//     contractName: opportunity?.title || "", // Using opportunity title as contract name
//     deliverables: opportunity?.benefits || "", // Pre-fill with benefits
//     offer: opportunity?.priceAsk || "",
//     timeline: `${opportunity?.duration || ""} months`,
//     startDate: "",
//     endDate: "",
//     opportunityId: opportunity?._id || "",
//     athleteId: opportunity?.athleteId || "",
//     athleteName: opportunity?.athleteName || "",
//     sport: opportunity?.sport || "",
//     location: opportunity?.location || "",
//     milestones: Array(4)
//       .fill()
//       .map(() => ({
//         amount: opportunity?.priceAsk
//           ? (opportunity.priceAsk / 4).toString()
//           : "",
//       })),
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // If no opportunity data, redirect back or show error
//   useEffect(() => {
//     if (!opportunity) {
//       setError("No opportunity data found");
//       // Optionally redirect back
//       // navigate(-1);
//     }
//   }, [opportunity]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleMilestoneChange = (index, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       milestones: prev.milestones.map((milestone, i) =>
//         i === index ? { amount: value } : milestone
//       ),
//     }));
//   };

//   const handleSubmit = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const contractData = {
//         name: formData.contractName,
//         deliverables: formData.deliverables,
//         amount: parseFloat(formData.offer),
//         timeline: formData.timeline,
//         startDate: formData.startDate,
//         endDate: formData.endDate,
//         opportunityId: formData.opportunityId,
//         athleteId: formData.athleteId,
//         athleteName: formData.athleteName,
//         sport: formData.sport,
//         location: formData.location,
//         status: "pending",
//         milestones: formData.milestones.map((milestone, index) => ({
//           amount: parseFloat(milestone.amount),
//           dueDate: `12-0${index + 1}-2025`, // You might want to calculate this based on start date
//           status: "pending",
//         })),
//       };

//       const response = await axios.post("/api/contracts", contractData);
//       navigate(`/contracts/${response.data._id}`);
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to create contract");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex gap-6 p-6">
//       <div className="flex-1 space-y-6 w-[800px]">
//         <h1 className="text-2xl font-semibold">Create a contract</h1>

//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//             {error}
//           </div>
//         )}

//         {/* Opportunity Preview */}
//         <div className="card">
//           <div className="card-content p-4">
//             <div className="flex gap-4">
//               <div className="flex-1 space-y-2">
//                 <h3 className="font-medium">Opportunity Details</h3>
//                 <p className="text-sm text-gray-600">
//                   Athlete: {formData.athleteName}
//                 </p>
//                 <p className="text-sm text-gray-600">Sport: {formData.sport}</p>
//                 <p className="text-sm text-gray-600">
//                   Location: {formData.location}
//                 </p>
//                 <p className="text-sm text-gray-600">
//                   Duration: {opportunity?.duration} months
//                 </p>
//                 <p className="text-sm text-gray-600">
//                   Budget: ${opportunity?.priceAsk}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Contract Form */}
//         <div className="space-y-6 pb-8">
//           <div className="space-y-2">
//             <Label>Contract name</Label>
//             <Input
//               type="text"
//               name="contractName"
//               value={formData.contractName}
//               onChange={handleInputChange}
//               className="input"
//             />
//           </div>

//           <div className="space-y-2">
//             <label>Deliverables</label>
//             <Textarea
//               name="deliverables"
//               value={formData.deliverables}
//               onChange={handleInputChange}
//               className="textarea min-h-[100px]"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label>Offer</Label>
//             <div className="relative">
//               <span className="absolute left-3 top-2.5 text-gray-500">$</span>
//               <Input
//                 type="text"
//                 name="offer"
//                 value={formData.offer}
//                 onChange={handleInputChange}
//                 className="input pl-7"
//               />
//             </div>
//           </div>

//           <div className="space-y-2">
//             <Label>Timeline</Label>
//             <Input
//               type="text"
//               name="timeline"
//               value={formData.timeline}
//               onChange={handleInputChange}
//               className="input"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label>Start date</Label>
//             <div className="relative">
//               <Input
//                 type="date"
//                 name="startDate"
//                 value={formData.startDate}
//                 onChange={handleInputChange}
//                 className="input"
//               />
//               <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-500" />
//             </div>
//           </div>

//           <div className="space-y-2">
//             <Label>End date</Label>
//             <div className="relative">
//               <Input
//                 type="date"
//                 name="endDate"
//                 value={formData.endDate}
//                 onChange={handleInputChange}
//                 className="input"
//               />
//               <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-500" />
//             </div>
//           </div>

//           {/* Milestones */}
//           <div className="space-y-4">
//             <h2 className="text-xl font-semibold">Milestones & Timeline</h2>
//             <div className="grid gap-4 md:grid-cols-2">
//               {formData.milestones.map((milestone, i) => (
//                 <div className="space-y-2" key={i}>
//                   <h3 className="font-medium">
//                     Milestone {i + 1} - Due by 12-0{i + 1}-2025
//                   </h3>
//                   <p className="text-sm text-gray-500">Milestone amount</p>
//                   <div className="relative">
//                     <span className="absolute left-3 top-2.5 text-gray-500">
//                       $
//                     </span>
//                     <Input
//                       type="text"
//                       value={milestone.amount}
//                       onChange={(e) => handleMilestoneChange(i, e.target.value)}
//                       className="input pl-7"
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <button
//             className="bg-[#4F46E5] w-full hover:bg-gray-100 text-white hover:text-gray-900 py-2 px-6 font-medium rounded-full shadow-xs"
//             onClick={handleSubmit}
//             disabled={loading}
//           >
//             {loading ? "Creating contract..." : "Send contract"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Calendar, FileText } from "lucide-react";
import { Input } from "../../components/_Common/Input";
import { Textarea } from "../../components/_Common/TextArea";
import { Label } from "../../components/_Common/Label";
import { supabase } from "../../lib/supabaseClient";

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
      const response = await axios.post("/api/contracts", contractData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Contract created successfully:", response.data);

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
        <div className="card bg-white shadow-sm rounded-lg">
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
                className="input pl-7"
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
                      className="textarea min-h-[100px]"
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
