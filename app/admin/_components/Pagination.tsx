"use client";

import Button from "@/components/UI/Form/Button";

export default function Pagination({
  page,
  totalPages,
  canPrev,
  canNext,
  onPrev,
  onNext,
  onGoto,
  simple = false,
}: {
  page: number;
  totalPages: number;
  canPrev: boolean;
  canNext: boolean;
  onPrev: () => void | Promise<void>;
  onNext: () => void | Promise<void>;
  onGoto: (p: number) => void | Promise<void>;
  simple?: boolean;
}) {
  return (
    <div className="mt-2 flex items-center justify-end gap-1">
      <Button
        variant="secondary"
        disabled={!canPrev}
        onClick={onPrev}
        title={canPrev ? "Previous page" : "No previous page"}
      >
        Prev
      </Button>
      {simple
        ? null
        : Array.from({ length: totalPages }).map((_, i) => {
            const p = i + 1;
            const active = p === page;
            return (
              <Button
                key={p}
                variant={active ? undefined : "secondary"}
                onClick={() => onGoto(p)}
                disabled={active}
                title={`Go to page ${p}`}
              >
                {p}
              </Button>
            );
          })}
      <Button
        variant="secondary"
        disabled={!canNext}
        onClick={onNext}
        title={canNext ? "Next page" : "No more data"}
      >
        Next
      </Button>
    </div>
  );
}
