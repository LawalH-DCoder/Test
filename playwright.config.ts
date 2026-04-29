import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry', // record trace on test failure for debugging
  },
  // Run against all three browser engines
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
  // Start both servers automatically before tests run
  webServer: {
    command: 'npm run dev:all',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
