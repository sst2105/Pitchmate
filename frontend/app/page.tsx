import { PrototypePage } from "@/components/PrototypePage";
import { landingCss, landingHtml, landingScript } from "@/lib/prototype-data";

export default function LandingPage() {
  return <PrototypePage css={landingCss} html={landingHtml} script={landingScript} />;
}
