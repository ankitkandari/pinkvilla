const config = require("../config/index");
const axios = require("axios");
const parseString = require('xml2js').parseString;
const url = require('url');


async function getParentNode(page = 1) {
    let feedUrl = null;
    await axios
        .get(`${config.apiUrl}`)
        .then((res) => {

            parseString(res.data, async function (err, parentRes) {
                let sitemapLen = parentRes?.sitemapindex?.sitemap?.length;
                //Check if page is less than total number of sitemaps
                if (page > sitemapLen)
                    page = 1;

                feedUrl = parentRes?.sitemapindex?.sitemap[page - 1]?.loc[0];
            });
        })
        .catch((error) => {
            console.error(error);
        });

    return feedUrl;
}

async function getChildNode(feedUrl = null) {
    let feeds = [];

    if (feedUrl === null)
        return feeds;

    await axios
        .get(`${feedUrl}`)
        .then((res) => {
            parseString(res.data, function (err, childRes) {
                if (childRes?.urlset?.url)
                    feeds = childRes?.urlset?.url?.map(ele => {
                        return {
                            title:getTitleFromUrl(ele?.loc[0]),
                            url: ele?.loc[0],
                            date: ele?.lastmod[0],
                            image: {
                                url: ele['image:image'][0]['image:loc'][0],
                                caption: ele['image:image'][0]['image:caption'][0]
                            }
                        };
                    });
            });
        })
        .catch((error) => {
            console.error(error);
        });

    return feeds;
}


function getTitleFromUrl(urlString) {
    const parsedUrl = new URL(urlString);
    const path = parsedUrl.pathname;
    const pathParts = path.split('/');
    let title = pathParts[pathParts.length - 1]; // Get the last parameter
    title = title.replace(/-/g, ' '); // Replace hyphens with spaces
    title = title.replace(/\d+$/, ''); // Remove the number at the end
    title = title.toLowerCase(); // Convert to lowercase
    title = title.charAt(0).toUpperCase() + title.slice(1); // Capitalize the first letter
    return title;
}


module.exports = {
    getParentNode,
    getChildNode,
    getTitleFromUrl
}