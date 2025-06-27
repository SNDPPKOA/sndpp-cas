"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type People = {
  id: string;
  firstName: string;
  lastName: string;
  memberStatus: string;
  age: string;
  liturgicalObj: string[];
};

export const columns: ColumnDef<People>[] = [
  {
    accessorKey: "lastName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "firstName",
    header: "First Name",
  },

  {
    accessorKey: "memberStatus",
    header: "Member",
  },

  {
    accessorKey: "age",
    header: "Age",
  },
  {
    accessorKey: "liturgicalObj",
    header: "", // hides column header
    enableHiding: true, // optional: allow column hiding
    cell: () => null, // hides cell content
    filterFn: (row, id, value) => {
      const objList = row.getValue(id) as string[]; // ensure it's an array
      return objList?.includes(value);
    },
  },
];
