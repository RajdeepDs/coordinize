'use client';

import { Button } from '@coordinize/ui/components/button';
import { Input } from '@coordinize/ui/components/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@coordinize/ui/components/table';
import { Icons } from '@coordinize/ui/lib/icons';
import { cn } from '@coordinize/ui/lib/utils';
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { RowActions } from '@/components/settings/spaces/row-actions';
import { formatDate } from '@/utils/format-date';

interface SpacesTableProps {
  readonly data: Item[];
  readonly slug: string;
}

export type Item = {
  name: string;
  identifier: string;
  membersCount: number;
  // postsCount: number;
  createdAt: string | number | Date;
};

const columns: ColumnDef<Item>[] = [
  {
    header: 'Name',
    accessorKey: 'name',
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-3">
          {/* TODO: Show when the icons are ready */}
          <div className="hidden size-5 rounded bg-muted-foreground/10" />
          <div className="flex flex-1 items-center gap-2">
            <div className="text-sm">{row.getValue('name')}</div>
            <div className="hidden text-muted-foreground text-xs sm:flex">
              {row.original.identifier}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    header: 'Members',
    accessorKey: 'membersCount',
  },
  // {
  //   header: "Posts",
  //   accessorKey: "postsCount",
  // },
  {
    header: 'Created',
    accessorKey: 'createdAt',
    cell: ({ row }) => {
      const date = formatDate(row?.getValue('createdAt'));
      return date;
    },
  },
  {
    id: 'actions',
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => <RowActions identifier={row.original.identifier} />,
    size: 60,
    enableHiding: false,
  },
];

export function SpacesTable({ data, slug }: SpacesTableProps) {
  const tableRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: 'name',
      desc: false,
    },
  ]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tableRef.current &&
        !tableRef.current.contains(event.target as Node)
      ) {
        setHoveredRowId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
            className="peer ps-8 pe-9 shadow-none"
            onChange={(event) =>
              table.getColumn('name')?.setFilterValue(event.target.value)
            }
            placeholder="Filter by name..."
            type="text"
            value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          />
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
            <Icons.search aria-hidden="true" size={16} />
          </div>
          <button
            aria-label="Clear filter"
            className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 outline-none transition-[color,box-shadow] hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() => {
              table.getColumn('name')?.setFilterValue('');
              if (inputRef.current) {
                inputRef.current.focus();
              }
            }}
            type="button"
          >
            {Boolean(table.getColumn('name')?.getFilterValue()) && (
              <Icons.circleX aria-hidden="true" size={16} />
            )}
          </button>
        </div>
        <Button
          asChild
          className="ml-auto font-normal"
          size={'sm'}
          variant="default"
        >
          <Link href={slug}>Create space</Link>
        </Button>
      </div>
      {/* Table */}
      <div className="overflow-hidden bg-background">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className="" key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      className={cn(
                        'font-normal text-muted-foreground text-sm',
                        header.column.id === 'name' && 'w-full flex-1',
                        header.column.id === 'createdAt' &&
                          'hidden sm:table-cell'
                      )}
                      key={header.id}
                    >
                      {header.isPlaceholder ? null : header.column.getCanSort() ? (
                        <div
                          className={cn(
                            'group flex h-full cursor-pointer select-none items-center justify-between gap-2'
                          )}
                          onClick={header.column.getToggleSortingHandler()}
                          onKeyDown={(e) => {
                            if (
                              header.column.getCanSort() &&
                              (e.key === 'Enter' || e.key === ' ')
                            ) {
                              e.preventDefault();
                              header.column.getToggleSortingHandler()?.(e);
                            }
                          }}
                          tabIndex={header.column.getCanSort() ? 0 : undefined}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          <span className="flex h-4 w-4 items-center justify-center">
                            {{
                              asc: (
                                <ChevronUpIcon
                                  aria-hidden="true"
                                  className="opacity-100 transition-opacity group-hover:opacity-100"
                                  size={16}
                                />
                              ),
                              desc: (
                                <ChevronDownIcon
                                  aria-hidden="true"
                                  className="opacity-100 transition-opacity group-hover:opacity-100"
                                  size={16}
                                />
                              ),
                            }[header.column.getIsSorted() as string] ?? (
                              <ChevronUpIcon
                                aria-hidden="true"
                                className="opacity-0 transition-opacity group-hover:opacity-60"
                                size={16}
                              />
                            )}
                          </span>
                        </div>
                      ) : (
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext()
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
                    className="group"
                    data-state={row.getIsSelected() && 'selected'}
                    key={row.id}
                    onMouseEnter={() => setHoveredRowId(row.id)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        className={cn(
                          'text-muted-foreground last:py-0',
                          cell.column.id === 'name' && 'text-primary',
                          cell.column.id === 'createdAt' &&
                            'hidden sm:table-cell',
                          cell.column.id === 'actions' &&
                            (hoveredRowId === row.id
                              ? 'text-muted-foreground opacity-100'
                              : 'text-muted-foreground opacity-0 group-hover:opacity-100')
                        )}
                        key={cell.id}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  className="h-24 text-center"
                  colSpan={columns.length}
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
