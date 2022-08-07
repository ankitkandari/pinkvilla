var express = require("express");
var router = express.Router();
var config = require("../config/index");
const axios = require("axios");

/* GET home page. */
router.get("/",  async function (req, res, next) {
  let feeds = [];
  let page = 1;

  await axios
    .get(`${config.apiUrl}${page}`)
    .then((res) => {
      feeds = res.data.nodes;
    })
    .catch((error) => {
      console.error(error);
    });
  res.render("index", { page,apiUrl:config.apiUrl,apiDomain:config.apiDomain,feeds,title:"Welcome to Pinkvilla" });
});

module.exports = router;
