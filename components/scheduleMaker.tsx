// "use client";

// import { useEffect, useState } from "react";
// import { db } from "@/lib/firebase";
// import { collection, getDocs, doc, setDoc, getDoc } from "firebase/firestore";
// import {
//   DragDropContext,
//   Droppable,
//   Draggable,
//   DropResult,
// } from "@hello-pangea/dnd";

// import { Card, CardTitle } from "./ui/card";
// import { Button } from "./ui/button";

// interface Member {
//   id: string;
//   firstName: string;
//   lastName: string;
// }

// interface ScheduledMember extends Member {
//   order: number;
// }

// export default function ScheduleMaker() {
//   const [members, setMembers] = useState<Member[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   const [schedule, setSchedule] = useState<{ [key: string]: Member[] }>({
//     anticipated: [],
//     firstMass: [],
//     secondMass: [],
//     thirdMass: [],
//     fourthMass: [],
//     fifthMass: [],
//     sixthMass: [],
//     seventhMass: [],
//   });

//   const MASS_LABELS: Record<string, string> = {
//     anticipated: "Anticipated Mass (6 P.M.)",
//     firstMass: "First Mass (6 A.M.)",
//     secondMass: "Second Mass (7:30 A.M.)",
//     thirdMass: "Third Mass (9 A.M.)",
//     fourthMass: "Fourth Mass (10:30 A.M.)",
//     fifthMass: "Fifth Mass (4 P.M.)",
//     sixthMass: "Sixth Mass (5:30 P.M.)",
//     seventhMass: "Seventh Mass (7 P.M.)",
//   };

//   const [allUsers, setAllUsers] = useState<Member[]>([]);
//   const [scheduledIds, setScheduledIds] = useState<Set<string>>(new Set());

//   /* -------------------- FIRESTORE LISTENERS -------------------- */
//   useEffect(() => {
//     const unsubscribeUsers = onSnapshot(collection(db, "users"), (snapshot) => {
//       const userList = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...(doc.data() as Omit<Member, "id">),
//       }));
//       setAllUsers(userList);
//     });

//     const unsubscribeSchedule = onSnapshot(
//       doc(db, "schedule", "massSchedule"),
//       (docSnap) => {
//         if (!docSnap.exists()) return;

//         const savedSchedule = docSnap.data().schedule;
//         const reconstructed: { [key: string]: Member[] } = {
//           anticipated: [],
//           firstMass: [],
//           secondMass: [],
//           thirdMass: [],
//           fourthMass: [],
//           fifthMass: [],
//           sixthMass: [],
//           seventhMass: [],
//         };

//         const ids = new Set<string>();

//         for (const [key, value] of Object.entries(savedSchedule)) {
//           reconstructed[key] = (value as ScheduledMember[])
//             .sort((a, b) => a.order - b.order)
//             .map((m) => {
//               ids.add(m.id);
//               return {
//                 id: m.id,
//                 firstName: m.firstName,
//                 lastName: m.lastName,
//               };
//             });
//         }

//         setScheduledIds(ids);
//         setSchedule(reconstructed);
//       }
//     );

//     return () => {
//       unsubscribeUsers();
//       unsubscribeSchedule();
//     };
//   }, []);

//   /* -------------------- UNASSIGNED MEMBERS -------------------- */
//   useEffect(() => {
//     const unassigned = allUsers.filter((m) => !scheduledIds.has(m.id));
//     setMembers(unassigned);
//   }, [allUsers, scheduledIds]);

//   /* -------------------- FILTERED MEMBERS -------------------- */
//   const filteredMembers = members
//     .filter((member) =>
//       `${member.firstName} ${member.lastName}`
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase())
//     )
//     .sort((a, b) =>
//       `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`)
//     );

//   /* -------------------- RESET -------------------- */
//   const handleReset = async () => {
//     const emptySchedule = {
//       anticipated: [],
//       firstMass: [],
//       secondMass: [],
//       thirdMass: [],
//       fourthMass: [],
//       fifthMass: [],
//       sixthMass: [],
//       seventhMass: [],
//     };

//     setSchedule(emptySchedule);
//     setScheduledIds(new Set());
//     setMembers(allUsers);

//     await saveScheduleToFirestore(emptySchedule);
//   };

//   /* -------------------- DRAG END -------------------- */
//   const handleDragEnd = (result: DropResult) => {
//     const { source, destination } = result;
//     if (!destination) return;

//     const sourceId = source.droppableId;
//     const destId = destination.droppableId;

//     const sourceItems =
//       sourceId === "members" ? [...filteredMembers] : [...schedule[sourceId]];

//     const [dragged] = sourceItems.splice(source.index, 1);

//     // REMOVE from source
//     if (sourceId === "members") {
//       setMembers((prev) => prev.filter((m) => m.id !== dragged.id));
//     } else {
//       setSchedule((prev) => {
//         const updated = {
//           ...prev,
//           [sourceId]: prev[sourceId].filter((m) => m.id !== dragged.id),
//         };
//         saveScheduleToFirestore(updated);
//         return updated;
//       });
//     }

//     // ADD to destination
//     if (destId === "members") {
//       setMembers((prev) => [...prev, dragged]);
//     } else {
//       setSchedule((prev) => {
//         const updated = {
//           ...prev,
//           [destId]: [
//             ...prev[destId].slice(0, destination.index),
//             dragged,
//             ...prev[destId].slice(destination.index),
//           ],
//         };
//         saveScheduleToFirestore(updated);
//         return updated;
//       });
//     }
//   };

//   /* -------------------- SAVE TO FIRESTORE -------------------- */
//   const saveScheduleToFirestore = async (updatedSchedule: {
//     [key: string]: Member[];
//   }) => {
//     const scheduleRef = doc(db, "schedule", "massSchedule");

//     const simplified = Object.fromEntries(
//       Object.entries(updatedSchedule).map(([key, members]) => [
//         key,
//         members.map((m, index) => ({
//           ...m,
//           order: index,
//         })),
//       ])
//     );

//     await setDoc(scheduleRef, {
//       timestamp: new Date(),
//       schedule: simplified,
//     });
//   };

//   /* -------------------- UI -------------------- */
//   return (
//     <div className="p-4 flex flex-col sm:flex-row gap-6">
//       <DragDropContext onDragEnd={handleDragEnd}>
//         {/* LEFT */}
//         <div className="w-full sm:w-1/3">
//           <h2 className="text-xl font-bold mb-2">All Members</h2>

//           <input
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             placeholder="Search..."
//             className="w-full mb-4 p-2 border rounded"
//           />

//           <Droppable droppableId="members">
//             {(provided) => (
//               <ul
//                 ref={provided.innerRef}
//                 {...provided.droppableProps}
//                 className="h-[500px] overflow-y-auto space-y-2 border p-2 rounded"
//               >
//                 {filteredMembers.map((m, i) => (
//                   <Draggable key={m.id} draggableId={m.id} index={i}>
//                     {(provided) => (
//                       <li
//                         ref={provided.innerRef}
//                         {...provided.draggableProps}
//                         {...provided.dragHandleProps}
//                         className="
//                           p-2 border rounded cursor-grab
//                           bg-white dark:bg-gray-700
//                           text-gray-900 dark:text-gray-100
//                           border-gray-300 dark:border-gray-600
//                         "
//                       >
//                         {m.firstName} {m.lastName}
//                       </li>
//                     )}
//                   </Draggable>
//                 ))}
//                 {provided.placeholder}
//               </ul>
//             )}
//           </Droppable>
//         </div>

//         {/* RIGHT */}
//         <div className="flex-1">
//           <div className="flex justify-between mb-4">
//             <h2 className="text-xl font-bold">Mass Schedule</h2>
//             <Button onClick={handleReset} variant="destructive">
//               Reset
//             </Button>
//           </div>

//           <div className="grid sm:grid-cols-2 gap-4">
//             {Object.entries(schedule).map(([key, list]) => {
//               const filteredList = list.filter((member) =>
//                 `${member.firstName} ${member.lastName}`
//                   .toLowerCase()
//                   .includes(searchTerm.toLowerCase())
//               );

//               return (
//                 <Card
//                   key={key}
//                   className="
//                     p-4
//                     h-[300px]
//                     flex flex-col
//                     bg-white dark:bg-gray-800
//                     border-gray-300 dark:border-gray-700
//                   "
//                 >
//                   <CardTitle
//                     className="
//                       mb-2
//                       text-sm sm:text-base md:text-lg lg:text-xl
//                       font-semibold
//                       text-gray-900 dark:text-gray-100
//                     "
//                   >
//                     {MASS_LABELS[key]} — Total: {filteredList.length}
//                   </CardTitle>

//                   <Droppable droppableId={key}>
//                     {(provided) => (
//                       <ul
//                         ref={provided.innerRef}
//                         {...provided.droppableProps}
//                         className="
//                           flex-1
//                           overflow-y-auto
//                           space-y-2
//                           border rounded
//                           p-2
//                           bg-gray-50 dark:bg-gray-700
//                           border-gray-300 dark:border-gray-600
//                         "
//                       >
//                         {filteredList.map((member, index) => (
//                           <Draggable
//                             key={member.id}
//                             draggableId={member.id}
//                             index={index}
//                           >
//                             {(provided) => (
//                               <li
//                                 ref={provided.innerRef}
//                                 {...provided.draggableProps}
//                                 {...provided.dragHandleProps}
//                                 className="
//                                   p-2 border rounded
//                                   bg-white dark:bg-gray-600
//                                   text-gray-900 dark:text-gray-100
//                                   border-gray-300 dark:border-gray-500
//                                   cursor-grab
//                                 "
//                               >
//                                 {member.firstName} {member.lastName}
//                               </li>
//                             )}
//                           </Draggable>
//                         ))}
//                         {provided.placeholder}
//                       </ul>
//                     )}
//                   </Droppable>
//                 </Card>
//               );
//             })}
//           </div>
//         </div>
//       </DragDropContext>
//     </div>
//   );
// }

"use client";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  BorderStyle,
  ShadingType,
} from "docx";
import { saveAs } from "file-saver";

import { Download } from "lucide-react";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, doc, setDoc, onSnapshot } from "firebase/firestore";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

import { Card, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

interface Member {
  id: string;
  firstName: string;
  lastName: string;
}

interface ScheduledMember extends Member {
  order: number;
}

export default function ScheduleMaker() {
  const [members, setMembers] = useState<Member[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [schedule, setSchedule] = useState<{ [key: string]: Member[] }>({
    anticipated: [],
    firstMass: [],
    secondMass: [],
    thirdMass: [],
    fourthMass: [],
    fifthMass: [],
    sixthMass: [],
    seventhMass: [],
  });

  const downloadScheduleDocx = async () => {
    const createTable = (title: string, data: Member[]) =>
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
          ...(title
            ? [
                new TableRow({
                  children: [
                    new TableCell({
                      columnSpan: 2,
                      shading: {
                        type: ShadingType.CLEAR,
                        fill: "003366",
                      },
                      margins: { top: 120, bottom: 120, left: 120, right: 120 },
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: title,
                              bold: true,
                              color: "FFFFFF",
                              size: 26,
                            }),
                          ],
                          alignment: AlignmentType.CENTER,
                          spacing: { before: 0, after: 0 },
                        }),
                      ],
                    }),
                  ],
                }),
              ]
            : []),

          new TableRow({
            children: [
              new TableCell({
                width: { size: 8, type: WidthType.PERCENTAGE },
                shading: {
                  type: ShadingType.CLEAR,
                  fill: "E8F0F7",
                },
                children: [
                  new Paragraph({
                    children: [new TextRun({ text: "#", bold: true })],
                    alignment: AlignmentType.CENTER,
                  }),
                ],
              }),
              new TableCell({
                width: { size: 92, type: WidthType.PERCENTAGE },
                shading: {
                  type: ShadingType.CLEAR,
                  fill: "E8F0F7",
                },
                children: [
                  new Paragraph({
                    children: [new TextRun({ text: "Name", bold: true })],
                  }),
                ],
              }),
            ],
          }),

          ...(data.length
            ? data.map(
                (m, i) =>
                  new TableRow({
                    children: [
                      new TableCell({
                        shading: {
                          type: ShadingType.CLEAR,
                          fill: i % 2 === 0 ? "F5F5F5" : "FFFFFF",
                        },
                        children: [
                          new Paragraph({
                            text: `${i + 1}`,
                            alignment: AlignmentType.CENTER,
                          }),
                        ],
                      }),
                      new TableCell({
                        shading: {
                          type: ShadingType.CLEAR,
                          fill: i % 2 === 0 ? "F5F5F5" : "FFFFFF",
                        },
                        children: [
                          new Paragraph(`${m.firstName} ${m.lastName}`),
                        ],
                      }),
                    ],
                  }),
              )
            : [
                new TableRow({
                  children: [
                    new TableCell({
                      columnSpan: 2,
                      shading: {
                        type: ShadingType.CLEAR,
                        fill: "F5F5F5",
                      },
                      children: [
                        new Paragraph({
                          text: "No members assigned",
                          alignment: AlignmentType.CENTER,
                        }),
                      ],
                    }),
                  ],
                }),
              ]),
        ],
      });

    const rows: TableRow[] = [];
    const entries = Object.entries(schedule);

    for (let i = 0; i < entries.length; i += 2) {
      const [k1, d1] = entries[i];
      const [k2, d2] = entries[i + 1] || [];

      rows.push(
        new TableRow({
          children: [
            new TableCell({
              width: { size: 50, type: WidthType.PERCENTAGE },
              borders: {
                top: { style: BorderStyle.NONE },
                bottom: { style: BorderStyle.NONE },
                left: { style: BorderStyle.NONE },
                right: { style: BorderStyle.NONE },
              },
              children: [createTable(MASS_LABELS[k1], d1)],
            }),
            new TableCell({
              width: { size: 50, type: WidthType.PERCENTAGE },
              borders: {
                top: { style: BorderStyle.NONE },
                bottom: { style: BorderStyle.NONE },
                left: { style: BorderStyle.NONE },
                right: { style: BorderStyle.NONE },
              },
              children: k2 ? [createTable(MASS_LABELS[k2], d2)] : [],
            }),
          ],
        }),
      );
    }

    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              text: "Mass Schedule Summary",
              heading: HeadingLevel.TITLE,
              alignment: AlignmentType.CENTER,
            }),

            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              rows,
            }),

            new Paragraph({
              text: "Unassigned Members",
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 400 },
            }),

            createTable("", members),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, "CAS_Schedule.docx");
  };

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

  const [allUsers, setAllUsers] = useState<Member[]>([]);
  const [scheduledIds, setScheduledIds] = useState<Set<string>>(new Set());

  /* -------------------- FIRESTORE LISTENERS -------------------- */
  useEffect(() => {
    const unsubscribeUsers = onSnapshot(collection(db, "users"), (snapshot) => {
      const userList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Member, "id">),
      }));
      setAllUsers(userList);
    });

    const unsubscribeSchedule = onSnapshot(
      doc(db, "schedule", "massSchedule"),
      (docSnap) => {
        if (!docSnap.exists()) return;

        const savedSchedule = docSnap.data().schedule;
        const reconstructed: { [key: string]: Member[] } = {
          anticipated: [],
          firstMass: [],
          secondMass: [],
          thirdMass: [],
          fourthMass: [],
          fifthMass: [],
          sixthMass: [],
          seventhMass: [],
        };

        const ids = new Set<string>();

        for (const [key, value] of Object.entries(savedSchedule)) {
          reconstructed[key] = (value as ScheduledMember[])
            .sort((a, b) => a.order - b.order)
            .map((m) => {
              ids.add(m.id);
              return {
                id: m.id,
                firstName: m.firstName,
                lastName: m.lastName,
              };
            });
        }

        setScheduledIds(ids);
        setSchedule(reconstructed);
      },
    );

    return () => {
      unsubscribeUsers();
      unsubscribeSchedule();
    };
  }, []);

  /* -------------------- UNASSIGNED MEMBERS -------------------- */
  useEffect(() => {
    const unassigned = allUsers.filter((m) => !scheduledIds.has(m.id));
    setMembers(unassigned);
  }, [allUsers, scheduledIds]);

  /* -------------------- FILTERED MEMBERS -------------------- */
  const filteredMembers = members
    .filter((member) =>
      `${member.firstName} ${member.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) =>
      `${a.firstName} ${a.lastName}`.localeCompare(
        `${b.firstName} ${b.lastName}`,
      ),
    );

  /* -------------------- RESET -------------------- */
  const handleReset = async () => {
    const emptySchedule = {
      anticipated: [],
      firstMass: [],
      secondMass: [],
      thirdMass: [],
      fourthMass: [],
      fifthMass: [],
      sixthMass: [],
      seventhMass: [],
    };

    setSchedule(emptySchedule);
    setScheduledIds(new Set());
    setMembers(allUsers);

    await saveScheduleToFirestore(emptySchedule);
  };

  /* -------------------- DRAG END -------------------- */
  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceId = source.droppableId;
    const destId = destination.droppableId;

    const sourceItems =
      sourceId === "members" ? [...filteredMembers] : [...schedule[sourceId]];

    const [dragged] = sourceItems.splice(source.index, 1);

    // REMOVE from source
    if (sourceId === "members") {
      setMembers((prev) => prev.filter((m) => m.id !== dragged.id));
    } else {
      setSchedule((prev) => {
        const updated = {
          ...prev,
          [sourceId]: prev[sourceId].filter((m) => m.id !== dragged.id),
        };
        saveScheduleToFirestore(updated);
        return updated;
      });
    }

    // ADD to destination
    if (destId === "members") {
      setMembers((prev) => [...prev, dragged]);
    } else {
      setSchedule((prev) => {
        const updated = {
          ...prev,
          [destId]: [
            ...prev[destId].slice(0, destination.index),
            dragged,
            ...prev[destId].slice(destination.index),
          ],
        };
        saveScheduleToFirestore(updated);
        return updated;
      });
    }
  };

  /* -------------------- SAVE TO FIRESTORE -------------------- */
  const saveScheduleToFirestore = async (updatedSchedule: {
    [key: string]: Member[];
  }) => {
    const scheduleRef = doc(db, "schedule", "massSchedule");

    const simplified = Object.fromEntries(
      Object.entries(updatedSchedule).map(([key, members]) => [
        key,
        members.map((m, index) => ({
          ...m,
          order: index,
        })),
      ]),
    );

    await setDoc(scheduleRef, {
      timestamp: new Date(),
      schedule: simplified,
    });
  };

  /* -------------------- UI -------------------- */
  return (
    <div className="p-4 flex flex-col sm:flex-row gap-6">
      <DragDropContext onDragEnd={handleDragEnd}>
        {/* LEFT */}
        <div className="w-full sm:w-1/3">
          <h2 className="text-xl font-bold mb-2">All Members</h2>

          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="w-full mb-4 p-2 border rounded"
          />

          <Droppable droppableId="members">
            {(provided) => (
              <ul
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="h-[500px] overflow-y-auto space-y-2 border p-2 rounded"
              >
                {filteredMembers.map((m, i) => (
                  <Draggable key={m.id} draggableId={m.id} index={i}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="
                          p-2 border rounded cursor-grab
                          bg-white dark:bg-gray-700
                          text-gray-900 dark:text-gray-100
                          border-gray-300 dark:border-gray-600
                        "
                      >
                        {m.firstName} {m.lastName}
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </div>

        {/* RIGHT */}
        <div className="flex-1">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-bold">Mass Schedule</h2>

            <div className="flex gap-2">
              <button
                onClick={downloadScheduleDocx}
                className="flex items-center gap-2 px-4 py-2 rounded bg-primary text-primary-foreground hover:opacity-90 transition"
              >
                <Download className="w-4 h-4" />
                Download File
              </button>

              <Button onClick={handleReset} variant="destructive">
                Reset
              </Button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {Object.entries(schedule).map(([key, list]) => {
              const filteredList = list.filter((member) =>
                `${member.firstName} ${member.lastName}`
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()),
              );

              return (
                <Card
                  key={key}
                  className="
                    p-4
                    h-[300px]      
                    flex flex-col
                    bg-white dark:bg-gray-800
                    border-gray-300 dark:border-gray-700
                  "
                >
                  <CardTitle
                    className="
                      mb-2
                      text-sm sm:text-base md:text-lg lg:text-xl
                      font-semibold
                      text-gray-900 dark:text-gray-100
                    "
                  >
                    {MASS_LABELS[key]} — Total: {filteredList.length}
                  </CardTitle>

                  <Droppable droppableId={key}>
                    {(provided) => (
                      <ul
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="
                          flex-1
                          overflow-y-auto
                          space-y-2
                          border rounded
                          p-2
                          bg-gray-50 dark:bg-gray-700
                          border-gray-300 dark:border-gray-600
                        "
                      >
                        {filteredList.map((member, index) => (
                          <Draggable
                            key={member.id}
                            draggableId={member.id}
                            index={index}
                          >
                            {(provided) => (
                              <li
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="
                                  p-2 border rounded
                                  bg-white dark:bg-gray-600
                                  text-gray-900 dark:text-gray-100
                                  border-gray-300 dark:border-gray-500
                                  cursor-grab
                                "
                              >
                                {member.firstName} {member.lastName}
                              </li>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </ul>
                    )}
                  </Droppable>
                </Card>
              );
            })}
          </div>
        </div>
      </DragDropContext>
    </div>
  );
}
