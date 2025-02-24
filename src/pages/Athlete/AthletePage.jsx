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
import coverPhoto from "../../assets/images/profileCover.png";


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
      <div className="relative h-[300px] w-full ">
        <img
          src={athleteData.images?.[0] || `${coverPhoto}`}
          alt="Cover"
          className="w-full h-[200px] object-cover"
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-20">
        <div className="flex flex-col md:flex-row gap-6 items-start ">
          <div className="absolute top-40 ">
            <img
              src={
                athleteData.avatar ||
                `https://api.dicebear.com/7.x/initials/svg?seed=${athleteData.firstName} ${athleteData.lastName}`
              }
              alt={`${athleteData.firstName} ${athleteData.lastName}`}
              className="h-20 w-20 max-sm:h-16 max-sm:w-16 object-cover rounded-full"
            />
          </div>

          <div className="flex-1 space-y-4 mt-10 max-sm:mt-5">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold max-md:text-md max-sm:text-sm">
                  {athleteData.firstName} {athleteData.lastName}
                </h1>
                <Badge variant="secondary" className="rounded-full">
                  Athlete
                </Badge>
              </div>
              <div className="flex gap-3 max-sm:flex-col">
                <div>
                  <p className="text-[#111827] text-[14px] max-sm:text-sm ">160k socal followers</p>
                  <p className="text-[#111827] text-[14px] max-sm:text-sm ">{athleteData.email}</p>
                </div>
              
              <div className=" flex items-end">
                 <button
                onClick={() => handleContactClick(opportunity)}
                className="bg-[#4338CA] hover:bg-[#4338CA] text-white text-[14px] max-md:text-[10px] py-1 px-6 rounded-full "
              >
                message
              </button>
              </div>
             

              <div className="flex gap-4 items-end">
              {athleteData.instagram && (
                <a
                  href={athleteData.instagram}
                  className="hover:text-purple-600"
                >
                  <Instagram className="h-6 w-6" />
                </a>
              )}
              {athleteData.x && (
                <a href={athleteData.x} className="hover:text-blue-400">
                  <Twitter className="h-6 w-6" />
                </a>
              )}
              {athleteData.youtube && (
                <a href={athleteData.youtube} className="hover:text-red-600">
                  <Youtube className="h-6 w-6" />
                </a>
              )}
            </div>
              </div>
            </div>
         
            <p className="text-gray-600 max-sm:text-sm">{athleteData.bio}</p>


            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Gallery</h3>
              <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1 max-lg:grid-cols-2">
                {[...Array(5)].map((_, index) => (
                  <div
                    key={index}
                    className="aspect-square rounded-lg overflow-hidden bg-gray-100"
                  >
                    {athleteData.images && athleteData.images[index] ? (
                      <img
                        src={athleteData.images[index]}
                        alt={`Gallery image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg
                          className="h-8 w-8"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
