// "use client";

// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { db } from "@/lib/firebase"
// import { collection, addDoc } from "firebase/firestore"
// import { useRouter } from 'next/navigation'
// import { useEffect, useState } from "react";

// export function SignUpForm3({
//   className,
//   ...props
// }: React.ComponentPropsWithoutRef<"form">) {

//   const router = useRouter()
//    const [form, setForm] = useState({
//     parentFirstName: "",
//     parentLastName: "",
//     contactNumber: "",
//     fbName: ""

//  })

//  useEffect(() => {
//   const saved = JSON.parse(localStorage.getItem("signupData") || "{}");
//   setForm((prev) => ({ ...prev, ...saved }));
// }, []);

// const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//   e.preventDefault();
//     const prevData = JSON.parse(localStorage.getItem("signupData") || "{}")
//     const KOAdata = { ...prevData, ...form }

//     console.log(KOAdata)

//     try {
//       await addDoc(collection(db, "users"), KOAdata)

//       alert("Signup successful!")

//       localStorage.removeItem("signupData")
//       router.push("/")

//     } catch (error) {
//       alert("Error submitting data")
//       console.error(error)
//     }
//  }

//   return (
//     <form className={cn("flex flex-col justify-center gap-6 ", className)} {...props} onSubmit={handleSubmit}>
//       <div className="flex flex-col items-center gap-2 text-center">
//         <h1 className="text-2xl text-muted-foreground font-bold">CREATE YOUR ACCOUNT</h1>
//         <p className="text-xl  font-semibold">
//           Parent/Guardian Informations
//         </p>
//       </div>
//       <div className="flex justify-between items-center ">
//         <div className="bg-[#972D06] flex-1 min-w-[80px]   h-[10px] rounded"></div>
//         <div className="bg-[#972D06] flex-1 min-w-[80px]   h-[10px] rounded"></div>
//         <div className="bg-[#972D06] flex-1 min-w-[80px]   h-[10px] rounded"></div>
//       </div>

//       <div className="grid gap-6">
//         <div className="grid gap-2">
//             <Label htmlFor="firstName">First Name</Label>
//             <Input id="parentFirstName" type="text" placeholder="Juan-Example" required value={form.parentFirstName} onChange={e => setForm({...form, parentFirstName: e.target.value})} />
//         </div>

//         <div className="grid gap-2">
//             <Label htmlFor="lastName">Last Name</Label>
//             <Input id="lastName" type="text" placeholder="Dela Cruz-Example" required value={form.parentLastName}  onChange={e => setForm({...form, parentLastName: e.target.value})}/>
//         </div>

//         <div className="grid gap-2">
//             <Label htmlFor="contactNumber">Contact Number</Label>
//             <Input id="contactNumber" type="number" placeholder="09---" required value={form.contactNumber}  onChange={e => setForm({...form, contactNumber: e.target.value})}/>
//         </div>

//         <div className="grid gap-2">
//             <Label htmlFor="fbName">Name on Facebook</Label>
//             <Input id="fbName" type="text" placeholder="Dela Cruz-Example" required value={form.fbName}  onChange={e => setForm({...form, fbName: e.target.value})}/>
//         </div>

//         <Button type="submit" className="w-full">
//           Sumbit
//         </Button>
//       </div>
//       <div className="text-center text-sm">
//         Don&apos;t have an account?{" "}
//         <a href="./login" className="underline underline-offset-4">
//           Sign up
//         </a>
//       </div>
//     </form>
//   )
// }

"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Link } from "lucide-react";

// Utility functions
const sanitizeText = (str: string) => str.replace(/[<>]/g, "").trim();
const isAlphaSpace = (str: string) => /^[A-Za-z\s]*$/.test(str);
const isValidContact = (str: string) => /^[0-9]{10,11}$/.test(str); // adjust as needed

export function SignUpForm3({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const router = useRouter();
  const [form, setForm] = useState({
    parentFirstName: "",
    parentLastName: "",
    contactNumber: "",
    fbName: "",
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("signupData") || "{}");
    setForm((prev) => ({ ...prev, ...saved }));
  }, []);

  const handleChange = (field: keyof typeof form, value: string) => {
    const sanitized = value.trimStart();

    if (
      (field === "parentFirstName" || field === "parentLastName") &&
      !isAlphaSpace(sanitized)
    )
      return;
    if (field === "contactNumber" && !/^\d*$/.test(sanitized)) return;
    if (field === "fbName" && /[<>]/.test(sanitized)) return;

    setForm((prev) => ({ ...prev, [field]: sanitized }));
  };

  const handleBlur = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: sanitizeText(value) }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic phone validation
    if (!isValidContact(form.contactNumber)) {
      alert("Please enter a valid contact number (10–11 digits).");
      return;
    }

    const prevData = JSON.parse(localStorage.getItem("signupData") || "{}");
    const finalData = {
      ...prevData,
      parentFirstName: sanitizeText(form.parentFirstName),
      parentLastName: sanitizeText(form.parentLastName),
      contactNumber: form.contactNumber.trim(),
      fbName: sanitizeText(form.fbName),
    };

    try {
      await addDoc(collection(db, "users"), finalData);
      alert("Signup successful!");
      localStorage.removeItem("signupData");
      router.push("/");
    } catch (error) {
      alert("Error submitting data");
      console.error(error);
    }
  };

  return (
    <form
      className={cn("flex flex-col justify-center gap-6", className)}
      {...props}
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl text-muted-foreground font-bold">
          CREATE YOUR ACCOUNT
        </h1>
        <p className="text-xl font-semibold">Parent/Guardian Information</p>
      </div>

      <div className="flex justify-between items-center">
        <div className="bg-[#972D06] flex-1 min-w-[80px] h-[10px] rounded"></div>
        <div className="bg-[#972D06] flex-1 min-w-[80px] h-[10px] rounded"></div>
        <div className="bg-[#972D06] flex-1 min-w-[80px] h-[10px] rounded"></div>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="parentFirstName">First Name</Label>
          <Input
            id="parentFirstName"
            type="text"
            placeholder="Juan"
            value={form.parentFirstName}
            onChange={(e) => handleChange("parentFirstName", e.target.value)}
            onBlur={(e) => handleBlur("parentFirstName", e.target.value)}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="parentLastName">Last Name</Label>
          <Input
            id="parentLastName"
            type="text"
            placeholder="Dela Cruz"
            value={form.parentLastName}
            onChange={(e) => handleChange("parentLastName", e.target.value)}
            onBlur={(e) => handleBlur("parentLastName", e.target.value)}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="contactNumber">Contact Number</Label>
          <Input
            id="contactNumber"
            type="text"
            inputMode="numeric"
            placeholder="09123456789"
            value={form.contactNumber}
            onChange={(e) => handleChange("contactNumber", e.target.value)}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="fbName">Name on Facebook</Label>
          <Input
            id="fbName"
            type="text"
            placeholder="Juan Dela Cruz"
            value={form.fbName}
            onChange={(e) => handleChange("fbName", e.target.value)}
            onBlur={(e) => handleBlur("fbName", e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col-reverse sm:flex-row justify-between gap-4">
          <Button
            className="flex-1 bg-[#972D06] text-[#FEFEFE]"
            onClick={() => router.back()}
          >
            Back
          </Button>

          <Button type="submit" className="flex-1   ">
            Submit
          </Button>
        </div>
      </div>

      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/" className="underline underline-offset-4">
          Log in
        </Link>
      </div>
    </form>
  );
}
