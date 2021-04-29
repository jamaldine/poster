module.exports = function (app, User, auth, Post, Comment) {
  require("./routes/auth/authRoutes")(app, User, auth);
  require("./routes/post/postRoutes")(app, Post, User, auth);
  require("./routes/comment/commentRoutes")(app, Comment, Post, User, auth);
};
