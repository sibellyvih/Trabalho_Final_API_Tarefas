require("./src/database/database");

const express = require("express");
const cors = require("cors");
const app = express();
const userRoutes = require("./src/routes/userRoutes");
const taskRoutes = require("./src/routes/taskRoutes");

app.use(cors());
app.use(express.json());
app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

module.exports = app;