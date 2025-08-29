const express = require("express");
const bfhlRoutes = require("./routes/bfhlRoute");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/", bfhlRoutes);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
