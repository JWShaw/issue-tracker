# Issue Tracker Project

For our term project in CPSC 300: Software Engineering, we decided to build a standalone web application with functionality similar to that of the on-board issue tracker in GitHub.

## Team Members

* [Jonathan Shaw](https://github.com/JWShaw)
* [Kai Lan](https://github.com/kai-lan)
* [Kelvan Johnson](https://github.com/Quintexial)
* [Sofia Jones](https://github.com/sofjones)

Our primary remote repository is hosted on-site at University of Northern British Columbia---as such, only major changes to the master branch will be pushed to the publically-available GitHub repository.

## Setting Up Development Environment

You will need:
* A recent version of Node.js.  The author of this document uses 15.2.1, but the most recent LTS release should work.
* An instance of MongoDB running locally on port 27017


### Installing Dependencies

Initially, you will need to run `npm install` in two different directories:
* The project root directory
* The `client` directory

### Running the project (development)

* To run only the backend, use the script `npm run devBackend` from the root directory.
* To run only the frontend, use the script  `npm run devFrontend` from the root directory.  Alternatively, use `npm run serve` in the `client` directory.
* To run both concurrently, use `npm run dev` from the project root directory.

In development, the backend runs on Port 3000 while the frontend runs on Port 8080.  To view the frontend in your browser, visit `localhost:8080`.

## Deploying

* To create a production-ready build, set the environment variable `NODE_ENV=production` and also run the `npm run build` script on the `client` directory.  The REST API and frontend will be served on the same port (which is 3000 by default, but can be set using the `PORT` environment variable).