// import { doc, getDoc } from "firebase/firestore";
// import { db } from "@/lib/firebase";
// import { notFound } from "next/navigation";
// import { MemberProfileClient } from "./memberEdit";

// interface Props {
//   params: { id: string };
// }

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

// export default async function MemberProfilePage({ params }: Props) {
//   const { id } = params;

//   const docRef = doc(db, "users", id);
//   const docSnap = await getDoc(docRef);

//   if (!docSnap.exists()) notFound();

//   const user = docSnap.data();
//   const age = user.birthday ? calculateAge(user.birthday) : "N/A";

//   return <MemberProfileClient user={{ ...user, id, age }} />;
// }



// import { doc, getDoc } from "firebase/firestore";
// import { db } from "@/lib/firebase";
// import { notFound } from "next/navigation";
// import { MemberProfileClient } from "./memberEdit";
// export const runtime = "edge";
// interface Params {
//   params: { id: string };
// }

// // DO NOT define your own PageProps or add ts-ignore — use a destructured param object:
// export default async function MemberProfilePage({ params }: Params) {
//   const id = params.id;

//   const docRef = doc(db, "users", id);
//   const docSnap = await getDoc(docRef);

//   if (!docSnap.exists()) {
//     notFound();
//   }

//   const data = docSnap.data()!;

//   const user = {
//     id,
//     firstName: data.firstName ?? "",
//     lastName: data.lastName ?? "",
//     address: data.address ?? "",
//     birthday: data.birthday ?? "",
//     monthJoin: data.monthJoin ?? "",
//     yearJoin: data.yearJoin ?? "",
//     memberStatus: data.memberStatus ?? "",
//     baptism: data.baptism ?? "",
//     communion: data.communion ?? "",
//     kumpil: data.kumpil ?? "",
//     liturgicalObj: Array.isArray(data.liturgicalObj) ? data.liturgicalObj : [],
//     parentFirstName: data.parentFirstName ?? "",
//     parentLastName: data.parentLastName ?? "",
//     contactNumber: data.contactNumber ?? "",
//     fbName: data.fbName ?? "",
//   };

//   return <MemberProfileClient user={user} />;
// }


"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { MemberProfileClient } from "./memberEdit";

// Define the structure of your user object
interface Member {
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

export default function MemberProfilePage() {
  const { id } = useParams();
  const [user, setUser] = useState<Member | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!id || typeof id !== "string") return;

      const docRef = doc(db, "users", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();

        const member: Member = {
          id,
          firstName: data.firstName ?? "",
          lastName: data.lastName ?? "",
          address: data.address ?? "",
          birthday: data.birthday ?? "",
          monthJoin: data.monthJoin ?? "",
          yearJoin: data.yearJoin ?? "",
          memberStatus: data.memberStatus ?? "",
          baptism: data.baptism ?? "",
          communion: data.communion ?? "",
          kumpil: data.kumpil ?? "",
          liturgicalObj: Array.isArray(data.liturgicalObj) ? data.liturgicalObj : [],
          parentFirstName: data.parentFirstName ?? "",
          parentLastName: data.parentLastName ?? "",
          contactNumber: data.contactNumber ?? "",
          fbName: data.fbName ?? "",
        };

        setUser(member);
      }
    };

    fetchUser();
  }, [id]);

  if (!user) return <div className="p-4">Loading member data...</div>;

  return <MemberProfileClient user={user} />;
}
