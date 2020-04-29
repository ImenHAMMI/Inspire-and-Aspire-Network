const express = require("express");
const connectDB = require("./config/connectDB");
const user = require("./routes/user");
const post = require("./routes/post");

const app = express();

app.use(express.json({ limit: "50mb" }));

connectDB();

app.use("/", user);
app.use("/", post);

const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) =>
  err ? console.error(err) : console.log(`server is running on port ${PORT}`)
);
