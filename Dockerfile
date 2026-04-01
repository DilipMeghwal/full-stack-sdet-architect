FROM mcr.microsoft.com/playwright:v1.43.0-jammy

WORKDIR /usr/src/app

COPY . .

RUN npm install --ignore-scripts

RUN npx playwright install --with-deps

CMD ["sh", "-c", "npx wait-on http://parabank:8080/parabank && npx playwright test"]