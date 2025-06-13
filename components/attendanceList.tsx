// "use client";

// import React, { useState, useEffect } from "react";
// import {
//   collection,
//   addDoc,
//   getDocs,
//   updateDoc,
//   doc,
//   DocumentData,
//   deleteDoc,
// } from "firebase/firestore";
// import { db } from "@/lib/firebase";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Card, CardTitle } from "./ui/card";
// import { useRouter } from "next/navigation";
// import { Edit, Plus, Delete } from "lucide-react";
// import { Calendar } from "@/components/ui/calendar";

// type AttendanceData = {
//   id?: string;
//   scheduleName: string;
//   scheduleDate: string; // ISO date string YYYY-MM-DD
//   description: string;
// };

// export function AttendanceList() {
//   const [form, setForm] = useState<AttendanceData>({
//     scheduleName: "",
//     scheduleDate: "",
//     description: "",
//   });

//   const [schedules, setSchedules] = useState<AttendanceData[]>([]);
//   const [editingSchedule, setEditingSchedule] = useState<AttendanceData | null>(
//     null
//   );
//   const [dialogOpen, setDialogOpen] = useState(false);

//   const router = useRouter();

//   // Selected date defaults to today
//   const [date, setDate] = useState<Date | undefined>(new Date());

//   // Fetch schedules from Firestore
//   useEffect(() => {
//     const fetchSchedules = async () => {
//       try {
//         const snapshot = await getDocs(collection(db, "attendance"));
//         const docs = snapshot.docs.map((doc) => {
//           const data = doc.data() as DocumentData;
//           return {
//             id: doc.id,
//             scheduleName: data.scheduleName || "",
//             scheduleDate: data.scheduleDate || "",
//             description: data.description || "",
//           };
//         });
//         setSchedules(docs);
//       } catch (error) {
//         console.error("Failed to fetch schedules", error);
//       }
//     };

//     fetchSchedules();
//   }, []);

//   // Filter schedules by selected month and year
//   const filteredSchedules = schedules.filter((schedule) => {
//     if (!schedule.scheduleDate) return false;
//     const scheduleDateObj = new Date(schedule.scheduleDate);
//     if (isNaN(scheduleDateObj.getTime())) return false;

//     // Match full date: year, month, and day
//     return (
//       scheduleDateObj.getFullYear() === date?.getFullYear() &&
//       scheduleDateObj.getMonth() === date?.getMonth() &&
//       scheduleDateObj.getDate() === date?.getDate()
//     );
//   });

//   // Handle form submission (add or update)
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!form.scheduleName.trim() || !form.scheduleDate.trim()) {
//       alert("Please fill in schedule name and date.");
//       return;
//     }

//     try {
//       if (editingSchedule?.id) {
//         // Update existing schedule
//         const docRef = doc(db, "attendance", editingSchedule.id);
//         await updateDoc(docRef, form);

//         setSchedules((prev) =>
//           prev.map((s) => (s.id === editingSchedule.id ? { ...s, ...form } : s))
//         );
//         alert("Schedule updated successfully");
//       } else {
//         // Add new schedule
//         const docRef = await addDoc(collection(db, "attendance"), form);
//         setSchedules((prev) => [...prev, { ...form, id: docRef.id }]);
//         alert("Schedule added successfully");
//       }

//       setForm({ scheduleName: "", scheduleDate: "", description: "" });
//       setEditingSchedule(null);
//       setDialogOpen(false);
//     } catch (error) {
//       console.error("Error submitting schedule:", error);
//       alert("Error submitting schedule");
//     }
//   };

//   // Open dialog for editing schedule
//   const handleEditClick = (schedule: AttendanceData) => {
//     setEditingSchedule(schedule);
//     setForm(schedule);
//     setDialogOpen(true);
//   };

//   const [, setLoading] = useState(false); // <-- Add this line

//   const handleDeleteSchedule = async (scheduleId: string) => {
//     setLoading(true); // ← make sure useState for loading is defined
//     try {
//       await deleteDoc(doc(db, "attendance", scheduleId));
//       setSchedules((prev) => prev.filter((s) => s.id !== scheduleId));
//       alert("Schedule deleted.");
//     } catch (error) {
//       console.error("Failed to delete schedule:", error);
//       alert("Failed to delete schedule.");
//     }
//     setLoading(false);
//   };

//   // Open dialog for adding new schedule
//   const handleAddNewClick = () => {
//     setEditingSchedule(null);
//     setForm({ scheduleName: "", scheduleDate: "", description: "" });
//     setDialogOpen(true);
//   };

//   // Update calendar view when month changes
//   const handleMonthChange = (newMonth: Date) => {
//     setDate(newMonth);
//   };

//   return (
//     <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
//       <div className="flex h-[340px]">
//         <Calendar
//           mode="single"
//           selected={date}
//           onSelect={setDate}
//           onMonthChange={handleMonthChange} // Month change handler
//           className="rounded-md border flex-1"
//         />
//       </div>

//       <div className="flex-1">
//         {date ? (
//           <h1 className="font-bold text-2xl mb-4">
//             {date.toLocaleDateString("en-US", {
//               weekday: "long",
//               year: "numeric",
//               month: "long",
//               day: "numeric",
//             })}
//           </h1>
//         ) : (
//           <h1 className="font-bold text-2xl mb-4">No date selected</h1>
//         )}

//         <div className="mb-4">
//           <Button onClick={handleAddNewClick}>
//             <Plus className="w-4 h-4 mr-1" /> Add Schedule
//           </Button>
//         </div>

//         {filteredSchedules.length > 0 ? (
//           filteredSchedules.map((schedule) => (
//             <Card
//               key={schedule.id}
//               className="mb-4 p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition"
//               onClick={() =>
//                 schedule.id && router.push(`/attendance/${schedule.id}`)
//               }
//             >
//               <CardTitle className="flex justify-between items-center">
//                 <div>
//                   <p className="text-sm font-bold">{schedule.scheduleName}</p>
//                   <p className="text-sm font-bold">
//                     {new Date(schedule.scheduleDate).toLocaleDateString(
//                       "en-US",
//                       {
//                         year: "numeric",
//                         month: "long",
//                         day: "numeric",
//                       }
//                     )}
//                   </p>
//                 </div>

//                 <div className="flex gap-4">
//                   <Button
//                   className="font-sm"
//                     size="sm"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleEditClick(schedule);
//                     }}
//                   >
//                     <Edit className="w-4 h-4" /> Edit
//                   </Button>

//                   <Button
//                     className="bg-red-400"
//                     size="sm"
//                     onClick={(e) => {
//                       e.stopPropagation(); // Prevent navigation
//                       schedule.id && handleDeleteSchedule(schedule.id);
//                     }}
//                   >
//                     <Delete className="w-4 h-4" /> Delete
//                   </Button>
//                 </div>
//               </CardTitle>
//             </Card>
//           ))
//         ) : (
//           <p>No schedules found for this date.</p>
//         )}

//         <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle>
//                 {editingSchedule ? "Edit Schedule" : "Add Schedule"}
//               </DialogTitle>
//             </DialogHeader>

//             <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
//               <div>
//                 <Label htmlFor="scheduleName">Schedule Name</Label>
//                 <input
//                   type="text"
//                   id="scheduleName"
//                   value={form.scheduleName}
//                   onChange={(e) =>
//                     setForm({ ...form, scheduleName: e.target.value })
//                   }
//                   placeholder="Schedule Name"
//                   className="p-2 border rounded w-full"
//                   required
//                 />
//               </div>

//               <div>
//                 <Label htmlFor="scheduleDate">Date</Label>
//                 <input
//                   type="date"
//                   id="scheduleDate"
//                   value={form.scheduleDate}
//                   onChange={(e) =>
//                     setForm({ ...form, scheduleDate: e.target.value })
//                   }
//                   className="p-2 border rounded w-full"
//                   required
//                 />
//               </div>

//               <div>
//                 <Label htmlFor="description">Description</Label>
//                 <input
//                   type="text"
//                   id="description"
//                   value={form.description}
//                   onChange={(e) =>
//                     setForm({ ...form, description: e.target.value })
//                   }
//                   placeholder="Description"
//                   className="p-2 border rounded w-full"
//                 />
//               </div>

//               <Button type="submit">
//                 {editingSchedule ? "Update" : "Save"}
//               </Button>
//             </form>
//           </DialogContent>
//         </Dialog>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
  DocumentData,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardTitle } from "./ui/card";
import { useRouter } from "next/navigation";
import { Edit, Plus, Delete } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

type AttendanceData = {
  id?: string;
  scheduleName: string;
  scheduleDate: string; // ISO date string YYYY-MM-DD
  description: string;
};

export function AttendanceList() {
  const [form, setForm] = useState<AttendanceData>({
    scheduleName: "",
    scheduleDate: "",
    description: "",
  });

  const [schedules, setSchedules] = useState<AttendanceData[]>([]);
  const [editingSchedule, setEditingSchedule] = useState<AttendanceData | null>(
    null
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const snapshot = await getDocs(collection(db, "attendance"));
        const docs = snapshot.docs.map((doc) => {
          const data = doc.data() as DocumentData;
          return {
            id: doc.id,
            scheduleName: data.scheduleName || "",
            scheduleDate: data.scheduleDate || "",
            description: data.description || "",
          };
        });
        setSchedules(docs);
      } catch (error) {
        console.error("Failed to fetch schedules", error);
      }
    };

    fetchSchedules();
  }, []);

  const filteredSchedules = schedules.filter((schedule) => {
    if (!schedule.scheduleDate) return false;
    const scheduleDateObj = new Date(schedule.scheduleDate);
    if (isNaN(scheduleDateObj.getTime())) return false;

    return (
      scheduleDateObj.getFullYear() === date?.getFullYear() &&
      scheduleDateObj.getMonth() === date?.getMonth() &&
      scheduleDateObj.getDate() === date?.getDate()
    );
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.scheduleName.trim() || !form.scheduleDate.trim()) {
      alert("Please fill in schedule name and date.");
      return;
    }

    try {
      if (editingSchedule?.id) {
        const docRef = doc(db, "attendance", editingSchedule.id);
        await updateDoc(docRef, form);

        setSchedules((prev) =>
          prev.map((s) => (s.id === editingSchedule.id ? { ...s, ...form } : s))
        );
        alert("Schedule updated successfully");
      } else {
        const docRef = await addDoc(collection(db, "attendance"), form);
        setSchedules((prev) => [...prev, { ...form, id: docRef.id }]);
        alert("Schedule added successfully");
      }

      setForm({ scheduleName: "", scheduleDate: "", description: "" });
      setEditingSchedule(null);
      setDialogOpen(false);
    } catch (error) {
      console.error("Error submitting schedule:", error);
      alert("Error submitting schedule");
    }
  };

  const handleEditClick = (schedule: AttendanceData) => {
    setEditingSchedule(schedule);
    setForm(schedule);
    setDialogOpen(true);
  };

  const handleDeleteSchedule = async (scheduleId: string) => {
    setLoading(true);
    try {
      await deleteDoc(doc(db, "attendance", scheduleId));
      setSchedules((prev) => prev.filter((s) => s.id !== scheduleId));
      alert("Schedule deleted.");
    } catch (error) {
      console.error("Failed to delete schedule:", error);
      alert("Failed to delete schedule.");
    }
    setLoading(false);
  };

  const handleAddNewClick = () => {
    setEditingSchedule(null);
    setForm({ scheduleName: "", scheduleDate: "", description: "" });
    setDialogOpen(true);
  };

  const handleMonthChange = (newMonth: Date) => {
    setDate(newMonth);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
      <div className="flex h-[340px]">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          onMonthChange={handleMonthChange}
          className="rounded-md border flex-1"
        />
      </div>

      <div className="flex-1">
        {date ? (
          <h1 className="font-bold text-2xl mb-4">
            {date.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </h1>
        ) : (
          <h1 className="font-bold text-2xl mb-4">No date selected</h1>
        )}

        <div className="mb-4">
          <Button onClick={handleAddNewClick}>
            <Plus className="w-4 h-4 mr-1" /> Add Schedule
          </Button>
        </div>

        {filteredSchedules.length > 0 ? (
          filteredSchedules.map((schedule) => (
            <Card
              key={schedule.id}
              className="mb-4 p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              onClick={() => {
                if (schedule.id) {
                  router.push(`/attendance/${schedule.id}`);
                }
              }}
            >
              <CardTitle className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-bold">{schedule.scheduleName}</p>
                  <p className="text-sm font-bold">
                    {new Date(schedule.scheduleDate).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>
                </div>

                <div className="flex gap-4">
                  <Button
                    className="font-sm"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditClick(schedule);
                    }}
                  >
                    <Edit className="w-4 h-4" /> Edit
                  </Button>

                  <Button
                    className="bg-red-400"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (schedule.id) {
                        handleDeleteSchedule(schedule.id);
                      }
                    }}
                  >
                    <Delete className="w-4 h-4" /> Delete
                  </Button>
                </div>
              </CardTitle>
            </Card>
          ))
        ) : (
          <p>No schedules found for this date.</p>
        )}

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingSchedule ? "Edit Schedule" : "Add Schedule"}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
              <div>
                <Label htmlFor="scheduleName">Schedule Name</Label>
                <input
                  type="text"
                  id="scheduleName"
                  value={form.scheduleName}
                  onChange={(e) =>
                    setForm({ ...form, scheduleName: e.target.value })
                  }
                  placeholder="Schedule Name"
                  className="p-2 border rounded w-full"
                  required
                />
              </div>

              <div>
                <Label htmlFor="scheduleDate">Date</Label>
                <input
                  type="date"
                  id="scheduleDate"
                  value={form.scheduleDate}
                  onChange={(e) =>
                    setForm({ ...form, scheduleDate: e.target.value })
                  }
                  className="p-2 border rounded w-full"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <input
                  type="text"
                  id="description"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="Description"
                  className="p-2 border rounded w-full"
                />
              </div>

              <Button type="submit">
                {editingSchedule ? "Update" : "Save"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
