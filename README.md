[![Security Rating](https://sq.srv.tobiaswaelde.com/api/project_badges/measure?project=christopherkochaneck-projects_smarthome_AYXwFGMl3Y_sGPcAkl-p&metric=security_rating&token=6c205786c97fdadae683c396add669dcd40cd146)](https://sq.srv.tobiaswaelde.com/dashboard?id=christopherkochaneck-projects_smarthome_AYXwFGMl3Y_sGPcAkl-p) [![Maintainability Rating](https://sq.srv.tobiaswaelde.com/api/project_badges/measure?project=christopherkochaneck-projects_smarthome_AYXwFGMl3Y_sGPcAkl-p&metric=sqale_rating&token=6c205786c97fdadae683c396add669dcd40cd146)](https://sq.srv.tobiaswaelde.com/dashboard?id=christopherkochaneck-projects_smarthome_AYXwFGMl3Y_sGPcAkl-p) [![Bugs](https://sq.srv.tobiaswaelde.com/api/project_badges/measure?project=christopherkochaneck-projects_smarthome_AYXwFGMl3Y_sGPcAkl-p&metric=bugs&token=6c205786c97fdadae683c396add669dcd40cd146)](https://sq.srv.tobiaswaelde.com/dashboard?id=christopherkochaneck-projects_smarthome_AYXwFGMl3Y_sGPcAkl-p) [![Code Smells](https://sq.srv.tobiaswaelde.com/api/project_badges/measure?project=christopherkochaneck-projects_smarthome_AYXwFGMl3Y_sGPcAkl-p&metric=code_smells&token=6c205786c97fdadae683c396add669dcd40cd146)](https://sq.srv.tobiaswaelde.com/dashboard?id=christopherkochaneck-projects_smarthome_AYXwFGMl3Y_sGPcAkl-p) [![Vulnerabilities](https://sq.srv.tobiaswaelde.com/api/project_badges/measure?project=christopherkochaneck-projects_smarthome_AYXwFGMl3Y_sGPcAkl-p&metric=vulnerabilities&token=6c205786c97fdadae683c396add669dcd40cd146)](https://sq.srv.tobiaswaelde.com/dashboard?id=christopherkochaneck-projects_smarthome_AYXwFGMl3Y_sGPcAkl-p) [![Lines of Code](https://sq.srv.tobiaswaelde.com/api/project_badges/measure?project=christopherkochaneck-projects_smarthome_AYXwFGMl3Y_sGPcAkl-p&metric=ncloc&token=6c205786c97fdadae683c396add669dcd40cd146)](https://sq.srv.tobiaswaelde.com/dashboard?id=christopherkochaneck-projects_smarthome_AYXwFGMl3Y_sGPcAkl-p)

# Smarthome

A web-based solution for controlling [Shelly](https://www.shelly.cloud/en) IoT devices using [Next.js](https://nextjs.org/), [TypeScript](https://www.typescriptlang.org/), and [Express.js](https://expressjs.com/), as well as [MongoDB](https://www.mongodb.com/) for data storage and [Docker](https://www.docker.com/) for containerization.

## Features

- Authorization and Authentication using [NextAuth.js](https://next-auth.js.org/)
- Control [Shelly](https://www.shelly.cloud/en) IoT devices using their HTTP API
- Real-time updates on device status and data
- User-friendly interface for controlling devices
- Data storage with [MongoDB](https://www.mongodb.com/)
- Containerized using [Docker](https://www.docker.com/)
- Integration Testion using [jest.js](https://jestjs.io/)

## Technologies Used

- Runtime: [Node.js](https://nodejs.org/en/download/)
- Language: [TypeScript](https://www.typescriptlang.org/)
- Frontend: [Next.js](https://nextjs.org/)
- Backend: [Express.js](https://expressjs.com/)
- Testing: [Jest.js](https://jestjs.io/), [Sonarqube](https://www.sonarsource.com/products/sonarqube/)
- Datbase: [MongoDB](https://www.mongodb.com/)
- Containerization: [Docker](https://www.docker.com/)

## Getting Started

1. #### Clone this repository<br>

   ```shell
   $ git clone https://github.com/christopherkochaneck/smarthome.git
   ```

2. #### Install the dependencies<br>

   ```shell
   $ cd client
   $ npm i
   $ cd ..
   $ cd server
   $ npm
   ```

3. #### Set the environment variables<br>

   <strong>For Development</strong><br>
   The client directory, aswell as the server directory each have a `.env.sample` included, which is a template so you know which environment variables you need to set.

   <strong>For Production</strong><br>
   The `docker-compose.example.yml` is an example how your docker-compose could look like. To set envirmoment varibles for Production, I would recommend making use of the environment tag.

4. #### Launch up the backend and the frontend. You can do that using npm or yarn.<br>

   <strong>Using npm</strong><br>

   ```shell
   $ cd client
   $ npm run dev
   $ cd server
   $ npm run dev
   ```

   <strong>Using yarn</strong><br>

   ```shell
   $ cd client
   $ yarn dev
   $ cd server
   $ yarn dev
   ```

5. #### Check the functionality<br>
   Open `http://localhost:3000` in your browser.
   If you set up the Project correctly, you should be able to reach the frontend. If not, the console will most likely print you a stacktrace, which error happend and where.

## Testing

This project includes jest tests to test the endpoints of the project.
You can simply run the tests by running

```shell
$ npm run test
```

or

```shell
$ yarn test
```

An instance of [Sonarqube](https://www.sonarsource.com/products/sonarqube/) is also running for this project to improve code quality.

## Deployment

The project uses [Docker](https://www.docker.com/) to launch seperate containers for the frontend, backend and database. This should make it easy to deploy and update the Containers seperately.<br>

1. #### Set the Environment Valiables in the docker-compose.yml
   Take a look at the `docker.example.yml`. This should give you an idea which variables you need to set.
2. #### Launch the containers
   In order to launch the cotainers, use `docker-compose up --build` in the root directory of the project to start the containers. If everything is setup correctly
3. #### Check if the project is running
   Try to connect to the IP Adress where you deployed the project.<br>
   If you haven't setup any custom Routing using e.g. [traefik](https://doc.traefik.io/traefik/), you should be able to connect to the Smarthome with the Server IP, following the port (Default: 3000).<br>
   Example with a <strong>randomized ip</strong>: `http://209.191.162.183:3000`

## Licensing

I am using the folowing resources that I do NOT own (Click to get to the Link):

Smarthome Icon: [Intelligentes-zuhause](https://www.flaticon.com/de/kostenlose-icons/intelligentes-zuhause)
