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

/**
 * Resolve the contact submission endpoint:
 * - Prefer NEXT_PUBLIC_FORMSPREE_ENDPOINT (if present)
 * - Fallback to NEXT_PUBLIC_API_BASE (legacy)
 * - Default to the provided Formspree URL
 */
function resolveEndpoint(): string {
  const fromFormspree = (process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || "").trim();
  const fromApiBase = (process.env.NEXT_PUBLIC_API_BASE || "").trim();
  const endpoint =
    fromFormspree ||
    fromApiBase ||
    "https://formspree.io/f/xzzyzayj";
  return endpoint;
}

// PUBLIC_INTERFACE
export async function submitContact(
  data: ContactPayload,
  signal?: AbortSignal
): Promise<ContactResponse> {
  /**
   * Submit contact form payload to Formspree (or configured endpoint).
   * Sends JSON with appropriate headers and parses success/error states.
   */
  const url = resolveEndpoint();

  // Simple spam/honeypot check before sending
  if (data.honeypot && data.honeypot.length > 0) {
    return {
      success: false,
      message: "Spam detected.",
    };
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      // Only send necessary fields expected by Formspree
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        message: data.message,
      }),
      signal,
      // credentials should be omitted to avoid CSRF/cookie implications with 3rd-party
    });

    const text = await res.text();
    const isJson = text.trim().startsWith("{");
    type FormspreeResponse = {
      ok?: boolean;
      success?: boolean;
      message?: string;
      error?: string;
      errors?: Array<{ message?: string }>;
    } | null;

    let parsed: unknown = null;
    if (isJson) {
      try {
        parsed = JSON.parse(text);
      } catch {
        parsed = null;
      }
    }
    const p = (parsed as FormspreeResponse) || null;

    if (!res.ok) {
      // Formspree may return { error, errors: [...] }
      const firstErrorMsg =
        Array.isArray(p?.errors) && p?.errors.length ? p?.errors[0]?.message : undefined;
      const errorMsg =
        p?.error ||
        p?.message ||
        firstErrorMsg ||
        `Request failed with status ${res.status}: ${res.statusText}`;
      return {
        success: false,
        message: String(errorMsg),
        status: res.status,
      };
    }

    const okFlag = (p?.ok === true || p?.success === true) || res.ok;

    return {
      success: !!okFlag,
      message:
        (hasMessage(parsed) && (parsed as { message: string }).message) ||
        (okFlag ? "Message sent successfully." : "Message sent."),
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
