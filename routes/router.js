const express = require("express");
const router = express.Router();
let Url = require(process.cwd() + "/models/url.model.js");
const dns = require('node:dns');

router.use('/public', express.static(`${process.cwd()}/public`));
router.use(express.urlencoded({ extended: false }));

router.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
router.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

router.post('/api/shorturl', (req, res) => {
    var inputUrl = req.body.url;
    const validUrl = inputUrl.match(/^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/igm);
    const hostname = validUrl[0].replace(/^https?:\/\//i, "");

    dns.lookup(hostname, (err) => {
      if (err) {
        res.json({"error": "Invalid URL"});
      } else {
        Url.findOrCreateUrl(inputUrl)
        .then(url => res.json({"original_url": url.original_url, "short_url": url._id}))
        .catch(err => res.status(400).json("Error: " + err));
      }
    });
  });

  router.get("/api/shorturl/:id", (req, res) => {
    const shortUrl = req.params.id;
    if (isNaN(shortUrl)) {
      res.json({ "error": "Wrong format"})
    } else {
      Url.Url.findById(shortUrl)
        .then(url => res.redirect(url.original_url))
        .catch(() => res.json({ "error": "No short URL found for the given input"}))
    }
  });

  module.exports = router;