const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Books API",
            version: "1.0.0",
            description: "A simple Books API with authentication",
        },
        servers: [{ url: "http://localhost:5000" }],
    },
    apis: ["./routes/*.js"], // Ensure your route files have proper JSDoc comments
};

const specs = swaggerJsDoc(options);

module.exports = { swaggerUi, specs };
