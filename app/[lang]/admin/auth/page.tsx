"use client";

import { ConvexError } from "convex/values";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { toast } from "sonner";

function AdminAuthForm() {
  const params = useSearchParams();
  const redirectParam = params.get("redirect");
  const redirect =
    redirectParam && redirectParam.startsWith("/") ? redirectParam : "/admin";
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit() {
    if (!password) {
      toast.error("Password is required.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Invalid password");
      }
      toast.success("Welcome, admin.");

      window.location.assign(redirect);
    } catch (err) {
      toast.error(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (err as Error | ConvexError<any>)?.message || "Authentication failed",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center gap-4 px-4">
      <h1 className="text-center text-2xl font-bold">Admin Access</h1>
      <p className="text-center text-white/60">
        Enter the admin password to continue.
      </p>
      <label className="space-y-2">
        <span className="block text-sm text-white/70">Password</span>
        <input
          type="password"
          className="w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 outline-none ring-0 transition focus:border-[var(--primary)]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter") submit();
          }}
        />
      </label>
      <button
        disabled={loading}
        onClick={submit}
        className="bg-[var(--primary)]/80 rounded-md px-4 py-2 font-semibold text-white transition hover:bg-[var(--primary)] disabled:opacity-60"
      >
        {loading ? "Checking..." : "Continue"}
      </button>
      <p className="text-center text-xs text-white/40">
        Your session uses a secure, HttpOnly cookie and expires automatically.
      </p>
    </div>
  );
}

export default function AdminAuthPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center gap-4 px-4">
          <h1 className="text-center text-2xl font-bold">Admin Access</h1>
          <p className="text-center text-white/60">Loading...</p>
        </div>
      }
    >
      <AdminAuthForm />
    </Suspense>
  );
}
