// "use client";

// import { useState, useEffect } from "react";
// import { Upload, Plus } from "lucide-react";
// import { Input } from "../../components/_Common/Input";
// import { Textarea } from "../../components/_Common/TextArea";
// import {
//   Avatar,
//   AvatarFallback,
//   AvatarImage,
// } from "../../components/_Common/Avatar";
// import { Card, CardContent } from "../../components/_Common/Card";
// import axios from "axios";
// import { supabase } from "../../lib/supabaseClient";

// export default function Settings() {
//   const [formData, setFormData] = useState({
//     displayName: "",
//     firstName: "",
//     lastName: "",
//     dateOfBirth: "",
//     gender: "",
//     email: "",
//     bio: "",
//     instagram: "",
//     tiktok: "",
//     youtube: "",
//     x: "",
//   });

//   const fetchProfileData = async () => {
//     const { data, error } = await supabase.auth.getSession();
//     const token = data.session.access_token;
//     let userid = data.session.user.id;

//     try {
//       const response = await axios.get(`/profile/${userid}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const profileData = response.data;
//       setFormData(profileData);
//     } catch (error) {
//       console.error("Error fetching profile data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchProfileData();
//   }, []);

//   // ...
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { data, error } = await supabase.auth.getSession();
//     const token = data.session.access_token;
//     let userid = data.session.user.id;
//     formData.userId = userid;
//     console.log("Form submitted:", formData);
//     try {
//       const response = await axios.post("/api/athletes/profile", formData, {
//         headers: {
//           "Content-Type": "application/json", // Set Content-Type to JSON
//           Authorization: `Bearer ${token}`, // Include Supabase token
//         },
//       });

//       console.log("Profile created:", response.data);
//       setFormData(response.data); // Update the component's state with the new data
//       alert("Profile created successfully!");
//     } catch (error) {
//       console.error("Error creating opportunity:", error);
//       alert("Failed to create Profile.");
//     }
//     // Add your submission logic here (e.g., API call)
//   };
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="container mx-4 px-4 py-8 max-w-4xl"
//     >
//       <h1 className="text-2xl font-bold mb-6">Profile settings</h1>

//       <div className="space-y-8">
//         <section>
//           <h2 className="text-lg font-semibold mb-4">Athlete Profile</h2>

//           <div className="flex items-start gap-4 mb-6">
//             <Avatar className="w-24 h-24">
//               <AvatarImage src="/placeholder.svg" />
//               <AvatarFallback>JM</AvatarFallback>
//             </Avatar>
//             <div>
//               <h3 className="font-medium mb-1">Profile picture</h3>
//               <p className="text-sm text-gray-500 mb-2">
//                 Use a profile picture to stand out. Upload an image that is
//                 312px square.
//               </p>
//               <button
//                 type="button"
//                 className="bg-[#4F46E5] hover:bg-gray-100 text-white hover:text-gray-900 py-2 px-6 rounded-full shadow-xs"
//               >
//                 Upload new picture
//               </button>
//             </div>
//           </div>

//           <div className="grid gap-6">
//             <div>
//               <label className="block font-medium mb-1">Display name</label>
//               <p className="text-sm text-gray-500 mb-2">
//                 How your name will appear to other members.
//               </p>
//               <Input
//                 name="displayName"
//                 value={formData.displayName}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block font-medium mb-1">First name</label>
//                 <p className="text-sm text-gray-500 mb-2">
//                   Your official first name
//                 </p>
//                 <Input
//                   name="firstName"
//                   value={formData.firstName}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div>
//                 <label className="block font-medium mb-1">Surname</label>
//                 <p className="text-sm text-gray-500 mb-2">
//                   Your official surname
//                 </p>
//                 <Input
//                   name="lastName"
//                   value={formData.lastName}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block font-medium mb-1">Date of birth</label>
//                 <p className="text-sm text-gray-500 mb-2">
//                   Your birth date as listed on official documents
//                 </p>
//                 <Input
//                   type="date"
//                   name="dateOfBirth"
//                   value={formData.dateOfBirth}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div>
//                 <label className="block font-medium mb-1">Age</label>
//                 <p className="text-sm text-gray-500 mb-2">Your official age</p>
//                 <Input
//                   value={
//                     new Date().getFullYear() -
//                     new Date(formData.dateOfBirth).getFullYear()
//                   }
//                   disabled
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block font-medium mb-1">Gender</label>
//               <p className="text-sm text-gray-500 mb-2">
//                 What do you identify as?
//               </p>
//               <select
//                 name="gender"
//                 value={formData.gender}
//                 onChange={handleChange}
//                 className="w-full h-10 px-3 rounded-full border border-input bg-background"
//               >
//                 <option value="male">Male</option>
//                 <option value="female">Female</option>
//                 <option value="other">Other</option>
//               </select>
//             </div>

//             <div>
//               <label className="block font-medium mb-1">Email address</label>
//               <p className="text-sm text-gray-500 mb-2">
//                 Your primary email. This will be used on any contracts and
//                 account recovery.
//               </p>
//               <Input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//             </div>

//             <div>
//               <label className="block font-medium mb-1">
//                 Bio & achievements
//               </label>
//               <p className="text-sm text-gray-500 mb-2">
//                 This will be visible to sponsors. We recommend you list all your
//                 achievements here.
//               </p>
//               <Textarea
//                 name="bio"
//                 value={formData.bio}
//                 onChange={handleChange}
//                 className="min-h-[100px]"
//               />
//             </div>
//           </div>
//         </section>

//         <section>
//           <h2 className="text-lg font-semibold mb-4">Social Media Presence</h2>

//           <div className="space-y-6">
//             <div>
//               <label className="block font-medium mb-1">
//                 Total follower count across all social platforms
//               </label>
//               <Input defaultValue="120,000" disabled />
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block font-medium mb-1">Instagram</label>
//                 <Input
//                   name="instagram"
//                   value={formData.instagram}
//                   onChange={handleChange}
//                 />
//                 <p className="text-sm text-gray-500 mt-1">30,000 followers</p>
//               </div>
//               <div>
//                 <label className="block font-medium mb-1">TikTok</label>
//                 <Input
//                   name="tiktok"
//                   value={formData.tiktok}
//                   onChange={handleChange}
//                 />
//                 <p className="text-sm text-gray-500 mt-1">30,000 followers</p>
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block font-medium mb-1">YouTube</label>
//                 <Input
//                   name="youtube"
//                   value={formData.youtube}
//                   onChange={handleChange}
//                 />
//                 <p className="text-sm text-gray-500 mt-1">30,000 subscribers</p>
//               </div>
//               <div>
//                 <label className="block font-medium mb-1">X</label>
//                 <Input name="x" value={formData.x} onChange={handleChange} />
//                 <p className="text-sm text-gray-500 mt-1">30,000 followers</p>
//               </div>
//             </div>
//           </div>
//         </section>

//         <section>
//           <h2 className="text-lg font-semibold mb-4">Portfolio Highlights</h2>
//           <p className="text-sm text-gray-500 mb-4">
//             Upload images of yourself in action.
//           </p>

//           <div className="grid grid-cols-4 gap-4">
//             {[1, 2, 3, 4].map((i) => (
//               <Card key={i} className="aspect-square">
//                 <CardContent className="p-0 h-full">
//                   <button
//                     type="button"
//                     className="w-full h-full flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
//                   >
//                     <Plus className="h-6 w-6 text-gray-400" />
//                   </button>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//           <div className="flex justify-between items-center mt-4">
//             <p className="text-sm text-gray-500">Need more images or videos?</p>
//             <button type="button" className="text-primary hover:text-blue-600">
//               Upgrade now
//             </button>
//           </div>
//         </section>

//         <div className="flex justify-end gap-4 pb-10">
//           <button
//             type="button"
//             className="bg-[#4F46E5] hover:bg-gray-100 text-white hover:text-gray-900 py-2 px-6 rounded-full shadow-xs"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="bg-[#4F46E5] hover:bg-gray-100 text-white hover:text-gray-900 py-2 px-6 rounded-full shadow-xs"
//           >
//             Save changes
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// }
import { useState, useEffect } from "react";
import { Input } from "../../components/_Common/Input";
import { Textarea } from "../../components/_Common/TextArea";
import { supabase } from "../../lib/supabaseClient";
import { PROSPONSER } from "../../https/config";

export default function Settings() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    instagram: "",
    tiktok: "",
    x: "",
    youtube: "",
    bio: "",
    images: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setFormData(response.data);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      setError(error.message);
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
          {/* Basic Information */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <Input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <Input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <p className="text-sm text-gray-500">
                Your primary email for communications.
              </p>
            </div>
            <div className="mt-4 space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full h-10 px-3 rounded-lg border border-gray-300"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Social Media</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Instagram
                </label>
                <Input
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleChange}
                />
                <p className="text-sm text-gray-500">Instagram followers</p>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  TikTok
                </label>
                <Input
                  name="tiktok"
                  value={formData.tiktok}
                  onChange={handleChange}
                />
                <p className="text-sm text-gray-500">TikTok followers</p>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  YouTube
                </label>
                <Input
                  name="youtube"
                  value={formData.youtube}
                  onChange={handleChange}
                />
                <p className="text-sm text-gray-500">YouTube subscribers</p>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  X (Twitter)
                </label>
                <Input name="x" value={formData.x} onChange={handleChange} />
                <p className="text-sm text-gray-500">X followers</p>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Bio</h2>
            <Textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="min-h-[150px] w-full"
              placeholder="Write about yourself, your achievements, and what makes you unique..."
            />
          </div>

          {/* Portfolio Highlights */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold">Portfolio Highlights</h2>
                <p className="text-sm text-gray-500">
                  Upload images of yourself in action.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="aspect-square rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center"
                >
                  <button type="button" className="text-2xl">
                    +
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-4 pb-10">
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
