import { test, expect } from '@playwright/test';
import { miscOperations } from "@config/api-endpoints/misc-ops";
import { validateSchema } from '../../utils/schema-validator';
import { users } from 'utils/test-data';

test('should validate customer schema', async ({ request }, testInfo) => {
  testInfo.annotations.push({ type: 'epic', description: 'Parabank' });
  testInfo.annotations.push({ type: 'feature', description: 'Authentication' });

  // Use relative path - Playwright will prepend the project's baseURL
  const loginPath = miscOperations.login(users.valid.username, users.valid.password);
  
  const response = await request.get(loginPath,
    {
      headers: {
        accept: "application/json"
      }
    }
  );

  expect(response.status(), `API Login request failed for user ${users.valid.username}`).toBe(200);

  const body = await response.json();
  console.log('Response Body:', body);

  // Validate against the 'Customer' schema defined in YAML
  const result = validateSchema(body, 'Customer');

  // Assert and provide clear error messages if it fails
  expect(result.isValid, `Customer schema validation failed: ${result.errors}`).toBe(true);
});tifact@v6
        if: always()
        with:
          name: allure-results-${{ matrix.shard }}
          path: allure-results
  
  merge-reports:
    name: Merge and Generate Report
    if: ${{ !cancelled() }}
    needs: test   # 🔥 ensures all shards finish first
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v5

      # 📥 Download all shard artifacts
      - uses: actions/download-artifact@v7
        with:
          path: allure-results

      # 🧹 Merge all results
      - name: Merge results
        run: |
          mkdir merged-results
          find allure-results -name "*.json" -exec cp {} merged-results \;

      # 📊 Generate Allure report
      - name: Generate report
        run: |
          npm install -g allure-commandline
          allure generate merged-results -o allure-report

      # 📤 Upload final report
      - uses: actions/upload-artifact@v6
        with:
          name: allure-report
          path: allure-report