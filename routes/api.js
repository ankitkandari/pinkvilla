const express = require("express");
const router = express.Router();
const { getParentNode, getChildNode } = require('../utils/index');

/* GET home page. */
router.get("/getMoreData/:page", async function (req, res, next) {
    let feeds = [];
    let page = req.params.page;
    
    let feedUrl = await getParentNode(page);
    feeds = await getChildNode(feedUrl);

    return res.json({
        data: feeds,
        error: false
    });
});

module.exports = router;