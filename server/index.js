const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const msg = require("./models/model");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

require("dotenv").config();

mongoose
  .connect(process.env.HOST)
  .then(() => console.log("Connected to DB"))
  .catch((error) => console.log(error));

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("loaded_room", (data) => {
    msg
      .find({ room: data })
      .sort({ $natural: 1 })
      .limit(50)
      .then((result) => {
        socket.emit("output_messages", result);
        // result.forEach(message => {
        //   socket.emit("output_messages", message);
        // });
      });
  });

  socket.on("send_message", (data) => {
    const message = new msg(data);
    message.save().then(() => {
      socket.to(data.room).emit("receive_message", data);
      console.log(`(#${data.room}) ${data.author}: ${data.message}`);
    });
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(3001, () => {
  console.log("SERVER RUNNING");
});
