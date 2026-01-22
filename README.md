# SafePay Settlement Dashboard

![CI Status](https://github.com/hsc00/vantage-poc/actions/workflows/ci.yml/badge.svg)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=hsc00_safepay-dashboard&metric=alert_status&token=1bacbf2aefade62e3abbbf931d14fbdeb9568744)](https://sonarcloud.io/summary/new_code?id=hsc00_safepay-dashboard)

A high-performance PoC for a Financial Settlement Dashboard developed for SafePay. This project simulates a hybrid asset management interface (Fiat & Crypto), focusing on security, data integrity, and automated code quality.

## Tech Stack

- **React 19** (Powered by Vite 6)
- **TypeScript** (Strict Mode)
- **Tailwind CSS v4** (High fidelity financial UI)
- **Zod** (Schema validation & runtime type safety)
- **SonarCloud** (Static analysis & Quality Gate integrated via CI/CD)
- **Husky & Lint-staged** (Pre-commit hooks for code consistency)

## Features & Roadmap

- [x] **CI/CD Infrastructure:** Automated pipeline via GitHub Actions.
- [x] **Code Quality:** Integration with SonarCloud.
- [x] **Data Architecture:** Multi-currency transaction modeling (CHF, EUR, BTC).
- [x] **Multi-Currency Engine:** Real-time conversion (CHF, EUR, BTC) with logic-level branch coverage.
- [x] **Secure Live Feed:** Transaction stream simulation using cryptographically secure randomness.
- [ ] **Persistence Layer:** (Next) Implementation of IndexDB for offline-first settlement.
- [ ] **WebSocket Integration:** Transition from polling simulation to real-time socket events.

## Getting Started

1.  **Install Dependencies:**

    ```bash
    npm install
    ```

2.  **Run Development Server:**

    ```bash
    npm run dev
    ```

3.  **Quality Checks:**
    ```bash
    npm run lint       # Run ESLint
    npm run typecheck  # Validate TypeScript types
    npm run test       # Execute Vitest suite
    npm run coverage   # Generate coverage report
    ```

## Development Standards

This project adheres to rigorous fintech development standards:

- **Conventional Commits:** All commit messages must follow the specification (e.g., `feat:`, `fix:`, `chore:`).
- **Security by Design:** Data validation at the application boundaries using Zod schemas to prevent data poisoning.
- **Clean Code:** Continuous monitoring via SonarCloud with a blocking Quality Gate on PRs.
