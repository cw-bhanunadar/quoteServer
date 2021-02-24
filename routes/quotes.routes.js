module.exports = (app) => {
  const quotes = require("../controllers/quotes.controller.js");
  app.post("/api/quote", quotes.create);
  app.delete("/api/quote", quotes.delete);
  app.post("/api/quote/incrementbookmark", quotes.incrementBookMarkCount);
  app.post("/api/quote/decrementbookmark", quotes.decrementBookMarkCount);
};
