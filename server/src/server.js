import { clean_url, http_url } from "./helper.js";
import express from "express";
import bodyParser from "body-parser";
import UrlModel from "./urlModel.js";
import path from "path";
import dns from "dns";
import cors from "cors";
const __dirname = path.resolve();

const app = express();
const port = 5050;

async function createUrl(full_url) {
  const count = await UrlModel.countDocuments();
  let newUrl = new UrlModel({
    url: full_url,
    index: count,
  });
  await newUrl.save();
  return count;
}

app.use(cors());
app.use(express.static(__dirname + "/build"));
app.use("/api", bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log(req.url);
  console.log(req.method);
  console.log(req.body);
  next();
});

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

app.get("/api/shorturl/:id", async (req, res) => {
  console.log("attemping to get " + req.params.id);
  try {
    const url = await UrlModel.findOne({ index: req.params.id });
    if (url == {}) throw new Error();
    res.redirect(http_url(url.url));
  } catch (error) {
    res.status(400).json({ error: "No short URL found for the given input" });
  }
});

app.get("/api/shorturl/", async (req, res) => {
  console.log("attemping to get " + req.body.id);
  try {
    const url = await UrlModel.findOne({ index: req.body.id });
    if (url == {}) throw new Error();
    res.json({ url: url.url });
  } catch (error) {
    res.status(400).json({ error: "No short URL found for the given input" });
  }
});

app.post("/api/shorturl/", async (req, res) => {
  console.log("attemping to post " + req.body.url);
  if (req.body.url === "") {
    res.status(400).json({ error: "invalid url" });
    return;
  }

  const full_url = req.body.url;
  const cleaned_url = clean_url(full_url);
  let short_url = -1;
  dns.lookup(cleaned_url, async (err) => {
    if (err) {
      res.status(400).json({ error: "invalid url" });
      return;
    }

    const result = await UrlModel.findOne({ url: full_url });

    if (result) {
      console.log("found result in database, returning " + result.index);
      short_url = result.index;
    } else {
      console.log("created new entry with address " + full_url);
      short_url = await createUrl(full_url);
    }

    res.json({
      original_url: full_url,
      shorten_url: short_url,
    });
  });
});

app.listen(port, () => {
  console.log(`URL shortener listening on port ${port}`);
});
