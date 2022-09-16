const express = require("express");
const ApiError = require("./utils/ApiError");
const { auth, project } = require("./router");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Api for Freelancer App");
});
app.use("/auth", auth);
app.use("/project", project);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(404, "Not found"));
});

module.exports = app;
