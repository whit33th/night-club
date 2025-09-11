"use client";

import {
  HTMLAttributes,
  ReactNode,
  ThHTMLAttributes,
  TdHTMLAttributes,
  forwardRef,
} from "react";

type Align = "left" | "center" | "right";

export const TableContainer = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ children, className = "", ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`relative overflow-x-auto ${className}`}
      data-lenis-prevent
      data-lenis-prevent-wheel
      data-lenis-prevent-touch
      style={{
        overscrollBehavior: "contain",
        WebkitOverflowScrolling: "touch",
        isolation: "isolate",
      }}
      onWheel={(e) => {
        // Force scroll within container, prevent page scroll
        const container = e.currentTarget;
        const atTop = container.scrollTop === 0;
        const atBottom =
          container.scrollTop >=
          container.scrollHeight - container.clientHeight;

        if ((e.deltaY < 0 && atTop) || (e.deltaY > 0 && atBottom)) {
          // At boundary - let the event bubble up to page
          return;
        }

        // Within scroll bounds - keep scrolling in container
        e.stopPropagation();
      }}
      onTouchStart={(e) => {
        // Ensure touch scrolling works properly on iOS
        const container = e.currentTarget;
        (
          container.style as React.CSSProperties & {
            webkitOverflowScrolling?: string;
          }
        ).webkitOverflowScrolling = "touch";
      }}
      {...props}
    >
      {children}
    </div>
  );
});
TableContainer.displayName = "TableContainer";

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
  className = "bg-white/2",
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
    ? "sticky top-0 z-10 bg-black border-b border-white/10"
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

export function ActionsHeader({ sticky = false }: { sticky?: boolean }) {
  return (
    <Th align="right" sticky={sticky}>
      Actions
    </Th>
  );
}

export function ActionsCell({ children }: { children: ReactNode }) {
  return (
    <Td align="right">
      <div className="inline-flex gap-2">{children}</div>
    </Td>
  );
}
