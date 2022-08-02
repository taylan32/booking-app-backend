const express = require("express");
const cors = require("cors");
const config = require("./config/index");
const loaders = require("./loaders");
const errorHandler = require("./middlewares/errorHandler");
const routes = require("./routes/index");

config();
loaders();

const app = express();
app.use(
  cors({
    origin: "*",
    methods: "*",
  })
);
app.use(express.json());
app.use(errorHandler);
app.use("/api/v1", routes);

app.listen(process.env.APP_PORT, () => {
  console.log(`Server running on port ${process.env.APP_PORT}`);
});
