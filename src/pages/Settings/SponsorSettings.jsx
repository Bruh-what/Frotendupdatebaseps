import { useState, useEffect } from 'react';
import { Label } from '../../components/_Common/Label';
import { Input } from '../../components/_Common/Input';
import { Textarea } from '../../components/_Common/TextArea';
import { supabase } from '../../lib/supabaseClient';
import { PROSPONSER } from '../../https/config';
import toast from 'react-hot-toast';
import { setProfileIncomplete } from '../../feature/auth/auth.slicer';
import { useDispatch } from 'react-redux';

export default function SponsorSettings() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    companyName: '',
    website: '',
    email: '',
    description: '',
    images: [],
    avatar: '',
    link: '',
    insta: '',
  });
  const [loading, setLoading] = useState(true);

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
          '/sponsors/profile',
          updatedProfile,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${sessionData.session.access_token}`,
            },
          }
        );

        setFormData(response.data.data);
        toast.success('Profile Picture Updated ');
      };
    } catch (error) {
      console.error('Error uploading avatar:', error);

      toast.error('Failed to upload image');
    } finally {
      setAvatarUploading(false);
    }
  };

  const fetchSponsorProfile = async () => {
    try {
      setLoading(true);
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) throw new Error('No authenticated session');

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
      console.error('Error fetching profile:', error);
      setFormData({
        companyName: '',
        website: '',
        description: '',
        images: [],
        avatar: '',
        link: '',
        email: '',
      });
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
      if (!sessionData.session) throw new Error('No authenticated session');

      const userId = sessionData.session.user.id;

      const payload = {
        userId,
        ...formData,
      };

      const response = await PROSPONSER.post('sponsors/profile', payload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionData.session.access_token}`,
        },
      });

      setFormData(response.data.data);
      dispatch(setProfileIncomplete(false));
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile.');
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

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-6 px-[36px] py-[2rem] w-[80rem]"
    >
      <div className="flex-1 space-y-6 w-[800px]">
        <div className="space-y-6">
          <div className="bg-white  rounded-lg">
            <h2 className="text-[24px] font-semibold mb-4">Profile settings</h2>
            <div className="mb-6 space-y-2">
              <label className="block text-[16px] font-medium text-[#111827]">
                Sponsor Profile
              </label>
              <div className="flex items-center space-x-4">
                <div className="shrink-0">
                  {formData.avatar ? (
                    <img
                      src={formData.avatar}
                      alt="Avatar"
                      className="h-16 w-16 object-cover rounded-full cursor-pointer"
                      onClick={() =>
                        document.getElementById('avatar-input').click()
                      }
                    />
                  ) : (
                    <div
                      className="h-16 w-16 rounded-full bg-gray-200 cursor-pointer"
                      onClick={() =>
                        document.getElementById('avatar-input').click()
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
                    312px
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
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  className="bg-[#F3F4F6]"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[16px] font-medium text-[#111827]">
                  Email address{' '}
                </label>
                <p className="text-sm text-gray-500">
                  Your primary email. Used for contracts.{' '}
                </p>
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-[#F3F4F6]"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[16px] font-medium text-[#111827]">
                  Business website{' '}
                </label>
                <p className="text-sm text-gray-500">
                  Your official brand’s website.{' '}
                </p>
                <Input
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  required
                  className="bg-[#F3F4F6]"
                />
              </div>
              <div className="space-y-2 col-span-2">
                <label className="block text-[16px] font-medium text-[#111827]">
                  Brand bio{' '}
                </label>
                <p className="text-sm text-gray-500">
                  This will be visible to athletes. We recommend you list all
                  your company info here. Feel free to list past sponsorships
                </p>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="h-[10rem] w-full bg-[#F3F4F6]"
                />
              </div>
              <div className="space-y-2 col-span-2">
                <label className="block text-[16px] font-medium text-[#111827]">
                  Instagram profile link{' '}
                </label>

                <Input
                  name="link"
                  value={formData.link}
                  onChange={handleChange}
                  required
                  className="bg-[#F3F4F6]"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pb-10">
            {/* //  adding here also */}
            <button
              type="button"
              onClick={() => fetchSponsorProfile()}
              className="bg-gray-100 hover:bg-gray-300 duration-300 text-gray-900 hover:text-gray-900 py-2 px-6 font-medium rounded-full shadow-xs"
            >
              Cancel
            </button>
            {/* //adding hover and duration  */}
            <button
              type="submit"
              className="bg-[#4F46E5] duration-300 hover:bg-[#4338CA] text-white  py-2 px-6 font-medium rounded-full shadow-xs"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
