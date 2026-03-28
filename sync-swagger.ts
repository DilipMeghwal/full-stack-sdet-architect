import * as fs from 'fs';
import * as https from 'https';
import * as path from 'path';
import { IncomingMessage } from 'http';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Configuration - Update the URL to your GitHub repo path
console.log('test :: ' + process.env.SWAGGER_DOC_URL)
const SWAGGER_URL = process.env.SWAGGER_DOC_URL || "https://parabank.parasoft.com/parabank/services/bank/openapi.yaml";
const LOCAL_PATH: string = path.join(`${__dirname}/data/api/schema`, 'openapi.yaml');

async function downloadSwagger(): Promise<void> {
  console.log('🔍 Checking for Swagger updates...');

  return new Promise((resolve, reject) => {
    https.get(SWAGGER_URL, (res: IncomingMessage) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to fetch: Status Code ${res.statusCode}`));
        return;
      }

      let data: string = '';
      res.on('data', (chunk: any) => { data += chunk; });
      res.on('end', () => {
        const fileExists: boolean = fs.existsSync(LOCAL_PATH);
        const existingContent: string = fileExists ? fs.readFileSync(LOCAL_PATH, 'utf8') : '';

        if (!fileExists || existingContent !== data) {
          fs.writeFileSync(LOCAL_PATH, data);
          console.log('✅ Success: openapi.yaml has been updated locally.');
        } else {
          console.log('ℹ️ Info: Local openapi.yaml is already up to date.');
        }
        resolve();
      });
    }).on('error', (err: Error) => {
      reject(err);
    });
  });
}

// Execute the sync
downloadSwagger().catch((err) => {
  // Enhanced error logging
  console.error('❌ Sync Error Details:');
  console.error(err); 
  process.exit(1);
});