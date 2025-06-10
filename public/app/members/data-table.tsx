// "use client";

// import {
//   ColumnDef,
//   ColumnFiltersState,
//   SortingState,
//   flexRender,
//   getCoreRowModel,
//    getFilteredRowModel,
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
// import { Label } from "@radix-ui/react-dropdown-menu"
// import { useRouter } from "next/navigation"



// // interface DataTableProps<TData, TValue> {
// //   columns: ColumnDef<TData, TValue>[]
  
// //   data: TData[]
// // }



// export function DataTable<TData, TValue>({

//   columns,
//   data,
// }: DataTableProps<TData, TValue>) {

//   const [sorting, setSorting] = React.useState<SortingState>([])
//   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
//     []
//   )
//   const table = useReactTable({
//     data,
//     columns,
//     getPaginationRowModel: getPaginationRowModel(),
//     getCoreRowModel: getCoreRowModel(),
//     onSortingChange: setSorting,
//     getSortedRowModel: getSortedRowModel(),
//     onColumnFiltersChange: setColumnFilters,
//     getFilteredRowModel: getFilteredRowModel(),
//     state: {
//       sorting,
//       columnFilters,
//     },

//   })


//   return (
//   <div>

//       <div className="flex flex-col sm:flex-row items-center py-4 gap-6 ">
//         <Input
//           placeholder="Filter Last Name..."
//           value={(table.getColumn("lastName")?.getFilterValue() as string) ?? ""}
//           onChange={(event) =>
//             table.getColumn("lastName")?.setFilterValue(event.target.value)

//           }
//           className="max-w-sm"
//         />
//         <div className="flex items-center jutify-between gap-2">
//           <p>Member Status</p>
//           <select
//               id="monthJoin"
//               name="monthJoin"
//               value={(table.getColumn("memberStatus")?.getFilterValue() as string) ?? ""}
//               onChange={(event) =>{
//                 const value = event.target.value;
//                 table.getColumn("memberStatus")?.setFilterValue(value === "All" ? undefined : value);
//               }}    
//               className="border border-gray-300 dark:border-gray-600 rounded-md p-2 text-sm  dark:text-white ">
//                   <option value="All">All</option>
//                   <option value="Aspirant">Aspirant</option>
//                   <option value="Neophytes">Neophytes</option>
//                   <option value="Junior">Junior</option>
//                   <option value="Senior">Senior</option>
//           </select>
//         </div>

//         <div className="flex items-center jutify-between gap-2">
//           <p>Member Status</p>
//           <select
//               id="monthJoin"
//               name="monthJoin"
//               className="border border-gray-300 dark:border-gray-600 rounded-md p-2 text-sm  dark:text-white ">
//                   <option value="Aspirant">Active</option>
//                   <option value="Neophytes">Inative</option>

//           </select>
//         </div>

        
//       </div>
//     <div className="rounded-md border">
//       <Table>
//         <TableHeader>
//           {table.getHeaderGroups().map((headerGroup) => (
//             <TableRow key={headerGroup.id}>
//               {headerGroup.headers.map((header) => {
//                 return (
//                   <TableHead key={header.id}>
//                     {header.isPlaceholder
//                       ? null
//                       : flexRender(
//                           header.column.columnDef.header,
//                           header.getContext()
//                         )}
//                   </TableHead>
//                 )
//               })}
//             </TableRow>
//           ))}
//         </TableHeader>


//         <TableBody>
//           {table.getRowModel().rows?.length ? (
//             table.getRowModel().rows.map((row) => (
//               <TableRow
//                 key={row.id}
//                 data-state={row.getIsSelected() && "selected"}


//               >
//                 {row.getVisibleCells().map((cell) => (
//                   <TableCell key={cell.id}>
//                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             ))
//           ) : (
//             <TableRow>
//               <TableCell colSpan={columns.length} className="h-24 text-center">
//                 No results.
//               </TableCell>
//             </TableRow>
//           )}
//         </TableBody>


//       </Table>
//     </div>


//       <div className="flex items-center justify-end space-x-2 py-4">
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={() => table.previousPage()}
//           disabled={!table.getCanPreviousPage()}
//         >
//           Previous
//         </Button>
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={() => table.nextPage()}
//           disabled={!table.getCanNextPage()}
//         >
//           Next
//         </Button>
//       </div>
//     </div>
//   )
// }

"use client"

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
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import React from "react"
import { useRouter } from "next/navigation"

// Ensure TData includes an `id` field
interface DataTableProps<TData extends { id: string }, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData extends { id: string }, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const router = useRouter()

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )

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
  })

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-center py-4 gap-6">
        <Input
          placeholder="Filter Last Name..."
          value={(table.getColumn("lastName")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("lastName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        <div className="flex items-center justify-between gap-2">
          <p>Member Status</p>
          <select
            id="memberStatus"
            name="memberStatus"
            value={(table.getColumn("memberStatus")?.getFilterValue() as string) ?? ""}
            onChange={(event) => {
              const value = event.target.value
              table.getColumn("memberStatus")?.setFilterValue(value === "All" ? undefined : value)
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
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => router.push(`/members/${row.original.id}`)}
                  className="cursor-pointer hover:bg-muted"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

    </div>
  )
}

