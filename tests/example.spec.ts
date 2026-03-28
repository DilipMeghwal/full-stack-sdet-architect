import { test, expect } from '@playwright/test';
import { miscOperations } from "@config/api-endpoints/misc-ops";
import { validateSchema } from '../utils/schema-validator';

test('should load the home page', async ({ request }) => {
  const response = await request.get(process.env.API_BASE_URL + miscOperations.login(process.env.USERNAME, process.env.PASSWORD),
    {
      headers: {
        accept: "application/json"
      }
    }
  );
  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  console.log('Response Body:', responseBody);

  expect(response.status()).toBe(200);

  // Parse JSON body
  const body = await response.json();

  // Validate against the 'Customer' schema defined in YAML
  const result = validateSchema(body, 'Customer');

  // Assert and provide clear error messages if it fails
  expect(result.isValid, `Schema Validation Error: ${result.errors}`).toBe(true);
});