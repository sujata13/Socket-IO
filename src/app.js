const express = require("express");
const app = express();
const http = require("http").Server(app);

app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

server = http.listen(3000);

const io = require("socket.io")(server);

io.on("connection", socket => {
  console.log("a user connected");
  socket.on("chat_message", data => {
    io.sockets.emit("chat_message", data);
  });
});

module.exports = {
  server: server,
  http_: http
};
