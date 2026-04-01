# Gemini Context: Full Stack SDET Architect Framework

This project is a comprehensive SDET (Software Development Engineer in Test) framework designed to cover UI, API, and Performance testing using modern Node.js-based technologies. It is specifically tailored for testing the **ParaBank** demo application.

## 🚀 Project Overview

- **Core Tech Stack:** Playwright (UI/API), TypeScript, K6 (Performance), Docker, Kubernetes, Helm.
- **Testing Patterns:** Page Object Model (POM), Custom Fixtures, Schema-based API Validation.
- **Reporting:** Allure Reports integrated with Playwright and Docker.
- **Target Application:** [ParaBank](https://parabank.parasoft.com/parabank/index.htm) (local or hosted).

## 📂 Project Structure

- `tests/`: Test specifications organized by feature (e.g., `auth/`, `api/`).
- `pages/`: Page Object classes for UI testing, extending `BasePage`.
- `fixtures/`: Custom Playwright fixtures (e.g., `base.fixture.ts`) to inject page objects into tests.
- `utils/`: Utility functions for schema validation (`schema-validator.ts`) and test data management.
- `data/api/schema/`: Stores the `openapi.yaml` used for API response validation.
- `config/env/`: Environment-specific configuration files (`local.env`, `dev.env`).
- `k6/`: Performance test scripts.
- `helm/` & `k8s.yaml`: Infrastructure as Code for deploying the application and running tests in Kubernetes.

## 🛠️ Key Commands

### Setup & Sync
- `npm install`: Install project dependencies.
- `npm run sync-api`: Fetches the latest OpenAPI specification from ParaBank and updates `data/api/schema/openapi.yaml`.

### Execution
- `npm run pw-run:ui`: Runs Playwright UI tests (sharded).
- `npm run pw-run:api`: Runs Playwright API tests (sharded).
- `npx playwright test --project=ui`: Run UI tests locally.
- `npx playwright test --project=api`: Run API tests locally.
- `k6 run k6/my-first-test.js`: Run performance tests.

### Infrastructure
- `docker compose up`: Starts the ParaBank application and executes the test suite in containers.
- `kubectl apply -f k8s.yaml`: Deploys the stack to a Kubernetes cluster.

### Reporting
- `npm run report`: Generates an Allure report from `allure-results`.
- `npm run report:open`: Starts a local Allure server to view results on `http://localhost:5051`.

## 📏 Development Conventions

- **Page Objects:** All page objects must extend `BasePage` and be registered in `fixtures/base.fixture.ts`.
- **API Tests:** Use `validateSchema(response, 'SchemaName')` from `utils/schema-validator.ts` to ensure API responses adhere to the OpenAPI spec.
- **Environment:** Use the `ENV` environment variable to switch between configurations (e.g., `ENV=dev npx playwright test`). Defaults to `local`.
- **Test Data:** Centralize test data in `utils/test-data.ts` or JSON files within the `data/` directory.
- **Imports:** Prefer ESM-style imports (project is configured with `"type": "module"`).

## 🛡️ Security & Safety
- Never commit `.env` files or sensitive credentials.
- Local configuration should be kept in `config/env/local.env` (gitignored if sensitive).
