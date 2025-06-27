// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import { BackMember } from "./ui/back-to-member";
// import { Card } from "./ui/card";
// import { Button } from "./ui/button";
// import {
//   Dialog,
//   DialogTrigger,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "./ui/dialog";
// import { Edit } from "lucide-react";
// import { Label } from "./ui/label";
// import MessageModalSuccessful from "./modalSuccess";

// type User = {
//   firstName: string;
//   lastName: string;
//   address: string;
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
//   ) {
//     age--;
//   }
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
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [address, setAddress] = useState("");
//   const [birthday, setBirthday] = useState("");
//   const [parentFirstName, setParentFirstName] = useState("");
//   const [parentLastName, setParentLastName] = useState("");
//   const [contactNumber, setContactNumber] = useState("");
//   const [fbName, setFbName] = useState("");

//   const [showModal, setShowModal] = useState(false);
//   const [modalMessage, setModalMessage] = useState("");
//   const [editDialogOpen, setEditDialogOpen] = useState(false);
//   const [editParentDialogOpen, setEditParentDialogOpen] = useState(false);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       const parsedUser = JSON.parse(storedUser);
//       setUser(parsedUser);
//       setFirstName(parsedUser.firstName || "");
//       setLastName(parsedUser.lastName || "");
//       setAddress(parsedUser.address || "");
//       setBirthday(parsedUser.birthday || "");
//       setParentFirstName(parsedUser.parentFirstName || "");
//       setParentLastName(parsedUser.parentLastName || "");
//       setContactNumber(parsedUser.contactNumber || "");
//       setFbName(parsedUser.fbName || "");
//     }
//   }, []);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!user) return;

//     const updatedUser: User = {
//       ...user,
//       firstName,
//       lastName,
//       address,
//       birthday,
//       memberStatus: user.memberStatus || "Not available",
//       monthJoin: user.monthJoin,
//       yearJoin: user.yearJoin,
//       baptism: user.baptism,
//       communion: user.communion,
//       kumpil: user.kumpil,
//       liturgicalObj: user.liturgicalObj,
//       parentFirstName,
//       parentLastName,
//       contactNumber,
//       fbName,
//     };

//     localStorage.setItem("user", JSON.stringify(updatedUser));
//     setUser(updatedUser);
//     setModalMessage("Information updated successfully!");
//     setShowModal(true);
//   };

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

//   return (
//     <div className="p-4 sm:p-6 max-w-7xl mx-auto">
//       <div className="mb-6">
//         <BackMember />
//       </div>
//       <div className="flex flex-col gap-6">
//         {/* Profile Header */}
//         <Card className="w-full flex justify-between items-start p-4">
//           <div className="flex flex-col sm:flex-row gap-4">
//             <div className="relative w-24 h-24">
//               <Image
//                 src="/defaultProfile.png"
//                 alt="Profile picture"
//                 fill
//                 className="rounded-full object-cover"
//               />
//             </div>
//             <div>
//               <h2 className="text-2xl font-bold">
//                 {firstName} {lastName}
//               </h2>
//               <p>
//                 Birthday:{" "}
//                 {birthday ? new Date(birthday).toLocaleDateString() : "N/A"}
//               </p>
//               <p>Age: {birthday ? calculateAge(birthday) : "N/A"}</p>
//               <p>Status: {user?.memberStatus}</p>
//               <p>Address: {address}</p>
//             </div>
//           </div>

//           {/* Edit Personal Dialog */}
//           <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
//             <DialogTrigger asChild>
//               <Button
//                 className="bg-white text-black p-2"
//                 onClick={() => setEditDialogOpen(true)}
//               >
//                 <Edit className="w-4 h-4" />
//               </Button>
//             </DialogTrigger>
//             <DialogContent>
//               <DialogHeader>
//                 <DialogTitle>Edit Personal Info</DialogTitle>
//               </DialogHeader>
//               <form
//                 onSubmit={handleSubmit}
//                 className="flex flex-col gap-4 mt-4"
//               >
//                 {showModal && (
//                   <MessageModalSuccessful
//                     message={modalMessage}
//                     onClose={() => {
//                       setShowModal(false);
//                       setEditDialogOpen(false);
//                     }}
//                   />
//                 )}
//                 <Label>First Name</Label>
//                 <input
//                   value={firstName}
//                   onChange={(e) => setFirstName(e.target.value)}
//                   className="p-2 border rounded"
//                 />
//                 <Label>Last Name</Label>
//                 <input
//                   value={lastName}
//                   onChange={(e) => setLastName(e.target.value)}
//                   className="p-2 border rounded"
//                 />
//                 <Label>Address</Label>
//                 <input
//                   value={address}
//                   onChange={(e) => setAddress(e.target.value)}
//                   className="p-2 border rounded"
//                 />
//                 <Label>Birthday</Label>
//                 <input
//                   type="date"
//                   value={birthday}
//                   onChange={(e) => setBirthday(e.target.value)}
//                   className="p-2 border rounded"
//                 />
//                 <Button type="submit">Save</Button>
//               </form>
//             </DialogContent>
//           </Dialog>
//         </Card>
//         <div className="flex flex-col lg:flex-row gap-6">
//           {/* Service Info */}
//           <Card className="w-full lg:w-1/2 p-6">
//             <h2 className="text-xl font-bold mb-4">Service Information</h2>
//             <p>
//               <strong>Date Joined:</strong>{" "}
//               {user?.monthJoin ? monthNames[+user.monthJoin - 1] : ""}{" "}
//               {user?.yearJoin}
//             </p>
//             <p>
//               <strong>Member For:</strong> {joinDuration}
//             </p>
//             <p>
//               <strong>Baptism:</strong> {user?.baptism || "N/A"}
//             </p>
//             <p>
//               <strong>Communion:</strong> {user?.communion || "N/A"}
//             </p>
//             <p>
//               <strong>Kumpil:</strong> {user?.kumpil || "N/A"}
//             </p>
//           </Card>

//           {/* Parent Info */}
//           <Card className="w-full lg:w-1/2 p-6">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-bold">Parent/Guardian Info</h2>
//               <Dialog
//                 open={editParentDialogOpen}
//                 onOpenChange={setEditParentDialogOpen}
//               >
//                 <DialogTrigger asChild>
//                   <Button
//                     className="bg-white text-black p-2"
//                     onClick={() => setEditParentDialogOpen(true)}
//                   >
//                     <Edit className="w-4 h-4" />
//                   </Button>
//                 </DialogTrigger>
//                 <DialogContent>
//                   <DialogHeader>
//                     <DialogTitle>Edit Parent Info</DialogTitle>
//                   </DialogHeader>
//                   <form
//                     onSubmit={handleSubmit}
//                     className="flex flex-col gap-4 mt-4"
//                   >
//                     {showModal && (
//                       <MessageModalSuccessful
//                         message={modalMessage}
//                         onClose={() => {
//                           setShowModal(false);
//                           setEditParentDialogOpen(false);
//                         }}
//                       />
//                     )}
//                     <Label>Parent First Name</Label>
//                     <input
//                       value={parentFirstName}
//                       onChange={(e) => setParentFirstName(e.target.value)}
//                       className="p-2 border rounded"
//                     />
//                     <Label>Parent Last Name</Label>
//                     <input
//                       value={parentLastName}
//                       onChange={(e) => setParentLastName(e.target.value)}
//                       className="p-2 border rounded"
//                     />
//                     <Label>Contact Number</Label>
//                     <input
//                       value={contactNumber}
//                       onChange={(e) => setContactNumber(e.target.value)}
//                       className="p-2 border rounded"
//                     />
//                     <Label>Facebook Name</Label>
//                     <input
//                       value={fbName}
//                       onChange={(e) => setFbName(e.target.value)}
//                       className="p-2 border rounded"
//                     />
//                     <Button type="submit">Save</Button>
//                   </form>
//                 </DialogContent>
//               </Dialog>
//             </div>
//             <p>
//               <strong>Parent Name:</strong> {parentFirstName} {parentLastName}
//             </p>
//             <p>
//               <strong>Contact #:</strong> {contactNumber}
//             </p>
//             <p>
//               <strong>Facebook:</strong> {fbName}
//             </p>
//           </Card>
//         </div>
//         {/* Liturgical Objects */}

//         {userLiturgicalObjects.length > 0 && (
//           <div className="text-center">
//             <h2 className="text-xl font-bold mt-6 mb-2">Liturgical Objects</h2>
//             <div className="flex flex-wrap justify-center gap-6">
//               {allLiturgicalObjects
//                 .filter((obj) => userLiturgicalObjects.includes(obj.name))
//                 .map((obj, idx) => (
//                   <Card key={idx} className="w-40 p-4 text-center">
//                     <div className="relative w-24 h-24 mx-auto">
//                       <Image
//                         src={obj.image}
//                         alt={obj.name}
//                         fill
//                         className="rounded object-cover"
//                       />
//                     </div>
//                     <p className="mt-2">{obj.name}</p>
//                   </Card>
//                 ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { BackMember } from "./ui/back-to-member";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Edit } from "lucide-react";
import { Label } from "./ui/label";
import MessageModalSuccessful from "./modalSuccess";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

type User = {
  id:string;
  firstName: string;
  lastName: string;
  address: string;
  memberStatus: string;
  birthday?: string;
  monthJoin?: string;
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
  const joinMonth = Number(monthJoin) - 1;
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
  return duration || "Less than a month";
}

export default function ViewProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [birthday, setBirthday] = useState("");
  const [parentFirstName, setParentFirstName] = useState("");
  const [parentLastName, setParentLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [fbName, setFbName] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editParentDialogOpen, setEditParentDialogOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setFirstName(parsedUser.firstName || "");
      setLastName(parsedUser.lastName || "");
      setAddress(parsedUser.address || "");
      setBirthday(parsedUser.birthday || "");
      setParentFirstName(parsedUser.parentFirstName || "");
      setParentLastName(parsedUser.parentLastName || "");
      setContactNumber(parsedUser.contactNumber || "");
      setFbName(parsedUser.fbName || "");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!user || !user.id) {
    console.error("User or user.id is missing");
    return;
  }

  const updatedUser: User = {
    ...user,
    firstName,
    lastName,
    address,
    birthday,
    memberStatus: user.memberStatus || "Not available",
    monthJoin: user.monthJoin,
    yearJoin: user.yearJoin,
    baptism: user.baptism,
    communion: user.communion,
    kumpil: user.kumpil,
    liturgicalObj: user.liturgicalObj,
    parentFirstName,
    parentLastName,
    contactNumber,
    fbName,
  };

  try {
    const userRef = doc(db, "users", user.id); // Firestore collection "users"
    await updateDoc(userRef, updatedUser);

    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setModalMessage("Information updated successfully!");
    setShowModal(true);
  } catch (error) {
    console.error("Error updating Firestore:", error);
    setModalMessage("Failed to update information.");
    setShowModal(true);
  }
};

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
        <Card className="w-full flex justify-between items-start p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative w-24 h-24">
              <Image
                src="/defaultProfile.png"
                alt="Profile picture"
                fill
                className="rounded-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold">
                {firstName} {lastName}
              </h2>
              <p>
                Birthday:{" "}
                {birthday ? new Date(birthday).toLocaleDateString() : "N/A"}
              </p>
              <p>Age: {birthday ? calculateAge(birthday) : "N/A"}</p>
              <p>Status: {user?.memberStatus}</p>
              <p>Address: {address}</p>
            </div>
          </div>

          {/* Edit Personal Dialog */}
          <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
            <DialogTrigger asChild>
              <Button
                className="bg-white text-black p-2"
                onClick={() => setEditDialogOpen(true)}
              >
                <Edit className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Personal Info</DialogTitle>
              </DialogHeader>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 mt-4"
              >
                {showModal && (
                  <MessageModalSuccessful
                    message={modalMessage}
                    onClose={() => {
                      setShowModal(false);
                      setEditDialogOpen(false);
                    }}
                  />
                )}
                <Label>First Name</Label>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="p-2 border rounded"
                />
                <Label>Last Name</Label>
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="p-2 border rounded"
                />
                <Label>Address</Label>
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="p-2 border rounded"
                />
                <Label>Birthday</Label>
                <input
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  className="p-2 border rounded"
                />
                <Button type="submit">Save</Button>
              </form>
            </DialogContent>
          </Dialog>
        </Card>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Service Info */}
          <Card className="w-full lg:w-1/2 p-6">
            <h2 className="text-xl font-bold mb-4">Service Information</h2>
            <p>
              <strong>Date Joined:</strong>{" "}
              {user?.monthJoin ? monthNames[+user.monthJoin - 1] : ""}{" "}
              {user?.yearJoin}
            </p>
            <p>
              <strong>Member For:</strong> {joinDuration}
            </p>
            <p>
              <strong>Baptism:</strong> {user?.baptism || "N/A"}
            </p>
            <p>
              <strong>Communion:</strong> {user?.communion || "N/A"}
            </p>
            <p>
              <strong>Kumpil:</strong> {user?.kumpil || "N/A"}
            </p>
          </Card>

          {/* Parent Info */}
          <Card className="w-full lg:w-1/2 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Parent/Guardian Info</h2>
              <Dialog
                open={editParentDialogOpen}
                onOpenChange={setEditParentDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button
                    className="bg-white text-black p-2"
                    onClick={() => setEditParentDialogOpen(true)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Parent Info</DialogTitle>
                  </DialogHeader>
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4 mt-4"
                  >
                    {showModal && (
                      <MessageModalSuccessful
                        message={modalMessage}
                        onClose={() => {
                          setShowModal(false);
                          setEditParentDialogOpen(false);
                        }}
                      />
                    )}
                    <Label>Parent First Name</Label>
                    <input
                      value={parentFirstName}
                      onChange={(e) => setParentFirstName(e.target.value)}
                      className="p-2 border rounded"
                    />
                    <Label>Parent Last Name</Label>
                    <input
                      value={parentLastName}
                      onChange={(e) => setParentLastName(e.target.value)}
                      className="p-2 border rounded"
                    />
                    <Label>Contact Number</Label>
                    <input
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                      className="p-2 border rounded"
                    />
                    <Label>Facebook Name</Label>
                    <input
                      value={fbName}
                      onChange={(e) => setFbName(e.target.value)}
                      className="p-2 border rounded"
                    />
                    <Button type="submit">Save</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            <p>
              <strong>Parent Name:</strong> {parentFirstName} {parentLastName}
            </p>
            <p>
              <strong>Contact #:</strong> {contactNumber}
            </p>
            <p>
              <strong>Facebook:</strong> {fbName}
            </p>
          </Card>
        </div>
        {/* Liturgical Objects */}

        {userLiturgicalObjects.length > 0 && (
          <div className="text-center">
            <h2 className="text-xl font-bold mt-6 mb-2">Liturgical Objects</h2>
            <div className="flex flex-wrap justify-center gap-6">
              {allLiturgicalObjects
                .filter((obj) => userLiturgicalObjects.includes(obj.name))
                .map((obj, idx) => (
                  <Card key={idx} className="w-40 p-4 text-center">
                    <div className="relative w-24 h-24 mx-auto">
                      <Image
                        src={obj.image}
                        alt={obj.name}
                        fill
                        className="rounded object-cover"
                      />
                    </div>
                    <p className="mt-2">{obj.name}</p>
                  </Card>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


