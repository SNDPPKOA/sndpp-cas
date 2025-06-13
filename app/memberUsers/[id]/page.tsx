// import { doc, getDoc } from "firebase/firestore";
// import { db } from "@/lib/firebase";
// import { notFound } from "next/navigation";
// import { UserProfile } from "./memberUserEdit";
// import { UserSideBar } from "@/components/userSideBar";


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

//   return (
//     <div className="flex min-h-screen">
//       <UserSideBar />
//       <main className="flex-1 p-4">
//         <UserProfile user={{ ...user, id, age }} />
//       </main>
//     </div>
//   );
// }

import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { notFound } from "next/navigation";
import { UserProfile } from "./memberUserEdit";
export const runtime = "edge";
interface Params {
  params: { id: string };
}

// DO NOT define your own PageProps or add ts-ignore — use a destructured param object:
export default async function MemberProfilePage({ params }: Params) {
  const id = params.id;

  const docRef = doc(db, "users", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    notFound();
  }

  const data = docSnap.data()!;

  const user = {
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

  return <UserProfile user={user} />;
}

