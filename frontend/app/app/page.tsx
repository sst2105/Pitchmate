import { PrototypePage } from "@/components/PrototypePage";
import { appCss, appHtml, appScript } from "@/lib/prototype-data";

export default function AppPage() {
  return (
    <PrototypePage
      css={appCss}
      html={appHtml}
      script={appScript}
      apiBase={process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000"}
    />
  );
}
