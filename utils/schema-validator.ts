import Ajv, { ValidateFunction } from 'ajv';
import addFormats from 'ajv-formats';
import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

// 1. Initialize AJV with OpenAPI-compatible settings
const ajv = new Ajv({
  allErrors: true,
  strict: false, // Ignores 'xml', 'example', etc.
  formats: {
    int32: true,
    int64: true,
    double: true,
    float: true
  }
});

// 2. Load the OpenAPI Spec once
const schemaPath = path.resolve(process.cwd(), 'data/api/schema/openapi.yaml');
const openApiSpec: any = yaml.load(fs.readFileSync(schemaPath, 'utf8'));

ajv.addSchema(openApiSpec);
addFormats(ajv);


// 3. Pre-register all schemas so $ref (like Address) works automatically
const allSchemas = openApiSpec.components.schemas;
Object.keys(allSchemas).forEach(name => {
  if (!ajv.getSchema(name)) {
    ajv.addSchema(allSchemas[name], name);
  }
});

/**
 * Utility to validate JSON against an OpenAPI schema
 * @param data The JSON response body
 * @param schemaName The name in components.schemas (e.g., 'Customer')
 */
export function validateSchema(data: any, schemaName: string) {
  // Use the full internal path defined in your YAML
  const schemaPointer = `#/components/schemas/${schemaName}`;
  const validate = ajv.getSchema(schemaPointer);
  
  if (!validate) {
    throw new Error(`Schema pointer "${schemaPointer}" not found.`);
  }

  const valid = validate(data);
  
  return {
    isValid: valid,
    errors: ajv.errorsText(validate.errors),
  };
}