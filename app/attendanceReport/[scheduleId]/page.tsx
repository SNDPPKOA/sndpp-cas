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

// export default function AttendanceReportPage() {
//   const [absentees, setAbsentees] = useState<People[]>([])
//   const [presents, setPresents] = useState<People[]>([])
//   const [excuses, setExcuses] = useState<People[]>([])
//   const [scheduleDate, setScheduleDate] = useState<string | null>(null)

//   const params = useParams()
//   const scheduleId = params?.scheduleId as string

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!scheduleId) return

//       const docRef = doc(db, "attendance", scheduleId)
//       const docSnap = await getDoc(docRef)

//       if (docSnap.exists()) {
//         const attendanceData = docSnap.data()
//         const responses = attendanceData.responses || {}
//         const date = attendanceData.scheduleDate || null

//         const absenteesList: People[] = []
//         const presentsList: People[] = []
//         const excusesList: People[] = []

//         Object.entries(responses).forEach(([userId, res]: any) => {
//           const person: People = {
//             id: userId,
//             firstName: res.firstName || "",
//             lastName: res.lastName || "",
//             scheduleDate: date,
//             status: res.status,
//             memberStatus: ""
//           }

//           if (res.status === "Absent") absenteesList.push(person)
//           else if (res.status === "Present") presentsList.push(person)
//           else if (res.status === "Excuse") excusesList.push(person)
//         })

//         setAbsentees(absenteesList)
//         setPresents(presentsList)
//         setExcuses(excusesList)
//         setScheduleDate(date)
//       }
//     }

//     fetchData()
//   }, [scheduleId])

//   return (
//     <div className="container mx-auto py-10 space-y-10">
//       <h1 className="font-bold text-3xl text-center">Attendance Report</h1>
//       {scheduleDate && (
//         <p className="text-center font-semibold">Schedule Date: {scheduleDate}</p>

//       )}

//       <section>
//         <h2 className="font-bold text-xl mb-2">Absent</h2>
//            <p className="text-sm">
//              Total Absents: {absentees.length}
//            </p>
//         <DataTable columns={columns} data={absentees} scheduleId={scheduleId} />
//       </section>

//       <section>
//         <h2 className="font-bold text-xl mb-2">Excuse</h2>
//            <p className="text-sm">
//              Total Excuses: {excuses.length}
//            </p>
//         <DataTable columns={columns} data={excuses} scheduleId={scheduleId} />
//       </section>

//       <section>
//         <h2 className="font-bold text-xl mb-2">Present</h2>
//           <p className="text-sm">
//              Total Presents: {presents.length}
//            </p>
//         <DataTable columns={columns} data={presents} scheduleId={scheduleId} />
//       </section>

//     </div>
//   )
// }

"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useParams } from "next/navigation";
import type { People } from "./columns"; // ✅ Reuse shared type
import { BackMember } from "@/components/ui/back-to-member";
export const runtime = "edge";
interface AttendanceResponse {
  firstName: string;
  lastName: string;
  memberStatus: string;
  status: "Absent" | "Present" | "Excuse";
}

interface AttendanceData {
  responses: Record<string, AttendanceResponse>;
  scheduleDate?: string;
}

export default function AttendanceReportPage() {
  const [absentees, setAbsentees] = useState<People[]>([]);
  const [presents, setPresents] = useState<People[]>([]);
  const [excuses, setExcuses] = useState<People[]>([]);
  const [scheduleDate, setScheduleDate] = useState<string | null>(null);

  const params = useParams();
  const scheduleId = params?.scheduleId as string;

  useEffect(() => {
    const fetchData = async () => {
      if (!scheduleId) return;

      const docRef = doc(db, "attendance", scheduleId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const attendanceData = docSnap.data() as AttendanceData;
        const responses = attendanceData.responses || {};
        const date = attendanceData.scheduleDate ?? null;

        const absenteesList: People[] = [];
        const presentsList: People[] = [];
        const excusesList: People[] = [];

        Object.entries(responses).forEach(
          ([userId, res]: [string, AttendanceResponse]) => {
            const person: People = {
              id: userId,
              firstName: res.firstName || "",
              lastName: res.lastName || "",
              scheduleDate: date ?? undefined, // ✅ aligns with People type
              status: res.status,
              memberStatus: res.memberStatus || "",
            };

            if (res.status === "Absent") absenteesList.push(person);
            else if (res.status === "Present") presentsList.push(person);
            else if (res.status === "Excuse") excusesList.push(person);
          }
        );

        setAbsentees(absenteesList);
        setPresents(presentsList);
        setExcuses(excusesList);
        setScheduleDate(date);
      }
    };

    fetchData();
  }, [scheduleId]);

  return (
    <div className="container mx-auto py-10 space-y-10">
      <BackMember />
      <h1 className="font-bold text-3xl text-center">Attendance Report</h1>
      {scheduleDate && (
        <p className="text-center font-semibold">
          Schedule Date: {scheduleDate}
        </p>
      )}

      <section>
        <h2 className="font-bold text-xl mb-2">Absent</h2>
        <p className="text-sm">Total Absents: {absentees.length}</p>
        <DataTable columns={columns} data={absentees} scheduleId={scheduleId} />
      </section>

      <section>
        <h2 className="font-bold text-xl mb-2">Excuse</h2>
        <p className="text-sm">Total Excuses: {excuses.length}</p>
        <DataTable columns={columns} data={excuses} scheduleId={scheduleId} />
      </section>

      <section>
        <h2 className="font-bold text-xl mb-2">Present</h2>
        <p className="text-sm">Total Presents: {presents.length}</p>
        <DataTable columns={columns} data={presents} scheduleId={scheduleId} />
      </section>
    </div>
  );
}
