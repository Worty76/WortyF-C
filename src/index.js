const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const multer = require("multer");

require("dotenv").config();

// Routers
const userRouter = require("./routes/userRouter");
const postRouter = require("./routes/postRouter");
const topicRouter = require("./routes/topicRouter");
const chatRouter = require("./routes/chatRouter");
const messageRouter = require("./routes/messageRouter");

// PORT
const PORT = process.env.PORT;

// Connection Config
try {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Successfully connected to MongoDB"));
} catch (error) {
  console.error("Failed to connect to mongoDB");
}

// Config
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Configurations for "Static-files"
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("./uploads"));
app.use(express.static(`${__dirname}/public`));

// End-points
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/topic", topicRouter);
app.use("/api/message", messageRouter);
app.use("/api/chat", chatRouter);

const server = app.listen(PORT, () => {
  console.log(`Server is running on http:localhost:${PORT}`);
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });

  socket.on("new message", (newMessageReceived) => {
    var chat = newMessageReceived.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageReceived.sender._id) return;

      socket.in(user._id).emit("message received", newMessageReceived);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
