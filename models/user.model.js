const sql = require("../config/db.js");
const bcrypt = require("bcrypt");
const User = function (user) {
  (this.name = user.name), (this.password = user.password);
};

User.create = (newUser, result) => {
  newUser.password = bcrypt.hashSync(newUser.password, 10);
  sql.query("INSERT INTO Users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created customer: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

User.login = (user, result) => {
  sql.query(
    "Select password from Users where name='" + user.name + "'",
    function (error, results, fields) {
      if (error) {
        console.log("error: ", error);
        result(error, null);
        return;
      }
      if (results[0].password == null) {
        result(null, "Invalid user name");
        return;
      }
      bcrypt.compare(user.password, results[0].password).then(function (found) {
        if (found) {
          result(null, "Successful login");
        } else {
          result(null, "Invalid password");
        }
        return;
      });
    }
  );
};

module.exports = User;
