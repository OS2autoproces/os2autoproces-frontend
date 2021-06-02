# OS2autoproces frontend

This application allows reporting and searching for descriptions of RPA processes.

## Architecture

### Tools and technologies
The application is written as a [Vue.js](https://vuejs.org/) application using [Vuex](https://vuex.vuejs.org/) for state management and [Vuetify](https://vuetifyjs.com/) for general components.

The application is written in [TypeScript](https://www.typescriptlang.org/) using the [vue-class-component](https://class-component.vuejs.org/) and [vue-property-decorator](https://www.npmjs.com/package/vue-property-decorator) packages, which allows writing Vue components as classes.

The Vue CLI is used to run and build the project.

### Folder structure

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

## Local dev environment

It is recommened to use [Visual Studio Code](https://code.visualstudio.com/) for developing on the project.

After installing Visual Studio Code, make sure to install the recommened extensions from the Extensions tab;

- Prettier - Code formatter
- TSLint
- EditorConfig for VS Code
- Docker

After setting up VS Code clone the project from github and install the npm packages with `npm install`.

Finally, run `npm run serve` to start the dev server.
Docker is not required for development, only for deployment in production.

While developing, the application depends on the backend running on https://dev.os2autoproces.eu/

### Test Credentials

Test credentials for use during development can be found in the API docs at https://dev.os2autoproces.eu/doc#chapter-2-3, Temporary Development Setup.

_Note these credentials might not be up to date..._. You might need to use and/or update the credentials below:

- _User_: itminds2@digitalidentity
- _PW_: Test1234
- _Test municipality_: Digital Identity

### Tests

`npm run test:unit` will run the unit tests.

`npm run test:e2e` will run the e2e tests.

### Linting

`npm run lint` will lint the application.
Lint rules are defined in /tslint.json.

## Development guidelines

### Code Review

All changes to the repository have to be reviewed and merged through pull requests.

The reviewer should consider the following:

- Do the changes actually solve the relevant issue correctly and entirely?
- Do the changes have any unintended consequences elsewhere in the project?
- Do the changes follow the style of the rest of the code?
- Are the changes sufficiently covered by automated tests?
- Do the changes require any changes to the documentation?
- Has the version number and changelog been updated correctly?

### General patterns and conventions

All icons in the application are added by creating a Vue component with the icons svg code.

### Known bugs and quirks

Be careful when updating the Vuetify package.
It often breaks the styling of custom components in the application.

## Deploying

In production the application is hosted in a Docker container running an NGINX server.

The Dockerfile consists of two stages.

The first stage is based on a Node.js image, it handles building the source code into the final production bundle.

The second stage is based on a lightweight NGINX image, it handles;

- configuring NGINX,
- serving the built application,
- passing environment variables from the Docker container to the frontend.

Since the Dockerfile handles everything related to building and configuration, the only manual step is to run [docker build](https://docs.docker.com/engine/reference/commandline/build/) and running the docker image.

The image takes a single env variable `API_AUTOPROCES` to set the origin of the backend API, e.g. https://dev.os2autoproces.eu.
