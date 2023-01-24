const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    path: "/login",
    pageTitle: "login",
    isAuthenticated: req.session.isLoggedIn,
  });
};
exports.postLogin = (req, res, next) => {
  User.findById("63c0897e1ba4a4705e9f09eb")
    .then((user) => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      req.session.save((err) => {
        if(err) {
            console.log(err);
        }
        res.redirect("/");
      });
    })
    .catch((err) => console.log(err));
};
exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};
