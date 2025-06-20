// "use client"

// import { useEffect, useState } from "react"
// import { doc, getDoc } from "firebase/firestore"
// import { db } from "@/lib/firebase"
// import { DataTable } from "./data-table"
// import { columns } from "./columns"
// import { useParams } from "next/navigation"

// interface People {
//   id: string
//   firstName: string
//   lastName: string
//   memberStatus: string
//   scheduleDate?: string
//   status: string
// }

// export default function Absent() {
//   const [data, setData] = useState<People[]>([])
//   const [scheduleDate, setScheduleDate] = useState<string | null>(null)

//   const params = useParams()
//   const scheduleId = params?.attendanceReport as string

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!scheduleId) return

//       const docRef = doc(db, "attendance", scheduleId)
//       const docSnap = await getDoc(docRef)

//       if (docSnap.exists()) {
//         const attendanceData = docSnap.data()
//         const responses = attendanceData.responses || {}
//         const date = attendanceData.scheduleDate || null

//         const absentees: People[] = Object.entries(responses)
//           .filter(([, res]: any) => res.status === "Absent")
//           .map(([userId, res]: any) => ({
//             id: userId,
//             firstName: res.firstName || "",
//             lastName: res.lastName || "",
//             memberStatus: res.memberStatus|| "",
//             scheduleDate: date,
//             status: res.status,
//           }))

//         setData(absentees)
//         setScheduleDate(date)
//       }
//     }

//     fetchData()
//   }, [scheduleId])

//   return (
//     <>
//       <h1 className="font-bold text-2xl text-center">Absent</h1>
//       {scheduleDate && (
//         <p className="text-center font-semibold">Schedule Date: {scheduleDate}</p>
//       )}
//              <DataTable
//                columns={columns}
//                data={data}
//                scheduleId={scheduleId as string}
//              />
//     </>
//   )
// }

"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useParams } from "next/navigation";
import type { People } from "./columns";


interface AttendanceResponse {
  firstName: string;
  lastName: string;
  memberStatus: string;
  status: string;
}

interface AttendanceData {
  responses: Record<string, AttendanceResponse>;
  scheduleDate?: string;
}

export default function Absent() {
  const [data, setData] = useState<People[]>([]);
  const [scheduleDate, setScheduleDate] = useState<string | null>(null);

  const params = useParams();
  const scheduleId = params?.attendanceReport as string;

  useEffect(() => {
    const fetchData = async () => {
      if (!scheduleId) return;

      const docRef = doc(db, "attendance", scheduleId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const attendanceData = docSnap.data() as AttendanceData;
        const responses = attendanceData.responses || {};
        const date = attendanceData.scheduleDate; // inferred as string | undefined

        const absentees: People[] = Object.entries(responses)
          .filter(([, res]) => res.status === "Absent")
          .map(([userId, res]) => ({
            id: userId,
            firstName: res.firstName || "",
            lastName: res.lastName || "",
            memberStatus: res.memberStatus || "",
            scheduleDate: date,
            status: res.status,
          }));

        setData(absentees);
        setScheduleDate(date ?? null); // still using null for UI display
      }
    };

    fetchData();
  }, [scheduleId]);

  return (
    <>
   
      <h1 className="font-bold text-2xl text-center">Absent</h1>
      {scheduleDate && (
        <p className="text-center font-semibold">
          Schedule Date: {scheduleDate}
        </p>
      )}

      <DataTable columns={columns} data={data} scheduleId={scheduleId} />
    </>
  );
}
