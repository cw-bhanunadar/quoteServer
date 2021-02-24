const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const userRoutes = require("./routes/user.routes");
const categoryRoutes = require("./routes/categories.routes");
const quoteRoutes = require("./routes/quotes.routes");
const app = express();
app.use(cors());
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));
userRoutes(app);
categoryRoutes(app);
quoteRoutes(app);
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static("public"));

app.get("/", function (req, res) {
  return res.render("login");
});

app.listen(3000, () => {
  console.log(`Server listening on port 3081`);
});
