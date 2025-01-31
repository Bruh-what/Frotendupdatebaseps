// import { Instagram, Twitter, MessageCircle } from "lucide-react";
// import { Badge } from "../../components/_Common/Badge";

// export default function AthletePage() {
//   return (
//     <div className="min-h-screen w-full bg-white">
//       {/* Hero Image */}
//       <div className="relative h-[300px] w-full">
//         <img
//           src="https://img.freepik.com/premium-photo/man-with-white-shirt-that-says-soccer-league_950347-27042.jpg?w=1060"
//           alt="Athlete in action"
//           className="w-full h-[200px] object-cover"
//         />
//       </div>

//       {/* Profile Section */}
//       <div className="max-w-6xl mx-auto px-6 -mt-20">
//         <div className="flex flex-col md:flex-row gap-6 items-start">
//           {/* Profile Image */}
//           <div className="relative">
//             <img
//               src="https://api.dicebear.com/9.x/initials/svg?seed=Brooklynn"
//               alt="James Murray"
//               className="rounded-full border-4 border-white shadow-lg"
//             />
//           </div>

//           {/* Profile Info */}
//           <div className="flex-1 space-y-4">
//             <div className="flex items-start justify-between">
//               <div>
//                 <div className="flex items-center gap-2">
//                   <h1 className="text-3xl font-bold">James Murray</h1>
//                   <Badge variant="secondary" className="rounded-full">
//                     Verified
//                   </Badge>
//                 </div>
//                 <div className="flex items-center gap-2 text-gray-600">
//                   <span>Professional cyclist</span>
//                   <span>•</span>
//                   <span>160k social followers</span>
//                 </div>
//               </div>
//               <div className="flex gap-2">
//                 {/* <button className="btn">
//                   <MessageCircle className="mr-2 h-4 w-4" />
//                   Message
//                 </button> */}
//                 {/* <button className="btn-outline">
//                   <Instagram className="mr-2 h-4 w-4" />
//                   Follow
//                 </button> */}
//                 <button className="bg-[#4F46E5] hover:bg-gray-100 text-white hover:text-gray-900 py-2 px-6 font-medium rounded-full shadow-xs">
//                   Send a message
//                 </button>
//               </div>
//             </div>

//             <div className="flex gap-4">
//               <a href="#" className="hover:text-purple-600">
//                 <Instagram className="h-5 w-5" />
//               </a>
//               <a href="#" className="hover:text-purple-600">
//                 <Twitter className="h-5 w-5" />
//               </a>
//             </div>

//             <p className="text-gray-600">
//               A professional cyclist with a passion for cycling that started at
//               an early age.
//             </p>

//             <div className="space-y-4">
//               <h2 className="text-xl font-semibold">Career Highlights:</h2>

//               <div className="space-y-4">
//                 <div>
//                   <h3 className="font-medium">National Championships:</h3>
//                   <p className="text-gray-600">
//                     Multiple titles at the National Cycling Championship in
//                     various cycling disciplines.
//                   </p>
//                 </div>

//                 <div>
//                   <h3 className="font-medium">International Competitions:</h3>
//                   <p className="text-gray-600">
//                     Represented the UK in prestigious events such as the UCI
//                     Road World Championships and the Commonwealth Games, where I
//                     earned medals and accolades for outstanding performances.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Gallery Grid */}
//         <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
//           {Array.from({ length: 3 }).map((_, i) => (
//             <div key={i} className="aspect-square bg-gray-100 rounded-lg" />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Instagram, Twitter, Youtube } from "lucide-react";
import { Badge } from "../../components/_Common/Badge";
import { supabase } from "../../lib/supabaseClient";
import { PROSPONSER } from "../../https/config";

export default function AthletePage() {
  const { athleteId } = useParams();
  const [athleteData, setAthleteData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAthleteProfile = async () => {
    try {
      setLoading(true);
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) throw new Error("No authenticated session");

      const response = await PROSPONSER.get(`/athletes/profile/${athleteId}`, {
        headers: {
          Authorization: `Bearer ${sessionData.session.access_token}`,
        },
      });

      if (response.data) {
        setAthleteData(response.data);
      }
    } catch (error) {
      console.error("Error fetching athlete:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAthleteProfile();
  }, [athleteId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!athleteData) return <div>Athlete not found</div>;

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="relative h-[300px] w-full">
        <img
          src={athleteData.images?.[0] || "https://placehold.co/600x400"}
          alt="Cover"
          className="w-full h-[200px] object-cover"
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-20">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="relative">
            <img
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${athleteData.firstName} ${athleteData.lastName}`}
              alt={`${athleteData.firstName} ${athleteData.lastName}`}
              className="h-32 w-32 rounded-full border-4 border-white shadow-lg"
            />
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold">
                  {athleteData.firstName} {athleteData.lastName}
                </h1>
                <Badge variant="secondary" className="rounded-full">
                  Athlete
                </Badge>
              </div>
              <p className="text-gray-600">{athleteData.email}</p>
            </div>

            <div className="flex gap-4">
              {athleteData.instagram && (
                <a
                  href={athleteData.instagram}
                  className="hover:text-purple-600"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              {athleteData.x && (
                <a href={athleteData.x} className="hover:text-blue-400">
                  <Twitter className="h-5 w-5" />
                </a>
              )}
              {athleteData.youtube && (
                <a href={athleteData.youtube} className="hover:text-red-600">
                  <Youtube className="h-5 w-5" />
                </a>
              )}
            </div>

            <p className="text-gray-600">{athleteData.bio}</p>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 mt-6">
              {athleteData.images?.map((image, index) => (
                <div
                  key={index}
                  className="aspect-square rounded-lg overflow-hidden"
                >
                  <img
                    src={image}
                    alt={`Portfolio ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
