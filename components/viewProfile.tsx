"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { BackMember } from "./ui/back-to-member";
import { Card } from "./ui/card"; // Adjust path if needed
import { Button } from "./ui/button";

type User = {
  firstName: string;
  lastName: string;
  memberStatus: string;
  birthday?: string; // ISO date string
  monthJoin?: string; // Assuming "1" for January, etc.
  yearJoin?: string;
  baptism?: string;
  communion?: string;
  kumpil?: string;
  liturgicalObj?: string | string[];
  parentFirstName?: string;
  parentLastName?: string;
  contactNumber?: string;
  fbName?: string;
};

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function calculateAge(birthdayString: string): number {
  const birthDate = new Date(birthdayString);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}

function calculateJoinDuration(
  yearJoin?: string,
  monthJoin?: string
): string | null {
  if (!yearJoin || !monthJoin) return null;

  const joinYear = Number(yearJoin);
  const joinMonth = Number(monthJoin) - 1; // zero-based month
  const now = new Date();

  let years = now.getFullYear() - joinYear;
  let months = now.getMonth() - joinMonth;

  if (months < 0) {
    years--;
    months += 12;
  }

  let duration = "";
  if (years > 0) duration += `${years} year${years > 1 ? "s" : ""}`;
  if (months > 0)
    duration +=
      (duration ? ", " : "") + `${months} month${months > 1 ? "s" : ""}`;
  if (!duration) duration = "Less than a month";

  return duration;
}

export default function ViewProfilePage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const joinDuration = calculateJoinDuration(user?.yearJoin, user?.monthJoin);

  const allLiturgicalObjects = [
    { name: "Thurible and Boat", image: "/thuribleBoat.jpg" },
    { name: "Crucifix", image: "/crucifix.jpg" },
    { name: "Candles", image: "/candles.jpg" },
    { name: "Sanctus Bell", image: "/sanctus.jpg" },
    { name: "Solo Bell", image: "/soloBell.png" },
    { name: "Sanctuary Bell", image: "/sanctuaryBell.png" },
    { name: "Rotating Bell", image: "/rotatingBell.jpg" },
    { name: "Kampanaryo", image: "/kampanaryo.jpg" },
  ];

  // Convert liturgicalObj to array safely
  const userLiturgicalObjects = user?.liturgicalObj
    ? Array.isArray(user.liturgicalObj)
      ? user.liturgicalObj
      : user.liturgicalObj.split(",").map((item) => item.trim())
    : [];

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <BackMember />
      </div>

      <div className="flex flex-col gap-6">
        {/* Profile Header */}
        <Card className="w-full flex flex-col sm:flex-row items-center sm:items-start gap-6 p-4">
          <div className="flex flex-col justify-center items-center">
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 flex-shrink-0">
              <Image
                className="rounded-full object-cover"
                src="/defaultProfile.png"
                alt="Profile picture"
                fill
                priority
              />
            </div>
            <Button>Change Photo</Button>
          </div>

          <div className="text-center sm:text-left flex-1">
            <h1 className="text-3xl font-bold mb-3">
              {user ? `${user.firstName} ${user.lastName}` : "Loading..."}
            </h1>

            <p className="font-semibold">
              Birthday:{" "}
              {user?.birthday
                ? new Date(user.birthday).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "Not available"}
            </p>

            <p className="font-semibold">
              Age:{" "}
              {user?.birthday ? calculateAge(user.birthday) : "Not available"}
            </p>

            <p className="font-semibold">
              Status: {user?.memberStatus || "Not available"}
            </p>
          </div>
        </Card>

        {/* Details Section */}
        <div className="flex flex-col sm:flex-row gap-6">
          <Card className="w-full sm:w-1/2 flex flex-col p-6 space-y-4">
            <div className="flex justify-between">
              <p className="font-bold">Date of Join:</p>
              <p>
                {user?.monthJoin ? monthNames[Number(user.monthJoin) - 1] : ""}{" "}
                {user?.yearJoin || ""}
              </p>
            </div>

            <div className="flex justify-between">
              <p className="font-bold">Status:</p>
              <p>{user?.memberStatus || "Not available"}</p>
            </div>

            <div className="flex justify-between">
              <p className="font-bold">Member for:</p>
              <p>{joinDuration || "Not available"}</p>
            </div>

            <div className="flex justify-between">
              <p className="font-bold">Baptism:</p>
              <p>{user?.baptism || "Not available"}</p>
            </div>

            <div className="flex justify-between">
              <p className="font-bold">First Communion:</p>
              <p>{user?.communion || "Not available"}</p>
            </div>

            <div className="flex justify-between">
              <p className="font-bold">Kumpil:</p>
              <p>{user?.kumpil || "Not available"}</p>
            </div>
          </Card>

          <Card className="w-full sm:w-1/2 p-6">
            <h2 className="text-2xl font-bold mb-8">
              Parent/Guardian Information
            </h2>

            <div className="flex justify-between mb-4">
              <p className="font-bold">Parent Name:</p>
              <p>
                {user?.parentFirstName || "Not available"}{" "}
                {user?.parentLastName || ""}
              </p>
            </div>

            <div className="flex justify-between mb-4">
              <p className="font-bold">Contact #:</p>
              <p>{user?.contactNumber || "Not available"}</p>
            </div>

            <div className="flex justify-between">
              <p className="font-bold">FB Name:</p>
              <p>{user?.fbName || "Not available"}</p>
            </div>
          </Card>
        </div>

        {/* Liturgical Objects */}
        {userLiturgicalObjects.length > 0 && (
          <>
            <h2 className="text-2xl font-bold mt-8 mb-4">Liturgical Objects</h2>
            <div className="flex flex-wrap gap-6 justify-center sm:justify-start">
              {allLiturgicalObjects
                .filter((obj) => userLiturgicalObjects.includes(obj.name))
                .map((obj, index) => (
                  <Card
                    key={index}
                    className="flex flex-col items-center w-full sm:w-[48%] lg:w-[30%] p-4 rounded"
                  >
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32">
                      <Image
                        src={obj.image}
                        alt={obj.name}
                        fill
                        className="rounded-t-lg object-cover"
                      />
                    </div>
                    <p className="mt-4 text-center">{obj.name}</p>
                  </Card>
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// "use client";

// import { useEffect, useState, useRef } from "react"; // Import useRef
// import Image from "next/image";
// import { BackMember } from "./ui/back-to-member";
// import { Card } from "./ui/card";
// import { storage, db } from "@/lib/firebase";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { doc, updateDoc } from "firebase/firestore";
// import { v4 as uuidv4 } from "uuid";

// type User = {
//   uid: string;
//   firstName: string;
//   lastName: string;
//   memberStatus: string;
//   birthday?: string;
//   monthJoin?: string;
//   yearJoin?: string;
//   baptism?: string;
//   communion?: string;
//   kumpil?: string;
//   liturgicalObj?: string | string[];
//   parentFirstName?: string;
//   parentLastName?: string;
//   contactNumber?: string;
//   fbName?: string;
//   profileImageUrl?: string;
// };

// const monthNames = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ];

// function calculateAge(birthdayString: string): number {
//   const birthDate = new Date(birthdayString);
//   const today = new Date();
//   let age = today.getFullYear() - birthDate.getFullYear();
//   const monthDiff = today.getMonth() - birthDate.getMonth();
//   if (
//     monthDiff < 0 ||
//     (monthDiff === 0 && today.getDate() < birthDate.getDate())
//   )
//     age--;
//   return age;
// }

// function calculateJoinDuration(
//   yearJoin?: string,
//   monthJoin?: string
// ): string | null {
//   if (!yearJoin || !monthJoin) return null;
//   const joinYear = Number(yearJoin);
//   const joinMonth = Number(monthJoin) - 1;
//   const now = new Date();
//   let years = now.getFullYear() - joinYear;
//   let months = now.getMonth() - joinMonth;
//   if (months < 0) {
//     years--;
//     months += 12;
//   }
//   let duration = "";
//   if (years > 0) duration += `${years} year${years > 1 ? "s" : ""}`;
//   if (months > 0)
//     duration +=
//       (duration ? ", " : "") + `${months} month${months > 1 ? "s" : ""}`;
//   return duration || "Less than a month";
// }

// export default function ViewProfilePage() {
//   const [user, setUser] = useState<User | null>(null);
//   const [profileImage, setProfileImage] = useState<string | null>(null);
//   const [uploading, setUploading] = useState(false);

//   // Create a ref for the file input
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   const joinDuration = calculateJoinDuration(user?.yearJoin, user?.monthJoin);

//   const allLiturgicalObjects = [
//     { name: "Thurible and Boat", image: "/thuribleBoat.jpg" },
//     { name: "Crucifix", image: "/crucifix.jpg" },
//     { name: "Candles", image: "/candles.jpg" },
//     { name: "Sanctus Bell", image: "/sanctus.jpg" },
//     { name: "Solo Bell", image: "/soloBell.png" },
//     { name: "Sanctuary Bell", image: "/sanctuaryBell.png" },
//     { name: "Rotating Bell", image: "/rotatingBell.jpg" },
//     { name: "Kampanaryo", image: "/kampanaryo.jpg" },
//   ];

//   const userLiturgicalObjects = user?.liturgicalObj
//     ? Array.isArray(user.liturgicalObj)
//       ? user.liturgicalObj
//       : user.liturgicalObj.split(",").map((item) => item.trim())
//     : [];
//   const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];

//     // --- Start Debugging Logs ---
//     console.log("handleImageChange triggered.");
//     console.log("File:", file);
//     console.log("User state:", user);
//     console.log("User UID:", user?.uid);
//     // --- End Debugging Logs ---

//     if (!file) {
//       console.error("Error: No file was selected.");
//       alert("Please select an image file to upload.");
//       return;
//     }

//     if (!user) {
//       console.error("Error: User object is missing from state.");
//       alert("User data not loaded. Please try again or refresh the page.");
//       return;
//     }

//     if (!user.uid) {
//       console.error("Error: User UID is missing from the user object.");
//       alert("User ID is missing. Please contact support.");
//       return;
//     }

//     // --- Previous validations (file type and size)
//     if (!file.type.startsWith("image/")) {
//       alert("Only image files are allowed.");
//       return;
//     }

//     if (file.size > 2 * 1024 * 1024) {
//       alert("Max file size is 2MB.");
//       return;
//     }
//     // --- End previous validations

//     const fileName = `${user.uid}-${uuidv4()}`;
//     const fileRef = ref(storage, `profilePictures/${fileName}`);

//     setUploading(true);

//     try {
//       await uploadBytes(fileRef, file);
//       const downloadURL = await getDownloadURL(fileRef);
//       setProfileImage(downloadURL);

//       const userDocRef = doc(db, "users", user.uid);
//       await updateDoc(userDocRef, { profileImageUrl: downloadURL });

//       const updatedUser = { ...user, profileImageUrl: downloadURL };
//       localStorage.setItem("user", JSON.stringify(updatedUser));
//       setUser(updatedUser);
//     } catch (error) {
//       console.error("Upload failed", error);
//       alert(
//         "Image upload failed. Please check your internet connection or try again later."
//       );
//     } finally {
//       setUploading(false);
//     }
//   };

//   // Function to trigger the file input click
//   const handleButtonClick = () => {
//     fileInputRef.current?.click();
//   };

//   return (
//     <div className="p-4 sm:p-6 max-w-7xl mx-auto">
//       <div className="mb-6">
//         <BackMember />
//       </div>
//       <div className="flex flex-col gap-6">
//         <Card className="w-full flex flex-col sm:flex-row items-center gap-6 p-4">
//           <div className="flex flex-col items-center">
//             <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40">
//               <Image
//                 className="rounded-full object-cover"
//                 src={
//                   profileImage || user?.profileImageUrl || "/defaultProfile.png"
//                 }
//                 alt="Profile picture"
//                 fill
//                 priority
//                 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//               />
//             </div>
//             {/* Hidden file input */}
//             <input
//               type="file"
//               accept="image/*"
//               className="hidden" // Hide the input
//               onChange={handleImageChange}
//               disabled={uploading}
//               ref={fileInputRef} // Assign the ref
//             />
//             {/* Custom button to trigger file input */}
//             <button
//               onClick={handleButtonClick}
//               disabled={uploading}
//               className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
//             >
//               {uploading ? "Uploading..." : "Change Profile Picture"}
//             </button>
//             {uploading && (
//               <p className="text-sm text-gray-500 mt-1">Uploading...</p>
//             )}
//           </div>

//           <div className="text-center sm:text-left flex-1">
//             <h1 className="text-3xl font-bold mb-3">
//               {user ? `${user.firstName} ${user.lastName}` : "Loading..."}
//             </h1>
//             <p className="font-semibold">
//               Birthday:{" "}
//               {user?.birthday
//                 ? new Date(user.birthday).toLocaleDateString("en-US", {
//                     year: "numeric",
//                     month: "long",
//                     day: "numeric",
//                   })
//                 : "Not available"}
//             </p>
//             <p className="font-semibold">
//               Age:{" "}
//               {user?.birthday ? calculateAge(user.birthday) : "Not available"}
//             </p>
//             <p className="font-semibold">
//               Status: {user?.memberStatus || "Not available"}
//             </p>
//           </div>
//         </Card>

//         <div className="flex flex-col sm:flex-row gap-6">
//           <Card className="w-full sm:w-1/2 flex flex-col p-6 space-y-4">
//             <div className="flex justify-between">
//               <p className="font-bold">Date of Join:</p>
//               <p>
//                 {user?.monthJoin ? monthNames[Number(user.monthJoin) - 1] : ""}{" "}
//                 {user?.yearJoin || ""}
//               </p>
//             </div>
//             <div className="flex justify-between">
//               <p className="font-bold">Status:</p>
//               <p>{user?.memberStatus || "Not available"}</p>
//             </div>
//             <div className="flex justify-between">
//               <p className="font-bold">Member for:</p>
//               <p>{joinDuration || "Not available"}</p>
//             </div>
//             <div className="flex justify-between">
//               <p className="font-bold">Baptism:</p>
//               <p>{user?.baptism || "Not available"}</p>
//             </div>
//             <div className="flex justify-between">
//               <p className="font-bold">First Communion:</p>
//               <p>{user?.communion || "Not available"}</p>
//             </div>
//             <div className="flex justify-between">
//               <p className="font-bold">Kumpil:</p>
//               <p>{user?.kumpil || "Not available"}</p>
//             </div>
//           </Card>

//           <Card className="w-full sm:w-1/2 p-6">
//             <h2 className="text-2xl font-bold mb-8">
//               Parent/Guardian Information
//             </h2>
//             <div className="flex justify-between mb-4">
//               <p className="font-bold">Parent Name:</p>
//               <p>
//                 {user?.parentFirstName || "Not available"}{" "}
//                 {user?.parentLastName || ""}
//               </p>
//             </div>
//             <div className="flex justify-between mb-4">
//               <p className="font-bold">Contact #:</p>
//               <p>{user?.contactNumber || "Not available"}</p>
//             </div>
//             <div className="flex justify-between">
//               <p className="font-bold">FB Name:</p>
//               <p>{user?.fbName || "Not available"}</p>
//             </div>
//           </Card>
//         </div>

//         {userLiturgicalObjects.length > 0 && (
//           <>
//             <h2 className="text-2xl font-bold mt-8 mb-4">Liturgical Objects</h2>
//             <div className="flex flex-wrap gap-6 justify-center sm:justify-start">
//               {allLiturgicalObjects
//                 .filter((obj) => userLiturgicalObjects.includes(obj.name))
//                 .map((obj, index) => (
//                   <Card
//                     key={index}
//                     className="flex flex-col items-center w-full sm:w-[48%] lg:w-[30%] p-4 rounded"
//                   >
//                     <div className="relative w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32">
//                       <Image
//                         src={obj.image}
//                         alt={obj.name}
//                         fill
//                         className="rounded-t-lg object-cover"
//                         sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
//                       />
//                     </div>
//                     <p className="mt-4 text-center">{obj.name}</p>
//                   </Card>
//                 ))}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }
