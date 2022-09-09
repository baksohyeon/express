const { URLSearchParams } = require("url");
var express = require("express");
var app = express();
const template = require("./lib/template.js");
const fs = require("fs");
const compression = require("compression");
const topicRouter = require("./routes/topic.js");

app.use("/topic", topicRouter);
app.use(express.static("public"));
app.use(compression());

app.get("*", function (request, response, next) {
  fs.readdir("./data", function (error, filelist) {
    request.list = filelist;
    next();
  });
});

app.get("/", function (request, response) {
  var title = "Welcome";
  var description = "Hello, Node.js";
  var list = template.list(request.list);
  var html = template.HTML(
    title,
    list,
    `<h2>${title}</h2>${description} <img src ="/images/penguin.jpeg" style = "width: 300px; display: block; margin-top:10px">`,
    `<a href="/topic/create">create</a>`
  );
  response.send(html);
});

// http 404 에러 처리
app.use((require, response, next) => {
  response.status(404).send("Sorry, Can't find that~");
});

app.use((err, require, response, next) => {
  console.error(err.stack);
  response.status(500).send("Something Broke!");
});

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});
