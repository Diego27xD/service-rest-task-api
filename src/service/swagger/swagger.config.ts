import { join } from "path";
import swaggerJsDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Euromotors API",
      version: "1.0.0",
      description: "API de Euromotors",
      contact: {
        name: "Euromotors",
        url: "https://euromotors.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local server",
      },
    ],
  },

  apis: [join(__dirname, "../controller/empresa/routes.ts")],
};

export const stylesCustom = {
  customCss: ".swagger-ui .topbar { display: none }",
};

export const swaggerDocs = swaggerJsDoc(swaggerOptions);
