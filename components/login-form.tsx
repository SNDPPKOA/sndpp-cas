// "use client";

// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useState } from "react";
// import { collection, getDocs, query, where } from "firebase/firestore";
// import { db } from "@/lib/firebase";
// import { Eye, EyeOff } from "lucide-react";

// export function LoginForm({
//   className,
//   ...props
// }: React.ComponentPropsWithoutRef<"form">) {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     // Officer Bypass
//     if (username === "Attendance" && password === "OfficersOnly2025") {
//       document.cookie = "authToken=officer-token; path=/";
//       localStorage.setItem(
//         "user",
//         JSON.stringify({
//           uid: "officer-attendance-uid",
//           username: "Attendance",
//           role: "officer",
//         })
//       );
//       window.location.href = "/attendanceOfficers";
//       return;
//     }

//     // Admin Bypass
//     if (username === "Admin" && password === "AdminLangPo2025") {
//       document.cookie = "authToken=admin-token; path=/";
//       localStorage.setItem(
//         "user",
//         JSON.stringify({
//           uid: "admin-uid",
//           username: "Admin",
//           role: "admin",
//         })
//       );
//       window.location.href = "/dashboard";
//       return;
//     }

//     // Firebase user login
//     try {
//       const usersRef = collection(db, "users");
//       const q = query(
//         usersRef,
//         where("username", "==", username),
//         where("password", "==", password)
//       );
//       const querySnapshot = await getDocs(q);

//       if (!querySnapshot.empty) {
//         const docData = querySnapshot.docs[0].data();
//         const docId = querySnapshot.docs[0].id;
//         const userWithUid = { ...docData, uid: docId };

//         document.cookie = "authToken=user-token; path=/";
//         localStorage.setItem("user", JSON.stringify(userWithUid));
//         window.location.href = "/dashboardUsers";
//       } else {
//         setError("Invalid username or password.");
//         alert("Invalid username or password.");
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//       setError("Something went wrong. Please try again.");
//       alert("Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <form
//       className={cn("flex flex-col gap-6", className)}
//       {...props}
//       onSubmit={handleLogin}
//     >
//       <div className="flex flex-col items-center gap-2 text-center">
//         <h1 className="text-3xl font-bold">Login to your account</h1>
//         <p className="text-balance text-sm text-muted-foreground">
//           Enter your Username below to login to your account
//         </p>
//       </div>

//       <div className="grid gap-6">
//         <div className="grid gap-2">
//           <Label htmlFor="username">Username</Label>
//           <Input
//             id="username"
//             type="text"
//             placeholder="YourUsername_123@"
//             value={username}
//             onChange={(e) => {
//               const value = e.target.value;
//               const allowed = /^[a-zA-Z0-9@_]*$/;
//               if (allowed.test(value)) {
//                 setUsername(value);
//               }
//             }}
//             required
//           />
//         </div>

//         <div className="grid gap-2">
//           <div className="flex items-center">
//             <Label htmlFor="password">Password</Label>
//             <a
//               href="#"
//               className="ml-auto text-sm underline-offset-4 hover:underline"
//             >
//               Forgot your password?
//             </a>
//           </div>
//           <div className="relative">
//             <Input
//               id="password"
//               type={showPassword ? "text" : "password"}
//               required
//               value={password}
//               onChange={(e) => {
//                 const value = e.target.value;
//                 const allowed = /^[a-zA-Z0-9@_]*$/;
//                 if (allowed.test(value)) {
//                   setPassword(value);
//                 }
//               }}
//               className="pr-10"
//             />

//             <button
//               type="button"
//               onClick={() => setShowPassword((prev) => !prev)}
//               className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black dark:hover:text-white"
//               tabIndex={-1}
//             >
//               {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//             </button>
//           </div>
//         </div>

//         {error && <p className="text-red-500 text-sm text-center">{error}</p>}

//         <Button type="submit" className="w-full">
//           Login
//         </Button>
//       </div>

//       <div className="text-center text-sm">
//         Don&apos;t have an account?{" "}
//         <a href="./signup" className="underline underline-offset-4">
//           Sign up
//         </a>
//       </div>
//     </form>
//   );
// }
"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import bcrypt from "bcryptjs"; // ✅ import bcryptjs
import MessageModal from "@/components/modal";
import ForgotPasswordDialog from "./forgetPass";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Officer Bypass
      if (username === "Attendance" && password === "OfficersOnly2025") {
        document.cookie = "authToken=officer-token; path=/";
        localStorage.setItem(
          "user",
          JSON.stringify({
            uid: "officer-attendance-uid",
            username: "Attendance",
            role: "officer",
          })
        );
        window.location.href = "/attendanceOfficers";
        return;
      }

      // Admin Bypass
      if (username === "Admin" && password === "AdminLangPo2025") {
        document.cookie = "authToken=admin-token; path=/";
        localStorage.setItem(
          "user",
          JSON.stringify({
            uid: "admin-uid",
            username: "Admin",
            role: "admin",
          })
        );
        window.location.href = "/dashboard";
        return;
      }

      // Firebase login with hashed password
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("username", "==", username));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const docData = doc.data();
        const docId = doc.id;

        const isPasswordMatch = await bcrypt.compare(
          password,
          docData.password
        );

        if (isPasswordMatch) {
          const userWithId = { ...docData, id: docId };
          document.cookie = "authToken=user-token; path=/";
          localStorage.setItem("user", JSON.stringify(userWithId));
          window.location.href = "/dashboardUsers";
        } else {
          setModalMessage("Invalid username or password.");
          setShowModal(true);
        }
      } else {
        setModalMessage("Invalid username or password.");
        setShowModal(true);
      }
    } catch (err) {
      console.error("Login error:", err);
      setModalMessage("Something went wrong. Please try again.");
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <form
        className={cn("flex flex-col gap-6", className)}
        {...props}
        onSubmit={handleLogin}
      >
        {showModal && (
          <MessageModal
            message={modalMessage}
            onClose={() => setShowModal(false)}
          />
        )}

        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-3xl font-bold">Login to your account</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Enter your Username below to login to your account
          </p>
        </div>

        <div className="grid gap-6">
          {/* Username */}
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="YourUsername_123@"
              value={username}
              onChange={(e) => {
                const value = e.target.value;
                const allowed = /^[a-zA-Z0-9_@]*$/;
                if (allowed.test(value)) {
                  setUsername(value);
                }
              }}
              required
            />
          </div>

          {/* Password */}
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  const value = e.target.value;
                  const allowed = /^[a-zA-Z0-9_@]*$/;
                  if (allowed.test(value)) {
                    setPassword(value);
                  }
                }}
                required
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black dark:hover:text-white"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="animate-spin w-4 h-4" />
                Logging in...
              </div>
            ) : (
              "Login"
            )}
          </Button>
        </div>

        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <a href="/signup" className="underline underline-offset-4">
            Sign up
          </a>
        </div>
      </form>
      <div className="absolute right-1 top-[53%]">
        <ForgotPasswordDialog />
      </div>
    </div>
  );
}
