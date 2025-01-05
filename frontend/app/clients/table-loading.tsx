import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonRow = ({ columnCount }: { columnCount: number }) => (
  <TableRow>
    {Array.from({ length: columnCount }).map((_, index) => (
      <TableCell key={index} className="">
        <Skeleton className="h-6 w-auto" />
      </TableCell>
    ))}
  </TableRow>
);

const SkeletonHeader = ({ columnCount }: { columnCount: number }) => (
  <TableRow>
    {Array.from({ length: columnCount }).map((_, index) => (
      <TableHead key={index}>
        <Skeleton className="h-6 w-[90px]" />
      </TableHead>
    ))}
  </TableRow>
);

export default function TableLoading({ columnCount, lineCount }: { columnCount: number; lineCount: number }) {
  return (
    <>
      <div className="flex items-center py-4">
        <Skeleton className="h-10 w-[350px] max-w-sm" />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <SkeletonHeader columnCount={columnCount} />
          </TableHeader>
          <TableBody>
            {Array.from({ length: lineCount }).map((_, index) => (
              <SkeletonRow key={index} columnCount={columnCount} />
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
