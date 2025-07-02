// "use client"

// import {
//   ColumnDef,
//   ColumnFiltersState,
//   SortingState,
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
// } from "@tanstack/react-table"

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import React from "react"
// import { useRouter } from "next/navigation"
// import { doc, updateDoc, deleteField } from "firebase/firestore"
// import { db } from "@/lib/firebase"

// // Ensure TData includes an id field
// // interface DataTableProps<
// //   TData extends { id: string; firstName: string; lastName: string },
// //   TValue
// // >
// // {
// //   data: TData[]
// //   columns: any
// //   scheduleId: string
// //   attendanceStates: Record<string, number>
// //   setAttendanceStates: React.Dispatch<React.SetStateAction<Record<string, number>>>
// // }

// interface DataTableProps<
//   TData extends { id: string; firstName: string; lastName: string },
//   TValue
// >
// {
//   data: TData[]
//   columns: ColumnDef<TData, TValue>[]
//   scheduleId: string
//   attendanceStates: Record<string, number>
//   setAttendanceStates: React.Dispatch<React.SetStateAction<Record<string, number>>>
// }

// // interface DataTableProps<TData extends { id: string }, TValue> {
// //   columns: ColumnDef<TData, TValue>[]
// //   data: TData[]
// // }

// export function DataTable<
//   TData extends { id: string; firstName: string; lastName: string },
//   TValue
// >({
//   columns,
//   data,
//   scheduleId,
//   attendanceStates,
//   setAttendanceStates,
// }: DataTableProps<TData, TValue>) {
//   const router = useRouter()

//   const [sorting, setSorting] = React.useState<SortingState>([])
//   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     onSortingChange: setSorting,
//     onColumnFiltersChange: setColumnFilters,
//     state: {
//       sorting,
//       columnFilters,
//     },
//   })

//   const attendanceOptions = ["Click", "Present", "Absent", "Excuse"]

//   const handleAttendance = async (
//     rowId: string,
//     scheduleId: string,
//     firstName: string,
//     lastName: string
//   ) => {
//     setAttendanceStates((prev) => {
//       const currentIndex = prev[rowId] ?? 0
//       const nextIndex = (currentIndex + 1) % attendanceOptions.length

//       const newState = {
//         ...prev,
//         [rowId]: nextIndex,
//       }

//       const status = attendanceOptions[nextIndex]
//       const attendanceRef = doc(db, "attendance", scheduleId)

//       if (status === "Click") {
//         updateDoc(attendanceRef, {
//           [`responses.${rowId}`]: deleteField(),
//         }).catch((error) => {
//           console.error("Error deleting attendance status:", error)
//         })
//       } else {
//         updateDoc(attendanceRef, {
//           [`responses.${rowId}`]: {
//             firstName,
//             lastName,
//             status,
//           },
//         }).catch((error) => {
//           console.error("Error updating attendance status:", error)
//         })
//       }

//       return newState
//     })
//   }

//   const getColorClasses = (status: string) => {
//     switch (status) {
//       case "Present":
//         return "bg-green-500 text-white hover:bg-green-600"
//       case "Absent":
//         return "bg-red-500 text-white hover:bg-red-600"
//       case "Excuse":
//         return "bg-yellow-400 text-black hover:bg-yellow-500"
//       default:
//         return "bg-gray-300 text-black"
//     }
//   }

//   return (
//     <div>
//       <div className="flex flex-col sm:flex-row items-center py-4 gap-6">
//         <Input
//           placeholder="Filter Last Name..."
//           value={(table.getColumn("lastName")?.getFilterValue() as string) ?? ""}
//           onChange={(event) =>
//             table.getColumn("lastName")?.setFilterValue(event.target.value)
//           }
//           className="max-w-sm"
//         />

//         <div className="flex items-center justify-between gap-2">
//           <p>Member Status</p>
//           <select
//             id="memberStatus"
//             name="memberStatus"
//             value={(table.getColumn("memberStatus")?.getFilterValue() as string) ?? ""}
//             onChange={(event) => {
//               const value = event.target.value
//               table.getColumn("memberStatus")?.setFilterValue(
//                 value === "All" ? undefined : value
//               )
//             }}
//             className="border border-gray-300 dark:border-gray-600 rounded-md p-2 text-sm dark:text-white"
//           >
//             <option value="All">All</option>
//             <option value="Aspirant">Aspirant</option>
//             <option value="Neophytes">Neophytes</option>
//             <option value="Junior">Junior</option>
//             <option value="Senior">Senior</option>
//           </select>
//         </div>

//         {scheduleId && (
//           <Button
//             onClick={() => router.push(`/attendanceReport/${scheduleId}`)}

//           >
//             Summary
//           </Button>
//         )}

//       </div>

//       <div className="rounded-md border">
//         <Table>
//           <TableHeader>
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TableRow key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => (
//                   <TableHead key={header.id}>
//                     {header.isPlaceholder
//                       ? null
//                       : flexRender(header.column.columnDef.header, header.getContext())}
//                   </TableHead>
//                 ))}
//               </TableRow>
//             ))}
//           </TableHeader>

//           <TableBody>
//             {table.getRowModel().rows.length ? (
//               table.getRowModel().rows.map((row) => {
//                 const currentStatus =
//                   attendanceOptions[attendanceStates[row.original.id] ?? 0]
//                 return (
//                   <TableRow key={row.id} className="cursor-pointer hover:bg-muted">
//                     {row.getVisibleCells().map((cell) => (
//                       <TableCell key={cell.id}>
//                         {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                       </TableCell>
//                     ))}

//                     <TableCell>
//                       <Button
//                         onClick={() =>
//                           handleAttendance(
//                             row.original.id,
//                             scheduleId,
//                             row.original.firstName,
//                             row.original.lastName
//                           )
//                         }
//                         className={`rounded-md px-4 py-2 text-sm font-medium ${getColorClasses(
//                           currentStatus
//                         )}`}
//                       >
//                         {currentStatus}
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 )
//               })
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={columns.length} className="h-24 text-center">
//                   No results.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   )
// }
"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import React from "react";
import { useRouter } from "next/navigation";
import { doc, updateDoc, deleteField } from "firebase/firestore";
import { db } from "@/lib/firebase";


// Fix: Use native input or ensure correct component export
const TextInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input {...props} />
);

interface DataTableProps<
  TData extends { id: string; firstName: string; lastName: string },
  TValue
> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  scheduleId: string;
  attendanceStates: Record<string, number>;
  setAttendanceStates: React.Dispatch<
    React.SetStateAction<Record<string, number>>
  >;
}

export function DataTable<
  TData extends { id: string; firstName: string; lastName: string },
  TValue
>({
  columns,
  data,
  scheduleId,
  attendanceStates,
  setAttendanceStates,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
    },
  });

  const attendanceOptions = ["Click", "Present", "Absent", "Excuse"];

  const handleAttendance = async (
    rowId: string,
    scheduleId: string,
    firstName: string,
    lastName: string
  ) => {
    setAttendanceStates((prev) => {
      const currentIndex = prev[rowId] ?? 0;
      const nextIndex = (currentIndex + 1) % attendanceOptions.length;

      const newState = {
        ...prev,
        [rowId]: nextIndex,
      };

      const status = attendanceOptions[nextIndex];
      const attendanceRef = doc(db, "attendance", scheduleId);

      if (status === "Click") {
        updateDoc(attendanceRef, {
          [`responses.${rowId}`]: deleteField(),
        }).catch((error) => {
          console.error("Error deleting attendance status:", error);
        });
      } else {
        updateDoc(attendanceRef, {
          [`responses.${rowId}`]: {
            firstName,
            lastName,
            status,
          },
        }).catch((error) => {
          console.error("Error updating attendance status:", error);
        });
      }

      return newState;
    });
  };

  const getColorClasses = (status: string) => {
    switch (status) {
      case "Present":
        return "bg-green-500 text-white hover:bg-green-600";
      case "Absent":
        return "bg-red-500 text-white hover:bg-red-600";
      case "Excuse":
        return "bg-yellow-400 text-black hover:bg-yellow-500";
      default:
        return "bg-gray-300 text-black";
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-center py-4 gap-6">
        <TextInput
          placeholder="Filter Last Name..."
          value={
            (table.getColumn("lastName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("lastName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm border border-gray-300 rounded px-2 py-1"
        />

        <div className="flex items-center justify-between gap-2">
          <p>Member Status</p>
          <select
            id="memberStatus"
            name="memberStatus"
            value={
              (table.getColumn("memberStatus")?.getFilterValue() as string) ??
              ""
            }
            onChange={(event) => {
              const value = event.target.value;
              table
                .getColumn("memberStatus")
                ?.setFilterValue(value === "All" ? undefined : value);
            }}
            className="border border-gray-300 dark:border-gray-600 rounded-md p-2 text-sm dark:text-white"
          >
            <option value="All">All</option>
            <option value="Aspirant">Aspirant</option>
            <option value="Neophytes">Neophytes</option>
            <option value="Junior">Junior</option>
            <option value="Senior">Senior</option>
          </select>
        </div>

        {scheduleId && (
          <Button
            onClick={() => router.push(`/attendanceReport/${scheduleId}`)}
          >
            Summary
          </Button>
        )}
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => {
                const currentStatus =
                  attendanceOptions[attendanceStates[row.original.id] ?? 0];
                return (
                  <TableRow
                    key={row.id}
                    className="cursor-pointer hover:bg-muted"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}

                    <TableCell>
                      <Button
                        onClick={() =>
                          handleAttendance(
                            row.original.id,
                            scheduleId,
                            row.original.firstName,
                            row.original.lastName
                          )
                        }
                        className={`rounded-md px-4 py-2 text-sm font-medium ${getColorClasses(
                          currentStatus
                        )}`}
                      >
                        {currentStatus}
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
