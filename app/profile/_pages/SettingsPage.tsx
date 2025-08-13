"use client";

export default function SettingsPage() {
  return (
    <div className="col-span-full rounded-xl border border-white/10 bg-white/5 p-6">
      <h3 className="mb-2 text-lg font-semibold">Quick settings</h3>
      <ul className="space-y-2 text-sm text-white/80">
        <li>• Notifications: Enabled</li>
        <li>• Theme: System</li>
        <li>• Privacy: Friends only</li>
      </ul>
    </div>
  );
}
