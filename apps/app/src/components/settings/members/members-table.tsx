"use client";

import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

import { formatDateToMonthYear } from "@/utils/format-date";
import { Button } from "@coordinize/ui/components/button";
import { Input } from "@coordinize/ui/components/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@coordinize/ui/components/table";
import { Icons } from "@coordinize/ui/lib/icons";
import { cn } from "@coordinize/ui/lib/utils";

interface MembersTableProps {
  readonly data: Item[];
}

export type Item = {
  imageSrc: string | null;
  name: string;
  email: string;
  status: string;
  joinedAt: string | number | Date;
};

const columns: ColumnDef<Item>[] = [
  {
    header: "Name",
    accessorKey: "name",
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-3">
          {row.original.imageSrc && (
            <Image
              src={row.original.imageSrc}
              alt={`Profile picture of ${row.getValue("name")}`}
              width={20}
              height={20}
              className="size-5 rounded-full"
              priority
            />
          )}
          <div className="flex flex-1 items-center gap-2">
            <div className="text-sm">{row.getValue("name")}</div>
          </div>
        </div>
      );
    },
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Status",
    accessorKey: "status",
  },
  {
    header: "Joined",
    accessorKey: "joinedAt",
    cell: ({ row }) => {
      const date = formatDateToMonthYear(row?.getValue("joinedAt"));
      return date;
    },
  },
];

export function MembersTable({ data }: MembersTableProps) {
  const tableRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "name",
      desc: false,
    },
  ]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="w-full space-y-4" ref={tableRef}>
      {/* Filters */}
      <div className="flex items-center">
        <div className="relative">
          <Input
            type="text"
            placeholder="Filter by name..."
            className="peer ps-8 pe-9 shadow-none"
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
          />
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
            <Icons.search size={16} aria-hidden="true" />
          </div>
          <button
            type="button"
            className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 outline-none transition-[color,box-shadow] hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Clear filter"
            onClick={() => {
              table.getColumn("name")?.setFilterValue("");
              if (inputRef.current) {
                inputRef.current.focus();
              }
            }}
          >
            {Boolean(table.getColumn("name")?.getFilterValue()) && (
              <Icons.circleX size={16} aria-hidden="true" />
            )}
          </button>
        </div>
        {/* TODO: Implement a dialog to invite members */}
        <Button className="ml-auto font-normal" variant="default" size={"sm"}>
          Invite
        </Button>
      </div>
      {/* Table */}
      <div className="overflow-hidden bg-background">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={cn(
                        "font-normal text-muted-foreground text-sm",
                        header.column.id === "name" && "w-full flex-1",
                        header.column.id === "joinedAt" &&
                          "hidden sm:table-cell",
                      )}
                    >
                      {header.isPlaceholder ? null : header.column.getCanSort() ? (
                        <div
                          className={cn(
                            "group flex h-full cursor-pointer select-none items-center justify-between gap-2",
                          )}
                          onClick={header.column.getToggleSortingHandler()}
                          onKeyDown={(e) => {
                            if (
                              header.column.getCanSort() &&
                              (e.key === "Enter" || e.key === " ")
                            ) {
                              e.preventDefault();
                              header.column.getToggleSortingHandler()?.(e);
                            }
                          }}
                          tabIndex={header.column.getCanSort() ? 0 : undefined}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          <span className="flex h-4 w-4 items-center justify-center">
                            {{
                              asc: (
                                <ChevronUpIcon
                                  className="opacity-100 transition-opacity group-hover:opacity-100"
                                  size={16}
                                  aria-hidden="true"
                                />
                              ),
                              desc: (
                                <ChevronDownIcon
                                  className="opacity-100 transition-opacity group-hover:opacity-100"
                                  size={16}
                                  aria-hidden="true"
                                />
                              ),
                            }[header.column.getIsSorted() as string] ?? (
                              <ChevronUpIcon
                                className="opacity-0 transition-opacity group-hover:opacity-60"
                                size={16}
                                aria-hidden="true"
                              />
                            )}
                          </span>
                        </div>
                      ) : (
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                return (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="group"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className={cn(
                          "text-muted-foreground last:py-0",
                          cell.column.id === "name" && "text-primary",
                          cell.column.id === "status" &&
                            "lowercase first-letter:uppercase",
                          cell.column.id === "joinedAt" &&
                            "hidden sm:table-cell",
                        )}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  No matching members.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
