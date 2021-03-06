const sql = require("../config/db.js");

const Quotes = function (quote) {
  (this.categoryId = quote.categoryId),
    (this.image_url = quote.imageUrl),
    (this.isActive = quote.isActive),
    (this.source = quote.source);
};

Quotes.insert = (quote, result) => {
  quote.isActive = 1;
  sql.query("Insert into Quotes SET?", quote, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...quote });
  });
};

Quotes.delete = (id, result) => {
  sql.query("Update Quotes set isActive = 0 where id = " + id, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, { success: true });
  });
};

Quotes.incrementBookMarkCount = (id, result) => {
  sql.query(
    "Update Quotes set BookmarkCounter = BookmarkCounter + 1 where id = " + id,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, { success: true });
    }
  );
};

Quotes.decrementBookMarkCount = (id, result) => {
  sql.query(
    "Update Quotes set BookmarkCounter = BookmarkCounter - 1 where BookmarkCounter > 0 and id = " +
      id,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, { success: true });
    }
  );
};

Quotes.getQuotesByCategory = (categoryId, result) => {
  sql.query(
    "Select * from Quotes where CategoryId = " +
      categoryId +
      " and isActive = 1;",
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, res);
    }
  );
};

module.exports = Quotes;
