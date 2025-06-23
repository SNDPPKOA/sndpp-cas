// "use client";

// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useRouter } from "next/navigation";
// import { useState } from "react";

// export function SignUpForm({
//   className,
//   ...props
// }: React.ComponentPropsWithoutRef<"form">) {
//   const router = useRouter();

//   const [form, setForm] = useState({
//     firstName: "",
//     lastName: "",
//     address: "",
//     birthday: "",
//     username: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [confirmPassword] = useState("");
//   const [, setError] = useState("");
//   const [password] = useState("");

//   const handleNext = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       alert("Passwords do not match");
//       return;
//     }
//     localStorage.setItem("signupData", JSON.stringify(form));
//     router.push("/signup2");

//     setError("");
//     // Proceed with signup logic (e.g., save to Firebase or Firestore)
//     console.log("Passwords match, submit the form!");
//   };

//   return (
//     <form
//       className={cn("flex flex-col justify-center gap-6 ", className)}
//       {...props}
//       onSubmit={handleNext}
//     >
//       <div className="flex flex-col items-center gap-2 text-center">
//         <h1 className="text-2xl text-muted-foreground font-bold">
//           CREATE YOUR ACCOUNT
//         </h1>
//         <p className="text-xl  font-semibold">Personal Information</p>
//       </div>

//       <div className="flex justify-between items-center gap-1">
//         <div className="bg-[#972D06] flex-1 min-w-[80px]   h-[10px] rounded"></div>
//         <div className="bg-[#FEFEFE] flex-1 min-w-[80px]   h-[10px] rounded"></div>
//         <div className="bg-[#FEFEFE] flex-1 min-w-[80px]   h-[10px] rounded"></div>
//       </div>

//       <div className="grid gap-6">
//         <div className="grid gap-2">
//           <Label htmlFor="firstName">First Name</Label>
//           <Input
//             id="firstName"
//             type="text"
//             placeholder="Juan-Example"
//             value={form.firstName}
//             onChange={(e) => setForm({ ...form, firstName: e.target.value })}
//             required
//           />
//         </div>

//         <div className="grid gap-2">
//           <Label htmlFor="lastName">Last Name</Label>
//           <Input
//             id="lastName"
//             type="text"
//             placeholder="Dela Cruz-Example"
//             required
//             value={form.lastName}
//             onChange={(e) => setForm({ ...form, lastName: e.target.value })}
//           />
//         </div>

//         <div className="grid gap-2">
//           <Label htmlFor="address">Address</Label>
//           <Input
//             id="address"
//             type="text"
//             placeholder="Sitio Tabing Ilog"
//             required
//             value={form.address}
//             onChange={(e) => setForm({ ...form, address: e.target.value })}
//           />
//         </div>

//         <div className="grid gap-2">
//           <label
//             htmlFor="baptism"
//             className="text-sm font-medium text-gray-700 dark:text-white"
//           >
//             Birthday
//           </label>
//           <input
//             type="date"
//             id="birthday"
//             name="birthday"
//             required
//             className="border border-gray-300 dark:border-gray-600 rounded-md p-2 text-sm  dark:text-white"
//             value={form.birthday}
//             onChange={(e) => setForm({ ...form, birthday: e.target.value })}
//           />
//         </div>

//         <div className="grid gap-2">
//           <Label htmlFor="username">Username</Label>
//           <Input
//             id="username"
//             type="text"
//             placeholder="Bretman-Example"
//             required
//             value={form.username}
//             onChange={(e) => setForm({ ...form, username: e.target.value })}
//           />
//         </div>

//         <div className="grid gap-2">
//           <div className="flex items-center">
//             <Label htmlFor="password">Password</Label>
//           </div>
//           <Input
//             id="password"
//             value={form.password}
//             type="password"
//             required
//             onChange={(e) => setForm({ ...form, password: e.target.value })}
//           />
//         </div>

//         <div className="grid gap-2">
//           <div className="flex items-center">
//             <Label htmlFor="confirmPassword">Confirm Password</Label>
//           </div>
//           <Input
//             id="confirmPassword"
//             value={form.confirmPassword}
//             type="password"
//             required
//             onChange={(e) =>
//               setForm({ ...form, confirmPassword: e.target.value })
//             }
//           />
//         </div>

//         <Button type="submit" className="w-full">
//           Next
//         </Button>
//       </div>
//       <div className="text-center text-sm">
//         Already have an account?
//         <a href="/" className="underline underline-offset-4">
//           Sign in
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
import { useRouter } from "next/navigation";
import { useState } from "react";
import bcrypt from "bcryptjs";
import { Eye, EyeOff } from "lucide-react";

function sanitizeInput(str: string) {
  return str.replace(/[<>]/g, "").trim();
}

function isAlphaSpace(str: string) {
  return /^[A-Za-z\s]*$/.test(str);
}

function isAddressSafe(str: string) {
  return /^[A-Za-z0-9\s,.-]*$/.test(str);
}

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    birthday: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (field: keyof typeof form, value: string) => {
    const trimmedStart = value.trimStart();

    if (
      (field === "firstName" || field === "lastName") &&
      !isAlphaSpace(trimmedStart)
    )
      return;
    if (field === "address" && !isAddressSafe(trimmedStart)) return;

    if (
      field === "username" ||
      field === "password" ||
      field === "confirmPassword"
    ) {
      if (/[<>]/.test(trimmedStart)) return; // ❌ Block < >
      if (!/^[A-Za-z0-9_@]*$/.test(trimmedStart)) return; // ❌ Block anything not letter, number, _ or @
    }

    setForm((prev) => ({ ...prev, [field]: trimmedStart }));
  };

  const handleBlur = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value.trim() }));
  };

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();

    const sanitized = {
      firstName: sanitizeInput(form.firstName),
      lastName: sanitizeInput(form.lastName),
      address: sanitizeInput(form.address),
      birthday: form.birthday.trim(),
      username: sanitizeInput(form.username),
      password: form.password.trim(),
      confirmPassword: form.confirmPassword.trim(),
    };

    if (sanitized.password !== sanitized.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const hashedPassword = await bcrypt.hash(sanitized.password, 10);

    const finalData = {
      firstName: sanitized.firstName,
      lastName: sanitized.lastName,
      address: sanitized.address,
      birthday: sanitized.birthday,
      username: sanitized.username,
      password: hashedPassword,
    };

    localStorage.setItem("signupData", JSON.stringify(finalData));
    router.push("/signup2");
    setError("");
  };

  return (
    <form
      className={cn("flex flex-col justify-center gap-6", className)}
      {...props}
      onSubmit={handleNext}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl text-muted-foreground font-bold">
          CREATE YOUR ACCOUNT
        </h1>
        <p className="text-xl font-semibold">Personal Information</p>
      </div>

      <div className="flex justify-between items-center gap-1">
        <div className="bg-[#972D06] flex-1 min-w-[80px] h-[10px] rounded"></div>
        <div className="bg-[#FEFEFE] flex-1 min-w-[80px] h-[10px] rounded"></div>
        <div className="bg-[#FEFEFE] flex-1 min-w-[80px] h-[10px] rounded"></div>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            type="text"
            placeholder="Juan Dela Cruz"
            value={form.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            onBlur={(e) => handleBlur("firstName", e.target.value)}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            type="text"
            placeholder="Dela Cruz"
            value={form.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            onBlur={(e) => handleBlur("lastName", e.target.value)}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            type="text"
            placeholder="Sitio Tabing Ilog"
            value={form.address}
            onChange={(e) => handleChange("address", e.target.value)}
            onBlur={(e) => handleBlur("address", e.target.value)}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="birthday">Birthday</Label>
          <Input
            type="date"
            id="birthday"
            name="birthday"
            value={form.birthday}
            onChange={(e) => handleChange("birthday", e.target.value)}
            onBlur={(e) => handleBlur("birthday", e.target.value)}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            placeholder="Bretman"
            value={form.username}
            onChange={(e) => handleChange("username", e.target.value)}
            onBlur={(e) => handleBlur("username", e.target.value)}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={(e) => handleChange("password", e.target.value)}
              required
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

        <div className="grid gap-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              value={form.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              required
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

        <Button type="submit" className="w-full">
          Next
        </Button>
      </div>

      <div className="text-center text-sm">
        Already have an account?{" "}
        <a href="/" className="underline underline-offset-4">
          Sign in
        </a>
      </div>
    </form>
  );
}
