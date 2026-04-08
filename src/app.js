const express = require("express");
const todoRoutes = require("./routes/todo.router");
const authRoutes = require("./routes/auth.router");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "https://frontend1-beige-nine.vercel.app",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/todo", todoRoutes);

module.exports = app;
