const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", {
    title: "Movies API",
    message: "Building an API yay :)",
  });
});

module.exports = router;
