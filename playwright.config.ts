import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ENV = process.env.ENV || 'local';
dotenv.config({ path: path.resolve(__dirname, `./config/env/${ENV}.env`) });

function requireEnv(name: string) {

  const v = process.env[name];

  if (!v) throw new Error(`Missing env: ${name}`);

  return v;

}

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['list'],
    ['allure-playwright']
  ],
  use: {
    headless: true,

    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },
  outputDir: 'test-results',

  /* Configure projects for major browsers */
  projects: [
    {
      testDir: './tests/api',
      name: 'api',
      use: { ...devices['Desktop Chrome'], baseURL: process.env.API_BASE_URL || 'http://parabank:8080/parabank' },
    },
    {
      testDir: './tests/ui',
      name: 'ui',
      use: { ...devices['Desktop Chrome'], baseURL: process.env.WEB_URL || 'http://parabank:8080/parabank' },
    },
  ],
});
