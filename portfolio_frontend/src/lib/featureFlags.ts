type Flags = {
  particles: boolean;
  heavyGlow: boolean;
  [key: string]: boolean;
};

// PUBLIC_INTERFACE
export function getFeatureFlags(): Flags {
  /** Parse NEXT_PUBLIC_FEATURE_FLAGS (CSV or JSON) and experiments toggle. */
  const raw = process.env.NEXT_PUBLIC_FEATURE_FLAGS || "";
  const exp = (process.env.NEXT_PUBLIC_EXPERIMENTS_ENABLED || "").toLowerCase();
  const experimentsEnabled = exp === "1" || exp === "true" || exp === "yes";

  let flags: Record<string, boolean> = {};
  try {
    if (raw.trim().startsWith("{") || raw.trim().startsWith("[")) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        for (const k of parsed) flags[String(k)] = true;
      } else if (parsed && typeof parsed === "object") {
        flags = Object.fromEntries(
          Object.entries(parsed).map(([k, v]) => [k, Boolean(v)])
        );
      }
    } else if (raw.trim().length > 0) {
      raw
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .forEach((k) => (flags[k] = true));
    }
  } catch {
    // ignore parsing errors, default to empty
  }

  return {
    particles: Boolean(flags["particles"] && experimentsEnabled),
    heavyGlow: Boolean(flags["heavyGlow"]),
    ...flags,
  } as Flags;
}
