const express = require("express");
const cors = require("cors");
const listRoutes = require("./routes/lists");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/lists", listRoutes);

module.exports = app;
