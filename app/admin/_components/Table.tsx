"use client";

import {
  HTMLAttributes,
  ReactNode,
  ThHTMLAttributes,
  TdHTMLAttributes,
} from "react";

type Align = "left" | "center" | "right";

export function TableContainer({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`overflow-x-auto ${className}`} {...props}>
      {children}
    </div>
  );
}

export function Table({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLTableElement>) {
  return (
    <table
      className={`w-full border-separate border-spacing-0 text-left text-sm ${className}`}
      {...props}
    >
      {children}
    </table>
  );
}

export function THead({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead className={`text-white/60 ${className}`} {...props}>
      {children}
    </thead>
  );
}

export function TBody({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody className={className} {...props}>
      {children}
    </tbody>
  );
}

export function Tr({
  children,
  className = "",
  ...props
}: HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={`border-b border-white/10 last:border-0 ${className}`}
      {...props}
    >
      {children}
    </tr>
  );
}

export function Th({
  children,
  align = "left",
  className = "",
  sticky = false,
  ...props
}: {
  children: ReactNode;
  align?: Align;
  className?: string;
  sticky?: boolean;
} & ThHTMLAttributes<HTMLTableCellElement>) {
  const alignClass =
    align === "right"
      ? "text-right"
      : align === "center"
        ? "text-center"
        : "text-left";
  const stickyClass = sticky
    ? "sticky top-0 z-10 backdrop-blur bg-black/40"
    : "";
  return (
    <th
      className={`px-4 py-2 ${alignClass} ${stickyClass} ${className}`}
      {...props}
    >
      {children}
    </th>
  );
}

export function Td({
  children,
  align = "left",
  className = "",
  ...props
}: {
  children: ReactNode;
  align?: Align;
  className?: string;
} & TdHTMLAttributes<HTMLTableCellElement>) {
  const alignClass =
    align === "right"
      ? "text-right"
      : align === "center"
        ? "text-center"
        : "text-left";
  return (
    <td className={`px-4 py-2 ${alignClass} ${className}`} {...props}>
      {children}
    </td>
  );
}

export function ActionsHeader() {
  return <Th align="right">Actions</Th>;
}

export function ActionsCell({ children }: { children: ReactNode }) {
  return (
    <Td align="right">
      <div className="inline-flex gap-2">{children}</div>
    </Td>
  );
}

export function EmptyRow({
  colSpan = 1,
  children = "No data",
}: {
  colSpan?: number;
  children?: ReactNode;
}) {
  return (
    <Tr>
      <Td align="center" className="py-6 text-white/50" colSpan={colSpan}>
        {children}
      </Td>
    </Tr>
  );
}

export function LoadingRow({ colSpan = 1 }: { colSpan?: number }) {
  return (
    <Tr>
      <Td colSpan={colSpan}>
        <div className="h-6 animate-pulse rounded bg-white/10" />
      </Td>
    </Tr>
  );
}
