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

Follow these steps to set up the environment and database properties before launching the container.

### 1. Create Environment File
This file sets the `CATALINA_OPTS` required for the Parasoft virtualize server connection.

```
mkdir -p ~/parabank-virtual-assets/
cat <<EOF > ~/parabank-virtual-assets/my-env.txt
CATALINA_OPTS=-Dparasoft.virtualize.server.url=http://host.docker.internal:9080 -Dparasoft.virtualize.group.id=parabank -Dparasoft.virtualize.driver.register.jdbcproxydriver.in.drivermanager=true -Dparasoft.virtualize.driver.proxy.direct=true
EOF
``` 

### 2. Create JDBC Properties File
This file configures the connection parameters for the HSQL database.

```
cat <<EOF > jdbc.properties
jdbc.driverClassName=com.parasoft.xtest.jdbc.virt.driver.JDBCProxyDriver
jdbc.url=jdbc:parasoft:proxydriver:org.hsqldb.jdbcDriver:@jdbc:hsqldb:hsql://localhost/parabank
jdbc.username=sa
jdbc.password=
EOF
```

### 3. 🚀 Running the Application
To start the ParaBank container with your custom configuration, run:

```
docker run -d \
  --name parabank \
  -p 8080:8080 \
  -p 9001:9001 \
  --env-file ~/parabank-virtual-assets/my-env.txt \
  -v $(pwd)/jdbc.properties:/WEB-INF/classes/jdbc.properties \
  parasoft/parabank
```

To check the container logs :

```docker logs -f <<Your docker container name>>```

### 4. Accessing the Application
- **Web** : http://localhost:8080/parabank/index.htm
- **API** : http://localhost:8080/parabank/api-docs/index.html
- **DB** : jdbc -- url ```jdbc:hsqldb:hsql://localhost:9001/parabank``` -- username ```sa``` -- password ```leave it blank```

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