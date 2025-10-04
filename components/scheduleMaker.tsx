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

// interface Member {
//   id: string;
//   firstName: string;
//   lastName: string;
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

//   // ✅ Load both members and schedule on mount
//   useEffect(() => {
//     const fetchMembersAndSchedule = async () => {
//       try {
//         const snapshot = await getDocs(collection(db, "users"));
//         const allMembers = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...(doc.data() as Omit<Member, "id">),
//         }));

//         const scheduleRef = doc(db, "schedule", "massSchedule");
//         const docSnap = await getDoc(scheduleRef);

//         let reconstructed: { [key: string]: Member[] } = {
//           anticipated: [],
//           firstMass: [],
//           secondMass: [],
//           thirdMass: [],
//           fourthMass: [],
//           fifthMass: [],
//           sixthMass: [],
//           seventhMass: [],
//         };

//         const scheduledIds = new Set<string>();

//         if (docSnap.exists()) {
//           const savedSchedule = docSnap.data()?.schedule;

//           for (const [key, value] of Object.entries(savedSchedule)) {
//             const sortedList = (value as any[])
//               .sort((a, b) => a.order - b.order)
//               .map((m) => {
//                 scheduledIds.add(m.id);
//                 return {
//                   id: m.id,
//                   firstName: m.firstName,
//                   lastName: m.lastName,
//                 };
//               });
//             reconstructed[key] = sortedList;
//           }
//         }

//         // Show only members who are NOT yet assigned to any schedule
//         const unassignedMembers = allMembers.filter(
//           (m) => !scheduledIds.has(m.id)
//         );

//         setMembers(unassignedMembers);
//         setSchedule(reconstructed);
//       } catch (error) {
//         console.error("Error loading data:", error);
//       }
//     };

//     fetchMembersAndSchedule();
//   }, []);

//   const filteredMembers = members
//     .filter((member) =>
//       `${member.firstName} ${member.lastName}`
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase())
//     )
//     .sort((a, b) =>
//       `${a.firstName} ${a.lastName}`.localeCompare(
//         `${b.firstName} ${b.lastName}`
//       )
//     );

//   const handleDragEnd = (result: DropResult) => {
//     const { source, destination } = result;
//     if (!destination) return;

//     const sourceList = source.droppableId;
//     const destList = destination.droppableId;

//     const sourceItems =
//       sourceList === "members"
//         ? [...filteredMembers]
//         : [...schedule[sourceList]];

//     const [dragged] = sourceItems.splice(source.index, 1);

//     if (sourceList === "members") {
//       setMembers((prev) => prev.filter((m) => m.id !== dragged.id));
//     } else {
//       setSchedule((prev) => {
//         const updated = {
//           ...prev,
//           [sourceList]: prev[sourceList].filter((m) => m.id !== dragged.id),
//         };
//         saveScheduleToFirestore(updated);
//         return updated;
//       });
//     }

//     if (destList === "members") {
//       setMembers((prev) => [...prev, dragged]);
//     } else {
//       setSchedule((prev) => {
//         const updated = {
//           ...prev,
//           [destList]: [
//             ...prev[destList].slice(0, destination.index),
//             dragged,
//             ...prev[destList].slice(destination.index),
//           ],
//         };
//         saveScheduleToFirestore(updated);
//         return updated;
//       });
//     }
//   };

//   const saveScheduleToFirestore = async (updatedSchedule: {
//     [key: string]: Member[];
//   }) => {
//     try {
//       const scheduleRef = doc(db, "schedule", "massSchedule");

//       const simplifiedSchedule = Object.fromEntries(
//         Object.entries(updatedSchedule).map(([key, members]) => [
//           key,
//           members.map((m, index) => ({
//             id: m.id,
//             firstName: m.firstName,
//             lastName: m.lastName,
//             order: index, // 👈 Save position
//           })),
//         ])
//       );

//       await setDoc(scheduleRef, {
//         timestamp: new Date(),
//         schedule: simplifiedSchedule,
//       });
//     } catch (error) {
//       console.error("Auto-save failed:", error);
//     }
//   };

//   return (
//     <div className="p-4 flex flex-col sm:flex-row gap-6">
//       <DragDropContext onDragEnd={handleDragEnd}>
//         {/* Left Column: Member List */}
//         <div className="flex flex-col h-full w-full sm:w-1/3">
//           <h2 className="text-xl font-bold mb-2 text-black dark:text-white">
//             All Members
//           </h2>

//           <input
//             type="text"
//             placeholder="Search by name..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full h-10 p-2 mb-4 border rounded bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600 text-black"
//           />
//           <Droppable droppableId="members">
//             {(provided) => (
//               <ul
//                 ref={provided.innerRef}
//                 {...provided.droppableProps}
//                 className="h-[500px] overflow-y-auto space-y-2 pr-2 border p-2 rounded bg-white dark:bg-gray-800 dark:border-gray-600"
//               >
//                 {filteredMembers.map((member, index) => (
//                   <Draggable
//                     key={member.id}
//                     draggableId={member.id}
//                     index={index}
//                   >
//                     {(provided) => (
//                       <li
//                         ref={provided.innerRef}
//                         {...provided.draggableProps}
//                         {...provided.dragHandleProps}
//                         className="border p-2 rounded shadow bg-white dark:bg-gray-700 dark:border-gray-600 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 cursor-grab active:cursor-grabbing"
//                       >
//                         {member.firstName} {member.lastName}
//                       </li>
//                     )}
//                   </Draggable>
//                 ))}
//                 {provided.placeholder}
//               </ul>
//             )}
//           </Droppable>
//         </div>

//         {/* Right Column: Mass Schedules */}
//         <div className="flex-1">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-bold text-black dark:text-white">
//               Mass Schedule
//             </h2>
//           </div>

//           <div className="grid sm:grid-cols-2 gap-4">
//             {Object.entries(schedule).map(([key, list]) => (
//               <Card
//                 key={key}
//                 className="p-4 mb-4 bg-white h-[320px] overflow-y-auto space-y-2 pr-2 dark:bg-gray-800 dark:border-gray-700 w-full"
//               >
//                 <CardTitle className="mb-2 text-black dark:text-white">
//                   {key === "anticipated"
//                     ? "Anticipated Mass"
//                     : key === "firstMass"
//                     ? "First Mass (6 A.M.)"
//                     : key === "secondMass"
//                     ? "Second Mass (7:30 A.M.)"
//                     : key === "thirdMass"
//                     ? "Third Mass (9 A.M.)"
//                     : key === "fourthMass"
//                     ? "Fourth Mass (10:30 A.M.)"
//                     : key === "fifthMass"
//                     ? "Fifth Mass (4 P.M.)"
//                     : key === "sixthMass"
//                     ? "Sixth Mass (5:30 P.M.)"
//                     : "Seventh Mass (7 P.M.)"}

//                   <p className="text-lg text-gray-600 dark:text-gray-300">
//                     Total: {schedule[key].length}
//                   </p>
//                 </CardTitle>

//                 <Droppable droppableId={key}>
//                   {(provided) => (
//                     <ul
//                       ref={provided.innerRef}
//                       {...provided.droppableProps}
//                       className="min-h-[220px] border rounded p-2 space-y-2 bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
//                     >
//                       {list.map((member, index) => (
//                         <Draggable
//                           key={member.id}
//                           draggableId={member.id}
//                           index={index}
//                         >
//                           {(provided) => (
//                             <li
//                               ref={provided.innerRef}
//                               {...provided.draggableProps}
//                               {...provided.dragHandleProps}
//                               className="border p-2 rounded bg-white dark:bg-gray-600 dark:border-gray-500 shadow text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 cursor-grab active:cursor-grabbing"
//                             >
//                               {member.firstName} {member.lastName}
//                             </li>
//                           )}
//                         </Draggable>
//                       ))}
//                       {provided.placeholder}
//                     </ul>
//                   )}
//                 </Droppable>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </DragDropContext>
//     </div>
//   );
// }

"use client";

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

  const [allUsers, setAllUsers] = useState<Member[]>([]);
  const [scheduledIds, setScheduledIds] = useState<Set<string>>(new Set());

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
        if (docSnap.exists()) {
          const savedSchedule = docSnap.data()?.schedule;

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
            const sortedList = (value as ScheduledMember[])
              .sort((a, b) => a.order - b.order)
              .map((m) => {
                ids.add(m.id);
                return {
                  id: m.id,
                  firstName: m.firstName,
                  lastName: m.lastName,
                };
              });
            reconstructed[key] = sortedList;
          }

          setScheduledIds(ids);
          setSchedule(reconstructed);
        }
      }
    );

    return () => {
      unsubscribeUsers();
      unsubscribeSchedule();
    };
  }, []);

  useEffect(() => {
    const unassigned = allUsers.filter((m) => !scheduledIds.has(m.id));
    setMembers(unassigned);
  }, [allUsers, scheduledIds]);

  const filteredMembers = members
    .filter((member) =>
      `${member.firstName} ${member.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .sort((a, b) =>
      `${a.firstName} ${a.lastName}`.localeCompare(
        `${b.firstName} ${b.lastName}`
      )
    );

  // Inside your component
  const handleReset = async () => {
    // Combine all currently scheduled members
    const allScheduled = Object.values(schedule).flat();

    // Return them to members + keep the unassigned ones
    setMembers([...members, ...allScheduled]);

    // Clear the schedule
    const emptySchedule: { [key: string]: Member[] } = {
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

    // Save the cleared schedule to Firestore
    await saveScheduleToFirestore(emptySchedule);
  };

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceList = source.droppableId;
    const destList = destination.droppableId;
    const [previousSchedule, setPreviousSchedule] = useState<{ [key: string]: Member[] } | null>(null);


    const sourceItems =
      sourceList === "members"
        ? [...filteredMembers]
        : [...schedule[sourceList]];

    const [dragged] = sourceItems.splice(source.index, 1);

    if (sourceList === "members") {
      setMembers((prev) => prev.filter((m) => m.id !== dragged.id));
    } else {
      setSchedule((prev) => {
        const updated = {
          ...prev,
          [sourceList]: prev[sourceList].filter((m) => m.id !== dragged.id),
        };
        saveScheduleToFirestore(updated);
        return updated;
      });
    }

    if (destList === "members") {
      setMembers((prev) => [...prev, dragged]);
    } else {
      setSchedule((prev) => {
        const updated = {
          ...prev,
          [destList]: [
            ...prev[destList].slice(0, destination.index),
            dragged,
            ...prev[destList].slice(destination.index),
          ],
        };
        saveScheduleToFirestore(updated);
        return updated;
      });
    }
  };

  const saveScheduleToFirestore = async (updatedSchedule: {
    [key: string]: Member[];
  }) => {
    try {
      const scheduleRef = doc(db, "schedule", "massSchedule");

      const simplifiedSchedule = Object.fromEntries(
        Object.entries(updatedSchedule).map(([key, members]) => [
          key,
          members.map((m, index) => ({
            id: m.id,
            firstName: m.firstName,
            lastName: m.lastName,
            order: index,
          })),
        ])
      );

      await setDoc(scheduleRef, {
        timestamp: new Date(),
        schedule: simplifiedSchedule,
      });
    } catch (error) {
      console.error("Auto-save failed:", error);
    }
  };

  return (
    <div className="p-4 flex flex-col sm:flex-row gap-6">
      <DragDropContext onDragEnd={handleDragEnd}>
        {/* Left Column: Member List */}
        <div className="flex flex-col h-full w-full sm:w-1/3">
          <h2 className="text-xl font-bold mb-2 text-black dark:text-white">
            All Members
          </h2>

          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 p-2 mb-4 border rounded bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600 text-black"
          />
          <Droppable droppableId="members">
            {(provided) => (
              <ul
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="h-[500px] overflow-y-auto space-y-2 pr-2 border p-2 rounded bg-white dark:bg-gray-800 dark:border-gray-600"
              >
                {filteredMembers.map((member, index) => (
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
                        className="border p-2 rounded shadow bg-white dark:bg-gray-700 dark:border-gray-600 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 cursor-grab active:cursor-grabbing"
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
        </div>

        {/* Right Column: Mass Schedules */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-black dark:text-white">
              Mass Schedule
            </h2>
            <Button onClick={handleReset} variant="destructive">
              Reset
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {Object.entries(schedule).map(([key, list]) => (
              <Card
                key={key}
                className="p-4 mb-4 bg-white h-[320px] overflow-y-auto space-y-2 pr-2 dark:bg-gray-800 dark:border-gray-700 w-full"
              >
                <CardTitle className="mb-2 text-sm sm:text-base md:text-lg lg:text-xl text-black dark:text-white">
                  {key === "anticipated"
                    ? "Anticipated Mass"
                    : key === "firstMass"
                    ? "First Mass (6 A.M.)"
                    : key === "secondMass"
                    ? "Second Mass (7:30 A.M.)"
                    : key === "thirdMass"
                    ? "Third Mass (9 A.M.)"
                    : key === "fourthMass"
                    ? "Fourth Mass (10:30 A.M.)"
                    : key === "fifthMass"
                    ? "Fifth Mass (4 P.M.)"
                    : key === "sixthMass"
                    ? "Sixth Mass (5:30 P.M.)"
                    : "Seventh Mass (7 P.M.)"}

                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-300">
                    Total: {schedule[key].length}
                  </p>
                </CardTitle>

                <Droppable droppableId={key}>
                  {(provided) => (
                    <ul
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="min-h-[220px] border rounded p-2 space-y-2 bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
                    >
                      {list.map((member, index) => (
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
                              className="border p-2 rounded bg-white dark:bg-gray-600 dark:border-gray-500 shadow text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 cursor-grab active:cursor-grabbing"
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
            ))}
          </div>
        </div>
      </DragDropContext>
    </div>
  );
}
