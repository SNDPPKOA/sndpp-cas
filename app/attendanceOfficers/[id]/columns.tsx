"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type People = {
  id: string;
  firstName: string;
  lastName: string;
  memberStatus: string;
};

export const columns: ColumnDef<People>[] = [
  {
    accessorKey: "lastName",

    header: "First Name",
  },

  {
    accessorKey: "firstName",
    header: "First Name",
  },

  {
    accessorKey: "memberStatus",
    header: "",
    enableHiding: true, // optional but explicit
    cell: () => null, // hide from table view
  },
];
