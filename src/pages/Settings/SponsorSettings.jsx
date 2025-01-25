// import { MoveUpRight } from "lucide-react";
// import { Label } from "../../components/_Common/Label";
// import { Input } from "../../components/_Common/Input";
// import { Textarea } from "../../components/_Common/TextArea";

// export default function SponsorSettings() {
//   return (
//     <div className="flex gap-6 p-6">
//       {/* Main Content */}
//       <div className="flex-1 space-y-6 w-[800px]">
//         {/* <h1 className="text-xl font-semibold">Profile settings</h1> */}

//         <div className="space-y-6 ">
//           <div>
//             {/* <h2 className="text-xl font-semibold mb-4">Sponsor Profile</h2> */}

//             {/* Profile Picture */}
//             <div className="space-y-2">
//               <div className="flex items-start gap-4">
//                 <div className="rounded-full bg-purple-100 p-6">
//                   <MoveUpRight className="h-8 w-8 text-purple-600" />
//                 </div>
//                 <div className="flex-1">
//                   <h3 className="font-medium">Profile picture</h3>
//                   <p className="text-sm text-gray-500">
//                     Use a profile picture to stand out. Upload an image that is
//                     312px square.
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Display Name */}
//             <div className="mt-6 space-y-2">
//               <Label className="block text-sm font-medium text-gray-700">
//                 Display Name
//               </Label>
//               <Input
//                 type="text"
//                 defaultValue="Raging Racers"
//                 className="input"
//               />
//               <p className="text-sm text-gray-500">
//                 How your name will appear to other members.
//               </p>
//             </div>

//             {/* Email and Website */}
//             <div className="mt-6 grid gap-6 md:grid-cols-2">
//               <div className="space-y-2">
//                 <Label className="block text-sm font-medium text-gray-700">
//                   Email address
//                 </Label>
//                 <Input
//                   type="email"
//                   defaultValue="James@ragingracers.com"
//                   className="input"
//                 />
//                 <p className="text-sm text-gray-500">
//                   Your primary email. Used for contracts.
//                 </p>
//               </div>
//               <div className="space-y-2">
//                 <Label className="block text-sm font-medium text-gray-700">
//                   Business website
//                 </Label>
//                 <Input
//                   type="url"
//                   defaultValue="James@ragingracers.com"
//                   className="input"
//                 />
//                 <p className="text-sm text-gray-500">
//                   Your official brand's website.
//                 </p>
//               </div>
//             </div>

//             {/* Brand Bio */}
//             <div className="mt-6 space-y-2">
//               <Label className="block text-sm font-medium text-gray-700">
//                 Brand bio
//               </Label>
//               <Textarea
//                 className="textarea min-h-[150px]"
//                 placeholder="This will be visible to athletes. We recommend you list all your company info here. Feel free to list past sponsorships"
//               ></Textarea>
//             </div>

//             {/* Instagram Profile */}
//             <div className="mt-6 space-y-2">
//               <Label className="block text-sm font-medium text-gray-700">
//                 Instagram profile link
//               </Label>
//               <Input type="url" className="input" />
//             </div>

//             {/* Sponsor Highlights */}
//             <div className="mt-6 space-y-4 pb-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h3 className="font-medium">Sponsor Highlights</h3>
//                   <p className="text-sm text-gray-500">
//                     Upload brand highlights.
//                   </p>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <span className="text-sm text-gray-500">
//                     Need more images or videos?
//                   </span>
//                   <button className="text-purple-600 underline">
//                     Upgrade to Pro
//                   </button>
//                 </div>
//               </div>
//               <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
//                 {Array.from({ length: 4 }).map((_, i) => (
//                   <div
//                     key={i}
//                     className="aspect-square rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center"
//                   >
//                     <button className="text-2xl">+</button>
//                   </div>
//                 ))}
//               </div>

//               <div className="flex justify-end gap-4 pb-10 ">
//                 <button className="bg-gray-100 text-gray-900 hover:text-gray-900 py-2 px-6 font-medium rounded-full shadow-xs">
//                   Cancel
//                 </button>
//                 <button className="bg-[#4F46E5] hover:bg-gray-100 text-white hover:text-gray-900 py-2 px-6 font-medium rounded-full shadow-xs">
//                   Save changes
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       Right Sidebar
//       <div className="w-80 space-y-6">
//         <div>
//           <h2 className="text-xl font-semibold mb-4">Featured Athletes</h2>
//           <div className="space-y-4">
//             {Array.from({ length: 2 }).map((_, i) => (
//               <div key={i} className="p-4 border rounded-lg">
//                 <img
//                   src="https://img.freepik.com/free-photo/close-up-portrait-baseball-player_23-2150885201.jpg?t=st=1734355360~exp=1734358960~hmac=5729b013a0095059c5d222755962dce489c7303798fc004525c7de8a16d215c8&w=740"
//                   alt="James Murray"
//                   className="w-full rounded-lg object-cover mb-3"
//                 />
//                 <h3 className="font-medium mb-2">James Murray</h3>
//                 <p className="text-sm text-gray-500">
//                   A prominent figure in the biking community. 3x podium wins...
//                 </p>
//               </div>
//             ))}
//           </div>
//           <div className="mt-4 rounded-lg bg-gray-50 p-4">
//             <p className="text-sm text-gray-600">
//               Need more brand visibility? Show up in athlete dashboard with our
//               partner ads program.{" "}
//               <button className="text-purple-600 underline">Learn more</button>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// BASEMOD
// import { useState, useEffect } from "react";
// import { MoveUpRight } from "lucide-react";
// import { Label } from "../../components/_Common/Label";
// import { Input } from "../../components/_Common/Input";
// import { Textarea } from "../../components/_Common/TextArea";
// import { supabase } from "../../lib/supabaseClient";
// import axios from "axios";

// export default function SponsorSettings() {
//   const [formData, setFormData] = useState({
//     companyName: "",
//     website: "",
//     description: "",
//     images: [],
//   });

//   const fetchSponsorProfile = async () => {
//     try {
//       const { data: sessionData } = await supabase.auth.getSession();
//       if (!sessionData.session) throw new Error("No authenticated session");

//       const response = await axios.get(`/api/sponsors/profile`, {
//         headers: {
//           Authorization: `Bearer ${sessionData.session.access_token}`,
//         },
//       });

//       if (response.data) {
//         setFormData(response.data);
//       }
//     } catch (error) {
//       console.error("Error fetching profile:", error);
//     }
//   };

//   useEffect(() => {
//     fetchSponsorProfile();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data: sessionData } = await supabase.auth.getSession();
//       if (!sessionData.session) throw new Error("No authenticated session");

//       const response = await axios.post("/api/sponsors/profile", formData, {
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

//   return (
//     <form onSubmit={handleSubmit} className="flex gap-6 p-6">
//       <div className="flex-1 space-y-6 w-[800px]">
//         <div className="space-y-6">
//           <div>
//             <div className="mt-6 space-y-2">
//               <Label className="block text-sm font-medium text-gray-700">
//                 Company Name
//               </Label>
//               <Input
//                 name="companyName"
//                 value={formData.companyName}
//                 onChange={handleChange}
//                 className="input"
//                 required
//               />
//             </div>

//             <div className="mt-6 space-y-2">
//               <Label className="block text-sm font-medium text-gray-700">
//                 Website
//               </Label>
//               <Input
//                 type="url"
//                 name="website"
//                 value={formData.website}
//                 onChange={handleChange}
//                 className="input"
//                 required
//               />
//             </div>

//             <div className="mt-6 space-y-2">
//               <Label className="block text-sm font-medium text-gray-700">
//                 Description
//               </Label>
//               <Textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 className="textarea min-h-[150px]"
//                 required
//               />
//             </div>

//             <div className="mt-6 space-y-2">
//               <Label className="block text-sm font-medium text-gray-700">
//                 Images
//               </Label>
//               <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
//                 {Array.from({ length: 4 }).map((_, i) => (
//                   <div
//                     key={i}
//                     className="aspect-square rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center"
//                   >
//                     <button type="button" className="text-2xl">
//                       +
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="flex justify-end gap-4 pb-10 mt-6">
//               <button
//                 type="button"
//                 onClick={() => fetchSponsorProfile()}
//                 className="bg-gray-100 text-gray-900 hover:text-gray-900 py-2 px-6 font-medium rounded-full shadow-xs"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="bg-[#4F46E5] hover:bg-gray-100 text-white hover:text-gray-900 py-2 px-6 font-medium rounded-full shadow-xs"
//               >
//                 Save changes
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </form>
//   );
// }
// BASEMOD
import { useState, useEffect } from "react";
import { MoveUpRight } from "lucide-react";
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
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setFormData({
          companyName: response.data.companyName || "",
          website: response.data.website || "",
          description: response.data.description || "",
          images: response.data.images || [],
        });
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

      const response = await PROSPONSER.post("/sponsors/profile", payload, {
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
          <div>
            <div className="mt-6 space-y-2">
              <Label className="block text-sm font-medium text-gray-700">
                Company Name
              </Label>
              <Input
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="input"
                required
              />
            </div>

            <div className="mt-6 space-y-2">
              <Label className="block text-sm font-medium text-gray-700">
                Website
              </Label>
              <Input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="input"
                required
              />
            </div>

            <div className="mt-6 space-y-2">
              <Label className="block text-sm font-medium text-gray-700">
                Description
              </Label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="textarea min-h-[150px]"
                required
              />
            </div>

            <div className="mt-6 space-y-2">
              <Label className="block text-sm font-medium text-gray-700">
                Images
              </Label>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
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

            <div className="flex justify-end gap-4 pb-10 mt-6">
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
      </div>
    </form>
  );
}
