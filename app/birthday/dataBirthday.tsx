// "use client"

// import { useEffect, useState } from "react"
// import { collection, getDocs } from "firebase/firestore"
// import { db } from "@/lib/firebase"
// import { People, columns } from "./columns"
// import { DataTable } from "./birth-table"

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

// function isBirthday(birthStr:string){
//     try{
//         const birthday = new Date (birthStr);
//         const today = new Date();
//         return birthday.getMonth() === today.getMonth();
//     } catch{
//         return false;
//     }
// }

// export default function DataBirthday() {
//   const [data, setData] = useState<People[]>([])

// function formatBirthday(dateStr: string): string {
//   if (!dateStr) return "";

//   const date = new Date(dateStr);
//   const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
//   return date.toLocaleDateString(undefined, options);
// }

// useEffect(() => {
//   const fetchData = async () => {
//     const querySnapshot = await getDocs(collection(db, "users"));
//     const usersData: People[] = querySnapshot.docs
//       .map((doc) => {
//         const user = doc.data();
//         const birthday = user.birthday || "";
//         const formattedBirthday = birthday ? formatBirthday(birthday) : "";
//         const age = birthday ? calculateAge(birthday) : 0;

//         return {
//           id: doc.id,
//           firstName: user.firstName || "",
//           lastName: user.lastName || "",
//           age: age.toString(),
//           birthday: formattedBirthday, // use formatted birthday here
//         };
//       })
//       .filter((user) => isBirthday(user.birthday));

//     setData(usersData);
//   };

//   fetchData();
// }, []);

//     const monthName = new Date(0, (new Date().getMonth()) % 12).toLocaleString("default", { month: "long" });

//   return(
//     <>
//         <h2 className="text-2xl font-bold mb-4">🎉 {monthName} Birthday Celebrants</h2>
//         <DataTable columns={columns} data={data} />
//     </>
//   )

// }


"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { People, columns } from "./columns";
import { DataTable } from "./birth-table";

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

function isBirthday(birthStr: string) {
  try {
    const birthday = new Date(birthStr);
    const today = new Date();
    return birthday.getMonth() === today.getMonth();
  } catch {
    return false;
  }
}

export default function DataBirthday() {
  const [data, setData] = useState<People[]>([]);

  function formatBirthday(dateStr: string): string {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersData: People[] = querySnapshot.docs
        .map((doc) => {
          const user = doc.data();
          const rawBirthday = user.birthday || "";
          const formatted = rawBirthday ? formatBirthday(rawBirthday) : "";
          const age = rawBirthday ? calculateAge(rawBirthday) : 0;

          return {
            id: doc.id,
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            age: age.toString(),
            birthday: formatted,
            birthdayRaw: rawBirthday,
          };
        })
        .filter((user) => isBirthday(user.birthdayRaw));

      setData(usersData);
    };

    fetchData();
  }, []);

  const monthName = new Date(0, new Date().getMonth()).toLocaleString("default", {
    month: "long",
  });

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">
        🎉 {monthName} Birthday Celebrants
      </h2>
      <DataTable columns={columns} data={data} />
    </>
  );
}
