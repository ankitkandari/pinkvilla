const express = require("express");
const router = express.Router();
const { getParentNode, getChildNode } = require('../utils/index');
const config = require("../config/index");

/* GET home page. */
router.get("/", async function (req, res, next) {
  let feeds = [];
  let page = 2;

  let feedUrl = await getParentNode(page);
  feeds = await getChildNode(feedUrl);

  // return res.send(feeds);
  res.render("index", { page, apiUrl: config.ajaxApi, apiDomain: config.apiDomain, feeds, title: "Welcome to Pinkvilla" });
});




module.exports = router;
