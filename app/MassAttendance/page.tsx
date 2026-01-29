// "use client";

// import { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import { db } from "@/lib/firebase";
// import {
//   collection,
//   onSnapshot,
//   doc,
//   getDocs,
//   setDoc,
//   updateDoc,
//   deleteField,
// } from "firebase/firestore";
// import { Card, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";
// import { ArrowLeft } from "lucide-react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// interface Member {
//   id: string;
//   firstName: string;
//   lastName: string;
//   order?: number;
// }

// interface MassSchedule {
//   [key: string]: Member[];
// }

// interface AttendanceRecord {
//   id: string;
//   scheduleName: string;
//   scheduleDate: string;
//   description: string;
// }

// interface MassAttendance {
//   [memberId: string]: {
//     firstName: string;
//     lastName: string;
//     present: boolean;
//   };
// }

// const MASS_LABELS: Record<string, string> = {
//   anticipated: "Anticipated Mass (6 P.M.)",
//   firstMass: "First Mass (6 A.M.)",
//   secondMass: "Second Mass (7:30 A.M.)",
//   thirdMass: "Third Mass (9 A.M.)",
//   fourthMass: "Fourth Mass (10:30 A.M.)",
//   fifthMass: "Fifth Mass (4 P.M.)",
//   sixthMass: "Sixth Mass (5:30 P.M.)",
//   seventhMass: "Seventh Mass (7 P.M.)",
// };

// const ATTENDANCE_OPTIONS = ["Click", "Present", "Absent", "Excuse"];

// const formatDate = (dateString: string): string => {
//   const date = new Date(dateString + "T00:00:00");
//   return date.toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });
// };

// export default function MassAttendance() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const scheduleId = searchParams.get("scheduleId");

//   const [schedule, setSchedule] = useState<MassSchedule>({
//     anticipated: [],
//     firstMass: [],
//     secondMass: [],
//     thirdMass: [],
//     fourthMass: [],
//     fifthMass: [],
//     sixthMass: [],
//     seventhMass: [],
//   });

//   const [attendanceRecords, setAttendanceRecords] = useState<
//     AttendanceRecord[]
//   >([]);

//   const [selectedDate] = useState<string>(
//     new Date().toISOString().split("T")[0],
//   );

//   const [selectedAttendance, setSelectedAttendance] =
//     useState<AttendanceRecord | null>(null);

//   const [scheduleRecord, setScheduleRecord] = useState<AttendanceRecord | null>(
//     null,
//   );

//   const [attendanceData, setAttendanceData] = useState<{
//     [massKey: string]: MassAttendance;
//   }>({});

//   const [loading, setLoading] = useState(true);

//   const [attendanceStates, setAttendanceStates] = useState<
//     Record<string, Record<string, number>>
//   >({});
//   // Fetch mass schedule from Firestore and listen for changes
//   useEffect(() => {
//     const unsubscribeSchedule = onSnapshot(
//       doc(db, "schedule", "massSchedule"),
//       (docSnap) => {
//         if (!docSnap.exists()) {
//           setLoading(false);
//           return;
//         }

//         const savedSchedule = docSnap.data().schedule;
//         const reconstructed: MassSchedule = {
//           anticipated: [],
//           firstMass: [],
//           secondMass: [],
//           thirdMass: [],
//           fourthMass: [],
//           fifthMass: [],
//           sixthMass: [],
//           seventhMass: [],
//         };

//         for (const [key, value] of Object.entries(savedSchedule)) {
//           reconstructed[key] = (value as any[])
//             .sort((a, b) => (a.order || 0) - (b.order || 0))
//             .map((m) => ({
//               id: m.id,
//               firstName: m.firstName,
//               lastName: m.lastName,
//             }));
//         }

//         setSchedule(reconstructed);
//         setLoading(false);
//       },
//     );

//     return () => {
//       unsubscribeSchedule();
//     };
//   }, []);

//   // Fetch attendance records from Firestore
//   useEffect(() => {
//     const fetchAttendanceRecords = async () => {
//       try {
//         const snapshot = await getDocs(collection(db, "attendance"));
//         const docs = snapshot.docs.map((doc) => {
//           const data = doc.data();
//           return {
//             id: doc.id,
//             scheduleName: data.scheduleName || "",
//             scheduleDate: data.scheduleDate || "",
//             description: data.description || "",
//           };
//         });
//         setAttendanceRecords(docs);
//       } catch (error) {
//         console.error("Failed to fetch attendance records", error);
//       }
//     };

//     fetchAttendanceRecords();
//   }, []);

//   // Find selected attendance record when date changes
//   useEffect(() => {
//     const found = attendanceRecords.find(
//       (record) => record.scheduleDate === selectedDate,
//     );
//     setSelectedAttendance(found || null);
//   }, [selectedDate, attendanceRecords]);

//   // Fetch schedule record details when scheduleId changes
//   useEffect(() => {
//     if (!scheduleId) {
//       setScheduleRecord(null);
//       return;
//     }

//     const found = attendanceRecords.find((record) => record.id === scheduleId);
//     setScheduleRecord(found || null);
//   }, [scheduleId, attendanceRecords]);

//   // Fetch attendance data for selected date
//   useEffect(() => {
//     const fetchAttendanceData = async () => {
//       try {
//         if (!scheduleId) {
//           setAttendanceData({});
//           setAttendanceStates({});
//           return;
//         }

//         // Fetch the attendance data directly using scheduleId
//         const allDocs = await getDocs(collection(db, "attendance"));
//         const foundDoc = allDocs.docs.find((d) => d.id === scheduleId);

//         if (!foundDoc) {
//           setAttendanceData({});
//           setAttendanceStates({});
//           return;
//         }

//         const attendanceDoc = foundDoc.data();
//         const responses = attendanceDoc.responses || {};

//         // Convert responses to attendance states
//         const newStates: Record<string, Record<string, number>> = {};

//         // First, initialize all states for all masses and members
//         Object.keys(schedule).forEach((massKey) => {
//           newStates[massKey] = {};
//           schedule[massKey].forEach((member) => {
//             newStates[massKey][member.id] = 0; // Default to "Click"
//           });
//         });

//         // Then update with actual responses
//         Object.entries(responses).forEach(
//           ([memberId, response]: [string, any]) => {
//             const status = response.status || "Click";
//             const statusIndex = ATTENDANCE_OPTIONS.indexOf(status);

//             // Find which mass this member belongs to and update
//             Object.keys(schedule).forEach((massKey) => {
//               if (newStates[massKey] && memberId in newStates[massKey]) {
//                 newStates[massKey][memberId] =
//                   statusIndex >= 0 ? statusIndex : 0;
//               }
//             });
//           },
//         );

//         setAttendanceStates(newStates);
//       } catch (error) {
//         console.error("Failed to fetch attendance data", error);
//       }
//     };

//     if (scheduleId && Object.keys(schedule).length > 0) {
//       fetchAttendanceData();
//     }
//   }, [scheduleId, schedule]);

//   const getAttendanceCount = (
//     massKey: string,
//   ): { present: number; total: number } => {
//     const scheduledMembers = schedule[massKey] || [];
//     const massAttendance = attendanceData[massKey] || {};

//     const presentCount = Object.values(massAttendance).filter(
//       (m) => m.present === true,
//     ).length;

//     return {
//       present: presentCount,
//       total: scheduledMembers.length,
//     };
//   };
//   const handleAttendance = async (
//     memberId: string,
//     massKey: string,
//     firstName: string,
//     lastName: string,
//   ) => {
//     setAttendanceStates((prev) => {
//       const massStates = prev[massKey] || {};
//       const currentIndex = massStates[memberId] ?? 0;
//       const nextIndex = (currentIndex + 1) % ATTENDANCE_OPTIONS.length;

//       const newStates = {
//         ...prev,
//         [massKey]: {
//           ...massStates,
//           [memberId]: nextIndex,
//         },
//       };

//       const status = ATTENDANCE_OPTIONS[nextIndex];

//       if (!scheduleId) {
//         alert("No attendance record selected. Please go back and try again.");
//         return prev;
//       }

//       // Save to the attendance collection using the scheduleId from URL
//       const attendanceRef = doc(db, "attendance", scheduleId);

//       if (status === "Click") {
//         // Delete the record using deleteField
//         updateDoc(attendanceRef, {
//           [`responses.${memberId}`]: deleteField(),
//         }).catch((error) => {
//           console.error("Error deleting attendance status:", error);
//         });
//       } else {
//         // Save the record
//         setDoc(
//           attendanceRef,
//           {
//             responses: {
//               [memberId]: {
//                 firstName,
//                 lastName,
//                 status,
//               },
//             },
//           },
//           { merge: true },
//         ).catch((error) => {
//           console.error("Error updating attendance status:", error);
//         });
//       }

//       return newStates;
//     });
//   };

//   const getColorClasses = (status: string) => {
//     switch (status) {
//       case "Present":
//         return "bg-green-500 text-white hover:bg-green-600";
//       case "Absent":
//         return "bg-red-500 text-white hover:bg-red-600";
//       case "Excuse":
//         return "bg-yellow-400 text-black hover:bg-yellow-500";
//       default:
//         return "bg-gray-300 text-black";
//     }
//   };
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <p>Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col gap-6 p-6 md:p-10">
//       <Button
//         onClick={() => router.back()}
//         className="flex items-center gap-2 w-fit px-6 py-3 text-lg"
//       >
//         <ArrowLeft className="w-5 h-5" />
//         Back
//       </Button>

//       <div>
//         <h1 className="font-bold text-2xl mb-4">Mass Attendance</h1>
//         {scheduleRecord ? (
//           <div className="mb-6 p-4 bg-blue-50 dark:bg-gray-700 rounded-lg border">
//             <p className="text-lg font-semibold text-blue-900 dark:text-blue-100">
//               {scheduleRecord.scheduleName}
//             </p>
//             <p className="text-base text-blue-800 dark:text-blue-200 mt-2">
//               {formatDate(scheduleRecord.scheduleDate)} -{" "}
//               {scheduleRecord.description}
//             </p>
//           </div>
//         ) : selectedAttendance ? (
//           <div className="mb-6 p-4 bg-blue-50 dark:gray-700 rounded-lg border border-blue-200 dark:border-blue-700">
//             <p className="text-lg font-semibold text-blue-900 dark:text-blue-100">
//               {selectedAttendance.scheduleDate} -{" "}
//               {selectedAttendance.description}
//             </p>
//           </div>
//         ) : null}
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {Object.entries(schedule).map(([massKey, members]) => {
//           const { present, total } = getAttendanceCount(massKey);
//           const attendancePercentage =
//             total > 0 ? Math.round((present / total) * 100) : 0;

//           return (
//             <Card
//               key={massKey}
//               className="p-4 flex flex-col bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
//             >
//               <div className="flex justify-between items-start mb-4">
//                 <div>
//                   <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
//                     {MASS_LABELS[massKey]}
//                   </CardTitle>
//                   <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
//                     Attendance: {present}/{total} ({attendancePercentage}%)
//                   </p>
//                 </div>
//                 <div
//                   className={`ml-2 px-3 py-1 rounded-full text-sm font-semibold ${
//                     present === total
//                       ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
//                       : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100"
//                   }`}
//                 >
//                   {present}/{total}
//                 </div>
//               </div>

//               {members.length > 0 ? (
//                 <div className="overflow-x-auto">
//                   <Table className="text-sm">
//                     <TableHeader>
//                       <TableRow className="bg-gray-100 dark:bg-gray-700">
//                         <TableHead className="text-gray-900 dark:text-gray-100">
//                           Member
//                         </TableHead>
//                         <TableHead className="text-center text-gray-900 dark:text-gray-100">
//                           Status
//                         </TableHead>
//                       </TableRow>
//                     </TableHeader>
//                     <TableBody>
//                       {members.map((member) => {
//                         const massStates = attendanceStates[massKey] || {};
//                         const currentStatus =
//                           ATTENDANCE_OPTIONS[massStates[member.id] ?? 0];

//                         return (
//                           <TableRow key={member.id}>
//                             <TableCell className="text-gray-900 dark:text-gray-100">
//                               {member.firstName} {member.lastName}
//                             </TableCell>
//                             <TableCell className="text-center">
//                               <Button
//                                 onClick={() =>
//                                   handleAttendance(
//                                     member.id,
//                                     massKey,
//                                     member.firstName,
//                                     member.lastName,
//                                   )
//                                 }
//                                 className={`rounded-md px-4 py-2 text-sm font-medium ${getColorClasses(
//                                   currentStatus,
//                                 )}`}
//                               >
//                                 {currentStatus}
//                               </Button>
//                             </TableCell>
//                           </TableRow>
//                         );
//                       })}
//                     </TableBody>
//                   </Table>
//                 </div>
//               ) : (
//                 <p className="text-gray-500 dark:text-gray-400 text-sm">
//                   No members scheduled for this mass.
//                 </p>
//               )}
//             </Card>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import {
  collection,
  onSnapshot,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  deleteField,
} from "firebase/firestore";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Check,
  X,
  MousePointerClick,
  CircleMinus,
} from "lucide-react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

/* =======================
   Interfaces
======================= */

interface Member {
  id: string;
  firstName: string;
  lastName: string;
  order?: number;
}

interface FirestoreMember {
  id: string;
  firstName: string;
  lastName: string;
  order?: number;
}

interface MassSchedule {
  [key: string]: Member[];
}

interface AttendanceRecord {
  id: string;
  scheduleName: string;
  scheduleDate: string;
  description: string;
}

interface AttendanceResponse {
  firstName: string;
  lastName: string;
  status: string;
}

interface MassAttendance {
  [memberId: string]: {
    firstName: string;
    lastName: string;
    present: boolean;
  };
}

/* =======================
   Constants
======================= */

const MASS_LABELS: Record<string, string> = {
  anticipated: "Anticipated Mass (6 P.M.)",
  firstMass: "First Mass (6 A.M.)",
  secondMass: "Second Mass (7:30 A.M.)",
  thirdMass: "Third Mass (9 A.M.)",
  fourthMass: "Fourth Mass (10:30 A.M.)",
  fifthMass: "Fifth Mass (4 P.M.)",
  sixthMass: "Sixth Mass (5:30 P.M.)",
  seventhMass: "Seventh Mass (7 P.M.)",
};

const ATTENDANCE_OPTIONS = ["Click", "Present", "Absent", "Excuse"];

/* =======================
   Helpers
======================= */

const formatDate = (dateString: string): string => {
  const date = new Date(dateString + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/* =======================
   Component
======================= */

export default function MassAttendance() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const scheduleId = searchParams.get("scheduleId");

  const [schedule, setSchedule] = useState<MassSchedule>({
    anticipated: [],
    firstMass: [],
    secondMass: [],
    thirdMass: [],
    fourthMass: [],
    fifthMass: [],
    sixthMass: [],
    seventhMass: [],
  });

  const [attendanceRecords, setAttendanceRecords] = useState<
    AttendanceRecord[]
  >([]);

  const [selectedDate] = useState<string>(
    new Date().toISOString().split("T")[0],
  );

  const [selectedAttendance, setSelectedAttendance] =
    useState<AttendanceRecord | null>(null);

  const [scheduleRecord, setScheduleRecord] = useState<AttendanceRecord | null>(
    null,
  );
  const [attendanceStates, setAttendanceStates] = useState<
    Record<string, Record<string, number>>
  >({});

  const [loading, setLoading] = useState(true);

  /* =======================
     Fetch Mass Schedule
  ======================= */

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "schedule", "massSchedule"),
      (docSnap) => {
        if (!docSnap.exists()) {
          setLoading(false);
          return;
        }

        const savedSchedule = docSnap.data().schedule as Record<
          string,
          FirestoreMember[]
        >;

        const reconstructed: MassSchedule = {
          anticipated: [],
          firstMass: [],
          secondMass: [],
          thirdMass: [],
          fourthMass: [],
          fifthMass: [],
          sixthMass: [],
          seventhMass: [],
        };

        for (const [key, value] of Object.entries(savedSchedule)) {
          reconstructed[key] = value
            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
            .map((m) => ({
              id: m.id,
              firstName: m.firstName,
              lastName: m.lastName,
            }));
        }

        setSchedule(reconstructed);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  /* =======================
     Fetch Attendance Records
  ======================= */

  useEffect(() => {
    const fetchAttendanceRecords = async () => {
      const snapshot = await getDocs(collection(db, "attendance"));
      const records: AttendanceRecord[] = snapshot.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          scheduleName: data.scheduleName ?? "",
          scheduleDate: data.scheduleDate ?? "",
          description: data.description ?? "",
        };
      });

      setAttendanceRecords(records);
    };

    fetchAttendanceRecords();
  }, []);

  /* =======================
     Selected Attendance
  ======================= */

  useEffect(() => {
    const found = attendanceRecords.find(
      (r) => r.scheduleDate === selectedDate,
    );
    setSelectedAttendance(found ?? null);
  }, [selectedDate, attendanceRecords]);

  useEffect(() => {
    if (!scheduleId) {
      setScheduleRecord(null);
      return;
    }

    const found = attendanceRecords.find((r) => r.id === scheduleId);
    setScheduleRecord(found ?? null);
  }, [scheduleId, attendanceRecords]);

  /* =======================
     Fetch Attendance Data
  ======================= */

  useEffect(() => {
    const fetchAttendanceData = async () => {
      if (!scheduleId) {
        setAttendanceStates({});
        return;
      }

      const snapshot = await getDocs(collection(db, "attendance"));
      const docSnap = snapshot.docs.find((d) => d.id === scheduleId);

      if (!docSnap) {
        setAttendanceStates({});
        return;
      }

      const responses = docSnap.data().responses as
        | Record<string, AttendanceResponse>
        | undefined;

      const newStates: Record<string, Record<string, number>> = {};

      Object.keys(schedule).forEach((massKey) => {
        newStates[massKey] = {};
        schedule[massKey].forEach((member) => {
          newStates[massKey][member.id] = 0;
        });
      });

      if (responses) {
        Object.entries(responses).forEach(([memberId, response]) => {
          const statusIndex = ATTENDANCE_OPTIONS.indexOf(
            response.status ?? "Click",
          );

          Object.keys(schedule).forEach((massKey) => {
            if (memberId in newStates[massKey]) {
              newStates[massKey][memberId] = statusIndex >= 0 ? statusIndex : 0;
            }
          });
        });
      }

      setAttendanceStates(newStates);
    };

    if (Object.keys(schedule).length > 0) {
      fetchAttendanceData();
    }
  }, [scheduleId, schedule]);

  /* =======================
     Handlers
  ======================= */

  const handleAttendance = async (
    memberId: string,
    massKey: string,
    firstName: string,
    lastName: string,
  ) => {
    setAttendanceStates((prev) => {
      const currentIndex = prev[massKey]?.[memberId] ?? 0;
      const nextIndex = (currentIndex + 1) % ATTENDANCE_OPTIONS.length;

      const newState = {
        ...prev,
        [massKey]: {
          ...prev[massKey],
          [memberId]: nextIndex,
        },
      };

      if (!scheduleId) return prev;

      const attendanceRef = doc(db, "attendance", scheduleId);
      const status = ATTENDANCE_OPTIONS[nextIndex];

      if (status === "Click") {
        updateDoc(attendanceRef, {
          [`responses.${memberId}`]: deleteField(),
        });
      } else {
        setDoc(
          attendanceRef,
          {
            responses: {
              [memberId]: { firstName, lastName, status },
            },
          },
          { merge: true },
        );
      }

      return newState;
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Present":
        return <Check className="w-5 h-5" />;
      case "Absent":
        return <X className="w-5 h-5" />;
      case "Excuse":
        return <CircleMinus className="w-5 h-5" />;
      default:
        return <MousePointerClick className="w-5 h-5" />;
    }
  };

  const getColorClasses = (status: string) => {
    switch (status) {
      case "Present":
        return "bg-green-500 text-white hover:bg-green-600 transition-colors";
      case "Absent":
        return "bg-red-500 text-white hover:bg-red-600 transition-colors";
      case "Excuse":
        return "bg-yellow-400 text-black hover:bg-yellow-500 transition-colors";
      default:
        return "bg-gray-300 text-black hover:bg-gray-400 transition-colors";
    }
  };

  /* =======================
     Render
  ======================= */

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 space-y-6">
      <Button onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <div>
        <h1 className="font-bold text-2xl mb-4">Mass Attendance</h1>
        {scheduleRecord ? (
          <div className="mb-6 p-4 bg-blue-50 dark:bg-gray-700 rounded-lg border">
            <p className="text-lg font-semibold text-blue-900 dark:text-blue-100">
              {scheduleRecord.scheduleName}
            </p>
            <p className="text-base text-blue-800 dark:text-blue-200 mt-2">
              {formatDate(scheduleRecord.scheduleDate)} -{" "}
              {scheduleRecord.description}
            </p>
          </div>
        ) : selectedAttendance ? (
          <div className="mb-6 p-4 bg-blue-50 dark:gray-700 rounded-lg border border-blue-200 dark:border-blue-700">
            <p className="text-lg font-semibold text-blue-900 dark:text-blue-100">
              {selectedAttendance.scheduleDate} -{" "}
              {selectedAttendance.description}
            </p>
          </div>
        ) : null}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Object.entries(schedule).map(([massKey, members]) => (
          <Card key={massKey} className="p-4">
            <CardTitle>{MASS_LABELS[massKey]}</CardTitle>

            <Table>
              <TableBody>
                {members.map((member) => {
                  const statusIndex =
                    attendanceStates[massKey]?.[member.id] ?? 0;
                  const status = ATTENDANCE_OPTIONS[statusIndex];

                  return (
                    <TableRow key={member.id}>
                      <TableCell>
                        {member.firstName} {member.lastName}
                      </TableCell>
                      <TableCell className="text-right">

                        <Button
                          className={` justify-center gap-2 ${getColorClasses(
                            status,
                          )}`}
                          onClick={() =>
                            handleAttendance(
                              member.id,
                              massKey,
                              member.firstName,
                              member.lastName,
                            )
                          }
                          title={status} // tooltip on hover 👌
                        >
                          {getStatusIcon(status)}
                        </Button>

                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Card>
        ))}
      </div>
    </div>
  );
}
