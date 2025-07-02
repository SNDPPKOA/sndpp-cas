// "use client";

// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { db } from "@/lib/firebase";
// import { collection, addDoc } from "firebase/firestore";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { query, where, getDocs } from "firebase/firestore";

// // Utility functions
// const sanitizeText = (str: string) => str.replace(/[<>]/g, "").trim();
// const isAlphaSpace = (str: string) => /^[A-Za-z\s]*$/.test(str);
// const isValidContact = (str: string) => /^[0-9]{10,11}$/.test(str);

// export function SignUpForm3({
//   className,
//   ...props
// }: React.ComponentPropsWithoutRef<"form">) {
//   const router = useRouter();
//   const [form, setForm] = useState({
//     parentFirstName: "",
//     parentLastName: "",
//     contactNumber: "",
//     fbName: "",
//   });

//   useEffect(() => {
//     const saved = JSON.parse(localStorage.getItem("signupData") || "{}");
//     setForm({
//       parentFirstName: saved.parentFirstName || "",
//       parentLastName: saved.parentLastName || "",
//       contactNumber: saved.contactNumber || "",
//       fbName: saved.fbName || "",
//     });
//   }, []);

//   const updateLocalStorage = (field: string, value: string) => {
//     const existing = JSON.parse(localStorage.getItem("signupData") || "{}");
//     const updated = { ...existing, [field]: value };
//     localStorage.setItem("signupData", JSON.stringify(updated));
//   };

//   const handleChange = (field: keyof typeof form, value: string) => {
//     const sanitized = value.trimStart();

//     if (
//       (field === "parentFirstName" || field === "parentLastName") &&
//       !isAlphaSpace(sanitized)
//     )
//       return;
//     if (field === "contactNumber" && !/^\d*$/.test(sanitized)) return;
//     if (field === "fbName" && /[<>]/.test(sanitized)) return;

//     setForm((prev) => ({ ...prev, [field]: sanitized }));
//     updateLocalStorage(field, sanitized);
//   };

//   const handleBlur = (field: keyof typeof form, value: string) => {
//     const trimmed = sanitizeText(value);
//     setForm((prev) => ({ ...prev, [field]: trimmed }));
//     updateLocalStorage(field, trimmed);
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!isValidContact(form.contactNumber)) {
//       alert("Please enter a valid contact number (10–11 digits).");
//       return;
//     }

//     const prevData = JSON.parse(localStorage.getItem("signupData") || "{}");
//     const finalData = {
//       ...prevData,
//       parentFirstName: sanitizeText(form.parentFirstName),
//       parentLastName: sanitizeText(form.parentLastName),
//       contactNumber: form.contactNumber.trim(),
//       fbName: sanitizeText(form.fbName),
//     };

//     try {
//       await addDoc(collection(db, "users"), finalData);
//       alert("Signup successful!");
//       localStorage.removeItem("signupData");
//       router.push("/");
//     } catch (error) {
//       alert("Error submitting data");
//       console.error(error);
//     }
//   };

//   return (
//     <form
//       className={cn("flex flex-col justify-center gap-6", className)}
//       {...props}
//       onSubmit={handleSubmit}
//     >
//       <div className="flex flex-col items-center gap-2 text-center">
//         <h1 className="text-2xl text-muted-foreground font-bold">
//           CREATE YOUR ACCOUNT
//         </h1>
//         <p className="text-xl font-semibold">Parent/Guardian Information</p>
//       </div>

//       <div className="flex justify-between items-center">
//         <div className="bg-[#972D06] flex-1 min-w-[80px] h-[10px] rounded"></div>
//         <div className="bg-[#972D06] flex-1 min-w-[80px] h-[10px] rounded"></div>
//         <div className="bg-[#972D06] flex-1 min-w-[80px] h-[10px] rounded"></div>
//       </div>

//       <div className="grid gap-6">
//         <div className="grid gap-2">
//           <Label htmlFor="parentFirstName">First Name</Label>
//           <Input
//             id="parentFirstName"
//             type="text"
//             placeholder="Juan"
//             value={form.parentFirstName}
//             onChange={(e) => handleChange("parentFirstName", e.target.value)}
//             onBlur={(e) => handleBlur("parentFirstName", e.target.value)}
//             required
//           />
//         </div>

//         <div className="grid gap-2">
//           <Label htmlFor="parentLastName">Last Name</Label>
//           <Input
//             id="parentLastName"
//             type="text"
//             placeholder="Dela Cruz"
//             value={form.parentLastName}
//             onChange={(e) => handleChange("parentLastName", e.target.value)}
//             onBlur={(e) => handleBlur("parentLastName", e.target.value)}
//             required
//           />
//         </div>

//         <div className="grid gap-2">
//           <Label htmlFor="contactNumber">Contact Number</Label>
//           <Input
//             id="contactNumber"
//             type="text"
//             inputMode="numeric"
//             placeholder="09123456789"
//             value={form.contactNumber}
//             onChange={(e) => handleChange("contactNumber", e.target.value)}
//             onBlur={(e) => handleBlur("contactNumber", e.target.value)}
//             required
//           />
//         </div>

//         <div className="grid gap-2">
//           <Label htmlFor="fbName">Name on Facebook</Label>
//           <Input
//             id="fbName"
//             type="text"
//             placeholder="Juan Dela Cruz"
//             value={form.fbName}
//             onChange={(e) => handleChange("fbName", e.target.value)}
//             onBlur={(e) => handleBlur("fbName", e.target.value)}
//             required
//           />
//         </div>

//         <div className="flex flex-col-reverse sm:flex-row justify-between gap-4">
//           <Button
//             className="flex-1 bg-[#972D06] text-[#FEFEFE]"
//             type="button"
//             onClick={() => router.back()}
//           >
//             Back
//           </Button>
//           <Button type="submit" className="flex-1">
//             Submit
//           </Button>
//         </div>
//       </div>

//       <div className="text-center text-sm">
//         Already have an account?{" "}
//         <Link href="/" className="underline underline-offset-4">
//           Log in
//         </Link>
//       </div>
//     </form>
//   );
// }

"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { db } from "@/lib/firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import MessageModalSuccess from "./modal-2"; // adjust path if needed
import { Loader2 } from "lucide-react";

// Utility functions
const sanitizeText = (str: string) => str.replace(/[<>]/g, "").trim();
const isAlphaSpace = (str: string) => /^[A-Za-z\s]*$/.test(str);
const isValidContact = (str: string) => /^[0-9]{10,11}$/.test(str);

export function SignUpForm3({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const router = useRouter();

  // ✅ Hooks placed inside the component
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    parentFirstName: "",
    parentLastName: "",
    contactNumber: "",
    fbName: "",
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("signupData") || "{}");
    setForm({
      parentFirstName: saved.parentFirstName || "",
      parentLastName: saved.parentLastName || "",
      contactNumber: saved.contactNumber || "",
      fbName: saved.fbName || "",
    });
  }, []);

  const updateLocalStorage = (field: string, value: string) => {
    const existing = JSON.parse(localStorage.getItem("signupData") || "{}");
    const updated = { ...existing, [field]: value };
    localStorage.setItem("signupData", JSON.stringify(updated));
  };

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
    updateLocalStorage(field, sanitized);
  };

  const handleBlur = (field: keyof typeof form, value: string) => {
    const trimmed = sanitizeText(value);
    setForm((prev) => ({ ...prev, [field]: trimmed }));
    updateLocalStorage(field, trimmed);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!isValidContact(form.contactNumber)) {
      alert("Please enter a valid contact number (10–11 digits).");
      setLoading(false);
      return;
    }

    const prevData = JSON.parse(localStorage.getItem("signupData") || "{}");
    const toTitleCase = (str: string) =>
      str
        .toLowerCase()
        .split(" ")
        .filter(Boolean)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    const firstName = toTitleCase(prevData.firstName || "");
    const lastName = toTitleCase(prevData.lastName || "");
    const birthday = prevData.birthday || "";

    if (!firstName || !lastName || !birthday) {
      alert("Missing first name, last name, or birthday from earlier steps.");
      setLoading(false);
      return;
    }

    try {
      const usersRef = collection(db, "users");
      const q = query(
        usersRef,
        where("firstName", "==", firstName),
        where("lastName", "==", lastName),
        where("birthday", "==", birthday)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setModalMessage("You already have an account. Redirecting to login...");
        setShowModal(true);
        return;
      }

      const finalData = {
        ...prevData,
        firstName,
        lastName,
        birthday,
        parentFirstName: sanitizeText(form.parentFirstName),
        parentLastName: sanitizeText(form.parentLastName),
        contactNumber: form.contactNumber.trim(),
        fbName: sanitizeText(form.fbName),
      };

      await addDoc(usersRef, finalData);
      setModalMessage("Signup successful!");
      setShowModal(true);
      localStorage.removeItem("signupData");
    } catch (error) {
      console.error("Error checking or submitting data:", error);
      alert("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div>
      {/* ✅ Modal shown conditionally */}
      {showModal && (
        <MessageModalSuccess
          message={modalMessage}
          onClose={() => {
            setShowModal(false);
            router.push("/"); // adjust path to login/home
          }}
        />
      )}

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
              onBlur={(e) => handleBlur("contactNumber", e.target.value)}
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
              type="button"
              onClick={() => router.back()}
            >
              Back
            </Button>
            <Button type="submit" className="flex-1" disabled={loading}>
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Submitting...
                </div>
              ) : (
                "Submit"
              )}
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
    </div>
  );
}
