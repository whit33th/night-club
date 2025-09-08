"use client";

import { useState } from "react";
import Button from "@/components/UI/Form/Button";
import {
  TableContainer,
  Table,
  THead,
  TBody,
  Tr,
  Th,
  Td,
  ActionsHeader,
  ActionsCell,
} from "./Table";

interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (item: T) => React.ReactNode;
}

type BaseRow = { _id: string; _creationTime: number };

interface DataTableProps<T extends BaseRow> {
  data: T[];
  columns: Column<T>[];
  onEdit?: (item: T) => void;
  onDelete?: (id: string, opts?: { skipConfirm?: boolean }) => void;
  loading?: boolean;
}

export function DataTable<T extends BaseRow>({
  data,
  columns,
  onEdit,
  onDelete,
  loading = false,
}: DataTableProps<T>) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const toggleSelection = (id: string, checked: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (checked) {
        next.add(id);
      } else {
        next.delete(id);
      }
      return next;
    });
  };

  const toggleAllSelection = (checked: boolean) => {
    if (checked) {
      setSelectedIds(new Set(data.map((item) => item._id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const allSelected = data.length > 0 && selectedIds.size === data.length;

  const renderCellValue = (item: T, column: Column<T>): React.ReactNode => {
    if (column.render) {
      return column.render(item);
    }

    const key = column.key as keyof T;
    const value = item[key];

    // Format common fields
    if (column.key === "_creationTime" && typeof value === "number") {
      return new Date(value).toLocaleDateString();
    }

    if (column.key === "date" && value) {
      if (typeof value === "string" || typeof value === "number") {
        return new Date(value).toLocaleDateString();
      }
    }

    if (value === null || value === undefined) {
      return "—";
    }

    if (typeof value === "string" || typeof value === "number") {
      return value;
    }

    return String(value) || "—";
  };

  if (loading) {
    return <div className="py-8 text-center">Loading...</div>;
  }

  return (
    <div className="space-y-4 rounded-lg border border-white/10 bg-white/5 p-4 shadow-sm">
      <TableContainer>
        <Table>
          <THead>
            <Tr>
              <Th>
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={(e) => toggleAllSelection(e.target.checked)}
                />
              </Th>
              {columns.map((column) => (
                <Th key={column.key as string}>{column.label}</Th>
              ))}
              <ActionsHeader />
            </Tr>
          </THead>
          <TBody>
            {data.map((item) => (
              <Tr key={item._id} className="hover:bg-white/5">
                <Td>
                  <input
                    type="checkbox"
                    checked={selectedIds.has(item._id)}
                    onChange={(e) =>
                      toggleSelection(item._id, e.target.checked)
                    }
                  />
                </Td>
                {columns.map((column) => (
                  <Td key={column.key as string}>
                    {renderCellValue(item, column)}
                  </Td>
                ))}
                <ActionsCell>
                  {onEdit && (
                    <Button variant="secondary" onClick={() => onEdit(item)}>
                      Edit
                    </Button>
                  )}
                  {onDelete && (
                    <Button
                      variant="secondary"
                      onClick={() => onDelete(item._id)}
                    >
                      Delete
                    </Button>
                  )}
                </ActionsCell>
              </Tr>
            ))}
          </TBody>
        </Table>
      </TableContainer>

      {selectedIds.size > 0 && (
        <div className="flex items-center justify-between rounded-lg bg-white/5 p-4">
          <span className="text-sm">
            {selectedIds.size} item{selectedIds.size > 1 ? "s" : ""} selected
          </span>
          <Button
            variant="secondary"
            onClick={() => {
              if (confirm(`Delete ${selectedIds.size} items?`)) {
                selectedIds.forEach((id) =>
                  onDelete?.(id, { skipConfirm: true }),
                );
                setSelectedIds(new Set());
              }
            }}
          >
            Delete Selected
          </Button>
        </div>
      )}
    </div>
  );
}
