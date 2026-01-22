# Sistemas: architecture summary & quick audit

## Summary

**Sistemas** is the flagship AI-powered tool for technical mentorship and interactive system design practice. Built with React 19, Vite, Tailwind CSS, and Google's Gemini AI, it provides a high-fidelity simulator that bridges the gap between theory and FAANG-level system design interviews.

### Tech Stack
- **Frontend:** React 19, TypeScript, Tailwind CSS (CDN)
- **AI Engine:** Google Gemini 2.0 (multimodal with vision)
- **Canvas:** Excalidraw (visual architecture diagrams)
- **Build:** Vite with ESM imports
- **Styling:** Tailwind + CSS custom properties

### Architecture
- **App.tsx:** Main application router, switches between home and interview modes
- **Components:** Modular React components (Navbar, Hero, Footer, InterviewSession, etc.)
- **Services:** Gemini API integration (`geminiService.ts`), audio utilities
- **Constants:** Brand text, URLs, problem definitions
- **Types:** TypeScript definitions for Problem, Message, etc.

---

## The Enterprise Context

**Sistemas** is part of "The Enterprise" - a lifestyle business model built around personal branding, longform writing, courses, and mentoring.

- **Purpose:** Models a lifestyle business inspired by Cal Newport and Scott Young
- **Goal:** Operate two complementary public-facing personas leveraging software engineering, CTO experience, mentorship, and legal scholarship
- **Code organization:**
  - `website/` — Main personal website (mpj.io) with Bootstrap 4
  - `sistemas/` — AI-powered flagship tool (this project)

---

## Documentation

All technical documentation is organized in the `docs/` directory following the same structure as the main website. See **[`docs/README.md`](./docs/README.md)** for the complete documentation index.

### 📚 Core Documentation
- **[`docs/LAYOUT_GUIDE.md`](./docs/LAYOUT_GUIDE.md)** - Complete layout system, responsive containers, Bootstrap 4 alignment
- **[`REFACTORING_LOG.md`](./REFACTORING_LOG.md)** - Refactoring history, lessons learned, testing protocols

### 🎯 Agent Guidelines

**When you need to remember something for next time:**
1. **Update AGENTS.md** - Add architectural notes, patterns, or warnings here
2. **Create docs in `docs/`** - Write detailed guides for complex topics
3. **Link from AGENTS.md** - Reference your docs with relative links

**For any refactoring work:**
1. **Add session to `REFACTORING_LOG.md`** - Document what changed, why, and lessons learned
2. **Update relevant docs** - Keep `docs/` guides current with code changes
3. **Test thoroughly** - Follow testing protocols in REFACTORING_LOG.md

**Documentation Best Practices:**
- Use descriptive filenames (e.g., `LAYOUT_GUIDE.md`, `ARCHITECTURE_GUIDE.md`)
- Include code examples with syntax highlighting
- Add checklists for verification
- Link between related documents
- Keep AGENTS.md as the entry point/index

---

## Layout & Alignment System

The Sistemas app follows **Bootstrap 4 container standards** to maintain visual consistency with the main website. See **[`docs/LAYOUT_GUIDE.md`](./docs/LAYOUT_GUIDE.md)** for complete details.

### Key Principles:
1. **Responsive max-widths** - 960px at ≥992px, 1140px at ≥1200px
2. **15px horizontal padding** - Consistent with Bootstrap container (`px-[15px]`)
3. **Full-width sections** - Backgrounds extend full width, content is constrained
4. **Perfect alignment** - All content left edges align at every breakpoint

### Container Pattern:
```tsx
{/* Full-width outer */}
<section className="w-full bg-teal">
  {/* Constrained inner (matches Bootstrap) */}
  <div className="max-w-[960px] xl:max-w-[1140px] mx-auto px-[15px]">
    {/* Content */}
  </div>
</section>
```

### Tailwind Configuration:
Custom breakpoints configured in `index.html` to match Bootstrap 4:
```javascript
tailwind.config = {
  theme: {
    extend: {
      screens: {
        'lg': '992px',  // Bootstrap lg breakpoint
        'xl': '1200px', // Bootstrap xl breakpoint
      }
    }
  }
}
```

### Why Bootstrap Standards?
The main website uses Bootstrap 4, and Sistemas must match the same container widths for visual consistency. At 992px-1199px viewport: **960px container**. At 1200px+ viewport: **1140px container**.

---

## Inspiration
- Cal Newport: deep work, books, newsletter, focused productization.
- Scott Young: learning projects, practical guides, course-style offerings.

## Business model
- Offerings: newsletter, longform essays/books, cohort courses, 1:1 mentoring, consulting, workshops, digital tools/resources.
- **Flagship Tool: Sistemas** — A high-fidelity simulator that bridges the gap between theory and FAANG-level system design interviews.
- **Mission**: Align the next generation of engineers with jobs that match their inspirations through rigorous technical mastery.
- Revenue mix: books, paid newsletter/courses, consulting, speaking.

## Agents (audience personas)

### Tech — Abdu \- The CTO\-mentor
- Audience: senior engineers, engineering managers, founders, career-changers.
- Core offers: technical leadership guides, architecture deep dives (Sistemas), cohort mentorship, interview prep, code reviews.
- Voice/tone: pragmatic, actionable, mentor\-driven.
- Primary channels: personal website (mpj.io), newsletter, GitHub, LinkedIn, conference talks.
- Key metrics: newsletter subscribers, course enrollments, consulting leads.

### Legal — Jurist\-Scholar
- Audience: lawyers, legal scholars, policymakers, tech legal teams.
- Core offers: legal essays, plain\-language guides, continuing education courses, policy briefs.
- Voice/tone: rigorous, sourced, accessible.

## Design Logic (V2 - Standards)

### Visual Identity
- **Monochromatic Core**: Use absolute white (#FFFFFF) and deep black (#040404) for layout containers.
- **Surface Accents**: Light grey (#f4f4f4) or pastel grey (#e8e8e8) for secondary sections and footers.
- **Typography**: Primary font is "Trebuchet MS" or "Source Sans Pro". Use "Inter" for technical data displays.
- **Geometric Complexity**: Use SVG-based fractals or recursive patterns. These should be subtle, monochromatic, and technical.
- **Naming & Flair**: Use "Diseño de Sistemas" for high-fidelity decorative labels to add an international, sophisticated "blueprint" feel to technical diagrams.

### Navigational Simplicity
- **Product Nav**: Keep menus lean. Primarily "Home" and "Meet Mentor" (linking back to the source profile at mpj.io).
- **Interaction Rules**: Links to '#' must always be handled via state resets in React to prevent blank screens or accidental route triggers.

### The Iconic Hover Design Pattern
The signature visual element is a **unified colored left-border hover interaction**:

**Core Palette:**
- **Primary Green (Teal):** #00917C (Mentoring, Growth, Success)
- **Primary Blue:** #28527A (Foundation, Logic, Community)
- **Primary Red (Danger):** #C15050 (Challenges, Critical Feedback, Actions)

**Technical Implementation:**
- **Default:** 3px left-border (e.g., `.border-teal`).
- **Interaction:** On hover, animate to 5px width, expand padding-left by 2px (zoom), fill background with the border color, and invert text to white.

## Mentorship Interaction Logic
1. **The Clarification Phase**: Never provide solutions immediately. Ask for Functional and Non-Functional requirements first.
2. **The "Topology First" rule**: Architecture is represented as a directed graph. Periodically sync verbal/text descriptions into visual JSON schema.
3. **Career Alignment**: Encourage candidates to think like architects, not just interviewees. Focus on tradeoffs and real-world impact. The transition from Senior to Staff is about the ownership of complexity.

## Learning: Real-time Visual Context
The integration of a shared visual whiteboard (Excalidraw) with multimodal AI (Gemini Live) represents a paradigm shift in mock interviews:
- **Canvas as Source of Truth**: The architecture drawing is no longer just for the user; it is a primary input for the AI. 
- **Snapshot Syncing**: By streaming canvas frames (image/jpeg) at regular intervals, the AI gains "sight," allowing it to critique specific connections or missing components as they are drawn.
- **Multimodal Synergy**: Voice interaction paired with real-time visual feedback creates a high-fidelity simulator that mimics the cognitive load of a real FAANG interview.

## Learning: The Battle of ESM Versioning
When building with modern ESM modules (esm.sh) and complex libraries like Excalidraw:
- **Unified Import Maps**: React Error #31 is frequently caused by multiple versions of React (e.g., 18 vs 19) or `react/jsx-runtime` being loaded simultaneously. The `importmap` must be absolute and precise, mapping `react`, `react/`, `react-dom`, and `react-dom/` to a single version (e.g., 19.0.0) to ensure the internal component registries match.
- **Resilient Environment Shimming**: Global objects like `window.process` should be shimmed early and made immutable (`Object.freeze`) if necessary to prevent downstream libraries from overwriting them with invalid primitives (causing "Cannot create property on boolean" errors).
- **Lazy Load Robustness**: Dynamic imports in a browser context must account for varied export patterns (`module.Excalidraw` vs `module.default`). A "Fail-Safe" component return ensures the app remains usable even if the primary engine encounters a stall.
- **JSX Runtime Criticality**: Modern React libraries often depend on a global or specifically mapped `react/jsx-runtime`. Excluding this from the `importmap` while using React 18/19 can result in Error #31 as the library attempts to render objects that the host React instance does not recognize as valid elements. Mapping this explicitly to version 19.0.0 resolves the registry mismatch.
