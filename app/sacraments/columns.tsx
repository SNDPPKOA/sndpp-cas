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
  baptism: string;
  age: string;
  communion: string;
  kumpil: string;
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
    accessorKey: "age",
    header: "Age",
  },

  {
    accessorKey: "baptism",
    header: "Baptism",
  },

  {
    accessorKey: "communion",
    header: "Communion",
  },
  {
    accessorKey: "kumpil",
    header: "Kumpil",
  },
];
