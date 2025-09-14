"use client";

import Button from "@/components/UI/Form/Button";
import { TableIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Checkbox } from "./Checkbox";
import {
  ActionsCell,
  ActionsHeader,
  Table,
  TableContainer,
  TBody,
  Td,
  Th,
  THead,
  Tr,
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
  actionsDisabled?: boolean;
  onLoadMore?: () => void;
  canLoadMore?: boolean;
}

export function DataTable<T extends BaseRow>({
  data,
  columns,
  onEdit,
  onDelete,
  loading = false,
  actionsDisabled = false,
  onLoadMore,
  canLoadMore,
}: DataTableProps<T>) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const loadingMoreRef = useRef(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

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
  const someSelected = selectedIds.size > 0 && selectedIds.size < data.length;

  const renderCellValue = (item: T, column: Column<T>): React.ReactNode => {
    if (column.render) {
      return column.render(item);
    }

    const key = column.key as keyof T;
    const value = item[key];

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

  useEffect(() => {
    if (!onLoadMore || !canLoadMore) return;
    const el = scrollRef.current;
    const sentinel = sentinelRef.current;
    if (!el || !sentinel) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !loadingMoreRef.current) {
            loadingMoreRef.current = true;

            const showTimeout = setTimeout(() => {
              setIsLoadingMore(true);
            }, 200);

            onLoadMore();

            setTimeout(() => {
              clearTimeout(showTimeout);
              loadingMoreRef.current = false;
              setIsLoadingMore(false);
            }, 1000);
          }
        }
      },
      { root: el, rootMargin: "50px", threshold: 0.1 },
    );
    io.observe(sentinel);
    return () => io.disconnect();
  }, [onLoadMore, canLoadMore, data.length]);
  return (
    <div className="space-y-4 rounded-lg border border-white/10 bg-black p-4 shadow-sm">
      <div className="relative">
        {/* Non-scrolling shading overlays */}

        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-3 bg-gradient-to-t from-black to-transparent"
        />

        <TableContainer
          className="max-h-[60vh] overflow-auto rounded-md"
          ref={scrollRef as unknown as React.RefObject<HTMLDivElement>}
        >
          <Table>
            <THead>
              <Tr>
                <Th sticky>
                  <Checkbox
                    checked={allSelected}
                    indeterminate={someSelected}
                    onChange={(e) => toggleAllSelection(e.target.checked)}
                  />
                </Th>
                {columns.map((column) => (
                  <Th key={column.key as string} sticky>
                    {column.label}
                  </Th>
                ))}
                <ActionsHeader sticky />
              </Tr>
            </THead>
            <TBody>
              {data.length === 0 && !loading ? (
                <Tr>
                  <Td colSpan={columns.length + 2} align="center">
                    <div className="flex flex-col items-center justify-center gap-3 py-12">
                      <div>
                        <TableIcon height={40} width={40} />
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-medium text-white/60">
                          No data found
                        </p>
                        <p className="text-sm text-white/40">
                          There are no items to display
                        </p>
                      </div>
                    </div>
                  </Td>
                </Tr>
              ) : (
                data.map((item) => (
                  <Tr key={item._id} className="hover:bg-white/5">
                    <Td>
                      <Checkbox
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
                        <Button
                          variant="secondary"
                          onClick={() => onEdit(item)}
                          disabled={actionsDisabled}
                        >
                          Edit
                        </Button>
                      )}
                      {onDelete && (
                        <Button
                          variant="secondary"
                          onClick={() => onDelete(item._id)}
                          disabled={actionsDisabled}
                        >
                          Delete
                        </Button>
                      )}
                    </ActionsCell>
                  </Tr>
                ))
              )}
              {(loading || isLoadingMore) && (
                <Tr>
                  <Td colSpan={columns.length + 2} align="center">
                    <div className="flex items-center justify-center gap-3 py-6">
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white/60"></div>
                      <span className="text-white/60">
                        {loading ? "Loading..." : "Loading more items..."}
                      </span>
                    </div>
                  </Td>
                </Tr>
              )}
            </TBody>
          </Table>
          {/* sentinel for infinite scroll - must be inside scroll container */}
          <div ref={sentinelRef} className="h-1" />
        </TableContainer>
      </div>

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
            disabled={actionsDisabled}
          >
            Delete Selected
          </Button>
        </div>
      )}
      {/* Mobile helpers */}
      <div className="flex items-center justify-between gap-2 text-xs text-white/50 md:hidden">
        <span>Swipe horizontally to see more</span>
      </div>
    </div>
  );
}
