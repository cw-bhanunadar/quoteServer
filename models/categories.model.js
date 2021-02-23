const sql = require("../config/db.js");

const Categories = function (category) {
  (this.name = category.name),
    (this.iconUrl = category.iconUrl),
    (this.isActive = category.isActive);
};

Categories.create = (category, result) => {
  category.isActive = 1;
  sql.query("Insert into Categories SET?", category, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...category });
  });
};

Categories.delete = (id, result) => {
  sql.query(
    "Update categories set isActive = 0 where id = " + id,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
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
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

module.exports = Categories;