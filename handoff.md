# Handoff — "My Work" section rework

Context for continuing this work in Claude Code (CLI) on another machine.

## Goal
Rework the portfolio's projects section ("My Projects" → **My Work / Trabajos**) to feature
3 real projects instead of the placeholder cards.

## Decisions already made
- Section renamed: EN nav "Work" + heading "My Work"; ES nav + heading "Trabajos".
  Subtitle → "Selected projects and open-source contributions" / "Proyectos seleccionados y
  contribuciones open source". Internal i18n keys and `id="projects"` kept unchanged.
- Content is bilingual (ES/EN), matching the existing `translations.ts` pattern.
- The Global Agenda project is framed as an **open-source contribution** (not a solo build):
  its own badge + a role line, linking to **My PRs** and the **Original repo** only
  (no Discord / stats-site links).
- Card media by status:
  - **AI Tycoon** (Live): screenshot at `/projects/ai-tycoon.png`, falls back to 🖥️ if missing.
  - **Vr33s Portfolio** (Coming soon): animated "Coming soon / Próximamente" tile, **no icon,
    no screenshot** for now — add a real screenshot once the site is live.
  - **Global Agenda Server** (Open source): a real contribution **heatmap** (see below).

## The 3 projects
1. **AI Tycoon** — Live. https://ai-tycoon-wheat.vercel.app/ · https://github.com/abielsaf/AI-Tycoon
   Incremental/idle game (React 19, Zustand, Vite, Tailwind). NOTE: the GitHub repo appears
   private — couldn't read it programmatically; description/stack came from the user.
2. **Vr33s Portfolio** — Coming soon. https://github.com/abielsaf/Vr33s-Portfolio (Astro, TypeScript).
3. **Global Agenda Server** — Open-source contribution. Community revival of Hi-Rez's Global Agenda.
   Upstream: https://github.com/commonwealthga/commonwealth-ga-server
   My PRs: https://github.com/commonwealthga/commonwealth-ga-server/pulls?q=is%3Apr+author%3Aabielsaf
   Role: chat system, friends list, whisper (/w), Agencies & Alliances, plus gameplay bug fixes.
   Tech tags: C/C++, game server RE, TCP/UDP networking.

## Files changed / added
- `src/components/Projects.astro` — MODIFIED. Data-driven cards with a `status` field
  ('live' | 'soon' | 'contribution'), status badges, flexible links, role line, scoped styles.
- `src/components/ContributionGraph.astro` — NEW. Self-contained SVG heatmap built at build time
  from the actual GA pull-request dates (16 PRs, Jul 13–24 2026), GitHub-style greens. No runtime
  or external-service dependency. Data is hardcoded in `prActivity` — update that map to refresh.
- `src/i18n/translations.ts` — MODIFIED. The "My Work / Trabajos" rename (3 display strings per lang).
- `public/projects/` — NEW. Home for screenshots (+ README). Add `ai-tycoon.png` here.

## Pending manual steps
1. Remove the stale git lock (left by the sandbox; blocks commits):
   - macOS/Linux: `rm -f .git/index.lock`
   - Windows (PowerShell): `Remove-Item .git/index.lock`
2. Add `public/projects/ai-tycoon.png` (screenshot of the live AI Tycoon site).
3. `npm run build` (or `npm run dev`) to preview — was NOT verified in the sandbox because
   node_modules there was macOS-built (Rollup native binary mismatch on Linux). Builds fine locally.
   On Windows, if you get a native-binary error, run `npm install` once to fetch the win32 binaries.
4. Commit + push, e.g.:
   `git add src/components/Projects.astro src/components/ContributionGraph.astro src/i18n/translations.ts public/projects`
   `git commit -m "Rework projects into My Work: AI Tycoon, Vr33s, GA server + PR heatmap"`
5. Deploy.

## Deferred (do later, separately)
- Astro upgrade 5.2.5 → 7.1.3 (two majors; also touches @astrojs/tailwind v6 + Tailwind 3).
  Not bundled with this change. Run `npx @astrojs/upgrade` in isolation and test the build.

## Possible follow-ups
- Once Vr33s is live: add `public/projects/vr33s.png` and switch its card `image` back on.
- Optional heatmap tweaks: size, colors, or a fuller 12-month grid.
