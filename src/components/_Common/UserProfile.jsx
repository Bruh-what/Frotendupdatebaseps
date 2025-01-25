import React from "react";
import { useParams } from "react-router-dom";
import { Instagram, Twitter, Globe, Users } from "lucide-react";

export default function UserProfile() {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        const response = await axios.get(`/api/profiles/${userId}`, {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        });
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userId]);

  if (loading) return <div>Loading profile...</div>;
  if (!profile) return <div>Profile not found</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Image */}
      <div className="h-[300px] w-full relative">
        <img
          src={profile.coverImage || "/cover-placeholder.jpg"}
          alt="Cover"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Profile Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            {/* Profile Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <img
                src={
                  profile.avatarUrl ||
                  `https://api.dicebear.com/7.x/initials/svg?seed=${profile.full_name}`
                }
                alt={profile.full_name}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
              />
              <div className="flex-1">
                <div className="flex items-center gap-4">
                  <h1 className="text-3xl font-bold">{profile.full_name}</h1>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {profile.role}
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-4 text-gray-600">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {profile.totalFollowers || 0} followers
                  </span>
                  {profile.location && <span>• {profile.location}</span>}
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6 flex gap-4">
              {profile.instagram && (
                <a
                  href={profile.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-pink-600"
                >
                  <Instagram className="w-6 h-6" />
                </a>
              )}
              {profile.twitter && (
                <a
                  href={profile.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-400"
                >
                  <Twitter className="w-6 h-6" />
                </a>
              )}
              {profile.website && (
                <a
                  href={profile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900"
                >
                  <Globe className="w-6 h-6" />
                </a>
              )}
            </div>

            {/* Bio */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">About</h2>
              <p className="text-gray-600 whitespace-pre-wrap">{profile.bio}</p>
            </div>

            {/* Gallery */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {profile.gallery?.map((image, index) => (
                  <div
                    key={index}
                    className="aspect-square rounded-lg overflow-hidden bg-gray-100"
                  >
                    <img
                      src={image || `/placeholder-${index + 1}.jpg`}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )) ||
                  Array(5)
                    .fill(0)
                    .map((_, index) => (
                      <div
                        key={index}
                        className="aspect-square rounded-lg bg-gray-100"
                      />
                    ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
