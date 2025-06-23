// "use client";

// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { collection, getDocs, query, where } from "firebase/firestore";
// import { db } from "@/lib/firebase";

// export function LoginForm({
//   className,
//   ...props
// }: React.ComponentPropsWithoutRef<"form">) {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();
//   const [error, setError] = useState(""); // This 'error' state is not currently used to display errors to the user. Consider adding an error message display.

//   const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     // 1. Check for bypassed user first
//     if (username === "Attendance" && password === "OfficersOnly2025") {
//       //  document.cookie = "authToken=officer-token; path=/";

//       // Save data manually
//       localStorage.setItem(
//         "user",
//         // IMPORTANT: Add 'uid' for bypassed users too if they need a profile page
//         JSON.stringify({
//           uid: "officer-attendance-uid",
//           username: "Attendance",
//           role: "officer",
//         })
//       );
//       router.push("/attendanceOfficers");
//       return;
//     } else if (username === "Admin" && password === "AdminLangPo2025") {
//       // Save data manually
//       // document.cookie = "authToken=admin-token; path=/";
//       localStorage.setItem(
//         "user",
//         // IMPORTANT: Add 'uid' for bypassed users too if they need a profile page
//         JSON.stringify({ uid: "admin-uid", username: "Admin", role: "admin" }) // Assuming a unique UID for admin
//       );
//       router.push("/dashboard");
//       return;
//     }

//     // 2. Proceed with normal Firebase auth for others
//     try {
//       const usersRef = collection(db, "users");
//       const q = query(
//         usersRef,
//         where("username", "==", username),
//         where("password", "==", password)
//       );
//       const querySnapshot = await getDocs(q);

//       // if (!querySnapshot.empty) {
//       //   // Get the document data
//       //   const docData = querySnapshot.docs[0].data();
//       //   // Get the document ID (this is your 'uid')
//       //   const docId = querySnapshot.docs[0].id;

//       //   // Combine the document data with its ID to form the complete user object
//       //   const userWithUid = { ...docData, uid: docId }; // <--- HERE'S THE CRITICAL CHANGE

//       //   localStorage.setItem("user", JSON.stringify(userWithUid)); // <--- Save the complete object
//       //   router.push("/dashboardUsers");
//       // }
//       //

//       if (!querySnapshot.empty) {
//         const docData = querySnapshot.docs[0].data();
//         const docId = querySnapshot.docs[0].id;
//         const userWithUid = { ...docData, uid: docId };

//         document.cookie = "authToken=user-token; path=/"; // ✅ set cookie for middleware
//         localStorage.setItem("user", JSON.stringify(userWithUid));
//         router.push("/dashboardUsers");
//       } else {
//         setError("Invalid username or password."); // Set error for display
//         alert("Invalid username or password."); // Keep alert for immediate feedback
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//       setError("Something went wrong. Please try again."); // Set error for display
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
//             placeholder="Bretman-Example"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
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
//           <Input
//             id="password"
//             type="password"
//             required
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>

//         {error && ( // Display error message if present
//           <p className="text-red-500 text-sm text-center">{error}</p>
//         )}

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
// // }




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

//     // 1. Officer Bypass
//     if (username === "Attendance" && password === "OfficersOnly2025") {
//       document.cookie = "authToken=officer-token; path=/"; // ✅ Add cookie for officer
//       localStorage.setItem(
//         "user",
//         JSON.stringify({
//           uid: "officer-attendance-uid",
//           username: "Attendance",
//           role: "officer",
//         })
//       );
//       // router.push("/attendanceOfficers");
//       window.location.href = "/attendanceOfficers";
//       return;
//     }

//     // 2. Admin Bypass
//     if (username === "Admin" && password === "AdminLangPo2025") {
//       console.log("✅ Officer login matched");
//       document.cookie = "authToken=admin-token; path=/"; // ✅ Add cookie for admin
//       localStorage.setItem(
//         "user",
//         JSON.stringify({
//           uid: "admin-uid",
//           username: "Admin",
//           role: "admin",
//         })
//       );
//       // router.push("/dashboard");
//       window.location.href = "/dashboard"; // or /dashboard or /attendanceOfficers
//       return;
//     }

//     // 3. Normal user login via Firebase
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

//         document.cookie = "authToken=user-token; path=/"; // ✅ Cookie for regular users
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
//             placeholder="Bretman-Example"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
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
//               onChange={(e) => setPassword(e.target.value)}
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
//           {/* <Input
//             id="password"
//             type="password"
//             required
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           /> */}
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

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Eye, EyeOff } from "lucide-react";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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

    // Firebase user login
    try {
      const usersRef = collection(db, "users");
      const q = query(
        usersRef,
        where("username", "==", username),
        where("password", "==", password)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docData = querySnapshot.docs[0].data();
        const docId = querySnapshot.docs[0].id;
        const userWithUid = { ...docData, uid: docId };

        document.cookie = "authToken=user-token; path=/";
        localStorage.setItem("user", JSON.stringify(userWithUid));
        window.location.href = "/dashboardUsers";
      } else {
        setError("Invalid username or password.");
        alert("Invalid username or password.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleLogin}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your Username below to login to your account
        </p>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            placeholder="YourUsername_123@"
            value={username}
            onChange={(e) => {
              const value = e.target.value;
              const allowed = /^[a-zA-Z0-9@_]*$/;
              if (allowed.test(value)) {
                setUsername(value);
              }
            }}
            required
          />
        </div>

        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <Button type="submit" className="w-full">
          Login
        </Button>
      </div>

      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="./signup" className="underline underline-offset-4">
          Sign up
        </a>
      </div>
    </form>
  );
}
