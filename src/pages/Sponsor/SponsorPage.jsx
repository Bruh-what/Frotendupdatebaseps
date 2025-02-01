import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Badge } from "../../components/_Common/Badge";
import { supabase } from "../../lib/supabaseClient";
import { PROSPONSER } from "../../https/config";
import { Globe } from "lucide-react";

export default function SponsorPage() {
  const { sponsorId } = useParams();
  const [sponsorData, setSponsorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSponsorProfile = async () => {
      try {
        setLoading(true);
        const { data: sessionData } = await supabase.auth.getSession();

        const response = await PROSPONSER.get(
          `/sponsors/profile/${sponsorId}`,
          {
            headers: {
              Authorization: `Bearer ${sessionData.session.access_token}`,
            },
          }
        );

        setSponsorData(response.data.data);
      } catch (error) {
        console.error("Error fetching sponsor:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (sponsorId) {
      fetchSponsorProfile();
    }
  }, [sponsorId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!sponsorData) return <div>Sponsor not found</div>;

  return (
    <div className="min-h-screen w-full bg-white">
      {/* Hero Section */}
      <div className="relative h-[300px] w-full">
        <div className="w-full h-[200px] bg-gradient-to-r from-blue-500 to-purple-500" />
      </div>

      {/* Profile Section */}
      <div className="max-w-6xl mx-auto px-6 -mt-20">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Company Logo */}
          <div className="relative">
            <img
              src={
                sponsorData.avatar ||
                `https://api.dicebear.com/7.x/initials/svg?seed=${sponsorData.companyName}`
              }
              alt={sponsorData.companyName}
              className="h-32 w-32 rounded-full border-4 border-white shadow-lg object-cover"
            />
          </div>

          {/* Company Info */}
          <div className="flex-1 space-y-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold">
                  {sponsorData.companyName}
                </h1>
                <Badge variant="secondary" className="rounded-full">
                  Verified
                </Badge>
              </div>
              {sponsorData.website && (
                <a
                  href={sponsorData.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
                >
                  <Globe className="h-4 w-4" />
                  <span>{sponsorData.website}</span>
                </a>
              )}
            </div>

            {/* Description */}
            <div className="prose max-w-none">
              <p className="text-gray-600">{sponsorData.description}</p>
            </div>

            {/* Image Gallery */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Gallery</h3>
              <div className="grid grid-cols-5 gap-4">
                {[...Array(5)].map((_, index) => (
                  <div
                    key={index}
                    className="aspect-square rounded-lg overflow-hidden bg-gray-100"
                  >
                    {sponsorData.images && sponsorData.images[index] ? (
                      <img
                        src={sponsorData.images[index]}
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
