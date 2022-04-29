const express = require("express");
const app = express();

const cors = require("cors");
const path = require("path");
const port = 16800;

app.use(cors());

// custom delay before connection to network
const delay = (duration = 3000) =>
  new Promise((resolve) => setTimeout(resolve, duration));

app.use(express.static(path.join(__dirname, "../", "build")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../", "build", "index.html"));
});

app.listen(port, () => console.log(`App listening on port ${port}`));
