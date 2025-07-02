// "use client";

// import { Button } from "@/components/ui/button";
// import { ColumnDef } from "@tanstack/react-table";
// import { ArrowUpDown } from "lucide-react";

// // This type is used to define the shape of our data.
// // You can use a Zod schema here if you want.
// export type People = {
//   id: string;
//   firstName: string;
//   lastName: string;
//   age: string;
//   birthday: string;
// };

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
//       );
//     },
//   },

//   {
//     accessorKey: "firstName",
//     header: "First Name",
//   },

//   {
//     accessorKey: "age",
//     header: "Age",
//   },
//   {
//     accessorKey: "birthday",
//     header: ({ column }) => {
//       return (
//         <Button
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           Birthday
//           <ArrowUpDown className="ml-2 h-4 w-4" />
//         </Button>
//       );
//     },
//   },
// ];
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export type People = {
  id: string;
  firstName: string;
  lastName: string;
  age: string;
  birthday: string;      // formatted (e.g., "August 5, 2005")
  birthdayRaw: string;   // ISO string (e.g., "2005-08-05")
};

export const columns: ColumnDef<People>[] = [
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
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "age",
    header: "Age",
  },
  {
    accessorKey: "birthday",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Birthday
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => row.original.birthday,
    sortingFn: (rowA, rowB) => {
      const a = new Date(rowA.original.birthdayRaw);
      const b = new Date(rowB.original.birthdayRaw);
      const aValue = a.getMonth() * 100 + a.getDate();
      const bValue = b.getMonth() * 100 + b.getDate();
      return aValue - bValue;
    },
  },
];
