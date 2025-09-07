"use client";

import { ReactNode } from "react";

export function ActionsTh() {
  return <th className="py-2 pl-4 text-right">Actions</th>;
}

export function ActionsTd({ children }: { children: ReactNode }) {
  return (
    <td className="py-2 pl-4 text-right">
      <div className="inline-flex gap-2">{children}</div>
    </td>
  );
}
