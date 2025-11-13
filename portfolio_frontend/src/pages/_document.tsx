/**
 * Next.js Pages Router custom Document.
 * This file exists to satisfy Next.js build expectations when collecting page data.
 * The App Router (src/app) provides the actual HTML shell via RootLayout, but adding
 * this file prevents the build error "Cannot find module for page: /_document".
 */

import { Html, Head, Main, NextScript } from "next/document";

// PUBLIC_INTERFACE
export default function Document() {
  /** Minimal Document implementation for Pages Router compatibility. */
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
