import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
  failOnErrors: true,
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Phonebook api",
      description: "Phonebook API information",
      contact: {
        name: "Pradeep Tarakar",
      },
      version: "0.0.1",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}/`,
      },
    ],
  },
  apis: ["./routes/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
