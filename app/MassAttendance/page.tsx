// "use client";

// import { useEffect, useState } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
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
// import {
//   ArrowLeft,
//   Check,
//   X,
//   MousePointerClick,
//   CircleMinus,
// } from "lucide-react";
// import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

// interface Member {
//   id: string;
//   firstName: string;
//   lastName: string;
//   order?: number;
// }

// interface FirestoreMember {
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

// interface AttendanceResponse {
//   firstName: string;
//   lastName: string;
//   status: string;
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
//   const [attendanceStates, setAttendanceStates] = useState<
//     Record<string, Record<string, number>>
//   >({});

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onSnapshot(
//       doc(db, "schedule", "massSchedule"),
//       (docSnap) => {
//         if (!docSnap.exists()) {
//           setLoading(false);
//           return;
//         }

//         const savedSchedule = docSnap.data().schedule as Record<
//           string,
//           FirestoreMember[]
//         >;

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
//           reconstructed[key] = value
//             .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
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

//     return () => unsubscribe();
//   }, []);

//   useEffect(() => {
//     const fetchAttendanceRecords = async () => {
//       const snapshot = await getDocs(collection(db, "attendance"));
//       const records: AttendanceRecord[] = snapshot.docs.map((d) => {
//         const data = d.data();
//         return {
//           id: d.id,
//           scheduleName: data.scheduleName ?? "",
//           scheduleDate: data.scheduleDate ?? "",
//           description: data.description ?? "",
//         };
//       });

//       setAttendanceRecords(records);
//     };

//     fetchAttendanceRecords();
//   }, []);

//   useEffect(() => {
//     const found = attendanceRecords.find(
//       (r) => r.scheduleDate === selectedDate,
//     );
//     setSelectedAttendance(found ?? null);
//   }, [selectedDate, attendanceRecords]);

//   useEffect(() => {
//     if (!scheduleId) {
//       setScheduleRecord(null);
//       return;
//     }

//     const found = attendanceRecords.find((r) => r.id === scheduleId);
//     setScheduleRecord(found ?? null);
//   }, [scheduleId, attendanceRecords]);

//   useEffect(() => {
//     const fetchAttendanceData = async () => {
//       if (!scheduleId) {
//         setAttendanceStates({});
//         return;
//       }

//       const snapshot = await getDocs(collection(db, "attendance"));
//       const docSnap = snapshot.docs.find((d) => d.id === scheduleId);

//       if (!docSnap) {
//         setAttendanceStates({});
//         return;
//       }

//       const responses = docSnap.data().responses as
//         | Record<string, AttendanceResponse>
//         | undefined;

//       const newStates: Record<string, Record<string, number>> = {};

//       Object.keys(schedule).forEach((massKey) => {
//         newStates[massKey] = {};
//         schedule[massKey].forEach((member) => {
//           newStates[massKey][member.id] = 0;
//         });
//       });

//       if (responses) {
//         Object.entries(responses).forEach(([memberId, response]) => {
//           const statusIndex = ATTENDANCE_OPTIONS.indexOf(
//             response.status ?? "Click",
//           );

//           Object.keys(schedule).forEach((massKey) => {
//             if (memberId in newStates[massKey]) {
//               newStates[massKey][memberId] = statusIndex >= 0 ? statusIndex : 0;
//             }
//           });
//         });
//       }

//       setAttendanceStates(newStates);
//     };

//     if (Object.keys(schedule).length > 0) {
//       fetchAttendanceData();
//     }
//   }, [scheduleId, schedule]);

//   const handleAttendance = async (
//     memberId: string,
//     massKey: string,
//     firstName: string,
//     lastName: string,
//   ) => {
//     setAttendanceStates((prev) => {
//       const currentIndex = prev[massKey]?.[memberId] ?? 0;
//       const nextIndex = (currentIndex + 1) % ATTENDANCE_OPTIONS.length;

//       const newState = {
//         ...prev,
//         [massKey]: {
//           ...prev[massKey],
//           [memberId]: nextIndex,
//         },
//       };

//       if (!scheduleId) return prev;

//       const attendanceRef = doc(db, "attendance", scheduleId);
//       const status = ATTENDANCE_OPTIONS[nextIndex];

//       if (status === "Click") {
//         updateDoc(attendanceRef, {
//           [`responses.${memberId}`]: deleteField(),
//         });
//       } else {
//         setDoc(
//           attendanceRef,
//           {
//             responses: {
//               [memberId]: { firstName, lastName, status },
//             },
//           },
//           { merge: true },
//         );
//       }

//       return newState;
//     });
//   };

//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case "Present":
//         return <Check className="w-5 h-5" />;
//       case "Absent":
//         return <X className="w-5 h-5" />;
//       case "Excuse":
//         return <CircleMinus className="w-5 h-5" />;
//       default:
//         return <MousePointerClick className="w-5 h-5" />;
//     }
//   };

//   const getColorClasses = (status: string) => {
//     switch (status) {
//       case "Present":
//         return "bg-green-500 text-white hover:bg-green-600 transition-colors";
//       case "Absent":
//         return "bg-red-500 text-white hover:bg-red-600 transition-colors";
//       case "Excuse":
//         return "bg-yellow-400 text-black hover:bg-yellow-500 transition-colors";
//       default:
//         return "bg-gray-300 text-black hover:bg-gray-400 transition-colors";
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         Loading...
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 md:p-10 space-y-6">
//       <Button onClick={() => router.back()}>
//         <ArrowLeft className="mr-2 h-4 w-4" />
//         Back
//       </Button>

//       <div>
//         <div className="flex gap-4  items-center mb-4">
//           <h1 className="font-bold text-2xl mb-4">Mass Attendance</h1>
//           <Button>Download File</Button>
//         </div>

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
//         {Object.entries(schedule).map(([massKey, members]) => (
//           <Card key={massKey} className="p-4">
//             <CardTitle>{MASS_LABELS[massKey]}</CardTitle>

//             <Table>
//               <TableBody>
//                 {members.map((member) => {
//                   const statusIndex =
//                     attendanceStates[massKey]?.[member.id] ?? 0;
//                   const status = ATTENDANCE_OPTIONS[statusIndex];

//                   return (
//                     <TableRow key={member.id}>
//                       <TableCell>
//                         {member.firstName} {member.lastName}
//                       </TableCell>
//                       <TableCell className="text-right">
//                         <Button
//                           className={` justify-center gap-2 ${getColorClasses(
//                             status,
//                           )}`}
//                           onClick={() =>
//                             handleAttendance(
//                               member.id,
//                               massKey,
//                               member.firstName,
//                               member.lastName,
//                             )
//                           }
//                           title={status}
//                         >
//                           {getStatusIcon(status)}
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   );
//                 })}
//               </TableBody>
//             </Table>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";
import { Download } from "lucide-react";
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

const formatDate = (dateString: string): string => {
  const date = new Date(dateString + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  const downloadAbsentDoc = async () => {
    if (!scheduleRecord) return;

    const paragraphs: Paragraph[] = [];

    // Title
    paragraphs.push(
      new Paragraph({
        children: [
          new TextRun({
            text: "Absences",
            bold: true,
            size: 32,
          }),
        ],
        spacing: { after: 300 },
      }),
    );

    paragraphs.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `${scheduleRecord.scheduleName}`,
            bold: true,
          }),
        ],
      }),
    );

    paragraphs.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `${formatDate(scheduleRecord.scheduleDate)} – ${scheduleRecord.description}`,
          }),
        ],
        spacing: { after: 400 },
      }),
    );

    // Loop per Mass
    Object.entries(schedule).forEach(([massKey, members]) => {
      const absentees = members.filter((member) => {
        const statusIndex = attendanceStates[massKey]?.[member.id] ?? 0;
        return ATTENDANCE_OPTIONS[statusIndex] === "Absent";
      });

      if (absentees.length === 0) return;

      // Mass title
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: MASS_LABELS[massKey],
              bold: true,
            }),
          ],
          spacing: { before: 300, after: 200 },
        }),
      );

      // Numbered names
      absentees.forEach((member, index) => {
        paragraphs.push(
          new Paragraph({
            text: `${index + 1}. ${member.firstName} ${member.lastName}`,
          }),
        );
      });
    });

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: paragraphs,
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    const safeFileName = scheduleRecord.scheduleName
      .replace(/[^a-z0-9]/gi, "_")
      .toLowerCase();

    saveAs(blob, `${safeFileName}_absences.docx`);
  };

  

  return (
    <div className="p-6 md:p-10 space-y-6">
      <Button onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <div>
        <div className="flex gap-4  items-center mb-4">
          <h1 className="font-bold text-2xl mb-4">Mass Attendance</h1>
          <button
            onClick={downloadAbsentDoc}
            className="flex items-center gap-2 px-4 py-2 rounded bg-primary text-primary-foreground hover:opacity-90 transition"
          >
            <Download className="w-4 h-4" />
            Download File
          </button>

        
        </div>

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
                          title={status}
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
