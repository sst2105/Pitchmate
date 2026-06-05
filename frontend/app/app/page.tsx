import { PrototypePage } from "@/components/PrototypePage";
import { appCss, appHtml, appScript } from "@/lib/prototype-data";

export default function AppPage() {
  return (
    <PrototypePage
      css={appCss}
      html={appHtml}
      script={appScript}
      apiBase={process.env.NEXT_PUBLIC_API_BASE || "https://pitchmate-api-641857263230.asia-south1.run.app"}
    />
  );
}
