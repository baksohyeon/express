const express = require("express");
const router = express.Router();
const template = require("../lib/template.js");
const fs = require("fs");
const { response } = require("express");
const cookie = require("cookie");

router.get("*", function (request, response, next) {
  fs.readdir("./data", function (error, filelist) {
    request.list = filelist;
    next();
  });
});

router.get("/", function (request, response) {
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

router.get("/login", (request, response) => {
  const title = "title";
  const list = template.list(request.list);
  var html = template.HTML(
    title,
    list,
    `
    <form action="login_process" method="post">
        <p><input type="text" name="email" placeholder="email"></p>
        <p><input type="password" name="password" placeholder="password"></p>
        <p><input type="submit"></p>
    </form>`,
    `<a href="/create">create</a>`
  );
  response.writeHead(200);
  response.end(html);
});
module.exports = router;

router.post("/login_process", (request, response) => {
  const post = request.body;
  if (post.email === "dorito@gmail.com" && post.password === "1234") {
    response.writeHead(302, {
      "Set-Cookie": [
        `email = ${post.email}`,
        `password = ${post.password}`,
        `nickname = Dorito`,
      ],
      Location: "/",
    });
    response.end();
  } else {
    response.end("Who are you?");
  }
});
