const express = require('express');
var bodyParser = require('body-parser');
const app = express()
const port = 8080
let shortened = 1;

app.use(express.static(__dirname + "/public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// // parse application/json
app.use(bodyParser.json())

// app.use(function (req, res) {
//   res.setHeader('Content-Type', 'text/plain')
//   res.end(JSON.stringify(req.body, null, 2))
// })

app.get('/', (req, res) => {
   res.sendFile("index.html"); 
});

app.get('/api/:id', (req, res) => {
  res.json({
    "id": req.params.id
  });
});

app.post('/api/shorten/',  (req, res) => {
    res.json({
        "full_url": req.body.url,
        "shorten_url": shortened,
    });
    shortened++;
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});