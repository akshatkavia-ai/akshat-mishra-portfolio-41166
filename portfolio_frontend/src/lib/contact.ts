export type ContactPayload = {
  name: string;
  email: string;
  message: string;
  honeypot?: string;
};

export type ContactResponse = {
  success: boolean;
  message: string;
  status?: number;
};

function hasMessage(x: unknown): x is { message: string } {
  return (
    typeof x === "object" &&
    x !== null &&
    "message" in x &&
    typeof (x as Record<string, unknown>).message === "string"
  );
}

function isAbortError(err: unknown): boolean {
  if (typeof DOMException !== "undefined" && err instanceof DOMException) {
    return err.name === "AbortError";
  }
  return (
    typeof err === "object" &&
    err !== null &&
    "name" in err &&
    (err as Record<string, unknown>).name === "AbortError"
  );
}

// PUBLIC_INTERFACE
export async function submitContact(
  data: ContactPayload,
  signal?: AbortSignal
): Promise<ContactResponse> {
  /**
   * Submit contact form payload to external endpoint derived from
   * NEXT_PUBLIC_API_BASE. Returns structured success/error message.
   */
  const base = (process.env.NEXT_PUBLIC_API_BASE || "").replace(/\/$/, "");
  if (!base) {
    return {
      success: false,
      message:
        "Contact form requires configuration. Please set NEXT_PUBLIC_API_BASE to your form endpoint.",
    };
  }
  const url = `${base}/contact`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      signal,
    });

    const text = await res.text();
    const isJson = text.trim().startsWith("{");
    let parsed: unknown = null;
    if (isJson) {
      try {
        parsed = JSON.parse(text);
      } catch {
        parsed = null;
      }
    }

    if (!res.ok) {
      return {
        success: false,
        message:
          (hasMessage(parsed) && parsed.message) ||
          `Request failed with status ${res.status}: ${res.statusText}`,
        status: res.status,
      };
    }

    return {
      success: true,
      message: (hasMessage(parsed) && parsed.message) || "Message sent successfully.",
      status: res.status,
    };
  } catch (err: unknown) {
    if (isAbortError(err)) {
      return { success: false, message: "Request aborted by user." };
    }
    return {
      success: false,
      message: "Unable to send message. Please try again later.",
    };
  }
}

/**
 * UI tip: implement a simple debounce or submit lockout in the component:
 * - Disable submit while pending
 * - Optionally throttle multiple submissions within a short interval
 */
