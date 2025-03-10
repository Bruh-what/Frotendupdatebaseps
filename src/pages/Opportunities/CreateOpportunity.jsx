import React, { useState } from "react";
import { Upload, Plus } from "lucide-react";
import { Input } from "../../components/_Common/Input";
import { Textarea } from "../../components/_Common/TextArea";
import { Card, CardContent } from "../../components/_Common/Card";
import { Label } from "../../components/_Common/Label";
import { supabase } from "../../lib/supabaseClient";
import { PROSPONSER } from "../../https/config";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function CreateOpportunity() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    sport: "motocross",
    location: "",
    priceAsk: "",
    duration: 3,
    benefits: "",
    image: null, // Optional image field
  });
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.getSession();
    const token = data.session.access_token;
    let userid = data.session.user.id;
    let athleteName = data.session.user.user_metadata.full_name;

    // Construct JSON object from formData
    const opportunityData = {
      athleteId: userid,
      athleteName: athleteName,
      title: formData.title,
      description: formData.description,
      sport: formData.sport,
      location: formData.location,
      priceAsk: formData.priceAsk,
      duration: formData.duration,
      benefits: formData.benefits,
    };

    try {
      const response = await PROSPONSER.post(
        "/opportunities",
        opportunityData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Opportunity created:", response.data);
      toast.success("Opportunity created successfully!");
      navigate("/opportunities");
    } catch (error) {
      console.error("Error creating opportunity:", error);
      toast.error("Failed to create opportunity.");
    }
  };

  return (
    <div className="container px-4 py-8 max-w-3xl">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Create New Opportunity</h1>
        </div>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Opportunity Title</Label>
                  <Input
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Summer Motocross Championship Sponsorship"
                    required
                    className="rounded-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe the sponsorship opportunity in detail..."
                    className="min-h-[100px] rounded-lg"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    {/* <Label>Sport Category</Label>
                    <select
                      name="sport"
                      value={formData.sport}
                      onChange={handleInputChange}
                      className="w-full h-10 px-3 rounded-md border border-input bg-background"
                    >
                      <option value="motocross">Motocross</option>
                      <option value="cycling">Cycling</option>
                      <option value="running">Running</option>
                    </select> */}
                    <Label>Sport Category</Label>
                    <Input
                      name="sport"
                      value={formData.sport}
                      onChange={handleInputChange}
                      placeholder="Enter sport category..."
                      className="w-full h-10 px-3  border border-input bg-background rounded-lg"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="London, UK"
                      required
                      className="rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">
                Sponsorship Details
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Duration</Label>
                    <select
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      className="w-full h-10 px-3 rounded-lg border border-input bg-background"
                    >
                      <option value={12}>14 days</option>
                      <option value={12}>1 month</option>
                      <option value={3}>3 months</option>
                      <option value={6}>6 months</option>
                      <option value={12}>12 months</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Budget (£)</Label>
                    <Input
                      name="priceAsk"
                      type="number"
                      value={formData.priceAsk}
                      onChange={handleInputChange}
                      placeholder="5000"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Sponsorship Benefits</Label>
                  <Textarea
                    name="benefits"
                    value={formData.benefits}
                    onChange={handleInputChange}
                    placeholder="List the benefits sponsors will receive..."
                    className="min-h-[100px] rounded-lg"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Media</h2>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-4 text-gray-400" />
                  <h3 className="font-medium mb-2">
                    Upload opportunity images
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Upload high-quality images that showcase your sponsorship
                    opportunity
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="upload"
                  />
                  <label
                    htmlFor="upload"
                    className="cursor-pointer bg-gray-100 py-2 px-4 rounded-md hover:bg-gray-200"
                  >
                    Choose files
                  </label>
                </div>
              </div>
            </CardContent>
          </Card> */}

          <div className="flex justify-end gap-4 pb-6">
            <button
              type="button"
              className="bg-gray-100 py-2 px-6 rounded-full"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#4F46E5] hover:bg-gray-100 text-white hover:text-gray-900 py-2 px-6 rounded-full shadow-xs"
            >
              Create Opportunity
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
