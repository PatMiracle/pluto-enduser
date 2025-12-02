"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "./ui/skeleton";

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

interface PaginationControlProps {
  pagination?: Pagination;
  currentPage: number;
  fetchNext: () => void;
  fetchPrev: () => void;
  fetchPage: (page: number) => void;
}

export default function PaginationControl({
  pagination,
  currentPage,
  fetchNext,
  fetchPrev,
  fetchPage,
}: PaginationControlProps) {
  const totalPages = Number(pagination?.totalPages ?? 1);
  const maxShown = 5;

  if (totalPages <= 1) return null;

  const pages: (number | string)[] = [];

  if (totalPages <= maxShown + 2) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);

    if (currentPage > 3) pages.push("...");

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) pages.push("...");

    pages.push(totalPages);
  }

  return (
    <div className="mt-6 flex items-center justify-center gap-3">
      {/* Prev */}
      <button
        disabled={currentPage === 0}
        onClick={() => {
          fetchPrev();
          console.log(currentPage);
        }}
        className="disabled:opacity-40"
      >
        <MdKeyboardArrowLeft size={28} />
      </button>

      {/* Numbers */}
      {pages.map((item, idx) =>
        typeof item === "number" ? (
          <button
            key={idx}
            onClick={() => fetchPage(idx)}
            className={`px-2 text-base ${
              idx === currentPage
                ? "font-semibold text-black"
                : "text-gray-400 hover:text-black"
            }`}
          >
            {item}
          </button>
        ) : (
          <span key={idx} className="text-white-dark px-2">
            …
          </span>
        ),
      )}

      {/* Next */}
      <button
        disabled={currentPage == totalPages - 1}
        onClick={fetchNext}
        className="disabled:opacity-40"
      >
        <MdKeyboardArrowRight size={28} />
      </button>
    </div>
  );
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data?: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  if (!data) {
    return <TableSkeleton rows={8} />;
  }

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
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
  );
}

export function TableSkeleton({ rows }: { rows: number }) {
  return (
    <div className="grid gap-4">
      {Array.from({ length: rows }).map((_, j) => (
        <Skeleton key={j} className="bg-white-normal-hover h-10" />
      ))}
    </div>
  );
}
