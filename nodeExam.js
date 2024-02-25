const express = require("express");
const router = require("./routes/eventsRoutes.js");

const app = express();

app.use(express.json());
app.use("/events", router);
app.use("/events/:id", router);

app.listen(3000, () => {
  console.log("Server is running with localhost: 3000");
});
