const express = require("express");
const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get(["/about", "/contact-me"], (req, res) => {
  res.sendFile(__dirname + `/public${req.url}.html`);
});

app.use((req, res) => {
  res.status(404).sendFile(__dirname + "/public/404.html");
});

const server = app.listen(8080, () => {
  console.log(`Server is running on port ${server.address().port}`);
});
