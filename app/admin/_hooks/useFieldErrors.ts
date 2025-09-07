"use client";

import { useCallback, useMemo, useState } from "react";

/**
 * Lightweight field error manager for simple forms without RHF.
 * API matches what admin/page.tsx expects.
 */
export function useFieldErrors() {
  const [errors, setErrorsState] = useState<Set<string>>(new Set());

  const hasFieldError = useCallback(
    (name: string) => errors.has(name),
    [errors],
  );

  const setErrors = useCallback((fields: string[]) => {
    setErrorsState(new Set(fields));
  }, []);

  const clearFieldError = useCallback((name: string) => {
    setErrorsState((prev) => {
      if (!prev.has(name)) return prev;
      const next = new Set(prev);
      next.delete(name);
      return next;
    });
  }, []);

  const clearFieldErrors = useCallback(() => setErrorsState(new Set()), []);

  const getInputClassName = useCallback(
    (name: string) =>
      errors.has(name) ? "!border-red-500/60 !bg-red-500/10" : "",
    [errors],
  );

  return useMemo(
    () => ({
      hasFieldError,
      setErrors,
      clearFieldErrors,
      clearFieldError,
      getInputClassName,
    }),
    [
      hasFieldError,
      setErrors,
      clearFieldErrors,
      clearFieldError,
      getInputClassName,
    ],
  );
}
