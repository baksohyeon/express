const { URLSearchParams } = require("url");
var express = require("express");
var app = express();

const compression = require("compression");
const bodyParser = require("body-parser");
const topicRouter = require("./routes/topic.js");
const indexRouter = require("./routes/index");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(compression());
app.use("/", indexRouter);
app.use("/topic", topicRouter);

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
