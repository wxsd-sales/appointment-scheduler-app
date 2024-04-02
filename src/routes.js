import express from "express";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const accessToken = process.env.ACCESS_TOKEN;
const soapBoxURL = process.env.SOAPBOX_URL;

router.get("/", (req, res) => {
  res.render("home", { title: "Home page" });
});

router.get("/customer", (req, res) => {
  res.render("customer", { title: "Customer page", accessToken, soapBoxURL });
});

router.get("/cusInfo", (req, res) => {
  res.render("cusInfo", { title: "Guest page", accessToken, soapBoxURL });
});

router.get("/reason", (req, res) => {
  res.render("reason", { title: "Reason" });
});
router.get("/dateTime", (req, res) => {
  res.render("dateTime", { title: "Date and Time", accessToken, soapBoxURL });
});
router.get("/success", (req, res) => {
  res.render("success", { title: "Success page" });
});

export default router;
