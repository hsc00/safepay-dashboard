# Technical Decisions & Architecture (SafePay Terminal)

This document outlines the architectural choices made during the development of the SafePay Settlement Terminal.

## 1. CSS-First Architecture (Tailwind CSS v4)

**Decision:** Adopted Tailwind CSS v4 engine integrated via the `@tailwindcss/vite` plugin.

**Why this over others:**

- **Zero-Config Build:** By moving the configuration from `tailwind.config.js` to native CSS variables within the `@theme` block, we reduced JavaScript overhead in the build pipeline.
- **Lightning CSS:** Utilizes the high-performance rust based CSS transformer for faster HMR (Hot Module Replacement), critical for maintaining development velocity in data-heavy applications.
- **Future-Proofing:** Standardizes the styling engine with 2026 web standards, leveraging native Cascade Layers (`@layer`) and CSS variables as the single source of truth.

## 2. Decoupled Settlement State Mapping

**Decision:** Abstracted status-specific UI logic into a centralized `STATUS_STYLES` constant engine.

**Why:**

- **Separation of Concerns:** The `TransactionTable` component remains agnostic of specific business rules for styling. It simply requests a style based on the `TransactionStatus` type.
- **Design Scalability:** Adding new settlement states (e.g., `ESCROW_HOLD`, `REVERSED`) only requires a single entry in the constants file, ensuring zero regression in the table's core logic.

## 3. Environment Stabilization (Vite 6 Pinning)

**Decision:** Pinning the development server to Vite 6 instead of the cutting-edge version 7 for the current development phase.

**Why:**

- **Dependency Synergy:** Current 2026 peer dependencies for the Tailwind v4 plugin ecosystem are optimized for the Vite 6 internal engine.
- **Predictable Builds:** Prevents "dependency hell" during CI/CD pipelines, ensuring the production build environment exactly matches the development environment without forcing unstable peer resolutions.

## 4. Defensive Data Formatting (Formatter Utilities)

**Decision:** Isolated currency and date formatting into pure utility functions using the native `Intl` API.

**Why:**

- **Localization Ready:** Using `Intl.NumberFormat` and `Intl.DateTimeFormat` ensures that currency symbols and date formats follow banking standards (ISO 4217) without external library bloat like `moment.js`.
- **Consistency:** Guarantees that transaction amounts are rendered identically across the table, export modules, and detail views, preventing discrepancies in financial reporting.

## 5. Layout Density (Swiss Brutalism)

**Decision:** Adopted a "High-Density" layout with reduced padding and a slate-based dark palette.

**Why:**

- **Information Ratio:** Professional traders and compliance officers need to see the maximum number of transactions per screen height. The "Swiss Brutalist" approach removes unnecessary white space in favor of data proximity.
- **Eye Strain Mitigation:** The `slate-950` palette provides a high-contrast yet low-glare environment for 24/7 monitoring stations.
