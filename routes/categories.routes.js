module.exports = (app) => {
  const categories = require("../controllers/categories.controller.js");
  app.post("/api/categories", categories.create);
  app.delete("/api/categories", categories.delete);
  app.get("/api/categories", categories.fetchAll)
};
