"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    __PITCHMATE_API_BASE__?: string;
  }
}

type PrototypePageProps = {
  css: string;
  html: string;
  script: string;
  apiBase?: string;
};

export function PrototypePage({ css, html, script, apiBase }: PrototypePageProps) {
  useEffect(() => {
    if (apiBase) window.__PITCHMATE_API_BASE__ = apiBase;

    // The uploaded prototype used inline onclick handlers.
    // Global eval preserves those browser-style handlers while we migrate to real React components later.
    (0, eval)(script);

    return () => {
      // Keep cleanup small; pages are separate routes and reload cleanly during dev.
    };
  }, [script, apiBase]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <main dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}
