const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.get("/", (req, res) => {
  res.json("All good in here");
});

router.get("/user-email", isAuthenticated, (req, res) => {
  // we can access the user's email through `req.payload` since we set it in the jwt.middleware
  User.findById(req.payload._id)
    .select("email")
    .then((data) => res.send(data))
    .catch((error) => next(error));
});

module.exports = router;
