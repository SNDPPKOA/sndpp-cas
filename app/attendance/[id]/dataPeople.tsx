




"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { doc, getDoc, collection, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { People, columns } from "./columns"
import { DataTable } from "./data-table"


export default function AttendancePage() {
  const [data, setData] = useState<People[]>([])
  const [scheduleDate, setScheduleDate] = useState("")
  const [scheduleName, setScheduleName] = useState("")

  const pathname = usePathname()
  const scheduleId = pathname.split("/").pop()

useEffect(() => {
  if (!scheduleId) return;

  const fetchData = async () => {
    try {
      const scheduleDoc = await getDoc(doc(db, "attendance", scheduleId));
      if (!scheduleDoc.exists()) return;

      const scheduleData = scheduleDoc.data();
      setScheduleDate(scheduleData.scheduleDate || "");
      setScheduleName(scheduleData.scheduleName || "");

      const usersSnap = await getDocs(collection(db, "users"));

      const usersData = usersSnap.docs.map((doc) => {
        const user = doc.data();
        return {
          id: doc.id,
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          memberStatus: user.memberStatus || "",
        };
      });

      setData(usersData);

      // Build attendanceStates from Firestore responses
      const attendanceOptions = ["Click", "Present", "Absent", "Excuse"];
      const responses = scheduleData.responses || {};
      const newAttendanceStates: Record<string, number> = {};

      usersData.forEach(user => {
        const status = responses[user.id]?.status || "Click";
        newAttendanceStates[user.id] = attendanceOptions.indexOf(status);
      });

      setAttendanceStates(newAttendanceStates);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchData();
}, [scheduleId]);


// add this to your AttendancePage state
const [attendanceStates, setAttendanceStates] = useState<Record<string, number>>({})


  return (
    <>
      <h1 className="font-bold text-2xl text-center">Attendance</h1>
      <p className="text-center font-semibold">{scheduleDate} - {scheduleName}</p>

        <DataTable
          columns={columns}
          data={data}
          scheduleId={scheduleId as string}
          attendanceStates={attendanceStates}
          setAttendanceStates={setAttendanceStates}
        />



    </>
  )
}
