import { clean_url, lookupPromise } from "./helper.js";
import express from 'express';
import bodyParser from 'body-parser';
import UrlModel from "./urlModel.js";
import path from 'path';
const __dirname = path.resolve();

const app = express();
const port = 5050;


app.use(express.static(__dirname + "/build"));
app.use("/api", bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log(req.body);
  next();
});

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

app.get("/api/shorturl/:id", async (req, res) => {
  try {
    const url = await UrlModel.findOne({ index: req.params.id });
    if (url == {}) throw new Error();
    res.redirect(url.url);
  } catch (error) {
    res.status(400).json({"error": "No short URL found for the given input"});
  }
});

app.get("/api/shorturl/", async (req, res) => {
  try {
    const url = await UrlModel.findOne({ index: req.body.id });
    if (url == {}) throw new Error();
    res.json({ url: url.url });
  } catch (error) {
    res.status(400).json({"error": "No short URL found for the given input"});
  }
});

app.post("/api/shorturl/", async (req, res) => {
  const full_url = clean_url(req.body.url);
  
  if (!full_url || !await lookupPromise(full_url)) res.status(400).json({ "error": "invalid url"});
  try {
    const result = await UrlModel.findOne({ url: full_url });
    let short_url = -1;
    
    if (result) {
      console.log("found result in database, returning " + result.index);
      short_url = result.index
    } else {
      const count = await UrlModel.countDocuments();
      let newUrl = new UrlModel({
        url: full_url,
        index: count,
      });
      await newUrl.save();
      console.log("created new entry with address " + full_url);
      short_url = count;
    }

    res.json({ 
      original_url: full_url,
      shorten_url: short_url,
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

app.listen(port, () => {
  console.log(`URL shortener listening on port ${port}`);
});
