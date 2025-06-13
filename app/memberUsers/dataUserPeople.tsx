

"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { People, columns } from "./columns";
import { DataTableUser } from "./dataUser-table";

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

export default function DataPeopleUser() {
  const [data, setData] = useState<People[]>([]);
  const [, setStatusCounts] = useState<Record<string, number>>({});

  function formatBirthday(dateStr: string): string {
    if (!dateStr) return "";

    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  }

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersData: People[] = querySnapshot.docs.map((doc) => {
        const user = doc.data();
        const birthday = user.birthday || "";
        const age = birthday ? calculateAge(birthday) : 0;
        const formattedBirthday = birthday ? formatBirthday(birthday) : "";

        return {
          id: doc.id,
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          memberStatus: user.memberStatus || "",
          age: age.toString(),
          birthday: formattedBirthday,
        };
      });

      const counts = usersData.reduce((acc, user) => {
        const status = user.memberStatus || "Unknown";
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      setStatusCounts(counts);
      setData(usersData);
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-4 flex flex-col justify-center">
      <div className="text-sm space-y-1 flex flex-col sm:flex-row justify-evenly items-center">
        <p className="font-bold text-md">Total Members: {data.length}</p>
      </div>

      <DataTableUser columns={columns} data={data} />
    </div>
  );
}
