const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const { engine } = require("express-handlebars");
const accessToken = process.env.ACCESS_TOKEN;
const soapBoxURL = process.env.SOAPBOX_URL;

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "components"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("home", { title: "Home page" });
});
app.get("/test", (req, res) => {
  res.render("test", { title: "Home page" });
});

app.get("/customer", (req, res) => {
  res.render("customer", { title: "Home page", accessToken, soapBoxURL });
});

app.get("/cusInfo", (req, res) => {
  res.render("cusInfo", { title: "Home page", accessToken, soapBoxURL });
});

app.get("/reason", (req, res) => {
  res.render("reason", { title: "Home page" });
});
app.get("/dateTime", (req, res) => {
  res.render("dateTime", { title: "Home page", accessToken, soapBoxURL });
});
app.get("/success", (req, res) => {
  res.render("success", { title: "Home page" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
