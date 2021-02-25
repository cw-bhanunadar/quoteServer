const Categories = require("../models/categories.model.js");
const CacheLayer = require("../service/categories.service.js");
exports.create = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  await CacheLayer.clearCache();
  // Create a Category
  const category = new Categories({
    name: req.body.name,
    iconUrl: req.body.iconUrl,
    isActive: 1,
  });

  // Save Category in the database
  Categories.create(category, (err, data) => {
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
  Categories.delete(req.body.id, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    else res.send(data);
  });
};

exports.fetchAll = (req, res) => {
  CacheLayer.fetchCategories((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    else res.send(data);
  });
};
