import Document, { Html, Head, Main, NextScript } from "next/document";

/**
 * Custom Document for legacy compatibility where Next.js expects _document when
 * certain components rely on document-level tags during prerender (e.g., 404).
 * This file is only used by the pages router and will not affect the app router.
 * Do not import <Html> from "next/document" in app/ routes.
 */
export default class MyDocument extends Document {
  render() {
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
}
