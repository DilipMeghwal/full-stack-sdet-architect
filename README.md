# Full Stack Automation Framework
This framework covers all the aspects of QA testing based on nodejs tech.

# ParaBank App Local Setup

This guide provides the necessary steps to configure and run the **Parasoft ParaBank** demo application using Docker.

---

## 🛠️ Prerequisites

1.  **Install Docker:** Ensure Docker Desktop or Docker Engine is running.
2.  **Pull the Image:**
    ```docker pull parasoft/parabank```

## ⚙️ Configuration

The necessary configuration files for environment variables (`parabank.env`) and database properties (`jdbc.properties`) are already included in the `docker/config/` directory. No manual setup is required.

### 🚀 Running the Application
To start the ParaBank container along with the test suite, simply run:

```bash
docker compose up
```

Alternatively, if you want to start only the ParaBank application:

```bash
docker compose up parabank
```

To check the container logs :

```docker logs -f <<Your docker container name>>```

### 4. Accessing the Application
- **Web** : http://localhost:8080/parabank/index.htm
- **API** : http://localhost:8080/parabank/api-docs/index.html
- **DB** : jdbc -- url ```jdbc:hsqldb:hsql://localhost:9001/parabank``` -- username ```sa``` -- password ```leave it blank```

### note - Run below command directly to run using docker compose file
```docker compose up```

*---- below code yet to be formatted ---*

run this to fetch the swagger yaml : npm run sync-api

installing k6
- brew install k6
{
  "name": "k6-project",
  "version": "1.0.0",
  "description": "A k6 performance testing project",
  "scripts": {
    "k6:run": "k6 run src/test-script.js"
  },
  "devDependencies": {
    "@types/k6": "^0.47.0"
  }
}

npm install --save-dev @types/k6

https://marketplace.visualstudio.com/items?itemName=k6.k6
https://grafana.com/docs/k6/latest/


https://docs.maestro.dev/

explore testcontainers

angular + Cypress/angular testing library
React + Playwright
amazon kiro
mutation testing : 
stryker mutator - vitest runner