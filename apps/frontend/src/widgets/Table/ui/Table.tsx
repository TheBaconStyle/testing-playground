"use client";
import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  type TableState,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";

export type TDataTable<T extends object> = {
  data: T[];
  columns: ColumnDef<T>[];
};

export function DataTable<T extends object>({ data, columns }: TDataTable<T>) {
  const columnIDs = useMemo(() => columns.map((col) => col.id), [columns]);

  const [columnVisibility, setColumnVisibility] = useState<
    TableState["columnVisibility"]
  >(() => {
    return columnIDs.reduce(
      (acc, id) => {
        if (id) acc[id] = true;
        return acc;
      },
      {} as TableState["columnVisibility"]
    );
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
  });

  return (
    <Stack sx={{ py: 2, gap: 2 }}>
      <TableContainer sx={{ px: 2 }}>
        <Table>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>

          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}
