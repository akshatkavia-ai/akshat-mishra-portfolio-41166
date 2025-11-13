const NODE_ENV = process.env.NEXT_PUBLIC_NODE_ENV || "production";

const LEVELS = { debug: 0, info: 1, warn: 2, error: 3 } as const;
type Level = keyof typeof LEVELS;

function parseLevel(s: string): Level {
  switch (s.toLowerCase()) {
    case "debug":
      return "debug";
    case "info":
      return "info";
    case "warn":
      return "warn";
    case "error":
      return "error";
    default:
      return "warn";
  }
}

const LOG_LEVEL: Level = parseLevel(process.env.NEXT_PUBLIC_LOG_LEVEL || "warn");

function canLog(level: Level) {
  const idx = LEVELS[LOG_LEVEL];
  const levelIdx = LEVELS[level];
  return NODE_ENV !== "production" && levelIdx >= idx;
}

// PUBLIC_INTERFACE
export function trackPageView(path: string) {
  /** No-op analytics stub for page view tracking. */
  if (canLog("info")) {
    console.info("[analytics] page view:", path);
  }
}

// PUBLIC_INTERFACE
export function logEvent(name: string, params?: Record<string, unknown>) {
  /** No-op analytics stub for custom events. */
  if (canLog("debug")) {
    console.debug("[analytics] event:", name, params);
  }
}

// PUBLIC_INTERFACE
export function identifyUser(id: string, traits?: Record<string, unknown>) {
  /** No-op analytics stub for user identification. */
  if (canLog("debug")) {
    console.debug("[analytics] identify:", id, traits);
  }
}
