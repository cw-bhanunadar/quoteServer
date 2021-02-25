const Cache = require("../config/cache.js");
const categoryCacheKey = "categories-v1";
const Categories = require("../models/categories.model.js");

const fetchCategories = async (result) => {
  const rawData = await Cache.getAsync(categoryCacheKey);
  const categories = JSON.parse(rawData);
  console.log(categories);
  if (categories == null) {
    Categories.fetchAll(async (err, res) => {
      if (err) {
        result(err, null);
      }
      await Cache.setAsync(categoryCacheKey, JSON.stringify(res));
      result(null, res);
    });
  } else {
    result(null, categories);
  }
};
const clearCache = async () => {
  await Cache.deleteAsync(categoryCacheKey);
};
module.exports = {
  fetchCategories,
  clearCache,
};
