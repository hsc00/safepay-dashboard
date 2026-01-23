# Technical Decisions & Architecture (SafePay Terminal)

This document outlines the architectural choices made during the development of the SafePay Settlement Terminal.

## 1. CSS-First Architecture (Tailwind CSS v4)

**Decision:** Adopted Tailwind CSS v4 engine integrated via the `@tailwindcss/vite` plugin.

**Why this over others:**

- **Zero-Config Build:** By moving the configuration from `tailwind.config.js` to native CSS variables within the `@theme` block, we reduced JavaScript overhead in the build pipeline.
- **Lightning CSS:** Utilizes the high-performance rust based CSS transformer for faster HMR (Hot Module Replacement), critical for maintaining development velocity in data-heavy applications.
- **Future-Proofing:** Standardizes the styling engine with 2026 web standards, leveraging native Cascade Layers (`@layer`) and CSS variables as the single source of truth.

## 2. Schema-Driven Data Integrity (Zod)

**Decision:** Mandatory runtime validation for all data structures using Zod schemas.

**Why:**

- **Boundary Protection:** In fintech, data poisoning is a critical risk. By using `TransactionSchema.safeParse`, we ensure that malformed data from "Zurich nodes" is caught before hitting the React state.
- **Type-Safe Inference:** TypeScript types are derived directly from schemas (`z.infer`), preventing drift between static types and runtime behavior.

## 3. Decoupled Settlement State Mapping

**Decision:** Abstracted status-specific UI logic into a centralized `STATUS_STYLES` constant engine.

**Why:**

- **Separation of Concerns:** The `TransactionTable` component remains agnostic of specific business rules for styling. It simply requests a style based on the `TransactionStatus` type.
- **Design Scalability:** Adding new settlement states (e.g., `ESCROW_HOLD`, `REVERSED`) only requires a single entry in the constants file, ensuring zero regression in the table's core logic.

## 4. Branch-Exhaustive Testing Strategy

**Decision:** Implementation of a "Strict Branch" testing strategy for hooks and components.

**Why:**

- **Total Coverage:** Reached 100% coverage for the whole project.
- **Deterministic Mocks:** To test the "Live Feed", we mocked the `crypto` global object to inject controlled values, allowing for reproducible tests of both positive and negative price variations.
- **DOM Resilience:** Used `within(row)` and `closest('tr')` in `TransactionTable` tests to ensure selectors remain stable even with complex, dense UI layouts.

## 5. Layout Density (Swiss Brutalism)

**Decision:** Adopted a "High-Density" layout with reduced padding and a slate-based dark palette.
**Why:**

- **Information Ratio:** Professional traders need maximum data proximity. The "Swiss Brutalist" approach removes white space in favor of visibility.
- **Eye Strain Mitigation:** The high-contrast, low-glare environment is optimized for 24/7 monitoring stations.
