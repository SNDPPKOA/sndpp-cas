// "use client"

// import { Button } from "@/components/ui/button"
// import { ColumnDef } from "@tanstack/react-table"
// import { ArrowUpDown } from "lucide-react"

// // This type is used to define the shape of our data.
// // You can use a Zod schema here if you want.
// export type People = {
//   id: string
//   firstName: string
//   lastName: string
//   memberStatus: string
//   age: string
//   birthday: string
// }

// export const columns: ColumnDef<People>[] = [

//   {
//     accessorKey: "lastName",
//     header: ({ column }) => {
//       return (
//         <Button
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           Last Name
//           <ArrowUpDown className="ml-2 h-4 w-4" />
//         </Button>
//       )
//     },
//   },

//   {
//     accessorKey: "firstName",
//     header: "First Name",
//   },

//   {
//     accessorKey: "memberStatus",
//     header: "Member",
//   },

//     {
//       accessorKey: "age",
//       header: "Age",
//     },
//   {
//     accessorKey: "birthday",
//     header: "Birthday",
//   },

// ]

"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef, FilterFn } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export type People = {
  id: string;
  firstName: string;
  lastName: string;
  memberStatus: string;
  age: string; // age as string here
  birthday: string;
};

const ageFilterFn: FilterFn<People> = (row, columnId, filterValue) => {
  const ageStr = row.getValue<string>(columnId);
  const age = Number(ageStr);
  if (isNaN(age)) return false; // invalid age -> exclude row
  if (filterValue === "CM") return age <= 13;
  if (filterValue === "Youth") return age >= 14;
  return true; // KOA or undefined => no filter
};

export const columns: ColumnDef<People>[] = [
  {
    accessorKey: "firstName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        First Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Last Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "memberStatus",
    header: "Member",
  },
  {
    accessorKey: "age",
    header: "Age",
    filterFn: ageFilterFn,
  },
  {
    accessorKey: "birthday",
    header: "Birthday",
  },
];
