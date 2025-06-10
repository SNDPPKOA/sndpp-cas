"use client"

import { useEffect, useState } from "react"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { DataTable } from "./data-table"
import { columns } from "./columns"
import { useParams } from "next/navigation"

interface People {
  id: string
  firstName: string
  lastName: string
  memberStatus: string
  scheduleDate?: string
  status: string
}

export default function Absent() {
  const [data, setData] = useState<People[]>([])
  const [scheduleDate, setScheduleDate] = useState<string | null>(null)

  const params = useParams()
  const scheduleId = params?.attendanceReport as string

  useEffect(() => {
    const fetchData = async () => {
      if (!scheduleId) return

      const docRef = doc(db, "attendance", scheduleId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const attendanceData = docSnap.data()
        const responses = attendanceData.responses || {}
        const date = attendanceData.scheduleDate || null

        const absentees: People[] = Object.entries(responses)
          .filter(([_, res]: any) => res.status === "Absent")
          .map(([userId, res]: any) => ({
            id: userId,
            firstName: res.firstName || "",
            lastName: res.lastName || "",
            memberStatus: res.memberStatus|| "",
            scheduleDate: date,
            status: res.status,
          }))

        setData(absentees)
        setScheduleDate(date)
      }
    }

    fetchData()
  }, [scheduleId])

  return (
    <>
      <h1 className="font-bold text-2xl text-center">Absent</h1>
      {scheduleDate && (
        <p className="text-center font-semibold">Schedule Date: {scheduleDate}</p>
      )}
             <DataTable
               columns={columns}
               data={data}
               scheduleId={scheduleId as string}
             />
    </>
  )
}



// "use client"

// import { useEffect, useState } from "react"
// import { collection, getDocs, doc, getDoc } from "firebase/firestore"
// import { db } from "@/lib/firebase"
// import { DataTable } from "./data-table"
// import { columns } from "./columns"

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
//   const [latestScheduleId, setLatestScheduleId] = useState<string | null>(null)
//   const [latestScheduleDate, setLatestScheduleDate] = useState<string | null>(null)

//   useEffect(() => {
//     const fetchLatestScheduleId = async () => {
//       const querySnapshot = await getDocs(collection(db, "attendance"))

//       // Find the latest attendance doc by scheduleDate
//       const sorted = [...querySnapshot.docs].sort((a, b) => {
//         const dateA = a.data().scheduleDate || ""
//         const dateB = b.data().scheduleDate || ""
//         return dateB.localeCompare(dateA)
//       })

//       if (sorted.length > 0) {
//         const latestDoc = sorted[0]
//         const id = latestDoc.id
//         const date = latestDoc.data().scheduleDate
//         setLatestScheduleId(id)
//         setLatestScheduleDate(date)
//       }
//     }

//     fetchLatestScheduleId()
//   }, [])

//   useEffect(() => {
//     const fetchAttendanceById = async () => {
//       if (!latestScheduleId) return

//       const docRef = doc(db, "attendance", latestScheduleId)
//       const docSnap = await getDoc(docRef)

//       if (!docSnap.exists()) return

//       const attendanceData = docSnap.data()
//       const scheduleDate = attendanceData.scheduleDate || ""
//       const responses = attendanceData.responses || {}

//       const absentees: People[] = []

//       Object.entries(responses).forEach(([userId, userResponse]: any) => {
//         if (userResponse.status === "Absent") {
//           absentees.push({
//             id: userId,
//             firstName: userResponse.firstName || "",
//             lastName: userResponse.lastName || "",
//             memberStatus: userResponse.memberStatus || "",
//             scheduleDate,
//             status: userResponse.status,
//           })
//         }
//       })

//       setData(absentees)
//     }

//     fetchAttendanceById()
//   }, [latestScheduleId])

//   return (
//     <>
//       <h1 className="font-bold text-2xl text-center">Absent</h1>
//       {latestScheduleDate && (
//         <p className="text-center font-semibold">
//           Latest Schedule: {latestScheduleDate}
//         </p>
//       )}
//       <DataTable columns={columns} data={data} />
//     </>
//   )
// }
