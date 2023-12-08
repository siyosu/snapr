const express = require("express");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index");
});

app.listen(PORT, console.log(`Snapr running on port ${PORT}`));
