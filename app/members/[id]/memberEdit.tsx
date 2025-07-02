// "use client";

// import { useState, useMemo } from "react";
// import { doc, updateDoc, deleteDoc } from "firebase/firestore";
// import { db } from "@/lib/firebase";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { BackMember } from "../../../components/ui/back-to-member";
// import { Card } from "@/components/ui/card";
// import Image from "next/image";
// import { Edit } from "lucide-react";

// import { Label } from "@/components/ui/label";

// // Define an interface for the user prop to provide type safety
// interface User {
//   id: string;
//   firstName: string;
//   lastName: string;
//   address: string;
//   birthday: string;
//   monthJoin: string;
//   yearJoin: string;
//   memberStatus: string;
//   baptism: string;
//   communion: string;
//   kumpil: string;
//   liturgicalObj: string[];
//   parentFirstName: string;
//   parentLastName: string;
//   contactNumber: string;
//   fbName: string;
// }

// export function MemberProfileClient({ user }: { user: User }) {
//   // State for personal information
//   const [firstName, setFirstName] = useState(user.firstName);
//   const [lastName, setLastName] = useState(user.lastName);
//   const [address, setAddress] = useState(user.address);
//   const [birthday, setBirthday] = useState(user.birthday);

//   // State for service information
//   const [monthJoin, setMonthJoin] = useState(user.monthJoin);
//   const [yearJoin, setYearJoin] = useState(user.yearJoin);
//   const [memberStatus, setMemberStatus] = useState(user.memberStatus);
//   const [baptism, setBaptism] = useState(user.baptism);
//   const [communion, setCommunion] = useState(user.communion);
//   const [kumpil, setKumpil] = useState(user.kumpil);
//   const [liturgicalObj, setLiturgicalObj] = useState<string[]>(
//     user.liturgicalObj || []
//   ); // Initialize as array

//   // State for parent/guardian information
//   const [parentFirstName, setParentFirstName] = useState(user.parentFirstName);
//   const [parentLastName, setParentLastName] = useState(user.parentLastName);
//   const [contactNumber, setContactNumber] = useState(user.contactNumber);
//   const [fbName, setFbName] = useState(user.fbName);

//   // Memoized calculation for join duration
//   const joinDuration = useMemo(() => {
//     if (!monthJoin || !yearJoin) return null;

//     const joinDate = new Date(Number(yearJoin), Number(monthJoin) - 1);
//     const now = new Date();

//     const yearsDiff = now.getFullYear() - joinDate.getFullYear();
//     const monthsDiff = now.getMonth() - joinDate.getMonth();

//     const totalMonths = yearsDiff * 12 + monthsDiff;

//     const displayYears = Math.floor(totalMonths / 12);
//     const displayMonths = totalMonths % 12;

//     return `${displayYears} year(s), ${displayMonths} month(s)`;
//   }, [monthJoin, yearJoin]);

//   // Liturgical objects data
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

//   // Month names for display
//   const monthNames = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];

//   // Handler for updating user profile
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const docRef = doc(db, "users", user.id);
//     try {
//       await updateDoc(docRef, {
//         firstName,
//         lastName,
//         address,
//         birthday,
//         monthJoin,
//         yearJoin,
//         memberStatus,
//         baptism,
//         communion,
//         kumpil,
//         liturgicalObj,
//         parentFirstName,
//         parentLastName,
//         contactNumber,
//         fbName,
//       });
//       alert("Profile updated!");
//     } catch (error) {
//       console.error("Error updating document: ", error);
//       alert("Failed to update profile.");
//     }
//   };

//   // Handler for deleting user account
//   const handleDelete = async () => {
//     const confirmed = confirm("Are you sure you want to delete this member?");
//     if (!confirmed) return;

//     try {
//       const docRef = doc(db, "users", user.id);
//       await deleteDoc(docRef);
//       alert("Member account deleted.");
//       // Optionally redirect or update state here, e.g., router.push('/members');
//     } catch (error) {
//       console.error("Error deleting document: ", error);
//       alert("Failed to delete account.");
//     }
//   };

//   // Toggles liturgical object in the state array
//   const toggleCheckBox = (item: string) => {
//     if (liturgicalObj.includes(item)) {
//       setLiturgicalObj(liturgicalObj.filter((obj: string) => obj !== item));
//     } else {
//       setLiturgicalObj([...liturgicalObj, item]);
//     }
//   };
//   const age = useMemo(() => {
//     const birthDate = new Date(user.birthday);
//     const today = new Date();
//     let age = today.getFullYear() - birthDate.getFullYear();
//     const m = today.getMonth() - birthDate.getMonth();
//     if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
//     return age;
//   }, [user.birthday]);

//   return (
//     <div className="p-6">
//       <h1 className="sr-only">Member Profile</h1> {/* Improved accessibility */}
//       <div className="flex gap-4">
//         <BackMember />

//         <Button variant="destructive" onClick={handleDelete}>
//           Delete
//         </Button>
//       </div>
//       <div className="flex flex-col mt-12 gap-4">
//         {/* Personal Information Card */}
//         <Card className="w-full flex justify-between items-start p-2">
//           <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
//             <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32">
//               <Image
//                 className="rounded-full object-cover"
//                 src="/defaultProfile.png"
//                 alt="Profile picture"
//                 fill
//                 priority
//               />
//             </div>
//             <div className="flex flex-col text-center sm:text-left">
//               <h2 className="text-2xl font-bold mb-2">
//                 {user.firstName} {user.lastName}
//               </h2>
//               <p className="font-semibold">
//                 Birthday:{" "}
//                 {new Date(user.birthday).toLocaleDateString("en-US", {
//                   year: "numeric",
//                   month: "long",
//                   day: "numeric",
//                 })}
//               </p>
//               <p className="font-semibold">Age: {age}</p>
//               <p className="font-semibold">
//                 Status: {user?.memberStatus || "Not available"}
//               </p>
//               <p className="font-semibold">Address: {user.address}</p>
//               {/* <p className="font-semibold">Age: {user.age}</p> */}
//             </div>
//           </div>

//           <Dialog>
//             <DialogTrigger asChild>
//               <Button className="p-2 bg-white text-black font-semibold rounded flex justify-center items-center">
//                 <Edit className="w-4 h-4" />
//               </Button>
//             </DialogTrigger>
//             <DialogContent>
//               <DialogHeader>
//                 <DialogTitle>Edit Personal Information</DialogTitle>
//               </DialogHeader>
//               <form
//                 onSubmit={handleSubmit}
//                 className="flex flex-col gap-4 mt-4"
//               >
//                 <h3 className="text-xl font-bold">Personal Details</h3>
//                 <Label htmlFor="firstName">First Name</Label>
//                 <input
//                   id="firstName"
//                   type="text"
//                   value={firstName}
//                   onChange={(e) => setFirstName(e.target.value)}
//                   placeholder="First Name"
//                   className="p-2 border rounded"
//                 />
//                 <Label htmlFor="lastName">Last Name</Label>
//                 <input
//                   id="lastName"
//                   type="text"
//                   value={lastName}
//                   onChange={(e) => setLastName(e.target.value)}
//                   placeholder="Last Name"
//                   className="p-2 border rounded"
//                 />
//                 <Label htmlFor="address">Address</Label>
//                 <input
//                   id="address"
//                   type="text"
//                   value={address}
//                   onChange={(e) => setAddress(e.target.value)}
//                   placeholder="Address"
//                   className="p-2 border rounded"
//                 />
//                 <Label htmlFor="birthday">Birthday</Label>
//                 <input
//                   id="birthday"
//                   type="date"
//                   value={birthday}
//                   onChange={(e) => setBirthday(e.target.value)}
//                   className="p-2 border rounded"
//                 />
//                 <Button type="submit">Save Personal Info</Button>
//               </form>
//             </DialogContent>
//           </Dialog>
//         </Card>

//         <div className="w-full flex flex-col sm:flex-row gap-4">
//           {/* Service Information Card */}
//           <Card className="w-full flex flex-col p-4">
//             <div className="flex justify-between items-start">
//               <h2 className="text-xl font-bold mb-12">Service Information</h2>
//               <Dialog>
//                 <DialogTrigger asChild>
//                   <Button className="p-2 bg-white text-black font-semibold rounded flex justify-center items-center">
//                     <Edit className="w-4 h-4" />
//                   </Button>
//                 </DialogTrigger>
//                 <DialogContent>
//                   <DialogHeader>
//                     <DialogTitle>Edit Service Information</DialogTitle>
//                   </DialogHeader>
//                   <form
//                     onSubmit={handleSubmit}
//                     className="flex flex-col gap-4 mt-4"
//                   >
//                     <h3 className="text-xl font-bold">Service Details</h3>

//                     <Label htmlFor="dateJoin">Date of Join</Label>
//                     <div className="flex flex-col sm:flex-row justify-between gap-2">
//                       <select
//                         id="monthJoin"
//                         name="monthJoin"
//                         value={monthJoin}
//                         onChange={(e) => setMonthJoin(e.target.value)}
//                         className="border border-gray-300 dark:border-gray-600 rounded-md p-2 text-sm dark:text-white"
//                       >
//                         <option value="">-- Choose Month --</option>
//                         {monthNames.map((month, index) => (
//                           <option
//                             key={month}
//                             value={String(index + 1).padStart(2, "0")}
//                           >
//                             {month}
//                           </option>
//                         ))}
//                       </select>
//                       <select
//                         id="yearJoin"
//                         name="yearJoin"
//                         value={yearJoin}
//                         onChange={(e) => setYearJoin(e.target.value)}
//                         className="border border-gray-300 dark:border-gray-600 rounded-md p-2 text-sm dark:text-white"
//                         required
//                       >
//                         <option value="">-- Choose Year --</option>
//                         {Array.from(
//                           { length: new Date().getFullYear() - 1998 + 1 },
//                           (_, i) => {
//                             const year = 1998 + i;
//                             return (
//                               <option key={year} value={year}>
//                                 {year}
//                               </option>
//                             );
//                           }
//                         )}
//                       </select>
//                     </div>

//                     <Label htmlFor="memberStatus">Member Status</Label>
//                     <select
//                       id="memberStatus"
//                       name="memberStatus"
//                       value={memberStatus}
//                       onChange={(e) => setMemberStatus(e.target.value)}
//                       required
//                       className="border border-gray-300 dark:border-gray-600 rounded-md p-2 text-sm dark:text-white"
//                     >
//                       <option value="">-- Choose Status --</option>
//                       <option value="Aspirant">Aspirant</option>
//                       <option value="Neophytes">Neophytes</option>
//                       <option value="Junior">Junior</option>
//                       <option value="Senior">Senior</option>
//                     </select>

//                     <label className="font-medium">Have Baptism?</label>
//                     <div className="flex justify-center items-center gap-4">
//                       <div className="flex gap-2 items-center">
//                         <input
//                           type="radio"
//                           id="baptism-yes"
//                           name="baptism"
//                           value="Yes"
//                           checked={baptism === "Yes"}
//                           onChange={(e) => setBaptism(e.target.value)}
//                           required
//                           className="w-[20px] h-[20px]"
//                         />
//                         <label htmlFor="baptism-yes">Yes</label>
//                       </div>
//                       <div className="flex gap-2 items-center">
//                         <input
//                           type="radio"
//                           id="baptism-no"
//                           name="baptism"
//                           value="No"
//                           checked={baptism === "No"}
//                           onChange={(e) => setBaptism(e.target.value)}
//                           required
//                           className="w-[20px] h-[20px]"
//                         />
//                         <label htmlFor="baptism-no">No</label>
//                       </div>
//                     </div>

//                     <label htmlFor="communion-yes">Have First Communion?</label>
//                     <div className="flex justify-center items-center gap-4">
//                       <div className="flex gap-2">
//                         <label htmlFor="communion-yes">Yes</label>
//                         <input
//                           type="radio"
//                           id="communion-yes"
//                           name="communion"
//                           value="Yes"
//                           checked={communion === "Yes"}
//                           onChange={(e) => setCommunion(e.target.value)}
//                           required
//                           className="w-[20px]"
//                         />
//                       </div>
//                       <div className="flex gap-2">
//                         <label htmlFor="communion-no">No</label>
//                         <input
//                           type="radio"
//                           id="communion-no"
//                           name="communion"
//                           value="No"
//                           checked={communion === "No"}
//                           onChange={(e) => setCommunion(e.target.value)}
//                           required
//                           className="w-[20px]"
//                         />
//                       </div>
//                     </div>

//                     <label htmlFor="kumpil-yes">Have Kumpil?</label>
//                     <div className="flex justify-center items-center gap-4">
//                       <div className="flex gap-2">
//                         <label htmlFor="kumpil-yes">Yes</label>
//                         <input
//                           type="radio"
//                           id="kumpil-yes"
//                           name="kumpil"
//                           value="Yes"
//                           checked={kumpil === "Yes"}
//                           onChange={(e) => setKumpil(e.target.value)}
//                           required
//                           className="w-[20px]"
//                         />
//                       </div>
//                       <div className="flex gap-2">
//                         <label htmlFor="kumpil-no">No</label>
//                         <input
//                           type="radio"
//                           id="kumpil-no"
//                           name="kumpil"
//                           value="No"
//                           checked={kumpil === "No"}
//                           onChange={(e) => setKumpil(e.target.value)}
//                           required
//                           className="w-[20px]"
//                         />
//                       </div>
//                     </div>

//                     <Label htmlFor="object">Liturgical Objects you use</Label>
//                     <div className="grid gap-2">
//                       {allLiturgicalObjects.map((obj, index) => (
//                         <div key={index} className="flex items-center gap-1">
//                           <input
//                             type="checkbox"
//                             checked={liturgicalObj.includes(obj.name)}
//                             onChange={() => toggleCheckBox(obj.name)}
//                             id={obj.name.replace(/\s+/g, "-").toLowerCase()} // Create unique ID
//                             name={obj.name.replace(/\s+/g, "-").toLowerCase()}
//                             className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-800 dark:checked:bg-primary"
//                           />
//                           <label
//                             htmlFor={obj.name
//                               .replace(/\s+/g, "-")
//                               .toLowerCase()}
//                             className="text-sm text-gray-700 dark:text-gray-300"
//                           >
//                             {obj.name}
//                           </label>
//                         </div>
//                       ))}
//                     </div>
//                     <Button type="submit">Save Service Info</Button>
//                   </form>
//                 </DialogContent>
//               </Dialog>
//             </div>

//             <div className="flex gap-4 mb-4">
//               <p className="font-bold">Date of Join: </p>{" "}
//               <p>
//                 {user.monthJoin ? monthNames[Number(user.monthJoin) - 1] : ""},{" "}
//                 {user.yearJoin}
//               </p>
//             </div>
//             <div className="flex gap-4 mb-4">
//               <p className="font-bold">Status: </p> <p>{user.memberStatus}</p>
//             </div>
//             <div className="flex gap-4 mb-4">
//               <p className="font-bold">Member for: </p>{" "}
//               {joinDuration && <p>{joinDuration}</p>}
//             </div>
//             <div className="flex gap-4 mb-4">
//               <p className="font-bold">Baptism: </p> <p>{user.baptism}</p>
//             </div>
//             <div className="flex gap-4 mb-4">
//               <p className="font-bold">First Communion: </p>{" "}
//               <p>{user.communion}</p>
//             </div>
//             <div className="flex gap-4 mb-4">
//               <p className="font-bold">Kumpil:</p> <p> {user.kumpil}</p>
//             </div>
//           </Card>

//           {/* Parent/Guardian Information Card */}
//           <Card className="w-full flex justify-between items-start p-2">
//             <div>
//               <h2 className="text-xl font-bold mb-12">
//                 Parent/Guardian Information
//               </h2>
//               <div className="flex gap-4 mb-4">
//                 <p className="font-bold">Parent Name: </p>{" "}
//                 <p>
//                   {user.parentFirstName} {user.parentLastName}
//                 </p>
//               </div>
//               <div className="flex gap-4 mb-4">
//                 <p className="font-bold">Contact #: </p>{" "}
//                 <p>{user.contactNumber}</p>
//               </div>
//               <div className="flex gap-4 mb-4">
//                 <p className="font-bold">FB name:</p> <p>{user.fbName}</p>
//               </div>
//             </div>

//             <Dialog>
//               <DialogTrigger asChild>
//                 <Button className="p-2 bg-white text-black font-semibold rounded flex justify-center items-center">
//                   <Edit className="w-4 h-4" />
//                 </Button>
//               </DialogTrigger>
//               <DialogContent>
//                 <DialogHeader>
//                   <DialogTitle>Edit Parent/Guardian Information</DialogTitle>
//                 </DialogHeader>
//                 <form
//                   onSubmit={handleSubmit}
//                   className="flex flex-col gap-4 mt-4"
//                 >
//                   <h3 className="text-xl font-bold">Parent/Guardian Details</h3>
//                   <Label htmlFor="parentFirstName">Parent First Name</Label>
//                   <input
//                     id="parentFirstName"
//                     type="text"
//                     value={parentFirstName}
//                     onChange={(e) => setParentFirstName(e.target.value)}
//                     placeholder="First Name"
//                     className="p-2 border rounded"
//                   />
//                   <Label htmlFor="parentLastName">Parent Last Name</Label>
//                   <input
//                     id="parentLastName"
//                     type="text"
//                     value={parentLastName}
//                     onChange={(e) => setParentLastName(e.target.value)}
//                     placeholder="Last Name"
//                     className="p-2 border rounded"
//                   />
//                   <Label htmlFor="contactNumber">Contact Number</Label>
//                   <input
//                     id="contactNumber"
//                     type="text" // Changed to text as contact numbers can have non-numeric characters
//                     value={contactNumber}
//                     onChange={(e) => setContactNumber(e.target.value)}
//                     placeholder="Contact Number"
//                     className="p-2 border rounded"
//                   />
//                   <Label htmlFor="fbName">Name on Facebook</Label>
//                   <input
//                     id="fbName"
//                     type="text"
//                     value={fbName}
//                     onChange={(e) => setFbName(e.target.value)}
//                     placeholder="Facebook Name"
//                     className="p-2 border rounded"
//                   />
//                   <Button type="submit">Save Parent/Guardian Info</Button>
//                 </form>
//               </DialogContent>
//             </Dialog>
//           </Card>
//         </div>

//         {/* Liturgical Objects Section */}
//         {user.liturgicalObj &&
//           user.liturgicalObj.length > 0 && ( // Ensure it's an array and not empty
//             <>
//               <h2 className="text-2xl font-bold mb-4">Liturgical Objects</h2>
//               <div className="flex gap-4 flex-col sm:flex-row flex-wrap">
//                 {allLiturgicalObjects
//                   .filter((obj) => user.liturgicalObj.includes(obj.name))
//                   .map((obj, index) => (
//                     <Card
//                       key={index}
//                       className="flex justify-center items-center flex-col w-full sm:w-[48%] lg:w-[30%] p-4 rounded"
//                     >
//                       <Image
//                         src={obj.image}
//                         alt={obj.name}
//                         width={100}
//                         height={100}
//                         className="rounded-t-lg"
//                       />
//                       <p className="mt-6">{obj.name}</p>
//                     </Card>
//                   ))}
//               </div>
//             </>
//           )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useMemo } from "react";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BackMember } from "../../../components/ui/back-to-member";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import MessageModalSuccess from "@/components/modal-2";

// Define an interface for the user prop to provide type safety
interface User {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  birthday: string;
  monthJoin: string;
  yearJoin: string;
  memberStatus: string;
  baptism: string;
  communion: string;
  kumpil: string;
  liturgicalObj: string[];
  parentFirstName: string;
  parentLastName: string;
  contactNumber: string;
  fbName: string;
}

export function MemberProfileClient({ user }: { user: User }) {
  // State for personal information
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [address, setAddress] = useState(user.address);
  const [birthday, setBirthday] = useState(user.birthday);

  // State for service information
  const [monthJoin, setMonthJoin] = useState(user.monthJoin);
  const [yearJoin, setYearJoin] = useState(user.yearJoin);
  const [memberStatus, setMemberStatus] = useState(user.memberStatus);
  const [baptism, setBaptism] = useState(user.baptism);
  const [communion, setCommunion] = useState(user.communion);
  const [kumpil, setKumpil] = useState(user.kumpil);
  const [liturgicalObj, setLiturgicalObj] = useState<string[]>(
    user.liturgicalObj || []
  ); // Initialize as array

  // State for parent/guardian information
  const [parentFirstName, setParentFirstName] = useState(user.parentFirstName);
  const [parentLastName, setParentLastName] = useState(user.parentLastName);
  const [contactNumber, setContactNumber] = useState(user.contactNumber);
  const [fbName, setFbName] = useState(user.fbName);

  // Memoized calculation for join duration
  const joinDuration = useMemo(() => {
    if (!monthJoin || !yearJoin) return null;

    const joinDate = new Date(Number(yearJoin), Number(monthJoin) - 1);
    const now = new Date();

    const yearsDiff = now.getFullYear() - joinDate.getFullYear();
    const monthsDiff = now.getMonth() - joinDate.getMonth();

    const totalMonths = yearsDiff * 12 + monthsDiff;

    const displayYears = Math.floor(totalMonths / 12);
    const displayMonths = totalMonths % 12;

    return `${displayYears} year(s), ${displayMonths} month(s)`;
  }, [monthJoin, yearJoin]);

  // Liturgical objects data
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

  // Month names for display
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

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogOpen2, setDialogOpen2] = useState(false);
  const [dialogOpen3, setDialogOpen3] = useState(false);

  // Handler for updating user profile
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const docRef = doc(db, "users", user.id);
    try {
      await updateDoc(docRef, {
        firstName,
        lastName,
        address,
        birthday,
        monthJoin,
        yearJoin,
        memberStatus,
        baptism,
        communion,
        kumpil,
        liturgicalObj,
        parentFirstName,
        parentLastName,
        contactNumber,
        fbName,
      });

      setModalMessage("Profile updated successfully.");
      setShowModal(true);
    } catch (error) {
      console.error("Error updating document: ", error);
      setModalMessage("Failed to update profile.");
      setShowModal(true);
    }
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const docRef = doc(db, "users", user.id);
  //   try {
  //     await updateDoc(docRef, {
  //       firstName,
  //       lastName,
  //       address,
  //       birthday,
  //       monthJoin,
  //       yearJoin,
  //       memberStatus,
  //       baptism,
  //       communion,
  //       kumpil,
  //       liturgicalObj,
  //       parentFirstName,
  //       parentLastName,
  //       contactNumber,
  //       fbName,
  //     });

  //     setModalMessage("Profile updated successfully.");
  //     setShowModal(true);
  //     setTimeout(() => {
  //       setShowModal(false);
  //       router.back(); // ⬅ go back to the previous page
  //     }, 1000);
  //   } catch (error) {
  //     console.error("Error updating document: ", error);
  //     setModalMessage("Failed to update profile.");
  //     setShowModal(true);
  //   }
  // };

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleDelete = () => {
    setShowConfirmModal(true);
  };
  const router = useRouter();

  const confirmDelete = async () => {
    try {
      const docRef = doc(db, "users", user.id);
      await deleteDoc(docRef);

      setShowConfirmModal(false); // close confirm modal
      setModalMessage("Member account deleted.");
      setShowModal(true); // show success modal

      // Wait 1.5 seconds before navigating back
      setTimeout(() => {
        setShowModal(false);
        router.back(); // ⬅ go back to the previous page
      }, 1500);
    } catch (error) {
      console.error("Error deleting document: ", error);
      setModalMessage("Failed to delete account.");
      setShowModal(true);
    }
  };

  // // Handler for deleting user account
  // const handleDelete = async () => {
  //   const confirmed = confirm("Are you sure you want to delete this member?");
  //   if (!confirmed) return;

  //   try {
  //     const docRef = doc(db, "users", user.id);
  //     await deleteDoc(docRef);
  //     setModalMessage("Member account deleted.");
  //     setShowModal(true);

  //     // Optionally redirect or update state here, e.g., router.push('/members');
  //   } catch (error) {
  //     console.error("Error deleting document: ", error);
  //     setModalMessage("Failed to delete account.");
  //     setShowModal(true);
  //   }
  // };

  // Toggles liturgical object in the state array
  const toggleCheckBox = (item: string) => {
    if (liturgicalObj.includes(item)) {
      setLiturgicalObj(liturgicalObj.filter((obj: string) => obj !== item));
    } else {
      setLiturgicalObj([...liturgicalObj, item]);
    }
  };
  const age = useMemo(() => {
    const birthDate = new Date(user.birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
  }, [user.birthday]);

  return (
    <div className="p-6">
      <h1 className="sr-only">Member Profile</h1> {/* Improved accessibility */}
      <div className="flex gap-4">
        <BackMember />

        <Button variant="destructive" onClick={handleDelete}>
          Delete
        </Button>

        {showConfirmModal && (
          <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Deletion</DialogTitle>
              </DialogHeader>
              <p>Are you sure you want to delete this member?</p>
              <div className="flex justify-end gap-2 mt-4">
                <Button
                  variant="secondary"
                  onClick={() => setShowConfirmModal(false)}
                >
                  Cancel
                </Button>
                <Button variant="destructive" onClick={confirmDelete}>
                  Delete
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
      <div className="flex flex-col mt-12 gap-4">
        {/* Personal Information Card */}
        <Card className="w-full flex justify-between items-start p-2">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32">
              <Image
                className="rounded-full object-cover"
                src="/defaultProfile.png"
                alt="Profile picture"
                fill
                priority
              />
            </div>
            <div className="flex flex-col text-center sm:text-left">
              <h2 className="text-2xl font-bold mb-2">
                {user.firstName} {user.lastName}
              </h2>
              <p className="font-semibold">
                Birthday:{" "}
                {new Date(user.birthday).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="font-semibold">Age: {age}</p>
              <p className="font-semibold">
                Status: {user?.memberStatus || "Not available"}
              </p>
              <p className="font-semibold">Address: {user.address}</p>
              {/* <p className="font-semibold">Age: {user.age}</p> */}
            </div>
          </div>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button
                className="p-2 bg-white text-black font-semibold rounded flex justify-center items-center"
                onClick={() => setDialogOpen(true)}
              >
                <Edit className="w-4 h-4" />
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Personal Information</DialogTitle>
              </DialogHeader>
              {showModal && (
                <MessageModalSuccess
                  message={modalMessage}
                  onClose={() => {
                    setShowModal(false); // close success modal
                    setDialogOpen(false); // close edit dialog
                  }}
                />
              )}

              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 mt-4"
              >
                <h3 className="text-xl font-bold">Personal Details</h3>
                <Label htmlFor="firstName">First Name</Label>
                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                  className="p-2 border rounded"
                />
                <Label htmlFor="lastName">Last Name</Label>
                <input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                  className="p-2 border rounded"
                />
                <Label htmlFor="address">Address</Label>
                <input
                  id="address"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Address"
                  className="p-2 border rounded"
                />
                <Label htmlFor="birthday">Birthday</Label>
                <input
                  id="birthday"
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  className="p-2 border rounded"
                />
                <Button type="submit">Save Personal Info</Button>
              </form>
            </DialogContent>
          </Dialog>
        </Card>

        <div className="w-full flex flex-col sm:flex-row gap-4">
          {/* Service Information Card */}
          <Card className="w-full flex flex-col p-4">
            <div className="flex justify-between items-start">
              <h2 className="text-xl font-bold mb-12">Service Information</h2>
              <Dialog open={dialogOpen2} onOpenChange={setDialogOpen2}>
                <DialogTrigger asChild>
                  <Button
                    className="p-2 bg-white text-black font-semibold rounded flex justify-center items-center"
                    onClick={() => setDialogOpen2(true)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[100vh] overflow-y-auto">
                  <DialogHeader>
                    {showModal && (
                      <MessageModalSuccess
                        message={modalMessage}
                        onClose={() => {
                          setShowModal(false); // close success modal
                          setDialogOpen2(false); // close edit dialog
                        }}
                      />
                    )}
                    <DialogTitle>Edit Service Information</DialogTitle>
                  </DialogHeader>
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4 mt-4"
                  >
                    <h3 className="text-xl font-bold">Service Details</h3>

                    <Label htmlFor="dateJoin">Date of Join</Label>
                    <div className="flex flex-col sm:flex-row justify-between gap-2">
                      <select
                        id="monthJoin"
                        name="monthJoin"
                        value={monthJoin}
                        onChange={(e) => setMonthJoin(e.target.value)}
                        className="border border-gray-300 dark:border-gray-600 rounded-md p-2 text-sm dark:text-white"
                      >
                        <option value="">-- Choose Month --</option>
                        {monthNames.map((month, index) => (
                          <option
                            key={month}
                            value={String(index + 1).padStart(2, "0")}
                          >
                            {month}
                          </option>
                        ))}
                      </select>
                      <select
                        id="yearJoin"
                        name="yearJoin"
                        value={yearJoin}
                        onChange={(e) => setYearJoin(e.target.value)}
                        className="border border-gray-300 dark:border-gray-600 rounded-md p-2 text-sm dark:text-white"
                        required
                      >
                        <option value="">-- Choose Year --</option>
                        {Array.from(
                          { length: new Date().getFullYear() - 1998 + 1 },
                          (_, i) => {
                            const year = 1998 + i;
                            return (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            );
                          }
                        )}
                      </select>
                    </div>

                    <Label htmlFor="memberStatus">Member Status</Label>
                    <select
                      id="memberStatus"
                      name="memberStatus"
                      value={memberStatus}
                      onChange={(e) => setMemberStatus(e.target.value)}
                      required
                      className="border border-gray-300 dark:border-gray-600 rounded-md p-2 text-sm dark:text-white"
                    >
                      <option value="">-- Choose Status --</option>
                      <option value="Aspirant">Aspirant</option>
                      <option value="Neophytes">Neophytes</option>
                      <option value="Junior">Junior</option>
                      <option value="Senior">Senior</option>
                    </select>

                    <label className="font-medium">Have Baptism?</label>
                    <div className="flex justify-center items-center gap-4">
                      <div className="flex gap-2 items-center">
                        <input
                          type="radio"
                          id="baptism-yes"
                          name="baptism"
                          value="Yes"
                          checked={baptism === "Yes"}
                          onChange={(e) => setBaptism(e.target.value)}
                          required
                          className="w-[20px] h-[20px]"
                        />
                        <label htmlFor="baptism-yes">Yes</label>
                      </div>
                      <div className="flex gap-2 items-center">
                        <input
                          type="radio"
                          id="baptism-no"
                          name="baptism"
                          value="No"
                          checked={baptism === "No"}
                          onChange={(e) => setBaptism(e.target.value)}
                          required
                          className="w-[20px] h-[20px]"
                        />
                        <label htmlFor="baptism-no">No</label>
                      </div>
                    </div>

                    <label htmlFor="communion-yes">Have First Communion?</label>
                    <div className="flex justify-center items-center gap-4">
                      <div className="flex gap-2">
                        <label htmlFor="communion-yes">Yes</label>
                        <input
                          type="radio"
                          id="communion-yes"
                          name="communion"
                          value="Yes"
                          checked={communion === "Yes"}
                          onChange={(e) => setCommunion(e.target.value)}
                          required
                          className="w-[20px]"
                        />
                      </div>
                      <div className="flex gap-2">
                        <label htmlFor="communion-no">No</label>
                        <input
                          type="radio"
                          id="communion-no"
                          name="communion"
                          value="No"
                          checked={communion === "No"}
                          onChange={(e) => setCommunion(e.target.value)}
                          required
                          className="w-[20px]"
                        />
                      </div>
                    </div>

                    <label htmlFor="kumpil-yes">Have Kumpil?</label>
                    <div className="flex justify-center items-center gap-4">
                      <div className="flex gap-2">
                        <label htmlFor="kumpil-yes">Yes</label>
                        <input
                          type="radio"
                          id="kumpil-yes"
                          name="kumpil"
                          value="Yes"
                          checked={kumpil === "Yes"}
                          onChange={(e) => setKumpil(e.target.value)}
                          required
                          className="w-[20px]"
                        />
                      </div>
                      <div className="flex gap-2">
                        <label htmlFor="kumpil-no">No</label>
                        <input
                          type="radio"
                          id="kumpil-no"
                          name="kumpil"
                          value="No"
                          checked={kumpil === "No"}
                          onChange={(e) => setKumpil(e.target.value)}
                          required
                          className="w-[20px]"
                        />
                      </div>
                    </div>

                    <Label htmlFor="object">Liturgical Objects you use</Label>
                    <div className="grid gap-2">
                      {allLiturgicalObjects.map((obj, index) => (
                        <div key={index} className="flex items-center gap-1">
                          <input
                            type="checkbox"
                            checked={liturgicalObj.includes(obj.name)}
                            onChange={() => toggleCheckBox(obj.name)}
                            id={obj.name.replace(/\s+/g, "-").toLowerCase()} // Create unique ID
                            name={obj.name.replace(/\s+/g, "-").toLowerCase()}
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-800 dark:checked:bg-primary"
                          />
                          <label
                            htmlFor={obj.name
                              .replace(/\s+/g, "-")
                              .toLowerCase()}
                            className="text-sm text-gray-700 dark:text-gray-300"
                          >
                            {obj.name}
                          </label>
                        </div>
                      ))}
                    </div>
                    <Button type="submit">Save Service Info</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="flex gap-4 mb-4">
              <p className="font-bold">Date of Join: </p>{" "}
              <p>
                {user.monthJoin ? monthNames[Number(user.monthJoin) - 1] : ""},{" "}
                {user.yearJoin}
              </p>
            </div>
            <div className="flex gap-4 mb-4">
              <p className="font-bold">Status: </p> <p>{user.memberStatus}</p>
            </div>
            <div className="flex gap-4 mb-4">
              <p className="font-bold">Member for: </p>{" "}
              {joinDuration && <p>{joinDuration}</p>}
            </div>
            <div className="flex gap-4 mb-4">
              <p className="font-bold">Baptism: </p> <p>{user.baptism}</p>
            </div>
            <div className="flex gap-4 mb-4">
              <p className="font-bold">First Communion: </p>{" "}
              <p>{user.communion}</p>
            </div>
            <div className="flex gap-4 mb-4">
              <p className="font-bold">Kumpil:</p> <p> {user.kumpil}</p>
            </div>
          </Card>

          {/* Parent/Guardian Information Card */}
          <Card className="w-full flex justify-between items-start p-2">
            <div>
              <h2 className="text-xl font-bold mb-12">
                Parent/Guardian Information
              </h2>
              <div className="flex gap-4 mb-4">
                <p className="font-bold">Parent Name: </p>{" "}
                <p>
                  {user.parentFirstName} {user.parentLastName}
                </p>
              </div>
              <div className="flex gap-4 mb-4">
                <p className="font-bold">Contact #: </p>{" "}
                <p>{user.contactNumber}</p>
              </div>
              <div className="flex gap-4 mb-4">
                <p className="font-bold">FB name:</p> <p>{user.fbName}</p>
              </div>
            </div>

            <Dialog open={dialogOpen3} onOpenChange={setDialogOpen3}>
              <DialogTrigger asChild>
                <Button
                  className="p-2 bg-white text-black font-semibold rounded flex justify-center items-center"
                  onClick={() => setDialogOpen3(true)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  {showModal && (
                    <MessageModalSuccess
                      message={modalMessage}
                      onClose={() => {
                        setShowModal(false); // close success modal
                        setDialogOpen3(false); // close edit dialog
                      }}
                    />
                  )}
                  <DialogTitle>Edit Parent/Guardian Information</DialogTitle>
                </DialogHeader>
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4 mt-4"
                >
                  <h3 className="text-xl font-bold">Parent/Guardian Details</h3>
                  <Label htmlFor="parentFirstName">Parent First Name</Label>
                  <input
                    id="parentFirstName"
                    type="text"
                    value={parentFirstName}
                    onChange={(e) => setParentFirstName(e.target.value)}
                    placeholder="First Name"
                    className="p-2 border rounded"
                  />
                  <Label htmlFor="parentLastName">Parent Last Name</Label>
                  <input
                    id="parentLastName"
                    type="text"
                    value={parentLastName}
                    onChange={(e) => setParentLastName(e.target.value)}
                    placeholder="Last Name"
                    className="p-2 border rounded"
                  />
                  <Label htmlFor="contactNumber">Contact Number</Label>
                  <input
                    id="contactNumber"
                    type="text" // Changed to text as contact numbers can have non-numeric characters
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    placeholder="Contact Number"
                    className="p-2 border rounded"
                  />
                  <Label htmlFor="fbName">Name on Facebook</Label>
                  <input
                    id="fbName"
                    type="text"
                    value={fbName}
                    onChange={(e) => setFbName(e.target.value)}
                    placeholder="Facebook Name"
                    className="p-2 border rounded"
                  />
                  <Button type="submit">Save Parent/Guardian Info</Button>
                </form>
              </DialogContent>
            </Dialog>
          </Card>
        </div>

        {/* Liturgical Objects Section */}
        {user.liturgicalObj &&
          user.liturgicalObj.length > 0 && ( // Ensure it's an array and not empty
            <>
              <h2 className="text-2xl font-bold mb-4">Liturgical Objects</h2>
              <div className="flex gap-4 flex-col sm:flex-row flex-wrap">
                {allLiturgicalObjects
                  .filter((obj) => user.liturgicalObj.includes(obj.name))
                  .map((obj, index) => (
                    <Card
                      key={index}
                      className="flex justify-center items-center flex-col w-full sm:w-[48%] lg:w-[30%] p-4 rounded"
                    >
                      <Image
                        src={obj.image}
                        alt={obj.name}
                        width={100}
                        height={100}
                        className="rounded-t-lg"
                      />
                      <p className="mt-6">{obj.name}</p>
                    </Card>
                  ))}
              </div>
            </>
          )}
      </div>
    </div>
  );
}
