import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import logo from "../../assets/logofinalised.svg";

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "athlete", // Default role set to athlete
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    console.log(formData);

    try {
      const { data: signUpData, error: signUpError } =
        await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.firstName + " " + formData.lastName,
            },
          },
        });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      const { user } = signUpData;
      const { error: profileError } = await supabase.from("profiles").insert([
        {
          uid: user.id,
          role: formData.role, // Use the selected role
        },
      ]);

      if (profileError) {
        setError(profileError.message);
        return;
      }

      setSuccess(
        "Signup successful! Please check your email for a confirmation link."
      );
    } catch (err) {
      setError("Something went wrong, please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-stretch">
      {/* Left Column - Visible on md and up */}
      <div className="hidden md:flex md:w-1/2 bg-gray-50 p-8 lg:p-12 flex-col justify-center">
        <div className="max-w-md mx-auto space-y-6">
          <div className="space-y-2">
            <img src={logo} alt="Prosponsor Logo" className="w-24 h-auto" />
            <p className="text-gray-600 text-lg">
              Join our community of athletes and sponsors.
            </p>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
            <img
              src="/Signuppicture.webp"
              alt="Athletes and Sponsors"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* Right Column - Sign Up Form */}
      <div className="flex-1 md:w-1/2 flex items-center justify-center p-4 sm:p-8 md:p-12 bg-white">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo - Only visible on small screens */}
          <div className="md:hidden text-center space-y-2">
            <h1 className="text-3xl font-bold">
              Pro<span className="text-gray-500">sponsor</span>
            </h1>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-gray-900">Sign Up</h2>
            <p className="text-gray-600">Create your account and get started</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#4636FB] focus:border-transparent transition-colors"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#4636FB] focus:border-transparent transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="athlete"
                    checked={formData.role === "athlete"}
                    onChange={handleInputChange}
                    className="form-radio h-5 w-5 text-[#4636FB]"
                  />
                  <span className="ml-2 text-gray-700">Athlete</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value="sponsor"
                    checked={formData.role === "sponsor"}
                    onChange={handleInputChange}
                    className="form-radio h-5 w-5 text-[#4636FB]"
                  />
                  <span className="ml-2 text-gray-700">Sponsor</span>
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="w-full  bg-[#4636FB] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#382ad1] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Sign Up
            </button>
          </form>

          {error && (
            <div className="text-sm text-red-600 text-center">{error}</div>
          )}
          {success && (
            <div className="text-sm text-green-600 text-center">{success}</div>
          )}

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/signin"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
