const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const { mongoose } = require("mongoose");

const errorController = require("./controllers/error");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("63c0897e1ba4a4705e9f09eb")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err)
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://nodecourse:nodecourse@cluster0.e9ihpom.mongodb.net/?retryWrites=true&w=majority"
  )
  .then((res) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "Aleksey",
          email: "text-test@test.com",
          cart: {
            items: [],
          },
        });
        return user.save();
      };
    });
  })
  .then((user) => {
    console.log("started");
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
