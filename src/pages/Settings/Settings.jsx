// BASEMOD
// import { useState, useEffect } from "react";
// import { Input } from "../../components/_Common/Input";
// import { Textarea } from "../../components/_Common/TextArea";
// import { supabase } from "../../lib/supabaseClient";
// import { PROSPONSER } from "../../https/config";

// export default function Settings() {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     gender: "",
//     instagram: "",
//     tiktok: "",
//     x: "",
//     youtube: "",
//     bio: "",
//     images: [],
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchProfileData = async () => {
//     try {
//       setLoading(true);
//       const { data: sessionData } = await supabase.auth.getSession();
//       if (!sessionData.session) throw new Error("No authenticated session");

//       const userId = sessionData.session.user.id;

//       const response = await PROSPONSER.get(`/athletes/profile/${userId}`, {
//         headers: {
//           Authorization: `Bearer ${sessionData.session.access_token}`,
//         },
//       });

//       if (response.data) {
//         setFormData(response.data);
//       }
//     } catch (error) {
//       console.error("Error fetching profile:", error);
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProfileData();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data: sessionData } = await supabase.auth.getSession();
//       if (!sessionData.session) throw new Error("No authenticated session");

//       const userId = sessionData.session.user.id;

//       const payload = {
//         userId,
//         ...formData,
//       };

//       const response = await PROSPONSER.post("athletes/profile", payload, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${sessionData.session.access_token}`,
//         },
//       });

//       setFormData(response.data);
//       alert("Profile updated successfully!");
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       alert("Failed to update profile.");
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <form onSubmit={handleSubmit} className="flex gap-6 p-6">
//       <div className="flex-1 space-y-6 w-[800px]">
//         <div className="space-y-6">
//           {/* Basic Information */}
//           <div className="bg-white p-6 rounded-lg shadow-sm">
//             <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2 ">
//                 <label className="block  text-sm font-medium text-gray-700">
//                   First Name
//                 </label>
//                 <Input
//                   name="firstName"
//                   value={formData.firstName}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Last Name
//                 </label>
//                 <Input
//                   name="lastName"
//                   value={formData.lastName}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//             </div>
//             <div className="mt-4 space-y-2">
//               <label className="block text-sm font-medium text-gray-700">
//                 Email
//               </label>
//               <Input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//               <p className="text-sm text-gray-500">
//                 Your primary email for communications.
//               </p>
//             </div>
//             <div className="mt-4 space-y-2">
//               <label className="block text-sm font-medium text-gray-700">
//                 Gender
//               </label>
//               <select
//                 name="gender"
//                 value={formData.gender}
//                 onChange={handleChange}
//                 className="w-full h-10 px-3 rounded-lg border border-gray-300"
//               >
//                 <option value="">Select gender</option>
//                 <option value="male">Male</option>
//                 <option value="female">Female</option>
//                 <option value="other">Other</option>
//               </select>
//             </div>
//           </div>

//           {/* Social Media */}
//           <div className="bg-white p-6 rounded-lg shadow-sm">
//             <h2 className="text-lg font-semibold mb-4">Social Media</h2>
//             <div className="grid grid-cols-2 gap-6">
//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Instagram
//                 </label>
//                 <Input
//                   name="instagram"
//                   value={formData.instagram}
//                   onChange={handleChange}
//                 />
//                 <p className="text-sm text-gray-500">Instagram followers</p>
//               </div>
//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-700">
//                   TikTok
//                 </label>
//                 <Input
//                   name="tiktok"
//                   value={formData.tiktok}
//                   onChange={handleChange}
//                 />
//                 <p className="text-sm text-gray-500">TikTok followers</p>
//               </div>
//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-700">
//                   YouTube
//                 </label>
//                 <Input
//                   name="youtube"
//                   value={formData.youtube}
//                   onChange={handleChange}
//                 />
//                 <p className="text-sm text-gray-500">YouTube subscribers</p>
//               </div>
//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-700">
//                   X (Twitter)
//                 </label>
//                 <Input name="x" value={formData.x} onChange={handleChange} />
//                 <p className="text-sm text-gray-500">X followers</p>
//               </div>
//             </div>
//           </div>

//           {/* Bio */}
//           <div className="bg-white p-6 rounded-lg shadow-sm">
//             <h2 className="text-lg font-semibold mb-4">Bio</h2>
//             <Textarea
//               name="bio"
//               value={formData.bio}
//               onChange={handleChange}
//               className="min-h-[150px] w-full"
//               placeholder="Write about yourself, your achievements, and what makes you unique..."
//             />
//           </div>

//           {/* Portfolio Highlights */}
//           <div className="bg-white p-6 rounded-lg shadow-sm">
//             <div className="flex items-center justify-between mb-4">
//               <div>
//                 <h2 className="text-lg font-semibold">Portfolio Highlights</h2>
//                 <p className="text-sm text-gray-500">
//                   Upload images of yourself in action.
//                 </p>
//               </div>
//             </div>
//             <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
//               {[1, 2, 3, 4].map((i) => (
//                 <div
//                   key={i}
//                   className="aspect-square rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center"
//                 >
//                   <button type="button" className="text-2xl">
//                     +
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="flex justify-end gap-4 pb-10">
//             <button
//               type="button"
//               onClick={() => fetchProfileData()}
//               className="bg-gray-100 text-gray-900 hover:text-gray-900 py-2 px-6 font-medium rounded-full shadow-xs"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="bg-[#4F46E5] hover:bg-gray-100 text-white hover:text-gray-900 py-2 px-6 font-medium rounded-full shadow-xs"
//             >
//               Save changes
//             </button>
//           </div>
//         </div>
//       </div>
//     </form>
//   );
// }
// BASEMOD
import { useState, useEffect } from 'react';
import { Input } from '../../components/_Common/Input';
import { Textarea } from '../../components/_Common/TextArea';
import { supabase } from '../../lib/supabaseClient';
import { PROSPONSER } from '../../https/config';

export default function Settings() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    instagram: '',
    tiktok: '',
    x: '',
    youtube: '',
    bio: '',
    images: [],
    avatar: '', // Added avatar field
  });
  const [loading, setLoading] = useState(false);

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

        // Update all profile data with new avatar
        const updatedProfile = {
          ...formData,
          userId: sessionData.session.user.id,
          avatar: base64Image,
        };

        const response = await PROSPONSER.post(
          'athletes/profile',
          updatedProfile,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${sessionData.session.access_token}`,
            },
          }
        );

        // Update form data with response
        setFormData(response.data.data);
        console.log('Profile updated with avatar:', response.data);
      };
    } catch (error) {
      console.error('Error uploading avatar:', error);
      alert('Failed to upload image');
    } finally {
      setAvatarUploading(false);
    }
  };

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) throw new Error('No authenticated session');

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
      setLoading(false);
      console.error('Error fetching profile:', error);

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        gender: '',
        instagram: '',
        tiktok: '',
        x: '',
        youtube: '',
        bio: '',
        images: [],
        avatar: '', // Added avatar field
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
      if (!sessionData.session) throw new Error('No authenticated session');

      const userId = sessionData.session.user.id;

      const payload = {
        userId,
        ...formData,
      };

      const response = await PROSPONSER.post('/athletes/profile', payload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionData.session.access_token}`,
        },
      });

      setFormData(response.data);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile.');
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

  return (
    <form onSubmit={handleSubmit} className="flex gap-6 p-6">
      <div className="flex-1 space-y-6 w-[800px]">
        <div className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Basic Information</h2>

            {/* Avatar Upload Section */}
            <div className="mb-6 space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Profile Photo
              </label>
              <div className="flex items-center space-x-4">
                <div className="shrink-0">
                  {formData.avatar ? (
                    <img
                      src={formData.avatar}
                      alt="Avatar"
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
