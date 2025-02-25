import { useState, useEffect } from "react";
import { Input } from "../../components/_Common/Input";
import { Textarea } from "../../components/_Common/TextArea";
import { supabase } from "../../lib/supabaseClient";
import { PROSPONSER } from "../../https/config";
import toast from "react-hot-toast";

export default function Settings() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    surname: "",
    email: "",
    gender: "",
    dateOfBirth: "",
    age: "",
    username: "",
    instagram: "",
    tiktok: "",
    youtube: "",
    x: "",
    bio: "",
    images: [],
    avatar: "",
    totalFollowers: "",
  });

  const [loading, setLoading] = useState(true);
  const [avatarUploading, setAvatarUploading] = useState(false);

  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return "";
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age.toString();
  };

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
          "athletes/profile",
          updatedProfile,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${sessionData.session.access_token}`,
            },
          }
        );

        // Update form data with response
        setFormData(response.data.data);
        console.log("Profile updated with avatar:", response.data);
      };
    } catch (error) {
      console.error("Error uploading avatar:", error);
      alert("Failed to upload image");
    } finally {
      setAvatarUploading(false);
    }
  };

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) throw new Error("No authenticated session");

      const userId = sessionData.session.user.id;

      const response = await PROSPONSER.get(`/athletes/profile/${userId}`, {
        headers: {
          Authorization: `Bearer ${sessionData.session.access_token}`,
        },
      });

      if (response.data) {
        const profileData = response.data;
        const age = calculateAge(profileData.dateOfBirth);
        setFormData({
          ...profileData,
          age: age,
        });
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching profile:", error);

      setFormData({
        firstName: "",
        lastName: "",
        surname: "",
        email: "",
        gender: "",
        dateOfBirth: "",
        age: "",
        username: "",
        instagram: "",
        tiktok: "",
        youtube: "",
        x: "",
        bio: "",
        images: [],
        avatar: "",
        totalFollowers: "",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
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

      const response = await PROSPONSER.post("/athletes/profile", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionData.session.access_token}`,
        },
      });

      setFormData(response.data);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading)
    return (
      <div className="container pt-40  flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  console.log(formData, "form data");

  return (
    <form onSubmit={handleSubmit} className="w-[75rem] p-12">
      <div className="bg-white  ">
        <div className="p-12 pr-16">
          {" "}
          <h2 className="text-[24px] font-semibold mb-4">Profile settings</h2>
          <div className="mb-6 space-y-2">
            <label className="block text-[16px] font-medium text-[#111827]">
              Athlete Profile
            </label>
            <div className="flex items-center space-x-4">
              <div className="shrink-0">
                {formData.avatar ? (
                  <img
                    src={formData.avatar}
                    alt="Avatar"
                    className="h-16 w-16 object-cover rounded-full cursor-pointer"
                    onClick={() =>
                      document.getElementById("avatar-input").click()
                    }
                  />
                ) : (
                  <div
                    className="h-16 w-16 rounded-full bg-gray-200 cursor-pointer"
                    onClick={() =>
                      document.getElementById("avatar-input").click()
                    }
                  />
                )}
              </div>
              <input
                id="avatar-input"
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                disabled={avatarUploading}
                className="hidden"
              />
              {avatarUploading && (
                <p className="text-sm text-gray-500">Uploading...</p>
              )}
              <div>
                <label className="block text-[16px] font-medium text-[#111827]">
                  Profile picture
                </label>
                <p className="text-sm text-gray-500">
                  Use a profile picture to stand out. Upload an image that is
                  312px square.
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 col-span-2">
              <label className="block text-[16px] font-medium text-[#111827]">
                Display name
              </label>
              <p className="text-sm text-gray-500">
                How your name will appear to other members.
              </p>
              <Input
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="bg-[#F3F4F6]"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-[16px] font-medium text-[#111827]">
                First name
              </label>
              <p className="text-sm text-gray-500">Your official first name</p>
              <Input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="bg-[#F3F4F6]"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-[16px] font-medium text-[#111827]">
                Surname
              </label>
              <p className="text-sm text-gray-500">Your official surname</p>
              <Input
                type="text"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                required
                className="bg-[#F3F4F6]"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-[16px] font-medium text-[#111827]">
                Date of birth
              </label>
              <p className="text-sm text-gray-500">
                Your birth date as listed on official documents
              </p>
              <Input
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
                className="bg-[#F3F4F6] text-[14px] font-[500]"
              />
            </div>
            <div className="space-y-2">
              <label className=" text-[16px] font-medium text-[#111827]">
                Age
              </label>
              <p className="text-sm text-gray-500">Your official age</p>
              <Input
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                required
                className="bg-[#F3F4F6]"
              />
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <label className="block text-[16px] font-medium text-[#111827]">
              Gender
            </label>
            <p className="text-sm text-gray-500">What do you identify as?</p>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full h-10 px-3 outline-none rounded-lg border bg-[#F3F4F6]"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="space-y-2 mt-4">
            <label className="block text-[16px] font-medium text-[#111827]">
              Email address
            </label>
            <p className="text-sm text-gray-500">
              Your primary email. This will be used on any contracts and account
              recovery.
            </p>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-[#F3F4F6]"
            />
          </div>
          <div className="space-y-2 mt-4">
            <label className="block text-[16px] font-medium text-[#111827]">
              Bio & achievements
            </label>
            <p className="text-sm text-gray-500">
              This will be visible to sponsors. We recommend you list all your
              achievements here.
            </p>
            <Textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="h-[10rem] w-full bg-[#F3F4F6]"
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2 col-span-2">
              <label className="block text-[16px] font-medium text-[#111827] mt-4">
                Total follower count across all social platforms
              </label>
              <Input
                name="totalFollowers"
                type="number"
                value={formData.totalFollowers}
                onChange={handleChange}
                className="bg-[#F3F4F6]"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-[16px] font-medium text-[#111827]">
                Instagram
              </label>
              <Input
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
                className="bg-[#F3F4F6]"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-[16px] font-medium text-[#111827]">
                TikTok
              </label>
              <Input
                name="tiktok"
                value={formData.tiktok}
                onChange={handleChange}
                className="bg-[#F3F4F6]"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-[16px] font-medium text-[#111827]">
                Youtube
              </label>
              <Input
                name="youtube"
                value={formData.youtube}
                onChange={handleChange}
                className="bg-[#F3F4F6]"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-[16px] font-medium text-[#111827]">
                X
              </label>
              <Input
                name="x"
                value={formData.x}
                onChange={handleChange}
                className="bg-[#F3F4F6]"
              />
            </div>
          </div>
        </div>
        <div className="pl-12">
          <div className="bg-white mt-4 rounded-lg  ">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold">Portfolio Highlights</h2>
                <p className="text-sm text-gray-500">
                  Upload images of yourself in action.
                </p>
              </div>
              <div className="flex flex-col justify-between h-full">
                <div className="text-md font-semibold ">
                  Need more images or videos?
                  <a href="" className="text-blue-500  hover:underline ml-2 ">
                    Upgrade now.
                  </a>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="aspect-square bg-[#F3F4F6] rounded-lg border-2  border-gray-100 flex items-center justify-center"
                >
                  <button type="button" className="text-2xl">
                    +
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-4 pb-10 mt-5">
            <button
              type="button"
              onClick={() => fetchProfileData()}
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
