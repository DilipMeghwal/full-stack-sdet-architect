import { test, expect } from '@playwright/test';
import { miscOperations } from "@config/api-endpoints/misc-ops";
import { validateSchema } from '../utils/schema-validator';
import { users } from 'utils/test-data';

test('should validate customer schema', async ({ request }, testInfo) => {
  testInfo.annotations.push({ type: 'epic', description: 'Parabank' });
  testInfo.annotations.push({ type: 'feature', description: 'Authentication' });

  const loginUrl = process.env.API_BASE_URL + miscOperations.login(users.valid.username, users.valid.password);
  
  const response = await request.get(loginUrl,
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
});