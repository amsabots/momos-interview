import express from "express";
import axios from "axios";
import cheerio from "cheerio";
import { logger } from "../configs/logger";
import { db } from "../models";

type urls_request = Array<string>;
const router = express.Router();

/**
 *  ======== ASSUMPTIONS MADE =============
 * 1. All images in a website are rendered using the "img" inside the src attribute  tag i.e <img src="pic_trulli.jpg" alt="Italian Trulli">
 * 2 All videos on a website are rendered using the html "video" by using two ways 
 * 
 * ---------- 1. using the src attribute i.e <video controls width="250" src="/media/cc0-videos/flower.webm"/>
 * ---------- 2. nested source tag inside the parent video tag i.e
 *  -------------------------- <video controls width="250">
                               <source src="/media/cc0-videos/flower.webm"
                                   type="video/webm">
                                      Sorry, your browser doesn't support embedded videos.
                               </video
 */

router.post("/generate-url", async (req, res) => {
  const urls = req.body?.urls as urls_request;
  if (!urls || urls.length < 1)
    return res.status(400).send("Please provide an array of url(s)");
  // Promise array to hold html request promise over axios
  const html_promise: any[] = [];
  urls.forEach((element) => {
    html_promise.push(axios.get(element));
  });
  try {
    // Axios request call using a promise all - faster than running each separately
    const html_content = await Promise.all(html_promise);
    let videos_urls: string[] = [];
    let image_urls: string[] = [];
    //
    html_content.forEach(async (element) => {
      // load the html page to a server side DOM
      const $ = cheerio.load(element?.data);
      // get all img tags
      $("img").each((i, elem) => {
        // at this point - everything point to the DOM created above - even  `this` points to the global window object for this virtual DOM - good stuff
        image_urls.push(elem.attribs.src);
      });
      //get all source tags from source tag if available
      $("source").each((i, elem) => {
        // at this point - everything point to the DOM created above - even  `this` points to the global window object for this virtual DOM - good stuff
        videos_urls.push(elem.attribs.src);
      });
      // get all video tags from src attribute
      $("video").each((i, elem) => {
        // at this point - everything point to the DOM created above - even  `this` points to the global window object for this virtual DOM - good stuff
        videos_urls.push(elem.attribs.src);
      });

      // =================  Remove duplicates if available =================
      videos_urls = [...new Set(videos_urls)];
      image_urls = [...new Set(image_urls)];

      const imgs_txn_promise = [];
      const video_txn_promise = [];
      // push all scrapped image ULRs to the DB
      image_urls.forEach((element) =>
        imgs_txn_promise.push(
          db.scraper_data.create({ type: "image", url: element })
        )
      );
      // push all scrapped video URLs to DB
      image_urls.forEach((element) =>
        video_txn_promise.push(
          db.scraper_data.create({ type: "image", url: element })
        )
      );

      //initiate a combined promise transaction
      await Promise.all([image_urls]);
    });
    res.send("Data saved");
  } catch (error) {
    return res.status(404).send("One of the Urls provided is invalid");
  }
});

router.get(`/`, async (req, res) => {
  const { offset = 0, limit = 3 } = req.query;
  const next = Number(offset) * Number(limit);
  const data = await db.scraper_data.findAll({
    offset: next,
    limit: Number(limit),
    order: [["id", "DESC"]],
  });
  return res.send(data);
});

export { router as ScraperRouter };
