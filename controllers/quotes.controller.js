const Quotes = require("../models/quotes.model.js");
const CacheLayer = require("../service/quotes.service.js");

exports.create = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  CacheLayer.clearCache(req.body.categoryId);
  // Create a Category
  const quote = new Quotes({
    categoryId: req.body.categoryId,
    imageUrl: req.body.imageUrl,
    isActive: 1,
    source: req.body.source,
  });

  // Save Quote in the database
  Quotes.insert(quote, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    else res.send(data);
  });
};

exports.delete = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  Quotes.delete(req.body.id, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    else res.send(data);
  });
};

exports.incrementBookMarkCount = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  Quotes.incrementBookMarkCount(req.body.id, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    else res.send(data);
  });
};

exports.decrementBookMarkCount = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  Quotes.decrementBookMarkCount(req.body.id, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    else res.send(data);
  });
};

exports.getQuotesByCategory = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  const filter = {
    categoryId: req.query.categoryId,
    pageNumber: req.query.pageNumber,
  };
  CacheLayer.fetchQuotes(filter, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    else res.send(data);
  });
};
