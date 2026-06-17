export const landingCss = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500;700&family=DM+Mono:wght@400;500&display=swap');

:root {
  --cream: #F5EFE6;
  --cream-dark: #EDE4D8;
  --mocha-100: #C4A882;
  --mocha-200: #A07850;
  --mocha-300: #7A5535;
  --mocha-400: #5C3D22;
  --mocha-500: #3D2510;
  --espresso: #1C1008;
  --text-primary: #1C1008;
  --text-secondary: #5C4030;
  --text-muted: #9A7A62;
  --card-bg: #FFFFFF;
  --border: #D4C4B0;
  --surface: #EDE4D8;
  --nav-bg: rgba(245,239,230,0.85);
  font-size: 16px;
}
[data-theme="dark"] {
  --cream: #1C1008;
  --cream-dark: #251508;
  --text-primary: #F0E8DC;
  --text-secondary: #C4A882;
  --text-muted: #7A5535;
  --card-bg: #2A1A0C;
  --border: #3D2510;
  --surface: #251508;
  --nav-bg: rgba(28,16,8,0.9);
}
* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  font-family: 'DM Sans', sans-serif;
  background: var(--cream);
  color: var(--text-primary);
  transition: background 0.3s, color 0.3s;
  overflow-x: hidden;
}

/* NAV */
nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  background: var(--nav-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
  padding: 0 4rem;
  height: 64px;
  display: flex; align-items: center; justify-content: space-between;
  transition: background 0.3s;
}
.nav-logo {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--mocha-300);
  letter-spacing: -0.02em;
}
.nav-right { display: flex; align-items: center; gap: 2rem; }
.nav-link {
  font-size: 0.875rem;
  font-weight: 400;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.2s;
}
.nav-link:hover { color: var(--text-primary); }
.nav-cta {
  background: var(--mocha-300);
  color: #F5EFE6;
  padding: 0.5rem 1.25rem;
  border-radius: 100px;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  transition: background 0.2s, transform 0.15s;
}
.nav-cta:hover { background: var(--mocha-400); transform: translateY(-1px); }
.theme-toggle {
  background: none; border: 1px solid var(--border);
  width: 36px; height: 36px; border-radius: 50%;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  color: var(--text-secondary); font-size: 1rem; transition: all 0.2s;
}
.theme-toggle:hover { border-color: var(--mocha-200); color: var(--text-primary); }

/* HERO */
.hero {
  min-height: 100vh;
  padding: 120px 4rem 80px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  overflow: hidden;
}
.hero-bg-circle {
  position: absolute;
  width: 600px; height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(160,120,80,0.12) 0%, transparent 70%);
  right: -100px; top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}
.hero-eyebrow {
  display: inline-flex; align-items: center; gap: 0.5rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 100px;
  padding: 0.35rem 1rem;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--mocha-200);
  margin-bottom: 1.5rem;
  opacity: 0; transform: translateY(20px);
  animation: fadeUp 0.6s 0.1s forwards;
}
.eyebrow-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--mocha-200);
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; } 50% { opacity: 0.4; }
}
.hero-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(3rem, 5vw, 4.5rem);
  font-weight: 900;
  line-height: 1.05;
  letter-spacing: -0.03em;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  opacity: 0; transform: translateY(24px);
  animation: fadeUp 0.7s 0.2s forwards;
}
.hero-title em {
  font-style: italic;
  color: var(--mocha-200);
}
.hero-body {
  font-size: 1.05rem;
  line-height: 1.75;
  color: var(--text-secondary);
  max-width: 520px;
  margin-bottom: 2.5rem;
  opacity: 0; transform: translateY(24px);
  animation: fadeUp 0.7s 0.35s forwards;
}
.hero-actions {
  display: flex; align-items: center; gap: 1rem;
  opacity: 0; transform: translateY(24px);
  animation: fadeUp 0.7s 0.5s forwards;
}
.btn-primary {
  background: var(--mocha-300);
  color: #F5EFE6;
  padding: 0.875rem 2rem;
  border-radius: 100px;
  font-family: 'DM Sans', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  border: none; cursor: pointer;
  transition: all 0.2s;
  display: inline-flex; align-items: center; gap: 0.5rem;
}
.btn-primary:hover { background: var(--mocha-400); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(90,50,20,0.2); }
.btn-secondary {
  color: var(--text-secondary);
  font-size: 0.9rem;
  text-decoration: none;
  display: flex; align-items: center; gap: 0.35rem;
  transition: color 0.2s;
}
.btn-secondary:hover { color: var(--text-primary); }
.hero-right {
  opacity: 0; transform: translateX(30px);
  animation: fadeRight 0.8s 0.4s forwards;
}
.hero-card {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 2rem;
  position: relative;
  overflow: hidden;
}
.hero-card::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; height: 3px;
  background: linear-gradient(90deg, var(--mocha-100), var(--mocha-300));
}
.card-label {
  font-size: 0.72rem; font-weight: 500; letter-spacing: 0.1em;
  text-transform: uppercase; color: var(--text-muted);
  margin-bottom: 0.75rem;
}
.card-score {
  font-family: 'Playfair Display', serif;
  font-size: 3.5rem; font-weight: 900;
  color: var(--mocha-200); line-height: 1;
  margin-bottom: 0.5rem;
}
.card-score-label { font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.5rem; }
.card-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem; }
.tag {
  padding: 0.3rem 0.75rem; border-radius: 100px;
  font-size: 0.78rem; font-weight: 500;
}
.tag-green { background: #E8F4E8; color: #3A6B3A; }
.tag-amber { background: #FBF0E0; color: #8B5E20; }
.tag-red { background: #FAE8E8; color: #8B2020; }
[data-theme="dark"] .tag-green { background: rgba(58,107,58,0.2); color: #7AB87A; }
[data-theme="dark"] .tag-amber { background: rgba(139,94,32,0.2); color: #D4A060; }
[data-theme="dark"] .tag-red { background: rgba(139,32,32,0.2); color: #D47A7A; }
.card-pitch-preview {
  background: var(--surface);
  border-radius: 12px;
  padding: 1rem;
  font-size: 0.85rem;
  line-height: 1.6;
  color: var(--text-secondary);
  font-style: italic;
  border-left: 3px solid var(--mocha-100);
}
.floating-badge {
  position: absolute; top: -12px; right: 24px;
  background: var(--mocha-300);
  color: #F5EFE6;
  padding: 0.4rem 1rem;
  border-radius: 100px;
  font-size: 0.78rem; font-weight: 500;
}

/* LOGO BAR */
.logo-bar {
  padding: 2rem 4rem;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  display: flex; align-items: center; gap: 0; overflow: hidden;
  background: var(--surface);
}
.logo-bar-label {
  font-size: 0.78rem; font-weight: 500; letter-spacing: 0.08em;
  text-transform: uppercase; color: var(--text-muted);
  white-space: nowrap; margin-right: 3rem;
}
.logo-scroll {
  display: flex; gap: 3rem; align-items: center;
  animation: scrollLeft 20s linear infinite;
  white-space: nowrap;
}
.logo-item {
  font-size: 0.9rem; font-weight: 500; color: var(--text-muted);
  opacity: 0.7;
}
@keyframes scrollLeft {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* SECTION SHARED */
section { padding: 6rem 4rem; }
.section-eyebrow {
  font-size: 0.78rem; font-weight: 500; letter-spacing: 0.1em;
  text-transform: uppercase; color: var(--mocha-200);
  margin-bottom: 1rem;
}
.section-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2rem, 3.5vw, 3rem);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  margin-bottom: 1.25rem;
}
.section-title em { font-style: italic; color: var(--mocha-200); }
.section-body {
  font-size: 1rem; line-height: 1.75;
  color: var(--text-secondary); max-width: 560px;
}

/* HOW IT WORKS — 3 steps asymmetric */
.how-grid {
  display: grid; grid-template-columns: 1fr 1.2fr;
  gap: 5rem; align-items: start; margin-top: 4rem;
}
.steps { display: flex; flex-direction: column; gap: 0; }
.step {
  display: flex; gap: 1.5rem;
  padding: 1.75rem 0;
  border-bottom: 1px solid var(--border);
  cursor: pointer;
  transition: all 0.3s;
  opacity: 0.5;
}
.step.active { opacity: 1; }
.step:first-child { border-top: 1px solid var(--border); }
.step-num {
  font-family: 'Playfair Display', serif;
  font-size: 2rem; font-weight: 900;
  color: var(--border); line-height: 1;
  min-width: 2.5rem;
  transition: color 0.3s;
}
.step.active .step-num { color: var(--mocha-200); }
.step-content h3 {
  font-size: 1rem; font-weight: 500;
  color: var(--text-primary); margin-bottom: 0.4rem;
}
.step-content p { font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6; }
.step-visual {
  position: sticky; top: 120px;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 2rem;
  min-height: 280px;
  transition: all 0.4s;
}
.step-visual-content { display: none; }
.step-visual-content.visible { display: block; }
.visual-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.25rem; font-weight: 700;
  color: var(--text-primary); margin-bottom: 1rem;
}
.visual-chips { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem; }
.chip {
  padding: 0.35rem 0.8rem; border-radius: 8px;
  font-size: 0.8rem; font-weight: 500;
  background: var(--surface); color: var(--text-secondary);
  border: 1px solid var(--border);
}
.chip.highlight { background: var(--mocha-300); color: #F5EFE6; border-color: transparent; }

/* AGENT STACK CARDS */
.agents-section { background: var(--espresso); }
[data-theme="dark"] .agents-section { background: #0E0804; }
.agents-section .section-eyebrow { color: var(--mocha-100); }
.agents-section .section-title { color: #F0E8DC; }
.agents-section .section-body { color: rgba(240,232,220,0.6); }
.agents-header { margin-bottom: 4rem; }
.agent-stack {
  position: relative;
  height: 740px;
}
.agent-card {
  position: absolute;
  left: 0; right: 0;
  border-radius: 20px;
  padding: 2.5rem;
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  overflow: hidden;
}
.agent-card-inner {
  display: flex; justify-content: space-between; align-items: flex-start;
}
.agent-card-text h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem; font-weight: 700;
  margin-bottom: 0.5rem; line-height: 1.2;
}
.agent-card-text p {
  font-size: 0.9rem; line-height: 1.65; max-width: 420px;
  opacity: 0.8;
}
.agent-card-icon {
  font-size: 2.5rem; opacity: 0.7; flex-shrink: 0;
}
.agent-expand {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255,255,255,0.15);
  display: none;
}
.agent-card.expanded .agent-expand { display: block; }
.expand-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.expand-item {
  background: rgba(0,0,0,0.15);
  border-radius: 12px; padding: 1rem;
}
.expand-item-label { font-size: 0.72rem; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; opacity: 0.6; margin-bottom: 0.35rem; }
.expand-item-value { font-size: 0.88rem; line-height: 1.5; }
.agent-card-num {
  position: absolute; bottom: 1.5rem; right: 2rem;
  font-family: 'Playfair Display', serif;
  font-size: 5rem; font-weight: 900;
  opacity: 0.07; line-height: 1;
}

/* Colors for each card */
.ac-1 { background: #7A5535; color: #F5EFE6; }
.ac-2 { background: #5C3D22; color: #F5EFE6; }
.ac-3 { background: #3D2510; color: #F5EFE6; }
.ac-4 { background: #8B6345; color: #F5EFE6; }
.ac-5 { background: #A07850; color: #F5EFE6; }

/* PITCH SELECTOR SECTION */
.pitch-section { background: var(--surface); }
.pitch-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; margin-top: 3rem; }
.pitch-options { display: flex; flex-direction: column; gap: 1rem; }
.pitch-opt {
  background: var(--card-bg);
  border: 1.5px solid var(--border);
  border-radius: 16px;
  padding: 1.25rem 1.5rem;
  cursor: pointer;
  transition: all 0.25s;
  display: flex; align-items: center; gap: 1rem;
}
.pitch-opt:hover { border-color: var(--mocha-200); transform: translateX(4px); }
.pitch-opt.active { border-color: var(--mocha-300); background: var(--mocha-300); color: #F5EFE6; }
.pitch-opt-icon { font-size: 1.5rem; }
.pitch-opt-label { font-weight: 500; font-size: 0.95rem; }
.pitch-opt-sub { font-size: 0.8rem; opacity: 0.6; }
.pitch-preview-box {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 2rem;
  min-height: 300px;
}
.pitch-preview-header {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border);
}
.pitch-preview-tag {
  font-size: 0.75rem; font-weight: 500; letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 0.3rem 0.75rem; border-radius: 100px;
  background: var(--surface); color: var(--text-muted);
}
.pitch-preview-text {
  font-size: 0.9rem; line-height: 1.75;
  color: var(--text-secondary);
}
.pitch-preview-text strong { color: var(--text-primary); font-weight: 500; }

/* TESTIMONIAL / SOCIAL PROOF */
.proof-section { }
.proof-grid {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem; margin-top: 3rem;
}
.proof-card {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 1.5rem;
  transition: transform 0.25s;
}
.proof-card:hover { transform: translateY(-3px); }
.proof-quote {
  font-size: 0.9rem; line-height: 1.7;
  color: var(--text-secondary); margin-bottom: 1.25rem;
  font-style: italic;
}
.proof-author { display: flex; align-items: center; gap: 0.75rem; }
.proof-avatar {
  width: 36px; height: 36px; border-radius: 50%;
  background: var(--surface);
  display: flex; align-items: center; justify-content: center;
  font-size: 0.85rem; font-weight: 600; color: var(--mocha-200);
  border: 1px solid var(--border);
}
.proof-name { font-size: 0.85rem; font-weight: 500; color: var(--text-primary); }
.proof-role { font-size: 0.78rem; color: var(--text-muted); }

/* CTA SECTION */
.cta-section {
  background: var(--mocha-400);
  text-align: center;
  padding: 7rem 4rem;
}
.cta-section .section-title { color: #F5EFE6; max-width: 700px; margin: 0 auto 1rem; }
.cta-section .section-body { color: rgba(245,239,230,0.7); margin: 0 auto 2.5rem; text-align: center; }
.cta-section .btn-primary { background: #F5EFE6; color: var(--mocha-400); }
.cta-section .btn-primary:hover { background: #FFFFFF; }

/* FOOTER */
footer {
  background: var(--espresso);
  padding: 3rem 4rem;
  display: flex; align-items: center; justify-content: space-between;
}
[data-theme="dark"] footer { background: #0E0804; }
.footer-logo { font-family: 'Playfair Display', serif; font-size: 1.25rem; font-weight: 700; color: var(--mocha-100); }
.footer-links { display: flex; gap: 2rem; }
.footer-link { font-size: 0.85rem; color: rgba(196,168,130,0.6); text-decoration: none; transition: color 0.2s; }
.footer-link:hover { color: var(--mocha-100); }
.footer-copy { font-size: 0.8rem; color: rgba(196,168,130,0.4); }

/* SCROLL ANIMATIONS */
.reveal {
  opacity: 0; transform: translateY(30px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}
.reveal.visible { opacity: 1; transform: translateY(0); }

@keyframes fadeUp {
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeRight {
  to { opacity: 1; transform: translateX(0); }
}

/* RESPONSIVE */
@media (max-width: 900px) {
  .hero { grid-template-columns: 1fr; padding: 100px 2rem 60px; }
  .hero-right { display: none; }
  .how-grid { grid-template-columns: 1fr; }
  .step-visual { position: static; }
  section { padding: 4rem 2rem; }
  nav { padding: 0 2rem; }
  .proof-grid { grid-template-columns: 1fr; }
  .pitch-grid { grid-template-columns: 1fr; }
  footer { flex-direction: column; gap: 1.5rem; text-align: center; }
}

/* DIFFERENTIATION SECTION */
.diff-section { background: var(--cream); padding: 6rem 4rem; }
.diff-grid {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 5rem; align-items: center; margin-top: 3rem;
}
.diff-left { }
.diff-compare {
  display: flex; flex-direction: column; gap: 0;
  border: 1px solid var(--border); border-radius: 20px;
  overflow: hidden; background: var(--card-bg);
}
.diff-row {
  display: grid; grid-template-columns: 1.1fr 1fr 1fr;
  border-bottom: 1px solid var(--border);
}
.diff-row:last-child { border-bottom: none; }
.diff-cell {
  padding: 1rem 1.25rem;
  font-size: 0.85rem; line-height: 1.5;
  color: var(--text-secondary);
  border-right: 1px solid var(--border);
}
.diff-cell:last-child { border-right: none; }
.diff-header { background: var(--surface); font-weight: 500; font-size: 0.78rem; letter-spacing: 0.05em; color: var(--text-muted); }
.diff-header.highlight { background: var(--mocha-300); color: #F5EFE6; }
.diff-cell.yes { color: var(--text-primary); font-weight: 500; }
.diff-cell.no { color: var(--text-muted); }
.diff-cell.pm { color: var(--mocha-200); font-weight: 500; }
.diff-points { display: flex; flex-direction: column; gap: 1.5rem; margin-top: 2.5rem; }
.diff-point { display: flex; gap: 1rem; align-items: flex-start; }
.diff-point-icon {
  width: 36px; height: 36px; border-radius: 10px;
  background: var(--surface); border: 1px solid var(--border);
  display: flex; align-items: center; justify-content: center;
  font-size: 1rem; flex-shrink: 0;
}
.diff-point-text h4 { font-size: 0.95rem; font-weight: 500; color: var(--text-primary); margin-bottom: 0.25rem; }
.diff-point-text p { font-size: 0.85rem; color: var(--text-secondary); line-height: 1.6; }

`;

export const landingHtml = `


<!-- NAV -->
<nav>
  <div class="nav-logo">Pitchmate</div>
  <div class="nav-right">
    <a href="#how" class="nav-link">How it works</a>
    <a href="#agents" class="nav-link">Features</a>
    <a href="https://github.com/sst2105/Pitchmate" class="nav-link" target="_blank">GitHub</a>
    <button class="theme-toggle" onclick="toggleTheme()" aria-label="Toggle dark mode">☽</button>
    <a href="/app" class="nav-cta">Get started →</a>
  </div>
</nav>

<!-- HERO -->
<section class="hero">
  <div class="hero-bg-circle"></div>
  <div class="hero-left">
    <div class="hero-eyebrow">
      <span class="eyebrow-dot"></span>
      Built for startup applicants
    </div>
    <h1 class="hero-title">
      Your personal guide to<br>
      landing <em>startup</em> roles.
    </h1>
    <p class="hero-body">
      Most career tools are built to beat ATS systems and HR filters.
      Startups don't work that way — founders read resumes personally,
      looking for one thing: can this person contribute from day one?
      <br><br>
      Pitchmate researches the company, reads your resume, finds the gap,
      and tells you exactly how to pitch yourself — for that founder,
      that role, that startup. Not generic advice. Actual intel.
    </p>
    <div class="hero-actions">
      <a href="/app" class="btn-primary">Start for free →</a>
      <a href="#how" class="btn-secondary">See how it works ↓</a>
    </div>
  </div>
  <div class="hero-right">
    <div class="hero-card" style="margin-top: 2rem;">
      <div class="floating-badge">Gap Report</div>
      <div class="card-label">Match Score</div>
      <div class="card-score">74</div>
      <div class="card-score-label">out of 100 — worth applying</div>
      <div class="card-tags">
        <span class="tag tag-green">FastAPI ✓</span>
        <span class="tag tag-green">LLMs ✓</span>
        <span class="tag tag-green">RAG ✓</span>
        <span class="tag tag-amber">Redis — learn first</span>
        <span class="tag tag-red">Prod experience gap</span>
      </div>
      <div class="card-pitch-preview">
        "You built a voice AI agent on Bolna's own platform. That's not a coincidence — make sure they know it was deliberate."
      </div>
    </div>
  </div>
</section>

<!-- LOGO BAR -->
<div class="logo-bar">
  <span class="logo-bar-label">Works with JDs from</span>
  <div class="logo-scroll">
    <span class="logo-item">Wellfound</span>
    <span class="logo-item">LinkedIn</span>
    <span class="logo-item">Instahyre</span>
    <span class="logo-item">Naukri</span>
    <span class="logo-item">Company websites</span>
    <span class="logo-item">Internshala</span>
    <span class="logo-item">Raw paste</span>
    <span class="logo-item">PDF upload</span>
    <span class="logo-item">Wellfound</span>
    <span class="logo-item">LinkedIn</span>
    <span class="logo-item">Instahyre</span>
    <span class="logo-item">Naukri</span>
    <span class="logo-item">Company websites</span>
    <span class="logo-item">Internshala</span>
    <span class="logo-item">Raw paste</span>
    <span class="logo-item">PDF upload</span>
  </div>
</div>

<!-- HOW IT WORKS -->
<section id="how">
  <div class="reveal">
    <p class="section-eyebrow">How it works</p>
    <h2 class="section-title">Three steps.<br><em>One complete picture.</em></h2>
    <p class="section-body">Upload your resume, drop in the JD, and Pitchmate handles the rest — research, analysis, and a pitch that actually sounds like you.</p>
  </div>
  <div class="how-grid reveal">
    <div class="steps">
      <div class="step active" onclick="setStep(0)">
        <div class="step-num">01</div>
        <div class="step-content">
          <h3>Drop your resume and the JD</h3>
          <p>Upload your PDF resume. Paste the job description, drop a URL, or upload a file — any format works.</p>
        </div>
      </div>
      <div class="step" onclick="setStep(1)">
        <div class="step-num">02</div>
        <div class="step-content">
          <h3>Pitchmate researches in real time</h3>
          <p>Three targeted searches on funding, founders, and recent news. Not their About page — actual intel a VC analyst would surface.</p>
        </div>
      </div>
      <div class="step" onclick="setStep(2)">
        <div class="step-num">03</div>
        <div class="step-content">
          <h3>Get your gap report and pitch</h3>
          <p>A direct, honest gap analysis — then choose how you're reaching out. Cold email, LinkedIn, or Wellfound. Pick one, get it written.</p>
        </div>
      </div>
    </div>
    <div class="step-visual">
      <div class="step-visual-content visible" id="sv-0">
        <div class="visual-title">Your inputs</div>
        <p style="font-size:0.88rem; color:var(--text-secondary); margin-bottom:1rem; line-height:1.6;">Pitchmate accepts your resume as a PDF and the JD in any format you have it.</p>
        <div class="visual-chips">
          <span class="chip">Resume PDF</span>
          <span class="chip">JD URL</span>
          <span class="chip">JD paste</span>
          <span class="chip">JD PDF</span>
          <span class="chip">.docx upload</span>
        </div>
        <p style="font-size:0.82rem; color:var(--text-muted); line-height:1.6;">Upload once — your resume stays in session. Run multiple analyses without re-uploading.</p>
      </div>
      <div class="step-visual-content" id="sv-1">
        <div class="visual-title">Real-time company research</div>
        <p style="font-size:0.88rem; color:var(--text-secondary); margin-bottom:1rem; line-height:1.6;">Three targeted Tavily searches, synthesised into structured intelligence.</p>
        <div style="display:flex; flex-direction:column; gap:0.6rem;">
          <div style="background:var(--surface); border-radius:10px; padding:0.75rem 1rem; font-size:0.82rem; color:var(--text-secondary);">🔍 <strong style="color:var(--text-primary);">Funding & growth</strong> — last round, runway signals, headcount</div>
          <div style="background:var(--surface); border-radius:10px; padding:0.75rem 1rem; font-size:0.82rem; color:var(--text-secondary);">🔍 <strong style="color:var(--text-primary);">Founders & team</strong> — background, track record, domain experience</div>
          <div style="background:var(--surface); border-radius:10px; padding:0.75rem 1rem; font-size:0.82rem; color:var(--text-secondary);">🔍 <strong style="color:var(--text-primary);">Recent news</strong> — product launches, press, hiring signals</div>
        </div>
      </div>
      <div class="step-visual-content" id="sv-2">
        <div class="visual-title">Your pitch, your choice</div>
        <p style="font-size:0.88rem; color:var(--text-secondary); margin-bottom:1rem; line-height:1.6;">See your gap report first. Then choose where you're reaching out — one format, written for that medium.</p>
        <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
          <span class="chip highlight">Cold Email</span>
          <span class="chip">LinkedIn Note</span>
          <span class="chip">Wellfound</span>
        </div>
        <p style="font-size:0.82rem; color:var(--text-muted); margin-top:1rem; line-height:1.6;">Each format is written differently — an email has structure, a LinkedIn note has a character limit, Wellfound is conversational. Pitchmate knows the difference.</p>
      </div>
    </div>
  </div>
</section>

<!-- AGENT STACK CARDS -->
<section id="agents" class="agents-section">
  <div class="agents-header reveal">
    <p class="section-eyebrow">Five agents. One pipeline.</p>
    <h2 class="section-title" style="color:#F0E8DC;">Everything you need to apply<br><em>with confidence.</em></h2>
    <p class="section-body">Click any card to see what it does.</p>
  </div>

  <div class="agent-stack reveal" id="agentStack">
    <div class="agent-card ac-1" id="ac0" style="top:0; z-index:5;" onclick="toggleAgent(0)">
      <div class="agent-card-inner">
        <div class="agent-card-text">
          <h3>Understand the role</h3>
          <p>Parses any JD — URL, PDF, paste, or .docx. Extracts what the founder actually wants, not just the keyword list.</p>
        </div>
        <div class="agent-card-icon">📋</div>
      </div>
      <div class="agent-expand">
        <div class="expand-grid">
          <div class="expand-item"><div class="expand-item-label">Accepts</div><div class="expand-item-value">URL, PDF upload, .docx, or paste the text directly</div></div>
          <div class="expand-item"><div class="expand-item-label">Extracts</div><div class="expand-item-value">Role requirements, culture signals, and red flags</div></div>
          <div class="expand-item"><div class="expand-item-label">Finds</div><div class="expand-item-value">What the founder actually wants, not just keywords</div></div>
          <div class="expand-item"><div class="expand-item-label">Also</div><div class="expand-item-value">Identifies green flags and things to watch out for</div></div>
        </div>
      </div>
      <div class="agent-card-num">01</div>
    </div>

    <div class="agent-card ac-2" id="ac1" style="top:90px; z-index:4;" onclick="toggleAgent(1)">
      <div class="agent-card-inner">
        <div class="agent-card-text">
          <h3>Know your story</h3>
          <p>Reads your resume the way a recruiter would. Skills, projects, experience — structured, honest, no assumptions.</p>
        </div>
        <div class="agent-card-icon">📄</div>
      </div>
      <div class="agent-expand">
        <div class="expand-grid">
          <div class="expand-item"><div class="expand-item-label">Upload</div><div class="expand-item-value">PDF resume — upload once, reused for all analyses</div></div>
          <div class="expand-item"><div class="expand-item-label">Reads</div><div class="expand-item-value">Skills, projects, experience, and education</div></div>
          <div class="expand-item"><div class="expand-item-label">Honest</div><div class="expand-item-value">No assumptions — only what's actually in your resume</div></div>
          <div class="expand-item"><div class="expand-item-label">Output</div><div class="expand-item-value">Structured profile used by every other agent</div></div>
        </div>
      </div>
      <div class="agent-card-num">02</div>
    </div>

    <div class="agent-card ac-3" id="ac2" style="top:180px; z-index:3;" onclick="toggleAgent(2)">
      <div class="agent-card-inner">
        <div class="agent-card-text">
          <h3>Real company intel</h3>
          <p>Three targeted searches — funding, founders, news. Not their About page. What a VC analyst would actually look for.</p>
        </div>
        <div class="agent-card-icon">🔍</div>
      </div>
      <div class="agent-expand">
        <div class="expand-grid">
          <div class="expand-item"><div class="expand-item-label">Searches</div><div class="expand-item-value">Funding history, founder backgrounds, recent news</div></div>
          <div class="expand-item"><div class="expand-item-label">Surfaces</div><div class="expand-item-value">Glassdoor signals, headcount trends, red flags</div></div>
          <div class="expand-item"><div class="expand-item-label">Honest</div><div class="expand-item-value">Flags layoffs, stalled funding, or high churn — if it exists</div></div>
          <div class="expand-item"><div class="expand-item-label">Auto</div><div class="expand-item-value">Company name extracted from your JD automatically</div></div>
        </div>
      </div>
      <div class="agent-card-num">03</div>
    </div>

    <div class="agent-card ac-4" id="ac3" style="top:270px; z-index:2;" onclick="toggleAgent(3)">
      <div class="agent-card-inner">
        <div class="agent-card-text">
          <h3>Your honest gap report</h3>
          <p>Talks to you directly — not about you. What lands, what's missing, what to do tonight before you apply.</p>
        </div>
        <div class="agent-card-icon">🎯</div>
      </div>
      <div class="agent-expand">
        <div class="expand-grid">
          <div class="expand-item"><div class="expand-item-label">Tone</div><div class="expand-item-value">Talks to you directly — like a friend, not a recruiter</div></div>
          <div class="expand-item"><div class="expand-item-label">Match score</div><div class="expand-item-value">0–100, calibrated honestly — not inflated to encourage you</div></div>
          <div class="expand-item"><div class="expand-item-label">Gaps</div><div class="expand-item-value">What's missing and exactly what to do about it tonight</div></div>
          <div class="expand-item"><div class="expand-item-label">Impact</div><div class="expand-item-value">How you could contribute in your first 30 days at this company</div></div>
        </div>
      </div>
      <div class="agent-card-num">04</div>
    </div>

    <div class="agent-card ac-5" id="ac4" style="top:360px; z-index:1;" onclick="toggleAgent(4)">
      <div class="agent-card-inner">
        <div class="agent-card-text">
          <h3>Your pitch, your way</h3>
          <p>Core pitch strategy first. Then you choose: cold email, LinkedIn note, or Wellfound message. One format, written properly for that medium.</p>
        </div>
        <div class="agent-card-icon">✉️</div>
      </div>
      <div class="agent-expand">
        <div class="expand-grid">
          <div class="expand-item"><div class="expand-item-label">You choose</div><div class="expand-item-value">Cold email, LinkedIn note, or Wellfound — pick one</div></div>
          <div class="expand-item"><div class="expand-item-label">No fluff</div><div class="expand-item-value">No "passionate about", no generic openers — ever</div></div>
          <div class="expand-item"><div class="expand-item-label">Strategy first</div><div class="expand-item-value">See your pitch angle before the formatted message</div></div>
          <div class="expand-item"><div class="expand-item-label">Ready to send</div><div class="expand-item-value">Copy it, personalise the name, send it</div></div>
        </div>
      </div>
      <div class="agent-card-num">05</div>
    </div>
  </div>
</section>


<!-- DIFFERENTIATION -->
<section class="diff-section">
  <div class="reveal">
    <p class="section-eyebrow">Why not just use ChatGPT?</p>
    <h2 class="section-title">Fair question.<br><em>Here's the honest answer.</em></h2>
    <p class="section-body">You could open ChatGPT, paste your resume, paste the JD, ask it to research the company, ask it to find gaps, ask it to write a pitch — and spend 45 minutes doing it across five tabs, burning your free limit before you're done.</p>
  </div>
  <div class="diff-grid reveal">
    <div class="diff-points">
      <div class="diff-point">
        <div class="diff-point-icon">🎯</div>
        <div class="diff-point-text">
          <h4>Built for exactly this, nothing else</h4>
          <p>General AI gives general answers. Pitchmate is designed around one specific workflow — startup job applications. Every prompt, every output, every agent is tuned for that context.</p>
        </div>
      </div>
      <div class="diff-point">
        <div class="diff-point-icon">🧠</div>
        <div class="diff-point-text">
          <h4>Session memory across the whole pipeline</h4>
          <p>Upload your resume once. It flows through every agent automatically. No re-pasting, no re-explaining, no context lost between steps. ChatGPT forgets everything when you open a new chat.</p>
        </div>
      </div>
      <div class="diff-point">
        <div class="diff-point-icon">🔍</div>
        <div class="diff-point-text">
          <h4>Real-time company research, not training data</h4>
          <p>ChatGPT's knowledge has a cutoff. Pitchmate searches the web right now — funding rounds from last month, Glassdoor reviews from last week, hiring signals from today.</p>
        </div>
      </div>
      <div class="diff-point">
        <div class="diff-point-icon">🆓</div>
        <div class="diff-point-text">
          <h4>Completely free. No premium tier for the good stuff.</h4>
          <p>No "upgrade to unlock company research." No token limits that cut you off mid-analysis. Everything Pitchmate does is free — because students applying to startups shouldn't have to pay to get honest career advice.</p>
        </div>
      </div>
    </div>
    <div>
      <div class="diff-compare">
        <div class="diff-row">
          <div class="diff-cell diff-header"></div>
          <div class="diff-cell diff-header" style="text-align:center;">General AI</div>
          <div class="diff-cell diff-header highlight" style="text-align:center;">Pitchmate</div>
        </div>
        <div class="diff-row">
          <div class="diff-cell yes">Startup-specific analysis</div>
          <div class="diff-cell no" style="text-align:center;">✗</div>
          <div class="diff-cell pm" style="text-align:center;">✓</div>
        </div>
        <div class="diff-row">
          <div class="diff-cell yes">Real-time company research</div>
          <div class="diff-cell no" style="text-align:center;">✗</div>
          <div class="diff-cell pm" style="text-align:center;">✓</div>
        </div>
        <div class="diff-row">
          <div class="diff-cell yes">Session memory across steps</div>
          <div class="diff-cell no" style="text-align:center;">✗</div>
          <div class="diff-cell pm" style="text-align:center;">✓</div>
        </div>
        <div class="diff-row">
          <div class="diff-cell yes">No tab-switching, no re-pasting</div>
          <div class="diff-cell no" style="text-align:center;">✗</div>
          <div class="diff-cell pm" style="text-align:center;">✓</div>
        </div>
        <div class="diff-row">
          <div class="diff-cell yes">Pitch formatted per medium</div>
          <div class="diff-cell no" style="text-align:center;">✗</div>
          <div class="diff-cell pm" style="text-align:center;">✓</div>
        </div>
        <div class="diff-row">
          <div class="diff-cell yes">Honest gap score (not inflated)</div>
          <div class="diff-cell no" style="text-align:center;">✗</div>
          <div class="diff-cell pm" style="text-align:center;">✓</div>
        </div>
        <div class="diff-row">
          <div class="diff-cell yes">Completely free</div>
          <div class="diff-cell no" style="text-align:center;">Limits</div>
          <div class="diff-cell pm" style="text-align:center;">✓ Always</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- PITCH SELECTOR PREVIEW -->
<section class="pitch-section">
  <div class="reveal">
    <p class="section-eyebrow">Choose your medium</p>
    <h2 class="section-title">Same pitch.<br><em>Right format.</em></h2>
  </div>
  <div class="pitch-grid reveal">
    <div class="pitch-options">
      <div class="pitch-opt active" onclick="setPitch(0, this)">
        <div class="pitch-opt-icon">📧</div>
        <div>
          <div class="pitch-opt-label">Cold Email</div>
          <div class="pitch-opt-sub">Subject line + 120-word max body</div>
        </div>
      </div>
      <div class="pitch-opt" onclick="setPitch(1, this)">
        <div class="pitch-opt-icon">💼</div>
        <div>
          <div class="pitch-opt-label">LinkedIn Note</div>
          <div class="pitch-opt-sub">280 characters, punchy, no filler</div>
        </div>
      </div>
      <div class="pitch-opt" onclick="setPitch(2, this)">
        <div class="pitch-opt-icon">🚀</div>
        <div>
          <div class="pitch-opt-label">Wellfound Message</div>
          <div class="pitch-opt-sub">Conversational, 150-180 words</div>
        </div>
      </div>
    </div>
    <div class="pitch-preview-box">
      <div class="pitch-preview-header">
        <span id="pitch-tag" class="pitch-preview-tag">Cold Email</span>
        <span style="font-size:0.8rem; color:var(--text-muted);">Generated for you</span>
      </div>
      <div id="pitch-preview" class="pitch-preview-text">
        <strong>Subject: Built a voice agent on your platform — internship?</strong><br><br>
        Hi [Founder],<br><br>
        I built a voice AI helpdesk agent using Bolna — multi-flow logic, escalation handling, multilingual fallbacks. It's live and it works.<br><br>
        I'm a final-year CS student at GGSIPU who's been building in the same space you're in. I'd be useful on your testing pipeline from day one — I already understand the failure modes.<br><br>
        15 minutes this week? Happy to share the project.
      </div>
    </div>
  </div>
</section>

<!-- PROOF -->
<section class="proof-section">
  <div class="reveal">
    <p class="section-eyebrow">Early users</p>
    <h2 class="section-title">What students are saying.</h2>
  </div>
  <div class="proof-grid reveal">
    <div class="proof-card">
      <p class="proof-quote">"I'd been applying to startups for two months with zero callbacks. Pitchmate told me my resume read like a generalist — I hadn't even realised. Rewrote it in an evening, got a response in three days."</p>
      <div class="proof-author">
        <div class="proof-avatar">AR</div>
        <div><div class="proof-name">Arjun R.</div><div class="proof-role">Final year, IIT Bombay</div></div>
      </div>
    </div>
    <div class="proof-card">
      <p class="proof-quote">"The company research is what got me. I went into my Zepto call knowing their headcount had grown 40% that quarter and they'd just launched dark stores in three new cities. The founder literally asked how I knew that."</p>
      <div class="proof-author">
        <div class="proof-avatar">PS</div>
        <div><div class="proof-name">Priya S.</div><div class="proof-role">Fresh grad, BITS Pilani</div></div>
      </div>
    </div>
    <div class="proof-card">
      <p class="proof-quote">"Every other tool gave me a score and told me to add keywords. Pitchmate told me 'your RAG project is exactly what they're building — say that in the first line.' That's a different level of advice."</p>
      <div class="proof-author">
        <div class="proof-avatar">KM</div>
        <div><div class="proof-name">Kartik M.</div><div class="proof-role">3rd year, NIT Trichy</div></div>
      </div>
    </div>
  </div>
</section>

<!-- CTA -->
<section class="cta-section">
  <h2 class="section-title">Ready to apply<br><em>with confidence?</em></h2>
  <p class="section-body">Free to use. No account needed to start. Upload your resume, paste a JD, and see what Pitchmate finds.</p>
  <a href="/app" class="btn-primary" style="font-size:1.05rem; padding:1rem 2.25rem;">Start for free →</a>
</section>

<!-- FOOTER -->
<footer>
  <div class="footer-logo">Pitchmate</div>
  <div class="footer-links">
    <a href="https://github.com/sst2105/Pitchmate" class="footer-link" target="_blank">GitHub</a>
    <a href="#how" class="footer-link">How it works</a>
    <a href="#agents" class="footer-link">Features</a>
  </div>
  <div class="footer-copy">Built by Shreya · JIMS GGSIPU · 2026</div>
</footer>



`;

export const landingScript = `

function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? '' : 'dark');
  document.querySelector('.theme-toggle').textContent = isDark ? '☽' : '☀';
}

const stepVisuals = ['sv-0','sv-1','sv-2'];
function setStep(i) {
  document.querySelectorAll('.step').forEach((s,j) => s.classList.toggle('active', j===i));
  stepVisuals.forEach(id => document.getElementById(id).classList.remove('visible'));
  document.getElementById('sv-'+i).classList.add('visible');
}

const agentTops = [0, 60, 120, 180, 240];
const agentExpanded = [false,false,false,false,false];
function toggleAgent(i) {
  const card = document.getElementById('ac'+i);
  agentExpanded[i] = !agentExpanded[i];
  card.classList.toggle('expanded', agentExpanded[i]);
  let offset = 0;
  for(let j=0; j<5; j++) {
    const c = document.getElementById('ac'+j);
    c.style.top = offset + 'px';
    offset += agentExpanded[j] ? 240 : 90;
  }
  const stack = document.getElementById('agentStack');
  stack.style.height = (offset + 200) + 'px';
}

const pitchContent = [
  {
    tag: 'Cold Email',
    html: \`<strong>Subject: Built a voice agent on your platform — internship?</strong><br><br>Hi [Founder],<br><br>I built a voice AI helpdesk agent using Bolna — multi-flow logic, escalation handling, multilingual fallbacks. It's live and it works.<br><br>I'm a final-year CS student at GGSIPU who's been building in the same space you're in. I'd be useful on your testing pipeline from day one — I already understand the failure modes.<br><br>15 minutes this week? Happy to share the project.\`
  },
  {
    tag: 'LinkedIn Note',
    html: \`Built a voice AI agent on Bolna's platform. Same problem space you're in — I want to help make it sharper. Would love to connect and share what I built.\`
  },
  {
    tag: 'Wellfound',
    html: \`I've been following Bolna since your seed round — the problem of giving enterprises a clean way to deploy voice agents is one I've been building in personally.<br><br>I designed and deployed a voice helpdesk agent on your platform: multi-flow conversations, escalation logic, multilingual input handling. I ran into the same edge cases your customers probably do.<br><br>I'm a final-year CS student, I move fast, and I can contribute to your testing and QA pipeline from the start. I applied because of the problem you're solving, not because I'm applying everywhere.\`
  }
];
function setPitch(i, el) {
  document.querySelectorAll('.pitch-opt').forEach(o => o.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('pitch-tag').textContent = pitchContent[i].tag;
  document.getElementById('pitch-preview').innerHTML = pitchContent[i].html;
}

const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if(e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.12 });
reveals.forEach(r => observer.observe(r));

`;

export const appCss = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500;700&family=DM+Mono:wght@400;500&display=swap');

:root {
  --cream: #F5EFE6;
  --cream-dark: #EDE4D8;
  --mocha-100: #C4A882;
  --mocha-200: #A07850;
  --mocha-300: #7A5535;
  --mocha-400: #5C3D22;
  --mocha-500: #3D2510;
  --espresso: #1C1008;
  --text-primary: #1C1008;
  --text-secondary: #5C4030;
  --text-muted: #9A7A62;
  --card-bg: #FFFFFF;
  --border: #D4C4B0;
  --surface: #EDE4D8;
  --nav-bg: rgba(245,239,230,0.92);
  --green-bg: #E8F4E8;
  --green-text: #2D5A2D;
  --amber-bg: #FBF0E0;
  --amber-text: #7A5020;
  --red-bg: #FAE8E8;
  --red-text: #7A2020;
}

[data-theme="dark"] {
  --cream: #1C1008;
  --cream-dark: #251508;
  --text-primary: #F0E8DC;
  --text-secondary: #C4A882;
  --text-muted: #7A5535;
  --card-bg: #2A1A0C;
  --border: #3D2510;
  --surface: #251508;
  --nav-bg: rgba(28,16,8,0.95);
  --green-bg: rgba(45,90,45,0.2);
  --green-text: #7AC87A;
  --amber-bg: rgba(122,80,32,0.2);
  --amber-text: #D4A060;
  --red-bg: rgba(122,32,32,0.2);
  --red-text: #D47A7A;
}

* { margin:0; padding:0; box-sizing:border-box; }

html { scroll-behavior:smooth; }

body {
  font-family:'DM Sans', sans-serif;
  background:var(--cream);
  color:var(--text-primary);
  overflow-x:hidden;
}

/* NAV */
nav {
  position:fixed;
  top:0;
  left:0;
  right:0;
  z-index:200;
  background:var(--nav-bg);
  backdrop-filter:blur(14px);
  border-bottom:1px solid var(--border);
  height:58px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:0 2.5rem;
}

.nav-logo {
  font-family:'Playfair Display', serif;
  font-size:1.35rem;
  font-weight:700;
  color:var(--mocha-300);
  text-decoration:none;
}

.nav-right {
  display:flex;
  align-items:center;
  gap:1rem;
}

.session-pill {
  font-family:'DM Mono', monospace;
  font-size:0.7rem;
  color:var(--text-muted);
  background:var(--surface);
  border:1px solid var(--border);
  padding:0.25rem 0.75rem;
  border-radius:100px;
}

.theme-toggle {
  background:none;
  border:1px solid var(--border);
  width:32px;
  height:32px;
  border-radius:50%;
  cursor:pointer;
  display:flex;
  align-items:center;
  justify-content:center;
  color:var(--text-secondary);
  font-size:0.9rem;
}

.theme-toggle:hover { border-color:var(--mocha-200); }

/* HERO */
.hero-header {
  padding:130px 2.5rem 0;
  max-width:920px;
  margin:0 auto;
  text-align:center;
  padding-bottom:5rem;
}

.hero-eyebrow {
  display:inline-flex;
  align-items:center;
  gap:0.4rem;
  font-size:0.78rem;
  font-weight:500;
  color:var(--mocha-200);
  background:var(--surface);
  border:1px solid var(--border);
  padding:0.3rem 0.9rem;
  border-radius:100px;
  margin-bottom:1.25rem;
}

.eyebrow-dot {
  width:5px;
  height:5px;
  border-radius:50%;
  background:var(--mocha-200);
  animation:pulse 2s infinite;
}

@keyframes pulse {
  0%,100% { opacity:1; }
  50% { opacity:.35; }
}

.hero-header h1 {
  font-family:'Playfair Display', serif;
  font-size:clamp(2.7rem,6vw,4.9rem);
  font-weight:700;
  line-height:.96;
  letter-spacing:-0.04em;
  color:var(--text-primary);
  margin-bottom:1.3rem;
}

.hero-header h1 em {
  font-style:italic;
  color:var(--mocha-200);
}

.hero-header p {
  font-size:1rem;
  color:var(--text-secondary);
  line-height:1.85;
  max-width:540px;
  margin:0 auto 2rem;
}

.hero-tip {
  display:inline-flex;
  align-items:center;
  gap:0.5rem;
  font-size:0.82rem;
  color:var(--text-muted);
  background:var(--surface);
  border:1px solid var(--border);
  padding:0.5rem 1rem;
  border-radius:12px;
  line-height:1.5;
}

/* PEEL SECTION */
.peel-section {
  height:600vh;
  position:relative;
  background-color:var(--cream-dark);
  background-image:radial-gradient(circle, rgba(154,122,98,0.22) 1px, transparent 1px);
  background-size:22px 22px;
}

.peel-sticky {
  position:sticky;
  top:58px;
  height:calc(100vh - 58px);
  overflow:hidden;
  z-index:10;
  padding:0 10px;
}

.peel-track {
  display:flex;
  height:100%;
  gap:0;
  align-items:stretch;
}

.peel-card {
  flex-shrink:0;
  width:52px;
  height:100%;
  overflow:hidden;
  position:relative;
  cursor:pointer;
  will-change:width;
  transition:filter .25s ease;
}

.peel-card:not(.is-active):hover {
  filter:brightness(1.08);
}

.peel-card.is-active {
  cursor:default;
  z-index:2;
  background:var(--card-bg);
  box-shadow:-12px 0 40px rgba(28,16,8,0.08), 12px 0 40px rgba(28,16,8,0.08);
}

/* COLLAPSED SPINE */
.card-spine {
  position:absolute;
  inset:0;
  display:flex;
  flex-direction:column;
  justify-content:space-between;
  align-items:center;
  padding:1.75rem 0 2.25rem;
  user-select:none;
  z-index:2;
  transition:opacity 0.35s;
}

.spine-num {
  font-family:'DM Mono', monospace;
  font-size:0.65rem;
  font-weight:500;
  letter-spacing:0.12em;
  color:rgba(255,255,255,0.55);
  writing-mode:vertical-lr;
}

.spine-label {
  font-family:'DM Mono', monospace;
  font-size:0.62rem;
  font-weight:500;
  letter-spacing:0.28em;
  text-transform:uppercase;
  color:rgba(255,255,255,0.92);
  writing-mode:vertical-lr;
  text-orientation:mixed;
  white-space:nowrap;
}

/* COLORS */
.ac-resume  { background:#3D4F5F; }
.ac-jd      { background:#C9B896; }
.ac-company { background:#A06850; }
.ac-gap     { background:#5C4030; }
.ac-pitch   { background:#7A8FA0; }

/* PANEL */
.card-panel {
  position:absolute;
  inset:0;
  background:var(--cream);
  overflow:hidden;
  opacity:0;
  pointer-events:none;
  display:flex;
  flex-direction:column;
}

.peel-card.is-active .card-panel,
.peel-card.is-opening .card-panel {
  opacity:1;
  pointer-events:all;
  overflow-y:auto;
}

.peel-card.is-active.ac-resume::before,
.peel-card.is-active.ac-jd::before,
.peel-card.is-active.ac-company::before,
.peel-card.is-active.ac-gap::before,
.peel-card.is-active.ac-pitch::before {
  content:'';
  position:absolute;
  top:0;
  left:0;
  right:0;
  height:3px;
  z-index:5;
}

.peel-card.is-active.ac-resume::before { background:#3D4F5F; }
.peel-card.is-active.ac-jd::before { background:#A06850; }
.peel-card.is-active.ac-company::before { background:#5C4030; }
.peel-card.is-active.ac-gap::before { background:#8B6345; }
.peel-card.is-active.ac-pitch::before { background:#7A8FA0; }

.panel-head {
  flex-shrink:0;
  display:flex;
  align-items:center;
  gap:1rem;
  padding:1.75rem 2.5rem 0;
  opacity:0;
  transform:translateY(12px);
  transition:opacity .4s, transform .4s;
}

.peel-card.is-active .panel-head {
  opacity:1;
  transform:translateY(0);
}

.panel-head-num {
  font-family:'DM Mono', monospace;
  font-size:0.72rem;
  color:var(--text-muted);
  letter-spacing:0.08em;
}

.panel-head-title {
  font-family:'Playfair Display', serif;
  font-size:clamp(1.55rem,3vw,2.15rem);
  font-weight:700;
  color:var(--text-primary);
  flex:1;
  line-height:1.05;
}

.panel-head-desc {
  font-size:0.82rem;
  color:var(--text-muted);
  max-width:280px;
  text-align:right;
  line-height:1.4;
}

.strip-status {
  display:flex;
  align-items:center;
  gap:0.35rem;
  font-size:0.75rem;
  font-weight:500;
  padding:0.25rem 0.75rem;
  border-radius:100px;
  white-space:nowrap;
}

.ss-ready { background:var(--surface); color:var(--text-muted); border:1px solid var(--border); }
.ss-locked { background:var(--surface); color:var(--text-muted); border:1px solid var(--border); opacity:.6; }
.ss-loading { background:var(--amber-bg); color:var(--amber-text); }
.ss-done { background:var(--green-bg); color:var(--green-text); }
.ss-error { background:var(--red-bg); color:var(--red-text); }

.sdot {
  width:6px;
  height:6px;
  border-radius:50%;
  background:currentColor;
}

.ss-loading .sdot { animation:pulse 1s infinite; }

.panel-inner {
  max-width:760px;
  margin:0 auto;
  padding:1.75rem 2.5rem 3rem;
  width:100%;
  flex:1;
  opacity:0;
  transform:translateY(20px);
  transition:opacity .45s .08s, transform .45s .08s;
}

.peel-card.is-active .panel-inner {
  opacity:1;
  transform:translateY(0);
}

/* FLIP CARD */
.flip-shell {
  perspective:1400px;
  min-height:520px;
}

.flip-card {
  position:relative;
  width:100%;
  min-height:520px;
  transform-style:preserve-3d;
  transition:transform .75s cubic-bezier(.2,.8,.2,1);
}

.flip-card.flipped { transform:rotateY(180deg); }

.flip-face {
  position:absolute;
  inset:0;
  backface-visibility:hidden;
  background:var(--card-bg);
  border:1px solid var(--border);
  border-radius:24px;
  padding:1.5rem;
  overflow:auto;
  box-shadow:0 18px 50px rgba(28,16,8,.08);
}

.flip-back { transform:rotateY(180deg); }

.face-kicker {
  font-family:'DM Mono', monospace;
  font-size:.72rem;
  color:var(--text-muted);
  letter-spacing:.12em;
  text-transform:uppercase;
  margin-bottom:.8rem;
}

.face-title {
  font-family:'Playfair Display', serif;
  font-size:clamp(2rem,4vw,3rem);
  line-height:1;
  letter-spacing:-.03em;
  margin-bottom:.75rem;
}

.face-sub {
  color:var(--text-secondary);
  line-height:1.7;
  max-width:560px;
  margin-bottom:1.5rem;
}

.locked-bar {
  padding:1rem;
  font-size:.85rem;
  color:var(--text-muted);
  background:var(--surface);
  border:1px solid var(--border);
  border-radius:14px;
  display:flex;
  align-items:center;
  gap:.5rem;
}

/* FORMS */
label {
  font-size:.8rem;
  font-weight:500;
  color:var(--text-secondary);
  display:block;
  margin-bottom:.4rem;
}

.field-hint {
  font-size:.74rem;
  color:var(--text-muted);
  font-weight:400;
  margin-left:.4rem;
}

input[type=text],
input[type=url],
textarea {
  width:100%;
  background:var(--cream);
  border:1px solid var(--border);
  border-radius:12px;
  padding:.75rem .95rem;
  font-family:'DM Sans', sans-serif;
  font-size:.9rem;
  color:var(--text-primary);
  outline:none;
  transition:border-color .2s;
  resize:vertical;
}

input:focus,
textarea:focus { border-color:var(--mocha-200); }

.drop-zone {
  border:1.5px dashed var(--border);
  border-radius:16px;
  padding:2rem;
  text-align:center;
  cursor:pointer;
  background:var(--surface);
  position:relative;
  transition:all .2s;
}

.drop-zone:hover,
.drop-zone.dragover {
  border-color:var(--mocha-200);
  background:var(--cream);
}

.drop-zone input[type=file] {
  position:absolute;
  inset:0;
  opacity:0;
  cursor:pointer;
  width:100%;
}

.dz-title {
  font-size:.92rem;
  font-weight:500;
  color:var(--text-secondary);
  margin-bottom:.25rem;
}

.dz-sub {
  font-size:.78rem;
  color:var(--text-muted);
}

.dz-chosen {
  font-size:.82rem;
  font-weight:500;
  color:var(--mocha-300);
  margin-top:.5rem;
}

.jd-tabs {
  display:flex;
  gap:.4rem;
  margin-bottom:.75rem;
}

.jtab {
  padding:.35rem .85rem;
  border-radius:100px;
  font-size:.78rem;
  font-weight:500;
  border:1px solid var(--border);
  background:none;
  color:var(--text-muted);
  cursor:pointer;
  transition:all .2s;
}

.jtab.on {
  background:var(--mocha-300);
  color:#F5EFE6;
  border-color:transparent;
}

.jd-panel { display:none; }
.jd-panel.on { display:block; }

.row2 {
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:.85rem;
}

.action-row {
  display:flex;
  align-items:center;
  gap:.8rem;
  flex-wrap:wrap;
  padding-top:1rem;
}

.btn-run,
.btn-soft {
  border-radius:100px;
  padding:.68rem 1.45rem;
  font-family:'DM Sans', sans-serif;
  font-size:.875rem;
  font-weight:500;
  cursor:pointer;
  transition:all .2s;
}

.btn-run {
  background:var(--mocha-300);
  color:#F5EFE6;
  border:none;
}

.btn-run:hover { background:var(--mocha-400); }
.btn-run:disabled { opacity:.5; cursor:not-allowed; }

.btn-soft {
  background:transparent;
  color:var(--text-secondary);
  border:1px solid var(--border);
}

.btn-soft:hover {
  border-color:var(--mocha-200);
  color:var(--text-primary);
}

.form-err {
  margin-top:1rem;
  font-size:.8rem;
  color:var(--red-text);
  background:var(--red-bg);
  padding:.65rem .9rem;
  border-radius:10px;
  display:none;
}

.form-err.show { display:block; }

/* RESULTS */
.result-label {
  font-size:.72rem;
  font-weight:500;
  letter-spacing:.08em;
  text-transform:uppercase;
  color:var(--text-muted);
  margin-bottom:.55rem;
}

.r-name {
  font-family:'Playfair Display', serif;
  font-size:1.5rem;
  font-weight:700;
  color:var(--text-primary);
  margin-bottom:.2rem;
}

.r-meta {
  font-size:.85rem;
  color:var(--text-muted);
  margin-bottom:1rem;
}

.r-section { margin-bottom:1rem; }

.chip-wrap {
  display:flex;
  flex-wrap:wrap;
  gap:.4rem;
}

.chip {
  padding:.28rem .7rem;
  border-radius:8px;
  font-size:.78rem;
  font-weight:500;
}

.cg { background:var(--green-bg); color:var(--green-text); }
.ca { background:var(--amber-bg); color:var(--amber-text); }
.cr { background:var(--red-bg); color:var(--red-text); }
.cn { background:var(--cream); border:1px solid var(--border); color:var(--text-secondary); }

.r-list {
  list-style:none;
  display:flex;
  flex-direction:column;
  gap:.4rem;
}

.r-list li {
  font-size:.875rem;
  color:var(--text-secondary);
  padding-left:1rem;
  position:relative;
  line-height:1.55;
}

.r-list li::before {
  content:'→';
  position:absolute;
  left:0;
  color:var(--mocha-200);
  font-size:.75rem;
}

.summary-box {
  background:var(--cream);
  border:1px solid var(--border);
  border-left:3px solid var(--mocha-100);
  border-radius:0 12px 12px 0;
  padding:1rem 1.1rem;
  font-size:.9rem;
  line-height:1.7;
  color:var(--text-secondary);
}

.big-score {
  display:flex;
  align-items:baseline;
  gap:.4rem;
  margin-bottom:1rem;
}

.big-score-num {
  font-family:'Playfair Display', serif;
  font-size:4.2rem;
  font-weight:700;
  line-height:1;
  color:var(--mocha-200);
}

.big-score-denom {
  color:var(--text-muted);
  font-size:1rem;
}

.pitch-liner {
  font-family:'Playfair Display', serif;
  font-size:1.25rem;
  font-style:italic;
  line-height:1.45;
  color:var(--text-primary);
  border-left:3px solid var(--mocha-200);
  padding-left:1rem;
  margin-bottom:1.1rem;
}

.next-nudge {
  display:inline-flex;
  align-items:center;
  gap:.5rem;
  padding:.62rem 1rem;
  background:var(--surface);
  border:1px solid var(--border);
  border-radius:100px;
  font-size:.82rem;
  color:var(--text-secondary);
  cursor:pointer;
  margin-top:1rem;
}

.next-nudge:hover { border-color:var(--mocha-200); }

.skel-wrap { display:flex; flex-direction:column; gap:.65rem; }

.skel {
  height:14px;
  border-radius:6px;
  background:linear-gradient(90deg,var(--border) 0%,var(--cream-dark) 50%,var(--border) 100%);
  background-size:200% 100%;
  animation:shimmer 1.4s infinite;
}

.skel.w40{width:40%}
.skel.w60{width:60%}
.skel.w80{width:80%}
.skel.wfull{width:100%}
.skel.h20{height:22px}

@keyframes shimmer {
  0% { background-position:200% 0; }
  100% { background-position:-200% 0; }
}

/* BOTTOM */
.after {
  height:60vh;
  display:flex;
  align-items:center;
  justify-content:center;
  color:var(--text-muted);
  font-size:.9rem;
}

@media(max-width:760px) {
  nav { padding:0 1.25rem; }
  .session-pill { display:none; }
  .hero-header { padding:105px 1.25rem 3.5rem; }
  .hero-header h1 { font-size:3rem; }
  .panel-head {
    padding:1.25rem 1.25rem 0;
    flex-wrap:wrap;
  }
  .panel-head-desc { display:none; }
  .panel-inner { padding:1.25rem 1.25rem 2rem; }
  .row2 { grid-template-columns:1fr; }
  .peel-section { height:520vh; }
  .peel-sticky { padding:0 6px; }
  .flip-shell, .flip-card { min-height:560px; }
  .peel-card {
    width: 36px; 
  }

  .peel-card.is-active {
    width: calc(100vw - 36px * 4 - 12px) 
  }

  .spine-label {
    font-size: 0.52rem;
    letter-spacing: 0.18em;
  }

  .spine-num {
    display: none;
  }

  .panel-head-title {
    font-size: 1.25rem;
  }
}

`;

export const appHtml = `


<nav>
  <a href="/" class="nav-logo">Pitchmate</a>
  <div class="nav-right">
    <button class="theme-toggle" onclick="toggleTheme()" aria-label="Toggle theme">☽</button>
  </div>
</nav>

<div class="hero-header">
  <div class="hero-eyebrow">
    <span class="eyebrow-dot"></span>
    Let's get you the role
  </div>

  <h1>
    Resume.<br>
    Role.<br>
    Research.<br>
    <em>Pitch.</em><br>
    Connected.
  </h1>

  <p>
    Start with your resume and the role.
    We'll connect the dots — research, gaps,
    positioning, and your pitch.
  </p>

  <div class="hero-tip">
    💡 Start with your resume and the job posting — everything else opens up from there
  </div>
</div>

<div class="peel-section" id="peelSection">
  <div class="peel-sticky">
    <div class="peel-track" id="peelTrack">

      <!-- RESUME -->
      <div class="peel-card ac-resume" id="card-resume" data-card="resume" data-index="0">
        <div class="card-spine" onclick="focusCard('resume')">
          <span class="spine-num">01</span>
          <span class="spine-label">Resume</span>
        </div>

        <div class="card-panel">
          <div class="panel-head">
            <span class="panel-head-num">01</span>
            <h2 class="panel-head-title">Know your story</h2>
            <span class="panel-head-desc">Upload once — used across every step</span>
            <span class="strip-status ss-ready" id="status-resume"><span class="sdot"></span> Ready</span>
          </div>

          <div class="panel-inner">
            <div class="flip-shell">
              <div class="flip-card" id="flip-resume">
                <div class="flip-face flip-front">
                  <div class="face-kicker">Input</div>
                  <div class="face-title">Your resume already has the pitch.</div>
                  <p class="face-sub">Upload your PDF. Pitchmate extracts your skills, projects, experience, and the proof points hidden inside your resume.</p>

                  <label>Resume PDF <span class="field-hint">PDF only · max 5 MB</span></label>
                  <div class="drop-zone" id="dz-resume">
                    <input type="file" accept=".pdf" onchange="fileSelected('resume',this)">
                    <div class="dz-title">Drop your resume here</div>
                    <div class="dz-sub">or click to browse</div>
                    <div class="dz-chosen" id="dz-resume-name"></div>
                  </div>

                  <div class="form-err" id="err-resume"></div>

                  <div class="action-row">
                    <button class="btn-run" id="btn-resume" onclick="runResume()">Analyse resume →</button>
                  </div>
                </div>

                <div class="flip-face flip-back">
                  <div class="result-label">Resume profile</div>
                  <div id="res-resume-body"></div>
                  <button class="next-nudge" onclick="openCard('jd')">Next: drop in the job posting →</button>
                  <button class="btn-soft" style="margin-top:1rem;" onclick="unflip('resume')">Edit resume</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- JD -->
      <div class="peel-card ac-jd" id="card-jd" data-card="jd" data-index="1">
        <div class="card-spine" onclick="focusCard('jd')">
          <span class="spine-num">02</span>
          <span class="spine-label">Role</span>
        </div>

        <div class="card-panel">
          <div class="panel-head">
            <span class="panel-head-num">02</span>
            <h2 class="panel-head-title">Understand the role</h2>
            <span class="panel-head-desc">URL, paste, PDF or .docx</span>
            <span class="strip-status ss-ready" id="status-jd"><span class="sdot"></span> Ready</span>
          </div>

          <div class="panel-inner">
            <div class="flip-shell">
              <div class="flip-card" id="flip-jd">
                <div class="flip-face flip-front">
                  <div class="face-kicker">Input</div>
                  <div class="face-title">Decode what they actually want.</div>
                  <p class="face-sub">Paste the role or add a job link. We extract requirements, culture signals, red flags, and the founder-style intent behind the JD.</p>

                  <div class="jd-tabs">
                    <button class="jtab on" id="jtab-url" onclick="switchJdTab('url')">URL</button>
                    <button class="jtab" id="jtab-paste" onclick="switchJdTab('paste')">Paste</button>
                    <button class="jtab" id="jtab-file" onclick="switchJdTab('file')">File</button>
                  </div>

                  <div class="jd-panel on" id="jdp-url">
                    <label>Job posting URL</label>
                    <input type="url" id="jd-url" placeholder="https://wellfound.com/jobs/...">
                  </div>

                  <div class="jd-panel" id="jdp-paste">
                    <label>Paste JD text</label>
                    <textarea id="jd-paste" rows="6" placeholder="Paste the full job description here..."></textarea>
                  </div>

                  <div class="jd-panel" id="jdp-file">
                    <label>Upload JD <span class="field-hint">PDF or .docx</span></label>
                    <div class="drop-zone" id="dz-jd">
                      <input type="file" accept=".pdf,.docx" onchange="fileSelected('jd',this)">
                      <div class="dz-title">Drop the JD here</div>
                      <div class="dz-sub">PDF or .docx accepted</div>
                      <div class="dz-chosen" id="dz-jd-name"></div>
                    </div>
                  </div>

                  <div class="form-err" id="err-jd"></div>

                  <div class="action-row">
                    <button class="btn-run" id="btn-jd" onclick="runJd()">Analyse JD →</button>
                  </div>
                </div>

                <div class="flip-face flip-back">
                  <div class="result-label">JD analysis</div>
                  <div id="res-jd-body"></div>
                  <button class="next-nudge" onclick="openCard('company')">Next: research the company →</button>
                  <button class="btn-soft" style="margin-top:1rem;" onclick="unflip('jd')">Edit JD</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- COMPANY -->
      <div class="peel-card ac-company" id="card-company" data-card="company" data-index="2">
        <div class="card-spine" onclick="focusCard('company')">
          <span class="spine-num">03</span>
          <span class="spine-label">Company</span>
        </div>

        <div class="card-panel">
          <div class="panel-head">
            <span class="panel-head-num">03</span>
            <h2 class="panel-head-title">Read the company</h2>
            <span class="panel-head-desc">Funding, founders, news — live research</span>
            <span class="strip-status ss-locked" id="status-company"><span class="sdot"></span> Complete JD first</span>
          </div>

          <div class="panel-inner">
            <div class="flip-shell">
              <div class="flip-card" id="flip-company">
                <div class="flip-face flip-front">
                  <div class="face-kicker">Research</div>
                  <div class="face-title">Go beyond their About page.</div>
                  <p class="face-sub">We look for funding signals, founder context, recent product launches, hiring signals, and anything you should know before applying.</p>

                  <div class="locked-bar" id="company-lock-msg">🔒 Analyse the JD first — company name fills in automatically.</div>

                  <div id="company-form" style="display:none;">
                    <div class="row2">
                      <div>
                        <label>Company</label>
                        <input type="text" id="co-name" placeholder="e.g. Bolna AI">
                      </div>
                      <div>
                        <label>Role</label>
                        <input type="text" id="co-role" placeholder="e.g. Backend Engineer">
                      </div>
                    </div>

                    <div class="form-err" id="err-company"></div>

                    <div class="action-row">
                      <button class="btn-run" id="btn-company" onclick="runCompany()">Research company →</button>
                    </div>
                  </div>
                </div>

                <div class="flip-face flip-back">
                  <div class="result-label">Company intel</div>
                  <div id="res-company-body"></div>
                  <button class="next-nudge" onclick="openCard('gap')">Next: get your gap report →</button>
                  <button class="btn-soft" style="margin-top:1rem;" onclick="unflip('company')">Edit company</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- GAP -->
      <div class="peel-card ac-gap" id="card-gap" data-card="gap" data-index="3">
        <div class="card-spine" onclick="focusCard('gap')">
          <span class="spine-num">04</span>
          <span class="spine-label">Gap</span>
        </div>

        <div class="card-panel">
          <div class="panel-head">
            <span class="panel-head-num">04</span>
            <h2 class="panel-head-title">Find the gaps</h2>
            <span class="panel-head-desc">Honest match score + what to do tonight</span>
            <span class="strip-status ss-locked" id="status-gap"><span class="sdot"></span> Complete Resume + JD</span>
          </div>

          <div class="panel-inner">
            <div class="flip-shell">
              <div class="flip-card" id="flip-gap">
                <div class="flip-face flip-front">
                  <div class="face-kicker">Analysis</div>
                  <div class="face-title">Get the honest version.</div>
                  <p class="face-sub">No inflated score. No generic advice. Just what lands, what's missing, and what you should fix before applying.</p>

                  <div class="locked-bar" id="gap-lock-msg">🔒 Finish Resume and JD analysis to unlock your gap report.</div>

                  <div id="gap-form" style="display:none;">
                    <p style="font-size:.9rem; color:var(--text-muted); line-height:1.7;">
                      Uses your resume and JD. No extra input needed.
                    </p>

                    <div class="form-err" id="err-gap"></div>

                    <div class="action-row">
                      <button class="btn-run" id="btn-gap" onclick="runGap()">Get gap report →</button>
                    </div>
                  </div>
                </div>

                <div class="flip-face flip-back">
                  <div class="result-label">Gap analysis</div>
                  <div id="res-gap-body"></div>
                  <button class="next-nudge" onclick="openCard('pitch')">Next: build your pitch →</button>
                  <button class="btn-soft" style="margin-top:1rem;" onclick="unflip('gap')">Run again</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- PITCH -->
      <div class="peel-card ac-pitch" id="card-pitch" data-card="pitch" data-index="4">
        <div class="card-spine" onclick="focusCard('pitch')">
          <span class="spine-num">05</span>
          <span class="spine-label">Pitch</span>
        </div>

        <div class="card-panel">
          <div class="panel-head">
            <span class="panel-head-num">05</span>
            <h2 class="panel-head-title">Craft your pitch</h2>
            <span class="panel-head-desc">One-liner · cold email · LinkedIn · Wellfound</span>
            <span class="strip-status ss-locked" id="status-pitch"><span class="sdot"></span> Complete Gap + Company</span>
          </div>

          <div class="panel-inner">
            <div class="flip-shell">
              <div class="flip-card" id="flip-pitch">
                <div class="flip-face flip-front">
                  <div class="face-kicker">Output</div>
                  <div class="face-title">Say the right thing first.</div>
                  <p class="face-sub">Combines company intel and your gap report into a pitch that sounds specific, intentional, and actually usable.</p>

                  <div class="locked-bar" id="pitch-lock-msg">🔒 Complete the Gap Report and Company Research first.</div>

                  <div id="pitch-form" style="display:none;">
                    <div class="form-err" id="err-pitch"></div>

                    <div class="action-row">
                      <button class="btn-run" id="btn-pitch" onclick="runPitch()">Build my pitch →</button>
                    </div>
                  </div>
                </div>

                <div class="flip-face flip-back">
                  <div class="result-label">Pitch strategy</div>
                  <div id="res-pitch-body"></div>
                  <button class="btn-soft" style="margin-top:1rem;" onclick="unflip('pitch')">Run again</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>

<div class="after">
  End of session flow · iterate styling from here
</div>




`;

export const appScript = `

/* CONFIG */
const API_BASE = window.__PITCHMATE_API_BASE__ || 'https://pitchmate-api-641857263230.asia-south1.run.app';
const SESSION_ID = localStorage.getItem('pm_session') || crypto.randomUUID();
localStorage.setItem('pm_session', SESSION_ID);

/* STATE */
const S = {
  id: crypto.randomUUID().slice(0,8),
  resumeFile: null,
  jdMode: 'url',
  jdFile: null,
  results: { resume:null, jd:null, company:null, gap:null, pitch:null }
};


/* THEME */
function toggleTheme() {
  const d = document.documentElement;
  const dark = d.getAttribute('data-theme') === 'dark';
  d.setAttribute('data-theme', dark ? '' : 'dark');
  document.querySelector('.theme-toggle').textContent = dark ? '☽' : '☀';
}

/* PEEL ACCORDION */
const CARDS = ['resume','jd','company','gap','pitch'];
const CARD_COUNT = CARDS.length;
const COLLAPSED_W = 48;
const CARD_INDEX = Object.fromEntries(CARDS.map((id,i)=>[id,i]));
let peelRaf = null;

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function getPeelMetrics() {
  const section = document.getElementById('peelSection');
  const sticky = section.querySelector('.peel-sticky');
  const stickyH = sticky.offsetHeight;
  const scrollRange = section.offsetHeight - stickyH;
  const raw = scrollRange > 0 ? (window.scrollY - section.offsetTop) / scrollRange : 0;
  const progress = Math.max(0, Math.min(1, raw));
  const trackW = sticky.offsetWidth - 20;
  const expandedW = trackW - (CARD_COUNT - 1) * COLLAPSED_W;
  return { progress, expandedW };
}

function updatePeelAccordion() {
  peelRaf = null;
  const cards = document.querySelectorAll('.peel-card');
  const { progress, expandedW } = getPeelMetrics();

  const t = progress * (CARD_COUNT - 1);
  const baseIdx = Math.floor(t);
  const frac = t - baseIdx;

  cards.forEach((card, i) => {
    let weight = 0;
    if (i === baseIdx) weight = 1 - frac;
    else if (i === baseIdx + 1) weight = frac;

    const eased = easeOutCubic(weight);
    const w = COLLAPSED_W + (expandedW - COLLAPSED_W) * eased;

    card.style.width = w + 'px';

    const isActive = weight > 0.55;
    const isOpening = weight > 0.12 && weight <= 0.55;

    card.classList.toggle('is-active', isActive);
    card.classList.toggle('is-opening', isOpening);

    const spine = card.querySelector('.card-spine');
    if (spine) {
      spine.style.opacity = String(Math.max(0, 1 - eased * 1.4));
      spine.style.pointerEvents = eased > 0.2 ? 'none' : 'auto';
    }

    const panel = card.querySelector('.card-panel');
    if (panel) {
      panel.style.opacity = String(Math.min(1, Math.max(0, (eased - 0.08) / 0.5)));
    }
  });
}

function onPeelScroll() {
  if (!peelRaf) peelRaf = requestAnimationFrame(updatePeelAccordion);
}

window.addEventListener('scroll', onPeelScroll, { passive:true });
window.addEventListener('resize', onPeelScroll, { passive:true });

function scrollToCard(id) {
  const idx = CARD_INDEX[id];
  if (idx == null) return;

  const section = document.getElementById('peelSection');
  const stickyH = section.querySelector('.peel-sticky').offsetHeight;
  const scrollRange = section.offsetHeight - stickyH;
  const progress = CARD_COUNT > 1 ? idx / (CARD_COUNT - 1) : 0;

  window.scrollTo({
    top: section.offsetTop + progress * scrollRange,
    behavior: 'smooth'
  });
}

function openCard(id) {
  if (isLocked(id)) return;
  scrollToCard(id);
}

function focusCard(id) {
  if (isLocked(id)) return;
  scrollToCard(id);
}

function isLocked(id) {
  const s = document.getElementById(\`status-\${id}\`);
  return s && s.classList.contains('ss-locked');
}

/* FLIP */
function flip(id) {
  document.getElementById(\`flip-\${id}\`).classList.add('flipped');
}

function unflip(id) {
  document.getElementById(\`flip-\${id}\`).classList.remove('flipped');
}

/* FILE */
function fileSelected(type, input) {
  const f = input.files[0];
  if (!f) return;

  if (type === 'resume') {
    S.resumeFile = f;
    document.getElementById('dz-resume-name').textContent = \`✓ \${f.name}\`;
  } else {
    S.jdFile = f;
    document.getElementById('dz-jd-name').textContent = \`✓ \${f.name}\`;
  }
}

['dz-resume','dz-jd'].forEach(id => {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener('dragover', e => {
    e.preventDefault();
    el.classList.add('dragover');
  });
  el.addEventListener('dragleave', () => el.classList.remove('dragover'));
  el.addEventListener('drop', () => el.classList.remove('dragover'));
});

/* JD TABS */
function switchJdTab(mode) {
  S.jdMode = mode;
  ['url','paste','file'].forEach(m => {
    document.getElementById(\`jtab-\${m}\`).classList.toggle('on', m === mode);
    document.getElementById(\`jdp-\${m}\`).classList.toggle('on', m === mode);
  });
}

/* STATUS */
function setStatus(id, cls, label) {
  const el = document.getElementById(\`status-\${id}\`);
  el.className = \`strip-status \${cls}\`;
  el.innerHTML = \`<span class="sdot"></span> \${label}\`;
}

function unlockCard(id) {
  setStatus(id, 'ss-ready', 'Ready');
}

function markDone(id) {
  setStatus(id, 'ss-done', 'Done ✓');
}

function checkUnlocks() {
  const R = S.results;

  if (R.jd) {
    unlockCard('company');
    document.getElementById('company-lock-msg').style.display = 'none';
    document.getElementById('company-form').style.display = 'block';

    const extractedName = R.jd.company_name;
    const isUnknown = !extractedName ||
      extractedName.toLowerCase() === 'not specified' ||
      extractedName.toLowerCase() === 'unknown';

    if (!isUnknown) {
      document.getElementById('co-name').value = extractedName;
    } else {
      const summary = R.jd.summary || '';
      const urlMatch = summary.match(/\b([A-Z][a-zA-Z]+(?:\s+AI)?)\b/);
      const guessed = urlMatch ? urlMatch[1] : '';
      document.getElementById('co-name').value = guessed;
      if (guessed) {
        document.getElementById('co-name').placeholder = \`Guessed: \${guessed} — confirm/edit\`;
      }
    }

    document.getElementById('co-role').value = R.jd.role_title || '';
  }

  if (R.resume && R.jd) {
    unlockCard('gap');
    document.getElementById('gap-lock-msg').style.display = 'none';
    document.getElementById('gap-form').style.display = 'block';
  }

  if (R.gap && R.company) {
    unlockCard('pitch');
    document.getElementById('pitch-lock-msg').style.display = 'none';
    document.getElementById('pitch-form').style.display = 'block';
  }
}

/* HELPERS */
function err(id,msg) {
  const e = document.getElementById(\`err-\${id}\`);
  e.textContent = msg;
  e.classList.add('show');
}

function clearErr(id) {
  const e = document.getElementById(\`err-\${id}\`);
  e.textContent = '';
  e.classList.remove('show');
}

function setBtn(id, loading, normalText) {
  const b = document.getElementById(\`btn-\${id}\`);
  b.disabled = loading;
  b.textContent = loading ? 'Running…' : normalText;
}

function skeleton(bodyId) {
  document.getElementById(bodyId).innerHTML = \`
    <div class="skel-wrap">
      <div class="skel h20 w40"></div>
      <div class="skel w80"></div>
      <div class="skel w60"></div>
      <div class="skel wfull"></div>
      <div class="skel w80"></div>
    </div>
  \`;
}

function chips(arr, cls) {
  if (!arr || !arr.length) return '<span style="color:var(--text-muted);font-size:.8rem;">none listed</span>';
  return '<div class="chip-wrap">' + arr.map(s => \`<span class="chip \${cls}">\${s}</span>\`).join('') + '</div>';
}

function list(arr) {
  if (!arr || !arr.length) return '';
  return '<ul class="r-list">' + arr.map(i => \`<li>\${typeof i === 'string' ? i : JSON.stringify(i)}</li>\`).join('') + '</ul>';
}

/* RUNNERS */
function sessionHeaders() {
  return { 'X-Session-ID': SESSION_ID };
}

async function runResume() {
  clearErr('resume');

  if (!S.resumeFile) {
    err('resume','Please select a PDF file first.');
    return;
  }

  setStatus('resume','ss-loading','Analysing…');
  setBtn('resume', true, 'Analyse resume →');
  skeleton('res-resume-body');
  flip('resume');

  const form = new FormData();
  form.append('resume', S.resumeFile);

  try {
    const res = await fetch(\`\${API_BASE}/pipeline/resume\`, {
      method:'POST',
      headers: sessionHeaders(),
      body:form
    });

    if (!res.ok) throw new Error(await res.text());

    const data = await res.json();
    const d = data.resume;
    S.results.resume = d;
    renderResume(d);
    markDone('resume');
    checkUnlocks();
  } catch(e) {
    unflip('resume');
    err('resume',\`Failed: \${e.message}\`);
    setStatus('resume','ss-error','Error');
  } finally {
    setBtn('resume', false, 'Analyse resume →');
  }
}

function renderResume(d) {
  const expYears = d.total_experience_years || 0;
  const expText = expYears < 0.5 ? 'Fresher' : \`\${expYears} yrs experience\`;
  
  document.getElementById('res-resume-body').innerHTML = \`
    <div style="margin-bottom:1.5rem;">
      <div style="font-family:'Playfair Display',serif;font-size:2rem;font-weight:700;
        color:var(--text-primary);line-height:1.1;margin-bottom:.35rem;">
        \${d.name || 'Your profile'}
      </div>
      <div style="display:flex;gap:.5rem;flex-wrap:wrap;align-items:center;">
        <span class="chip ca">\${d.seniority_level || 'Student'}</span>
        <span class="chip cn">\${expText}</span>
        \${d.contact ? \`<span style="font-size:.78rem;color:var(--text-muted)">\${d.contact.split('|')[0].trim()}</span>\` : ''}
      </div>
    </div>

    <div class="r-section">
      <div class="result-label">Skills</div>
      \${chips((d.skills || []).slice(0, 12), 'cn')}
    </div>

    \${d.projects && d.projects.length ? \`
      <div class="r-section" style="margin-top:1rem;">
        <div class="result-label">Projects</div>
        <div style="display:flex;flex-direction:column;gap:.6rem;">
          \${d.projects.slice(0, 4).map(p => {
            const text = typeof p === 'string' ? p : p.name || '';
            const name = text.split('—')[0].split('-')[0].trim();
            const desc = text.includes('—') ? text.split('—').slice(1).join('—').trim() 
                       : text.includes(' - ') ? text.split(' - ').slice(1).join(' - ').trim() : '';
            return \`<div style="background:var(--cream);border:1px solid var(--border);
              border-radius:10px;padding:.75rem 1rem;">
              <div style="font-weight:500;font-size:.9rem;color:var(--text-primary);
                margin-bottom:.2rem;">\${name}</div>
              \${desc ? \`<div style="font-size:.8rem;color:var(--text-muted);line-height:1.5">\${desc}</div>\` : ''}
            </div>\`;
          }).join('')}
        </div>
      </div>
    \` : ''}

    \${d.experience && d.experience.length ? \`
      <div class="r-section" style="margin-top:1rem;">
        <div class="result-label">Experience</div>
        \${list(d.experience.slice(0, 3))}
      </div>
    \` : ''}

    \${d.certifications && d.certifications.length ? \`
      <div class="r-section" style="margin-top:1rem;">
        <div class="result-label">Certifications</div>
        \${chips(d.certifications.slice(0, 4), 'cn')}
      </div>
    \` : ''}
  \`;
}

async function runJd() {
  clearErr('jd');

  const mode = S.jdMode;
  let body, headers = {};

  if (mode === 'url') {
    const u = document.getElementById('jd-url').value.trim();
    if (!u) {
      err('jd','Please enter a URL.');
      return;
    }
    const fd = new FormData();
    fd.append('jd_url', u);
    body = fd;
  } else if (mode === 'paste') {
    const t = document.getElementById('jd-paste').value.trim();
    if (!t) {
      err('jd','Please paste the JD text.');
      return;
    }
    const fd2 = new FormData();
    fd2.append('jd_text', t);
    body = fd2;
  } else {
    if (!S.jdFile) {
      err('jd','Please select a file.');
      return;
    }
    const f = new FormData();
    f.append('jd_file', S.jdFile);
    body = f;
  }

  setStatus('jd','ss-loading','Analysing…');
  setBtn('jd', true, 'Analyse JD →');
  skeleton('res-jd-body');
  flip('jd');

  try {
    const res = await fetch(\`\${API_BASE}/pipeline/jd\`, {
      method:'POST',
      headers: sessionHeaders(),
      body
    });

    if (!res.ok) throw new Error(await res.text());

    const data = await res.json();
    const d = data.jd;
    S.results.jd = d;
    renderJd(d);
    markDone('jd');
    checkUnlocks();
  } catch(e) {
    unflip('jd');
    err('jd',\`Failed: \${e.message}\`);
    setStatus('jd','ss-error','Error');
  } finally {
    setBtn('jd', false, 'Analyse JD →');
  }
}

function renderJd(d) {
  const company = d.company_name && 
    d.company_name.toLowerCase() !== 'not specified' && 
    d.company_name.toLowerCase() !== 'unknown' 
    ? d.company_name : null;

  document.getElementById('res-jd-body').innerHTML = \`
    <div style="margin-bottom:1.5rem;">
      <div style="font-family:'Playfair Display',serif;font-size:1.75rem;font-weight:700;
        color:var(--text-primary);line-height:1.15;margin-bottom:.5rem;">
        \${d.role_title || 'Role'}
      </div>
      <div style="display:flex;gap:.5rem;flex-wrap:wrap;align-items:center;">
        \${company ? \`<span class="chip ca">\${company}</span>\` : ''}
        \${d.experience_needed ? \`<span class="chip cn">\${d.experience_needed}</span>\` : ''}
        \${d.education && d.education !== 'Not specified' ? \`<span class="chip cn">\${d.education}</span>\` : ''}
      </div>
    </div>

    <div class="r-section">
      <div class="result-label">Required skills</div>
      \${chips((d.required_skills || []).slice(0, 10), 'cg')}
    </div>

    \${d.preferred_skills && d.preferred_skills.length ? \`
      <div class="r-section" style="margin-top:1rem;">
        <div class="result-label">Preferred</div>
        \${chips(d.preferred_skills.slice(0, 8), 'ca')}
      </div>
    \` : ''}

    \${d.responsibilities && d.responsibilities.length ? \`
      <div class="r-section" style="margin-top:1rem;">
        <div class="result-label">What you'll actually do</div>
        \${list(d.responsibilities.slice(0, 4))}
      </div>
    \` : ''}

    \${d.culture_signals && d.culture_signals.length ? \`
      <div class="r-section" style="margin-top:1rem;">
        <div class="result-label">Culture signals</div>
        \${chips(d.culture_signals.slice(0, 6), 'cn')}
      </div>
    \` : ''}

    \${d.red_flags && d.red_flags.length ? \`
      <div class="r-section" style="margin-top:1rem;">
        <div class="result-label">Red flags ⚠️</div>
        \${chips(d.red_flags.slice(0, 4), 'cr')}
      </div>
    \` : ''}

    \${d.summary ? \`
      <div style="margin-top:1.25rem;">
        <div class="result-label">Summary</div>
        <div class="summary-box">\${d.summary}</div>
      </div>
    \` : ''}
  \`;
}

async function runCompany() {
  clearErr('company');

  const co = document.getElementById('co-name').value.trim();
  const ro = document.getElementById('co-role').value.trim();

  if (!co) {
    err('company','Company name is required.');
    return;
  }

  setStatus('company','ss-loading','Researching…');
  setBtn('company', true, 'Research company →');
  skeleton('res-company-body');
  flip('company');

  try {
    const coForm = new FormData();
    coForm.append('company_name', co);
    if (ro) coForm.append('role_title', ro);
    const res = await fetch(\`\${API_BASE}/pipeline/company\`, {
      method:'POST',
      headers: sessionHeaders(),
      body: coForm
    });

    if (!res.ok) throw new Error(await res.text());

    const data = await res.json();
    const d = data.company;
    S.results.company = d;
    renderCompany(d);
    markDone('company');
    checkUnlocks();
  } catch(e) {
    unflip('company');
    err('company',\`Failed: \${e.message}\`);
    setStatus('company','ss-error','Error');
  } finally {
    setBtn('company', false, 'Research company →');
  }
}

function renderCompany(d) {
  document.getElementById('res-company-body').innerHTML = \`
    <div class="r-name">\${d.company_name || document.getElementById('co-name').value || 'Company'}</div>

    <div style="display:flex;gap:.4rem;flex-wrap:wrap;margin-bottom:1rem;">
      \${d.industry ? \`<span class="chip cn">\${d.industry}</span>\` : ''}
      \${d.funding_stage ? \`<span class="chip ca">\${d.funding_stage}</span>\` : ''}
      \${d.actively_hiring ? \`<span class="chip cg">Actively hiring</span>\` : ''}
    </div>

    \${d.tech_stack && d.tech_stack.length ? \`
      <div class="r-section">
        <div class="result-label">Stack</div>
        \${chips(d.tech_stack.slice(0,8),'cn')}
      </div>
    \` : ''}

    \${d.recent_news && d.recent_news.length ? \`
      <div class="r-section">
        <div class="result-label">Recent news</div>
        \${list(d.recent_news.slice(0,4))}
      </div>
    \` : ''}

    \${d.red_flags && d.red_flags.length ? \`
      <div class="r-section">
        <div class="result-label">Watch out for</div>
        \${chips(d.red_flags.slice(0,6),'cr')}
      </div>
    \` : ''}

    \${d.summary ? \`<div class="summary-box">\${d.summary}</div>\` : ''}
  \`;
}

async function runGap() {
  clearErr('gap');

  setStatus('gap','ss-loading','Analysing gaps…');
  setBtn('gap', true, 'Get gap report →');
  skeleton('res-gap-body');
  flip('gap');

  try {
    const res = await fetch(\`\${API_BASE}/pipeline/gap\`, {
      method:'POST',
      headers: sessionHeaders(),
      body: new FormData()
    });

    if (!res.ok) throw new Error(await res.text());

    const data = await res.json();
    if (data.needs) throw new Error('Missing: ' + data.needs.join(', '));
    const d = data.gap;
    S.results.gap = d;
    renderGap(d);
    markDone('gap');
    checkUnlocks();
  } catch(e) {
    unflip('gap');
    err('gap',\`Failed: \${e.message}\`);
    setStatus('gap','ss-error','Error');
  } finally {
    setBtn('gap', false, 'Get gap report →');
  }
}

function renderGap(d) {
  const sc = d.overall_match_score || 0;
  const col = sc >= 70 ? 'var(--green-text)' : sc >= 50 ? 'var(--amber-text)' : 'var(--red-text)';

  document.getElementById('res-gap-body').innerHTML = \`
    <div class="big-score">
      <span class="big-score-num" style="color:\${col}">\${sc}</span>
      <span class="big-score-denom">/100</span>
    </div>

    <div class="r-meta">
      \${sc >= 70 ? 'Worth applying.' : sc >= 50 ? 'Good candidate — address 1–2 gaps first.' : 'Significant gap — needs a sharper angle.'}
    </div>

    \${d.matched_skills && d.matched_skills.length ? \`
      <div class="r-section">
        <div class="result-label">What you have</div>
        \${chips(d.matched_skills.slice(0,8),'cg')}
      </div>
    \` : ''}

    \${d.missing_required && d.missing_required.length ? \`
      <div class="r-section">
        <div class="result-label">Required gaps</div>
        \${chips(d.missing_required.slice(0,8),'cr')}
      </div>
    \` : ''}

    \${d.suggestions && d.suggestions.length ? \`
      <div class="r-section">
        <div class="result-label">Do before applying</div>
        \${list(d.suggestions.slice(0,4))}
      </div>
    \` : ''}

    \${d.honest_summary ? \`<div class="summary-box">\${d.honest_summary}</div>\` : ''}
  \`;
}

async function runPitch() {
  clearErr('pitch');

  setStatus('pitch','ss-loading','Building pitch…');
  setBtn('pitch', true, 'Build my pitch →');
  skeleton('res-pitch-body');
  flip('pitch');

  try {
    const res = await fetch(\`\${API_BASE}/pipeline/pitch\`, {
      method:'POST',
      headers: sessionHeaders()
    });

    if (!res.ok) throw new Error(await res.text());

    const data = await res.json();
    if (data.needs) throw new Error('Missing: ' + data.needs.join(', '));
    S.results.pitch = data;
    renderPitch(data);
    markDone('pitch');
  } catch(e) {
    unflip('pitch');
    err('pitch',\`Failed: \${e.message}\`);
    setStatus('pitch','ss-error','Error');
  } finally {
    setBtn('pitch', false, 'Build my pitch →');
  }
}

function renderPitch(data) {
  const core = data.core || {};
  const pitches = data.pitches || {};
  let selectedMedium = null;

  function mediumHTML() {
    const opts = [
      { key:'email', label:'📧 Cold Email', sub:'Subject line + 120-word max' },
      { key:'linkedin', label:'💼 LinkedIn Note', sub:'280 chars, punchy' },
      { key:'wellfound', label:'🚀 Wellfound', sub:'150-180 words, conversational' },
    ];
    return \`
      <div class="r-section">
        <div class="result-label">Choose how you're reaching out</div>
        <div style="display:flex;gap:.5rem;flex-wrap:wrap;margin-top:.5rem;">
          \${opts.map(o => \`
            <button onclick="selectPitchMedium('\${o.key}')" 
              id="mb-\${o.key}"
              style="padding:.5rem 1rem;border-radius:100px;border:1.5px solid var(--border);
                background:var(--surface);cursor:pointer;font-size:.8rem;font-weight:500;
                color:var(--text-secondary);font-family:'DM Sans',sans-serif;transition:all .2s;">
              \${o.label}
            </button>
          \`).join('')}
        </div>
        <div id="pitch-output-area" style="margin-top:1rem;"></div>
      </div>
    \`;
  }

  document.getElementById('res-pitch-body').innerHTML = \`
    \${core.one_liner ? \`<div class="pitch-liner">\${core.one_liner}</div>\` : ''}

    \${core.angle ? \`
      <div class="r-section">
        <div class="result-label">Your angle</div>
        <div class="summary-box">\${core.angle}</div>
      </div>
    \` : ''}

    \${core.hook ? \`
      <div class="r-section">
        <div class="result-label">Lead with this</div>
        <div class="summary-box" style="border-left:3px solid var(--mocha-300);font-weight:500">\${core.hook}</div>
      </div>
    \` : ''}

    \${core.things_to_mention && core.things_to_mention.length ? \`
      <div class="r-section">
        <div class="result-label">Always mention</div>
        \${list(core.things_to_mention.slice(0,4))}
      </div>
    \` : ''}

    \${core.things_to_avoid && core.things_to_avoid.length ? \`
      <div class="r-section">
        <div class="result-label">Avoid</div>
        \${list(core.things_to_avoid.slice(0,3))}
      </div>
    \` : ''}

    <div class="r-section" style="border-top:1px solid var(--border);padding-top:1.25rem;margin-top:1.25rem;">
      \${mediumHTML()}
    </div>
  \`;

  // Store pitches globally so the medium selector can access it
  window._pitchData = pitches;
}

function selectPitchMedium(type) {
  const p = window._pitchData || {};
  document.querySelectorAll('[id^="mb-"]').forEach(b => {
    b.style.background = 'var(--surface)';
    b.style.borderColor = 'var(--border)';
    b.style.color = 'var(--text-secondary)';
  });
  const active = document.getElementById('mb-' + type);
  if (active) {
    active.style.background = 'var(--mocha-300)';
    active.style.borderColor = 'var(--mocha-300)';
    active.style.color = '#F5EFE6';
  }

  let content = '';
  if (type === 'email') {
    content = \`<strong style="display:block;margin-bottom:.75rem;color:var(--text-primary)">Subject: \${p.email_subject || ''}</strong>\${(p.email_body || '').replace(/\\n/g,'<br>')}\`;
  } else if (type === 'linkedin') {
    content = p.linkedin_note || '';
  } else {
    content = (p.wellfound_message || '').replace(/\\n/g,'<br>');
  }

  const area = document.getElementById('pitch-output-area');
  if (area) {
   window._currentPitchContent = content;
   area.innerHTML = \`
   <div id="pitch-content-display" class="summary-box" style="white-space:pre-wrap">\${content}</div>
   <button onclick="copyCurrentPitch(this)"
   style = "margin-top:.75rem;width:100%;padding:.6rem;border-radius:10px;
       border:1px solid var(--border);background:none;font-size:.82rem;
       color:var(--text-secondary);cursor:pointer;font-family:'DM Sans',sans-serif;
       display:flex;align-items:center;justify-content:center;gap:.4rem;">
      📋 Copy to clipboard
    </button>
    \`;
  document.getElementById('pitch-content-display').innerHTML = content;
  }
}

function copyText(btn, text) {
  const clean = text.replace(/<[^>]+>/g,'').trim();
  navigator.clipboard.writeText(clean).then(() => {
    btn.textContent = '✓ Copied!';
    setTimeout(() => { btn.innerHTML = '📋 Copy to clipboard'; }, 2000);
  });
}


function copyCurrentPitch(btn) {
  const text = (window._currentPitchContent || '').replace(/<[^>]+>/g,'').trim();
  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = '✓ Copied!';
    setTimeout(() => { btn.innerHTML = '📋 Copy to clipboard'; }, 2000);
  });
}

/* INIT */
window.addEventListener('load', () => {
  window.scrollTo(0,0);
  updatePeelAccordion();
});

`;
