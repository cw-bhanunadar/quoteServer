const Cache = require("../config/cache.js");
const quoteCacheKey = "quotes-v1_";
const Quotes = require("../models/quotes.model.js");

function paginate(array, page_number) {
  // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
  return array.slice((page_number - 1) * 10, page_number * 10);
}
const fetchQuotes = async (filters, result) => {
  const rawData = await Cache.getAsync(quoteCacheKey + filters.categoryId);
  const quotes = JSON.parse(rawData);
  console.log(quotes);
  if (quotes == null) {
    Quotes.getQuotesByCategory(filters.categoryId, async (err, res) => {
      if (err) {
        result(err, null);
      }
      await Cache.setAsync(
        quoteCacheKey + filters.categoryId,
        JSON.stringify(res)
      );
      result(null, paginate(res, filters.pageNumber));
    });
  } else {
    result(null, paginate(quotes, filters.pageNumber));
  }
};

const clearCache = async (categoryId) => {
  await Cache.deleteAsync(quoteCacheKey + categoryId);
};

module.exports = {
  fetchQuotes,
  clearCache
};
