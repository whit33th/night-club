"use client";

import React, { useEffect, useId, useMemo, useRef, useState } from "react";

type Option = {
  value: string;
  label: string;
};

type MultiSelectProps = {
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  error?: string;
  className?: string;
  options: Option[];
  selected: string[];
  onChange: (next: string[]) => void;
};

export default function MultiSelect({
  label,
  placeholder = "Select options",
  required,
  disabled,
  icon,
  error,
  className = "",
  options,
  selected,
  onChange,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const optionRefs = useRef<(HTMLLIElement | null)[]>([]);
  const id = useId();
  const listboxId = `${id}-listbox`;
  const buttonId = `${id}-button`;

  const selectedSet = useMemo(() => new Set(selected), [selected]);

  const commitToggle = (value: string) => {
    const next = new Set(selectedSet);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    onChange(Array.from(next));
  };

  const openAndFocus = () => {
    setOpen(true);

    const firstSelectedIdx = options.findIndex((o) => selectedSet.has(o.value));
    setActiveIndex(firstSelectedIdx >= 0 ? firstSelectedIdx : 0);
  };

  const closeMenu = () => {
    setOpen(false);
    setActiveIndex(-1);
  };

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!buttonRef.current?.contains(t) && !listRef.current?.contains(t)) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    if (activeIndex < 0) return;
    const el = optionRefs.current[activeIndex];
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, open]);

  useEffect(() => {
    if (!open) return;
    const id = requestAnimationFrame(() => {
      listRef.current?.focus();
    });
    return () => cancelAnimationFrame(id);
  }, [open]);

  const handleButtonKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!open) openAndFocus();
        else listRef.current?.focus();
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (!open) openAndFocus();
        break;
      case "ArrowUp":
        e.preventDefault();
        if (!open) openAndFocus();
        else listRef.current?.focus();
        break;
      default:
        break;
    }
  };

  const handleListKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((i) => Math.min(options.length - 1, i < 0 ? 0 : i + 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => Math.max(0, i < 0 ? 0 : i - 1));
        break;
      case "Home":
        e.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        e.preventDefault();
        setActiveIndex(options.length - 1);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (activeIndex >= 0) commitToggle(options[activeIndex].value);
        break;
      case "Escape":
        e.preventDefault();
        closeMenu();
        buttonRef.current?.focus();
        break;
      case "Tab":
        closeMenu();
        break;
      default:
        break;
    }
  };

  const baseFieldCls =
    "w-full rounded-lg border border-white/15 bg-white/5 py-2 text-sm text-white outline-none transition placeholder:text-white/40 focus:ring-2 focus:ring-[var(--primary)] ";
  const withIconPadding = icon ? "pl-8 pr-3" : "px-3";
  const errorCls = error ? " !border-red-500/60 !bg-red-500/10" : "";

  const selectedSummary =
    selected.length === 0 ? placeholder : `${selected.length} selected`;

  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <div className="mb-1 flex items-center justify-between">
          <span className="block text-xs font-medium uppercase tracking-wide text-white/70">
            {label}
            {required && <span className="ml-1 text-red-500">*</span>}
          </span>
        </div>
      )}

      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-white/50">
            {icon}
          </span>
        )}
        <button
          ref={buttonRef}
          type="button"
          className={
            baseFieldCls +
            withIconPadding +
            errorCls +
            (disabled ? " opacity-60" : "")
          }
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listboxId}
          role="combobox"
          id={buttonId}
          onClick={() => (open ? closeMenu() : openAndFocus())}
          onKeyDown={handleButtonKeyDown}
          disabled={disabled}
        >
          <span className={selected.length === 0 ? "text-white/40" : undefined}>
            {selectedSummary}
          </span>
        </button>

        {open && (
          <ul
            ref={listRef}
            id={listboxId}
            role="listbox"
            aria-multiselectable="true"
            aria-labelledby={buttonId}
            aria-activedescendant={
              activeIndex >= 0
                ? `${listboxId}-option-${activeIndex}`
                : undefined
            }
            tabIndex={-1}
            onKeyDown={handleListKeyDown}
            className="absolute z-50 mt-1 max-h-60 w-full overflow-auto overscroll-contain rounded-lg border border-white/15 bg-black/80 backdrop-blur-sm"
            data-lenis-prevent
            data-lenis-prevent-wheel
            onWheelCapture={(e) => {
              e.stopPropagation();
            }}
            onTouchMoveCapture={(e) => {
              e.stopPropagation();
            }}
          >
            {options.map((opt, idx) => {
              const isActive = idx === activeIndex;
              const isSelected = selectedSet.has(opt.value);
              return (
                <li
                  key={opt.value}
                  ref={(el) => {
                    optionRefs.current[idx] = el;
                  }}
                  id={`${listboxId}-option-${idx}`}
                  role="option"
                  aria-selected={isSelected}
                  className={
                    "ring-primary cursor-pointer px-3 py-2 text-sm text-white transition-colors " +
                    (isSelected ? "bg-primary/25" : "") +
                    (isActive
                      ? isSelected
                        ? "bg-primary/40 hover:bg-primary/30 ring-1"
                        : "bg-primary/20 hover:bg-primary/5 ring-1"
                      : "")
                  }
                  onMouseEnter={() => setActiveIndex(idx)}
                  onClick={(e) => {
                    e.preventDefault();
                    commitToggle(opt.value);
                  }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span>{opt.label}</span>
                    {isSelected && (
                      <span aria-hidden className="text-[var(--primary)]">
                        ✓
                      </span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {error ? (
        <span className="mt-1 block text-xs text-red-400">{error}</span>
      ) : null}
    </div>
  );
}
