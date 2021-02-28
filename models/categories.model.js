const sql = require("../config/db.js");

const Categories = function (category) {
  (this.name = category.name),
    (this.icon_url = category.iconUrl),
    (this.isActive = category.isActive);
};

Categories.create = (category, result) => {
  sql.query("Insert into Categories SET?", category, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...category });
  });
};

Categories.delete = (id, result) => {
  sql.query(
    "Update Categories set isActive = 0 where id = " + id,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, { success: true });
    }
  );
};

Categories.fetchAll = (result) => {
  sql.query("Select * from Categories where isActive = 1", (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, res);
  });
};

module.exports = Categories;
