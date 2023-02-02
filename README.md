[![Security Rating](https://sq.srv.tobiaswaelde.com/api/project_badges/measure?project=christopherkochaneck-projects_smarthome_AYXwFGMl3Y_sGPcAkl-p&metric=security_rating&token=6c205786c97fdadae683c396add669dcd40cd146)](https://sq.srv.tobiaswaelde.com/dashboard?id=christopherkochaneck-projects_smarthome_AYXwFGMl3Y_sGPcAkl-p) [![Maintainability Rating](https://sq.srv.tobiaswaelde.com/api/project_badges/measure?project=christopherkochaneck-projects_smarthome_AYXwFGMl3Y_sGPcAkl-p&metric=sqale_rating&token=6c205786c97fdadae683c396add669dcd40cd146)](https://sq.srv.tobiaswaelde.com/dashboard?id=christopherkochaneck-projects_smarthome_AYXwFGMl3Y_sGPcAkl-p) [![Bugs](https://sq.srv.tobiaswaelde.com/api/project_badges/measure?project=christopherkochaneck-projects_smarthome_AYXwFGMl3Y_sGPcAkl-p&metric=bugs&token=6c205786c97fdadae683c396add669dcd40cd146)](https://sq.srv.tobiaswaelde.com/dashboard?id=christopherkochaneck-projects_smarthome_AYXwFGMl3Y_sGPcAkl-p) [![Code Smells](https://sq.srv.tobiaswaelde.com/api/project_badges/measure?project=christopherkochaneck-projects_smarthome_AYXwFGMl3Y_sGPcAkl-p&metric=code_smells&token=6c205786c97fdadae683c396add669dcd40cd146)](https://sq.srv.tobiaswaelde.com/dashboard?id=christopherkochaneck-projects_smarthome_AYXwFGMl3Y_sGPcAkl-p) [![Lines of Code](https://sq.srv.tobiaswaelde.com/api/project_badges/measure?project=christopherkochaneck-projects_smarthome_AYXwFGMl3Y_sGPcAkl-p&metric=ncloc&token=6c205786c97fdadae683c396add669dcd40cd146)](https://sq.srv.tobiaswaelde.com/dashboard?id=christopherkochaneck-projects_smarthome_AYXwFGMl3Y_sGPcAkl-p) [![Vulnerabilities](https://sq.srv.tobiaswaelde.com/api/project_badges/measure?project=christopherkochaneck-projects_smarthome_AYXwFGMl3Y_sGPcAkl-p&metric=vulnerabilities&token=6c205786c97fdadae683c396add669dcd40cd146)](https://sq.srv.tobiaswaelde.com/dashboard?id=christopherkochaneck-projects_smarthome_AYXwFGMl3Y_sGPcAkl-p)

# Smarthome

A web-based solution for controlling Shelly IoT devices using Next.js, TypeScript, and Express, as well as MongoDB for data storage and Docker for containerization.

## Features

- Control Shelly IoT devices using their HTTP API
- Real-time updates on device status
- User-friendly interface for controlling devices
- Data storage with MongoDB
- Containerized using Docker
- Integration Testion using jest

## Prerequisites

Runtime: [Node.js](https://nodejs.org/en/download/)<br>
Language: [TypeScript](https://www.typescriptlang.org/)<br>
Frontend: [Next.js](https://nextjs.org/)<br>
Backend: [Express.js](https://expressjs.com/)<br>
Testing: [Jest.js](https://jestjs.io/), [Sonarqube](https://www.sonarsource.com/products/sonarqube/)<br>
Datbase: [MongoDB](https://www.mongodb.com/)<br>
Containerization: [Docker](https://www.docker.com/)<br>

## Getting Started

1. Clone this repository<br>
   $ git clone https://github.com/christopherkochaneck/smarthome.git

2. Install the dependencies<br>
   $ cd client<br>
   $ npm i<br>
   $ cd server<br>
   $ npm i<br>

3. Set up a MongoDB Server<br>
   You need to setup a MongoDB Instance to be able to manage the Data that is being displayed in the Frontend.<br>
   You will also need the MongoDB Connection String for <strong>Step 4.</strong><br>
   A dedicated User guide on how to do that is available [here](https://www.prisma.io/dataguide/mongodb/setting-up-a-local-mongodb-database).

4. Set the environment variables<br>
   The client directory, aswell as the server directory each have a `.env.sample` included, which is a template so you know which environment variables you need to set.

5. Launch up the backend and the frontend. You can do that using npm or yarn.<br>
   5.1. Using npm<br>
   $ cd client<br>
   $ npm run dev<br>
   $ cd server<br>
   $ npm run dev<br>

   5.2. Using yarn<br>
   $ cd client<br>
   $ yarn dev<br>
   $ cd server<br>
   $ yarn dev<br>

6. Check the functionality<br>
   Open `http://localhost:3000` in your browser.

## Contributing

If you think that something is missing, for example Device Types or functionality in the frontend, feel free to contribute.

How-to:

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## Testing

This project includes jest tests to test the endpoints of the project.
You can simply run the tests by running `$ npm run test` or `$ yarn test`.<br>
An instance of [Sonarqube](https://www.sonarsource.com/products/sonarqube/) is also running for this project to improve code quality.

## Deployment

The project uses Docker to launch seperate containers for the frontend, backend and database. This should make it easy to deploy and update the Containers for UI, API and Database.<br>

You can find the Docker files aswell as the docker-compose.yml in the following directories:

- smarthome/client
- smarthome/server
- smarthome/database
