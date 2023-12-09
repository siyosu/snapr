const express = require("express");
const router = require("./routes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(router);

app.listen(PORT, console.log(`Snapr running on port ${PORT}`));
