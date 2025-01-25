// import { useState } from "react"
// import { useNavigate } from "react-router-dom" // Import useNavigate
// import { supabase } from "../../lib/supabaseClient"

// export default function SignIn() {
//   const navigate = useNavigate()
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [error, setError] = useState(null)
//   const [success, setSuccess] = useState(null)
//   //   const router = useRouter() // Initialize useRouter

//   const handleSignIn = async (e) => {
//     e.preventDefault()
//     setError(null)
//     setSuccess(null)

//     try {
//       // Sign in the user
//       const { data: signInData, error: signInError } =
//         await supabase.auth.signInWithPassword({
//           email,
//           password,
//         })

//       if (signInError) {
//         setError(signInError.message)
//         return
//       }

//       setSuccess("Sign in successful! Redirecting...")
//       console.log("Signed-in user:", signInData.user)

//       // Redirect to "/"
//       navigate("/")
//     } catch (err) {
//       setError("Something went wrong, please try again.")
//     }
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-6">Sign In</h1>
//       <form onSubmit={handleSignIn} className="space-y-4">
//         <div>
//           <label
//             htmlFor="email"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Email
//           </label>
//           <input
//             id="email"
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//             required
//           />
//         </div>
//         <div>
//           <label
//             htmlFor="password"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Password
//           </label>
//           <input
//             id="password"
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//         >
//           Sign In
//         </button>
//       </form>
//       {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
//       {success && <p className="mt-4 text-sm text-green-500">{success}</p>}
//     </div>
//   )
// }
// ----
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { supabase } from "../../lib/supabaseClient";

// export default function SignIn() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);

//   const handleSignIn = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setSuccess(null);

//     try {
//       const { data: signInData, error: signInError } =
//         await supabase.auth.signInWithPassword({
//           email,
//           password,
//         });

//       if (signInError) {
//         setError(signInError.message);
//         return;
//       }

//       setSuccess("Sign in successful! Redirecting...");
//       console.log("Signed-in user:", signInData.user);
//       navigate("/");
//     } catch (err) {
//       setError("Something went wrong, please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="w-full max-w-[1200px] grid md:grid-cols-2 gap-8 p-4 md:p-8">
//         {/* Left side with branding */}
//         <div className="hidden md:flex flex-col justify-center space-y-4">
//           <div className="flex items-center space-x-2">
//             <div className="text-4xl font-bold">
//               Pro<span className="text-gray-500">sponsor</span>
//             </div>
//           </div>
//           <p className="text-gray-600">
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit suspendisse.
//           </p>
//           <img
//             src="/placeholder.svg?height=400&width=600"
//             alt="Athlete"
//             className="rounded-2xl object-cover w-full"
//           />
//         </div>

//         {/* Right side with form */}
//         <div className="flex flex-col justify-center max-w-md mx-auto w-full space-y-8">
//           <div className="space-y-2">
//             <h1 className="text-2xl font-semibold text-gray-900">Sign In</h1>
//             <p className="text-gray-600">Where talent meets their potential</p>
//           </div>

//           <form onSubmit={handleSignIn} className="space-y-6">
//             <div className="space-y-4">
//               <div>
//                 <label
//                   htmlFor="email"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Email
//                 </label>
//                 <div className="mt-1 relative">
//                   <input
//                     id="email"
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="block w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-900 placeholder-gray-400"
//                     placeholder="Enter your email"
//                     required
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label
//                   htmlFor="password"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Password
//                 </label>
//                 <div className="mt-1 relative">
//                   <input
//                     id="password"
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="block w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-900 placeholder-gray-400"
//                     placeholder="Enter your password"
//                     required
//                   />
//                 </div>
//               </div>
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
//             >
//               Sign In
//             </button>

//             <button
//               type="button"
//               className="w-full bg-gray-50 text-gray-900 py-3 px-4 rounded-lg font-medium border border-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors flex items-center justify-center space-x-2"
//             >
//               <svg className="w-5 h-5" viewBox="0 0 24 24">
//                 <path
//                   fill="currentColor"
//                   d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//                 />
//                 <path
//                   fill="currentColor"
//                   d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//                 />
//                 <path
//                   fill="currentColor"
//                   d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//                 />
//                 <path
//                   fill="currentColor"
//                   d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//                 />
//               </svg>
//               <span>Sign in with Google</span>
//             </button>
//           </form>

//           {error && <p className="text-sm text-red-600">{error}</p>}
//           {success && <p className="text-sm text-green-600">{success}</p>}

//           <p className="text-center text-sm text-gray-600">
//             Don't have an account?{" "}
//             <a
//               href="/signup"
//               className="font-medium text-blue-600 hover:text-blue-500"
//             >
//               Sign up
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import logo from "../../assets/logofinalised.svg";

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const { data: signInData, error: signInError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (signInError) {
        setError(signInError.message);
        return;
      }

      setSuccess("Sign in successful! Redirecting...");
      console.log("Signed-in user:", signInData.user);
      navigate("/");
    } catch (err) {
      setError("Something went wrong, please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-stretch">
      {/* Left Column - Visible on md and up */}
      <div className="hidden md:flex md:w-1/2 bg-gray-50 p-8 flex-col justify-center">
        <div className="max-w-md mx-auto space-y-6">
          <div className="space-y-2">
            {/* <h1 className="text-3xl md:text-4xl font-bold">
              Pro<span className="text-gray-500">sponsor</span>
            </h1> */}
            <img src={logo} alt="Prosponsor Logo" className="w-24 h-auto" />
            <p className="text-gray-600 text-lg">
              Welcome to ProSponsor. Enter your details to sign in.
            </p>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
            <img
              src="/Signuppicture.webp"
              alt="Athlete Benefits"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* Right Column - Sign In Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 md:p-12 bg-white">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo - Only visible on small screens */}
          <div className="md:hidden text-center space-y-2">
            <h1 className="text-3xl font-bold">
              Pro<span className="text-gray-500">sponsor</span>
            </h1>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-gray-900">Sign In</h2>
            <p className="text-gray-600">Where talent meets their potential</p>
          </div>

          <form onSubmit={handleSignIn} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Enter your email"
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
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <div className="space-y-4">
              <button
                type="submit"
                className="w-full bg-[#4636FB] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#4636FB] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Sign In
              </button>

              <button
                type="button"
                className="w-full bg-gray-50 text-gray-900 py-3 px-4 rounded-lg font-medium border border-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Sign in with Google
              </button>
            </div>
          </form>

          {error && (
            <div className="text-sm text-red-600 text-center">{error}</div>
          )}
          {success && (
            <div className="text-sm text-green-600 text-center">{success}</div>
          )}

          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
