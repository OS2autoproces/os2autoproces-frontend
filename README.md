# OS2autoproces frontend

The application allows reporting and searching for descriptions of RPA processes.
The backend is develop by Digital Identity.

The customer host the source code at: https://bitbucket.org/os2offdig/os2autoproces-frontend.

Documents related to the project: https://drive.google.com/drive/folders/1IIzsSsWfDnOGX5siwrPn30jMmMZKCyn7

The project backlog: https://itminds.atlassian.net/secure/RapidBoard.jspa?rapidView=143&projectKey=AP&view=planning.nodetail

## Architecture

The application is written as a Vue.js application using Vuex for state management and Vuetify for general components.
The application is written in TypeScript using the vue-class-component and vue-property-decorator packages, which allows writting Vue components as classes.

The Vue CLI is used to run and build the project.

### Folder structure

Folders of interest:

- **Docker** contains configuration and scripts used by the Docker deployment.
- **public** contains index.html and environment config.
  - **logos** contains a logo for each municipality. The images are named by the cvr number of the municipality.
- **src**
  - **components**
    - **common** contains all components used across the application, including general form input components.
    - **details** contains all the form sections of the details page.
    - **search** contains all components used on the search page.
    - **icons** contains all icons, which are components containing svg code.
  - **models** contains types for domain models.
  - **services** contains the http service and parsing logic for communicating with the backend.
  - **store** contains all state management code.
    - **modules**
      - **auth** a module for logging in.
      - **common** contains general data used across the application.
      - **error** contains validation errors from the details page.
      - **process** contains the state of the details page.
      - **search** contains the state of the search page.
  - **views** contains the top level components which are routed to.

### Environment config

Environment config is managed in /public/environment-config.js
Environment config works by the Docker containers startup.sh script writes environment variables in /public/environment-config.js which is loaded in the index.html file.
That way the frontend has access to the configuration giving to the Docker image when it is started.

### General patterns and conventions

All icons in the application are added by creating a Vue component with the icons svg code.

## Documentation

This README contains all documentation for the project.

Documentation for the backend: https://dev.os2autoproces.eu/doc

### Known bugs and quirks

Be careful when updating the Vuetify package.
It often breaks the styling of custom components in the application.

There are no known bugs.

### Recommendations for future development

There are no recommendations.

## Local dev environment

First install packages with `npm install`.

### Running the application

`npm run serve` will start the dev server.

The application depends on the backend running on https://dev.os2autoproces.eu/

### Test Credentials

Test credentials for use during development can be found in the API docs at https://dev.os2autoproces.eu/doc#chapter-2-3, Temporary Development Setup.

### Tests

`npm run test:unit` will run the unit tests.

`npm run test:e2e` will run the e2e tests.

### Linting

`npm run lint` will lint the application.
Lint rules are defined in /tslint.json.

### Database

There is no database in the project.

## Deployment

The customer handles deployment in this project.
The application is hosted in a Docker container running an NGINX server.

### Building the code

The project is built as part of building the Docker image.

The first step of the Dockerfile is copying the source files and building them.

## Accesses

Access is needed for pushing to the customers Bitbucket repository.

## Contacts

Project Manager: cst@it-minds.dk

Lead Developer: rsr@it-minds.dk

Backend Developer: bsg@digital-identity.dk
