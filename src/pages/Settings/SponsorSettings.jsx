import { useState, useEffect } from "react";
import { Label } from "../../components/_Common/Label";
import { Input } from "../../components/_Common/Input";
import { Textarea } from "../../components/_Common/TextArea";
import { supabase } from "../../lib/supabaseClient";
import { PROSPONSER } from "../../https/config";

export default function SponsorSettings() {
  const [formData, setFormData] = useState({
    companyName: "",
    website: "",
    description: "",
    images: [],
    avatar: "", // Added avatar field
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [avatarUploading, setAvatarUploading] = useState(false);

  const handleAvatarUpload = async (e) => {
    try {
      setAvatarUploading(true);
      const file = e.target.files[0];

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = async () => {
        const base64Image = reader.result;
        const { data: sessionData } = await supabase.auth.getSession();

        const updatedProfile = {
          ...formData,
          userId: sessionData.session.user.id,
          avatar: base64Image,
        };

        const response = await PROSPONSER.post(
          "/sponsors/profile",
          updatedProfile,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${sessionData.session.access_token}`,
            },
          }
        );

        setFormData(response.data.data);
      };
    } catch (error) {
      console.error("Error uploading avatar:", error);
      alert("Failed to upload image");
    } finally {
      setAvatarUploading(false);
    }
  };

  const fetchSponsorProfile = async () => {
    try {
      setLoading(true);
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) throw new Error("No authenticated session");

      const userId = sessionData.session.user.id;

      const response = await PROSPONSER.get(`/sponsors/profile/${userId}`, {
        headers: {
          Authorization: `Bearer ${sessionData.session.access_token}`,
        },
      });

      if (response.data) {
        setFormData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSponsorProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) throw new Error("No authenticated session");

      const userId = sessionData.session.user.id;

      const payload = {
        userId,
        ...formData,
      };

      const response = await PROSPONSER.post("sponsors/profile", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionData.session.access_token}`,
        },
      });

      setFormData(response.data.data);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <form onSubmit={handleSubmit} className="flex gap-6 p-6">
      <div className="flex-1 space-y-6 w-[800px]">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Sponsor Information</h2>

            {/* Avatar Upload Section */}
            <div className="mb-6 space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Sponsor Profile Image
              </label>
              <div className="flex items-center space-x-4">
                <div className="shrink-0">
                  {formData.avatar ? (
                    <img
                      src={formData.avatar}
                      alt="Company Logo"
                      className="h-16 w-16 object-cover rounded-full"
                    />
                  ) : (
                    <div className="h-16 w-16 rounded-full bg-gray-200" />
                  )}
                </div>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  disabled={avatarUploading}
                  className="block w-full h-full py-2 text-sm text-slate-500 border-none
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-violet-50 file:text-violet-700
                    hover:file:bg-violet-100 
                    focus:outline-none focus:ring-0"
                />
                {avatarUploading && (
                  <p className="text-sm text-gray-500">Uploading...</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Your Name / Company Name</Label>
                <Input
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  className="rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <Label>Website</Label>
                <Input
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  type="url"
                  className="rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="min-h-[150px] rounded-lg"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pb-10">
            <button
              type="button"
              onClick={() => fetchSponsorProfile()}
              className="bg-gray-100 text-gray-900 hover:text-gray-900 py-2 px-6 font-medium rounded-full shadow-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#4F46E5] hover:bg-gray-100 text-white hover:text-gray-900 py-2 px-6 font-medium rounded-full shadow-xs"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
