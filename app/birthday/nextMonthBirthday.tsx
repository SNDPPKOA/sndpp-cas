"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { columns } from "./columns";
import { DataTable } from "./birth-table";

interface People {
  id: string;
  firstName: string;
  lastName: string;
  birthday: string;
  age: string;
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

function isBirthdayInMonth(birthStr: string, targetMonth: number) {
  try {
    const birthday = new Date(birthStr);
    return birthday.getMonth() === targetMonth;
  } catch {
    return false;
  }
}

export default function NextMonthBirthday() {
  const [data, setData] = useState<People[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const today = new Date();
      const nextMonth = (today.getMonth() + 1) % 12; // Get next month index (0-11)

      const usersData: People[] = querySnapshot.docs
        .map((doc) => {
          const user = doc.data();
          const birthday = user.birthday || "";
          const age = birthday ? calculateAge(birthday) : 0;
          return {
            id: doc.id,
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            age: age.toString(),
            birthday: birthday,
          };
        })
        .filter((user) => isBirthdayInMonth(user.birthday, nextMonth)); // Filter for next month's birthdays

      setData(usersData);
    };

    fetchData();
  }, []);

  const monthName = new Date(0, (new Date().getMonth() + 1) % 12).toLocaleString("default", { month: "long" });


  return(
    <>
        <h2 className="text-2xl font-bold mb-4">🎉 {monthName} Birthday Celebrants</h2>
        <DataTable columns={columns} data={data} />
    </>
  )

}
