import { test, expect } from '@playwright/test';
import { miscOperations } from "@config/api-endpoints/misc-ops";
import { validateSchema } from '../../utils/schema-validator';
import { users } from 'utils/test-data';

test.describe('Customer API Tests', () => {

  test.beforeAll(async ({ request }) => {
    // Initialize database to ensure john/demo exists
    const response = await request.post('initializeDB');
    expect(response.status(), 'Failed to initialize database').toBe(200);
  });

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

    expect(response.status(), `API Login request failed for user ${users.valid.username}. Response: ${await response.text()}`).toBe(200);

    const body = await response.json();
    console.log('Response Body:', body);

    // Validate against the 'Customer' schema defined in YAML
    const result = validateSchema(body, 'Customer');

    // Assert and provide clear error messages if it fails
    expect(result.isValid, `Customer schema validation failed: ${result.errors}`).toBe(true);
  });

});