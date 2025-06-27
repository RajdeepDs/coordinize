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
  type Header,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { formatDateToMonthYear } from '@/utils/format-date';

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
    header: 'Name',
    accessorKey: 'name',
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-3">
          {row.original.imageSrc && (
            <Image
              alt={`Profile picture of ${row.getValue('name')}`}
              className="size-5 rounded-full"
              height={20}
              priority
              src={row.original.imageSrc}
              width={20}
            />
          )}
          <div className="flex flex-1 items-center gap-2">
            <div className="text-sm">{row.getValue('name')}</div>
          </div>
        </div>
      );
    },
  },
  {
    header: 'Email',
    accessorKey: 'email',
  },
  {
    header: 'Status',
    accessorKey: 'status',
  },
  {
    header: 'Joined',
    accessorKey: 'joinedAt',
    cell: ({ row }) => {
      const date = formatDateToMonthYear(row?.getValue('joinedAt'));
      return date;
    },
  },
];

const renderSortIcon = (sortDirection: string | false) => {
  if (sortDirection === 'asc') {
    return (
      <ChevronUpIcon
        aria-hidden="true"
        className="opacity-100 transition-opacity group-hover:opacity-100"
        size={16}
      />
    );
  }

  if (sortDirection === 'desc') {
    return (
      <ChevronDownIcon
        aria-hidden="true"
        className="opacity-100 transition-opacity group-hover:opacity-100"
        size={16}
      />
    );
  }

  return (
    <ChevronUpIcon
      aria-hidden="true"
      className="opacity-0 transition-opacity group-hover:opacity-60"
      size={16}
    />
  );
};

const renderHeaderContent = (header: Header<Item, unknown>) => {
  if (!header.column.getCanSort()) {
    return flexRender(header.column.columnDef.header, header.getContext());
  }

  return (
    <button
      className={cn(
        'group flex h-full w-full cursor-pointer select-none items-center justify-between gap-2 border-0 bg-transparent p-0 text-left'
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
      type="button"
    >
      {flexRender(header.column.columnDef.header, header.getContext())}
      <span className="flex h-4 w-4 items-center justify-center">
        {renderSortIcon(header.column.getIsSorted())}
      </span>
    </button>
  );
};

export function MembersTable({ data }: MembersTableProps) {
  const tableRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: 'name',
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
        {/* TODO: Implement a dialog to invite members */}
        <Button className="ml-auto font-normal" size={'sm'} variant="default">
          Invite
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
                        header.column.id === 'joinedAt' &&
                          'hidden sm:table-cell'
                      )}
                      key={header.id}
                    >
                      {header.isPlaceholder
                        ? null
                        : renderHeaderContent(header)}
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
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        className={cn(
                          'text-muted-foreground last:py-0',
                          cell.column.id === 'name' && 'text-primary',
                          cell.column.id === 'status' &&
                            'lowercase first-letter:uppercase',
                          cell.column.id === 'joinedAt' &&
                            'hidden sm:table-cell'
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
                  className="h-24 text-center text-muted-foreground"
                  colSpan={columns.length}
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
