// "use client"

// import { useEffect, useState } from "react"
// import { collection, getDocs } from "firebase/firestore"
// import { db } from "@/lib/firebase"

// interface InactiveMember {
//   id: string
//   firstName: string
//   lastName: string
//   absences: number
//   absentDates: string[]
// }

// export default function InactiveMembersPage() {
//   const [inactiveMembers, setInactiveMembers] = useState<InactiveMember[]>([])
//   const [loading, setLoading] = useState(false)

//   useEffect(() => {
//     const fetchInactiveMembers = async () => {
//       setLoading(true)
//       const snapshot = await getDocs(collection(db, "attendance"))
//       const userAbsenceMap: Record<string, InactiveMember> = {}

//       snapshot.forEach((docSnap) => {
//         const data = docSnap.data()
//         const responses = data.responses || {}
//         const scheduleDate = data.scheduleDate || ""

//         Object.entries(responses).forEach(([userId, res]: any) => {
//           if (res.status === "Absent") {
//             if (!userAbsenceMap[userId]) {
//               userAbsenceMap[userId] = {
//                 id: userId,
//                 firstName: res.firstName || "",
//                 lastName: res.lastName || "",
//                 absences: 1,
//                 absentDates: [scheduleDate],
//               }
//             } else {
//               userAbsenceMap[userId].absences += 1
//               userAbsenceMap[userId].absentDates.push(scheduleDate)
//             }
//           }
//         })
//       })

//       const inactive = Object.values(userAbsenceMap).filter(
//         (user) => user.absences >= 2
//       )

//       setInactiveMembers(inactive)
//       setLoading(false)
//     }

//     fetchInactiveMembers()
//   }, [])

//   // 🧹 Delete only from UI (not Firebase)
//   const handleDelete = (userId: string) => {
//     setInactiveMembers((prev) => prev.filter((user) => user.id !== userId))
//   }

//   return (
//     <div className="container mx-auto py-10 space-y-6">
//       <h1 className="text-2xl font-bold text-center">Inactive Members</h1>
//       <p className="text-center">Members with 2 or more absences</p>

//       {loading ? (
//         <p className="text-center">Loading...</p>
//       ) : (
//         <table className="min-w-full table-auto border border-gray-300">
//           <thead>
//             <tr>
//               <th className="px-4 py-2 border">Last Name</th>
//               <th className="px-4 py-2 border">First Name</th>
//               <th className="px-4 py-2 border">Absences</th>
//               <th className="px-4 py-2 border">Absent Dates</th>
//               <th className="px-4 py-2 border">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {inactiveMembers.length > 0 ? (
//               inactiveMembers.map((user) => (
//                 <tr key={user.id} className="text-center">
//                   <td className="px-4 py-2 border">{user.lastName}</td>
//                   <td className="px-4 py-2 border">{user.firstName}</td>
//                   <td className="px-4 py-2 border">{user.absences}</td>
//                   <td className="px-4 py-2 border">
//                     <ul>
//                       {user.absentDates.map((date, idx) => (
//                         <li key={idx}>{date}</li>
//                       ))}
//                     </ul>
//                   </td>
//                   <td className="px-4 py-2 border">
//                     <button
//                       onClick={() => handleDelete(user.id)}
//                       className="inline-flex items-center px-3 py-1 text-white bg-red-600 rounded hover:bg-red-700"
//                       title="Remove from list"
//                     >
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-5 w-5"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                         strokeWidth={2}
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           d="M6 18L18 6M6 6l12 12"
//                         />
//                       </svg>
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={5} className="text-center py-4">
//                   No inactive members found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       )}
//     </div>
//   )
// }

"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface InactiveMember {
  id: string;
  firstName: string;
  lastName: string;
  absences: number;
  absentDates: string[];
}

interface AttendanceResponse {
  firstName: string;
  lastName: string;
  status: "Present" | "Absent" | "Excuse";
}

export default function InactiveMembersPage() {
  const [inactiveMembers, setInactiveMembers] = useState<InactiveMember[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInactiveMembers = async () => {
      setLoading(true);
      const snapshot = await getDocs(collection(db, "attendance"));
      const userAbsenceMap: Record<string, InactiveMember> = {};

      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const responses: Record<string, AttendanceResponse> =
          data.responses || {};
        const scheduleDate = data.scheduleDate || "";

        Object.entries(responses).forEach(
          ([userId, res]: [string, AttendanceResponse]) => {
            if (res.status === "Absent") {
              if (!userAbsenceMap[userId]) {
                userAbsenceMap[userId] = {
                  id: userId,
                  firstName: res.firstName || "",
                  lastName: res.lastName || "",
                  absences: 1,
                  absentDates: [scheduleDate],
                };
              } else {
                userAbsenceMap[userId].absences += 1;
                userAbsenceMap[userId].absentDates.push(scheduleDate);
              }
            }
          }
        );
      });

      const inactive = Object.values(userAbsenceMap).filter(
        (user) => user.absences >= 2
      );

      setInactiveMembers(inactive);
      setLoading(false);
    };

    fetchInactiveMembers();
  }, []);

  // 🧹 Delete only from UI (not Firebase)
  const handleDelete = (userId: string) => {
    setInactiveMembers((prev) => prev.filter((user) => user.id !== userId));
  };

  return (
    <div className="container mx-auto py-10 space-y-6">
      <h1 className="text-2xl font-bold text-center">Inactive Members</h1>
      <p className="text-center">Members with 2 or more absences</p>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <table className="min-w-full table-auto border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Last Name</th>
              <th className="px-4 py-2 border">First Name</th>
              <th className="px-4 py-2 border">Absences</th>
              <th className="px-4 py-2 border">Absent Dates</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inactiveMembers.length > 0 ? (
              inactiveMembers.map((user) => (
                <tr key={user.id} className="text-center">
                  <td className="px-4 py-2 border">{user.lastName}</td>
                  <td className="px-4 py-2 border">{user.firstName}</td>
                  <td className="px-4 py-2 border">{user.absences}</td>
                  <td className="px-4 py-2 border">
                    <ul>
                      {user.absentDates.map((date, idx) => (
                        <li key={idx}>{date}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="inline-flex items-center px-3 py-1 text-white bg-red-600 rounded hover:bg-red-700"
                      title="Remove from list"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  No inactive members found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
