const express = require("express");
const app = express();
const path = require("path");
const redditData = require("./data.json");



app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, '/public')))


app.get("/", (req, res) => {
  res.render("home",  {title: 'Home'});
});

app.get("/camel", (req, res) => {
  const camel = ["ben", "chibo", "barty", "toby"];
  res.render("camel", {title: 'CAMEL', camelParty: camel});
});

app.get("/r/:subreddit", (req, res) => {
  const { subreddit } = req.params;
  const data = redditData[subreddit];
  if (data) {
    res.render("subreddit", {...data, title:data.name});
  } else {
    res.render("notfound", { subreddit, title: 'Not Found' });
  }
});

app.get("/rand", (req, res) => {
  const num = Math.floor(Math.random() * 10) + 1;
  res.render("random", { num, title: 'Random Numbers' });
});

app.listen(3000, () => {
  console.log("on port 3000");
});
