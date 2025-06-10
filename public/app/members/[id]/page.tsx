// import { doc, getDoc } from "firebase/firestore";
// import { db } from "@/lib/firebase"; 
// import { notFound } from "next/navigation";
// import { use } from "react";
// import { Button } from "@/components/ui/button";
// import { BackMember } from "../back-to-member";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"

// interface Props {
//   params: {
//     id: string;
//   };
// }

// function calculateAge(birthdayString: string): number {
//   const birthDate = new Date(birthdayString)
//   const today = new Date()
//   let age = today.getFullYear() - birthDate.getFullYear()
//   const monthDiff = today.getMonth() - birthDate.getMonth()

//   if (
//     monthDiff < 0 ||
//     (monthDiff === 0 && today.getDate() < birthDate.getDate())
//   ) {
//     age--
//   }

//   return age

// }

// export default async function MemberProfilePage({ params }: Props) {
//   const { id } = params;
//   const docRef = doc(db, "users", id);
//   const docSnap = await getDoc(docRef);

//   if (!docSnap.exists()) {
//     notFound(); 
//   }

//   const user = docSnap.data();

//   const birthday = user.birthday
//   const age = birthday?calculateAge(birthday) : "N/A"

//   return (
    
//     <div className="p-6">

//         <div className="flex gap-4"> 
//             <BackMember/>

//             <Dialog>
//             <DialogTrigger className="w-[100px] bg-white text-black font-semibold rounded">Edit Profile</DialogTrigger>
//             <DialogContent>
//                 <DialogHeader>
//                 <DialogTitle>Edit Your Profile</DialogTitle>
//                 </DialogHeader>

//                     <form action="">
//                           <input type="text" />
//                     </form>

   
//             </DialogContent>
//             </Dialog>
//         </div>
        

    
//       <h1 className="text-2xl font-bold mb-4">
//         {user.firstName} {user.lastName}
//       </h1>
//       <p>Birthday: {user.birthday}</p>
//       <p>Age: {age}</p>

//       <h1 className="text-2xl font-bold m-4">Service Information</h1>
//       <p>Date of Join: {user.monthJoin} {user.yearJoin}</p>
//       <p>Status: {user.memberStatus}</p>
//       <p className="gap-2">Liturgical Object: {user.liturgicalObj}</p>
//       <p>Baptism: {user.baptism}</p>
//       <p>First Communion: {user.communion}</p>
//       <p>Kumpil: {user.kumpil}</p>

//       <h1 className="text-2xl font-bold m-4">Parent/Guardian Information</h1>
//       <p>Parent Name: {user.parentFirstName} {user.parentLastName}</p>
//       <p>Contact #: {user.contactNumber}</p>
//       <p>FB name: {user.fbName}</p>

     
//     </div>
//   );
// }

// app/members/[id]/page.tsx
// app/members/[id]/page.tsx
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { notFound } from "next/navigation";
import { MemberProfileClient } from "./memberEdit";

interface Props {
  params: { id: string };
}

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

export default async function MemberProfilePage({ params }: Props) {
  const { id } = params;

  const docRef = doc(db, "users", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) notFound();

  const user = docSnap.data();
  const age = user.birthday ? calculateAge(user.birthday) : "N/A";

  return <MemberProfileClient user={{ ...user, id, age }} />;
}
