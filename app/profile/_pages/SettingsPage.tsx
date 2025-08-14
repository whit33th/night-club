"use client";

import { useEffect, useState } from "react";

type StoredSettings = {
  notifications: {
    eventReminders: boolean;
    newDrops: boolean;
    clubAnnouncements: boolean;
  };
  privacy: {
    profileVisibility: "public" | "friends" | "private";
    shareFavorites: boolean;
  };
  preferences: {
    language: "en" | "pl";
    region: "PL" | "EU" | "OTHER";
    theme: "system" | "dark" | "light";
  };
};

const DEFAULT_SETTINGS: StoredSettings = {
  notifications: {
    eventReminders: true,
    newDrops: true,
    clubAnnouncements: false,
  },
  privacy: {
    profileVisibility: "friends",
    shareFavorites: false,
  },
  preferences: {
    language: "en",
    region: "PL",
    theme: "system",
  },
};

const SETTINGS_KEY = "profile_settings_v1";

export default function SettingsPage() {
  const [settings, setSettings] = useState<StoredSettings>(DEFAULT_SETTINGS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(SETTINGS_KEY);
      if (raw) setSettings(JSON.parse(raw));
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch {}
  }, [settings, loaded]);

  return (
    <div className="col-span-full grid grid-cols-1 gap-4 rounded-xl border border-white/10 bg-white/5 p-6 md:grid-cols-2">
      <section>
        <h3 className="mb-2 text-lg font-semibold">Notifications</h3>
        <div className="space-y-2 text-sm text-white/80">
          <ToggleRow
            label="Event reminders"
            checked={settings.notifications.eventReminders}
            onChange={(v) =>
              setSettings((s) => ({
                ...s,
                notifications: { ...s.notifications, eventReminders: v },
              }))
            }
          />
          <ToggleRow
            label="New drops & line-ups"
            checked={settings.notifications.newDrops}
            onChange={(v) =>
              setSettings((s) => ({
                ...s,
                notifications: { ...s.notifications, newDrops: v },
              }))
            }
          />
          <ToggleRow
            label="Club announcements"
            checked={settings.notifications.clubAnnouncements}
            onChange={(v) =>
              setSettings((s) => ({
                ...s,
                notifications: { ...s.notifications, clubAnnouncements: v },
              }))
            }
          />
        </div>
      </section>
      <section>
        <h3 className="mb-2 text-lg font-semibold">Privacy</h3>
        <div className="space-y-3 text-sm text-white/80">
          <SelectRow
            label="Profile visibility"
            value={settings.privacy.profileVisibility}
            options={[
              { label: "Public", value: "public" },
              { label: "Friends", value: "friends" },
              { label: "Private", value: "private" },
            ]}
            onChange={(v) =>
              setSettings((s) => ({
                ...s,
                privacy: {
                  ...s.privacy,
                  profileVisibility:
                    v as StoredSettings["privacy"]["profileVisibility"],
                },
              }))
            }
          />
          <ToggleRow
            label="Share favorites with friends"
            checked={settings.privacy.shareFavorites}
            onChange={(v) =>
              setSettings((s) => ({
                ...s,
                privacy: { ...s.privacy, shareFavorites: v },
              }))
            }
          />
        </div>
      </section>
      <section>
        <h3 className="mb-2 text-lg font-semibold">Preferences</h3>
        <div className="grid grid-cols-1 gap-3 text-sm text-white/80 md:grid-cols-2">
          <SelectRow
            label="Language"
            value={settings.preferences.language}
            options={[
              { label: "English", value: "en" },
              { label: "Polski", value: "pl" },
            ]}
            onChange={(v) =>
              setSettings((s) => ({
                ...s,
                preferences: {
                  ...s.preferences,
                  language: v as StoredSettings["preferences"]["language"],
                },
              }))
            }
          />
          <SelectRow
            label="Region"
            value={settings.preferences.region}
            options={[
              { label: "Poland", value: "PL" },
              { label: "Europe", value: "EU" },
              { label: "Other", value: "OTHER" },
            ]}
            onChange={(v) =>
              setSettings((s) => ({
                ...s,
                preferences: {
                  ...s.preferences,
                  region: v as StoredSettings["preferences"]["region"],
                },
              }))
            }
          />
          <SelectRow
            label="Theme"
            value={settings.preferences.theme}
            options={[
              { label: "System", value: "system" },
              { label: "Dark", value: "dark" },
              { label: "Light", value: "light" },
            ]}
            onChange={(v) =>
              setSettings((s) => ({
                ...s,
                preferences: {
                  ...s.preferences,
                  theme: v as StoredSettings["preferences"]["theme"],
                },
              }))
            }
          />
        </div>
      </section>
    </div>
  );
}

function ToggleRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3 rounded-md border border-white/10 bg-white/5 px-3 py-2">
      <span>{label}</span>
      <button
        type="button"
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 rounded-full border transition ${
          checked
            ? "border-[color-mix(in_srgb,var(--primary)_40%,transparent)] bg-[color-mix(in_srgb,var(--primary)_20%,transparent)]"
            : "border-white/15 bg-white/10"
        }`}
      >
        <span
          className={`absolute left-0 top-0 m-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </label>
  );
}

function SelectRow<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: Array<{ label: string; value: T }>;
  onChange: (v: T) => void;
}) {
  return (
    <label className="grid gap-1 rounded-md border border-white/10 bg-white/5 px-3 py-2">
      <span className="text-white/80">{label}</span>
      <select
        className="rounded border border-white/10 bg-black/40 p-2"
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
