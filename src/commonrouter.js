const express = require("express");
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const api = require("./api");
const swaggerDocument = require("./swagger.json")




router.use('/api-docs', swaggerUi.serve);
router.use("/api", api);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

module.exports = router;
