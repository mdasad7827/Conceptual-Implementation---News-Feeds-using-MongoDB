const express = require("express");
const app = express();
const port = 8080;

const onePageArticleCount = 10;
const { newsArticleModel } = require("./connector");

// Parse JSON bodies (as sent by API clients)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/newFeeds", async (req, res) => {
  res.send(
    await newsArticleModel
      .find()
      .skip(filter(req.query.offset, 0))
      .limit(filter(req.query.limit, 10))
  );
});

const filter = (value, defVal) => {
  if (value === null || value === undefined || isNaN(Number(value))) {
    return defVal;
  } else {
    return Number(value);
  }
};

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
