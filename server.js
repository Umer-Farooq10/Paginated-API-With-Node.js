const express = require("express");

const app = express();

const users = [
  { id: 1, name: "User 1" },
  { id: 2, name: "User 2" },
  { id: 3, name: "User 3" },
  { id: 4, name: "User 4" },
  { id: 5, name: "User 5" },
  { id: 6, name: "User 6" },
  { id: 7, name: "User 7" },
  { id: 8, name: "User 8" },
  { id: 9, name: "User 9" },
  { id: 10, name: "User 10" },
  { id: 11, name: "User 11" },
  { id: 12, name: "User 12" },
  { id: 13, name: "User 13" },
  { id: 14, name: "User 14" },
  { id: 15, name: "User 15" },
  { id: 16, name: "User 16" },
  { id: 17, name: "User 17" },
  { id: 18, name: "User 18" },
  { id: 19, name: "User 19" },
  { id: 20, name: "User 20" },
  { id: 21, name: "User 21" },
  { id: 22, name: "User 22" },
  { id: 23, name: "User 23" },
];

const posts = [
  { id: 1, name: "Post 1" },
  { id: 2, name: "Post 2" },
  { id: 3, name: "Post 3" },
  { id: 4, name: "Post 4" },
  { id: 5, name: "Post 5" },
  { id: 6, name: "Post 6" },
  { id: 7, name: "Post 7" },
  { id: 8, name: "Post 8" },
  { id: 9, name: "Post 9" },
  { id: 10, name: "Post 10" },
  { id: 11, name: "Post 11" },
  { id: 12, name: "Post 12" },
  { id: 13, name: "Post 13" },
  { id: 14, name: "Post 14" },
  { id: 15, name: "Post 15" },
  { id: 16, name: "Post 16" },
  { id: 17, name: "Post 17" },
  { id: 18, name: "Post 18" },
  { id: 19, name: "Post 19" },
  { id: 20, name: "Post 20" },
  { id: 21, name: "Post 21" },
  { id: 22, name: "Post 22" },
  { id: 23, name: "Post 23" },
];

app.get("/posts", paginatedResults(posts), (req, res) => {
  res.json(res.paginatedResults);
});

app.get("/users", paginatedResults(users), (req, res) => {
  res.json(res.paginatedResults);
});

function paginatedResults(model) {
  return (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < model.length) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    results.results = model.slice(startIndex, endIndex);

    // We need to save the "results" so that we can access it.
    // res.AnyName = resultThatWeWantInOurNextRequest
    res.paginatedResults = results;

    next();
  };
}

app.listen(5000);
