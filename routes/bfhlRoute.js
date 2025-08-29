const express = require("express");
const bfhlController = require("../controllers/bfhlController");

const router = express.Router();

router.post("/bfhl", bfhlController.processData);

module.exports = router;
