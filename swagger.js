require("dotenv").config();
const swaggerAutoGen = require("swagger-autogen")();

// const hostName = process.env[`HOST_${process.env.RUN_MODE}`];
const RUN_MODE = process.env.RUN_MODE || "DEV";
const hostName = process.env[`HOST_${RUN_MODE}`] || "localhost:3000";

const doc = {
  info: {
    title: "Healthcare API",
    description: "Healthcare Management System API Documentation",
    version: "1.0.0",
  },

  host: hostName,
  basePath: "/api/v1",

  schemes: ["http"],

  consumes: ["application/json"],
  produces: ["application/json"],
  autoBody: true,
 
  securityDefinitions: {
    requestTokenAuth: {
      type: "apiKey",
      in: "header",
      name: "requesttoken",
      description: "Enter valid request token.",
    },
    bearerTokenAuth: {
      type: "apiKey",
      in: "header",
      name: "Authorization",
      description: "Enter valid authorization token. Like: Bearer Token",
    },
  },
};

const outputFile = "./swagger-output.json";
const routes = ["./src/routes/index.js"];

swaggerAutoGen(outputFile, routes, doc);
