const express = require("express");
const session = require("express-session");
const MemoryStore = require("memorystore")(session);
const flash = require("express-flash");
const morgan = require("morgan");
const router = require("./routes");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
} else {
  app.use(morgan("dev"));
}
app.use(
  session({
    secret: "sleep all day",
    cookie: { maxAge: 60000 },
    store: new MemoryStore(),
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(flash());
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "../public")));
app.use(router);

app.listen(PORT, console.log(`Snapr running on port ${PORT}`));
