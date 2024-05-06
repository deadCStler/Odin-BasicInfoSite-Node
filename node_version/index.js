const http = require("http");
const fs = require("fs");

const read404 = (res) => {
  fs.readFile("./404.html", function (err, data) {
    if (err) {
      console.error(err);
    }
    res.writeHead(404, { "Content-type": "text/html" });
    res.write(data);
    res.end();
  });
};

const readOthers = (res, path) => {
  fs.readFile(path, function (err, data) {
    if (err) {
      read404(res);
    } else {
      res.writeHead(200, { "Content-type": "text/html" });
      res.write(data);
      res.end();
    }
  });
};

http
  .createServer(function (req, res) {
    if (req.url === "/") {
      readOthers(res, "./index.html");
    } else if (req.url === "/about" || req.url === "/contact-me") {
      readOthers(res, `.${req.url}.html`);
    } else {
      read404(res);
    }
  })
  .listen(8080);
