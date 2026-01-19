# SafePay Settlement Dashboard

A high-performance PoC for a Financial Settlement Dashboard developed for SafePay. This project simulates a hybrid asset management interface (Fiat & Crypto), focusing on security, data integrity, and automated code quality.

## Tech Stack

* **React 19+** (Powered by Vite)
* **TypeScript** (Strict Mode)
* **Tailwind CSS** (High fidelity financial UI)
* **Zod** (Schema validation & runtime type safety)
* **SonarCloud** (Static analysis & Quality Gate integrated via CI/CD)
* **Husky & Lint-staged** (Pre-commit hooks for code consistency)

## Features & Roadmap

- [x] **CI/CD Infrastructure:** Automated pipeline via GitHub Actions.
- [x] **Code Quality:** Deep integration with SonarCloud (Bugs, Vulnerabilities, and Code Smells tracking).
- [x] **Data Architecture:** Multi-currency transaction modeling (CHF, EUR, BTC, ETH).
- [x] **Commit Security:** Git hooks to enforce Conventional Commits and formatting.
- [ ] **Asset Management UI:** Global balance overview and liquidity monitoring.
- [ ] **Real-time Activity Feed:** Transaction list with integrated risk-level assessment.

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
    ```

## Development Standards

This project adheres to rigorous fintech development standards:
* **Conventional Commits:** All commit messages must follow the specification (e.g., `feat:`, `fix:`, `chore:`).
* **Security by Design:** Data validation at the application boundaries using Zod schemas to prevent data poisoning.
* **Clean Code:** Continuous monitoring via SonarCloud with a blocking Quality Gate on PRs.
