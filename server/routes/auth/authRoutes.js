var multer = require("multer");
var path = require("path");

module.exports = function (app, User, auth) {
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/account/");
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "__" + Date.now() + path.extname(file.originalname)
      );
    },
  });
  var upload = multer({ storage: storage });

  //GET
  app.get("/api/auth", auth, (req, res) => {
    console.log("<======>", req.user)
    res.json({
      isAuth: true,
      id: req.user._id,
      email: req.user.email,
      name: req.user.name,
      lastname: req.user.lastname,
      avatar: req.user.avatar,
      registration: req.user.createdAt,
    });
  });

  app.get("/api/logout", auth, (req, res) => {
    req.user.deleteToken(req.token, (err, user) => {
      if (err) return res.status(400).send(err);
      res.sendStatus(200);
    });
  });

  app.get("/api/users", (req, res) => {
    User.find({}, (err, users) => {
      if (err) return res.status(400).send(err);
      res.status(200).send(users);
    });
  });
  

  app.get("/api/oneuser", (req, res) => {
    User.findById(req.query.id, (err, users) => {
      if (err) return res.status(400).send(err);
      res.status(200).send(users);
    });
  });

  //POST
  app.post("/api/register", (req, res) => {
    const user = new User(req.body);
    user.save((err, doc) => {
      if (err)
        return res.json({
          success: false,
        });
      res.status(200).json({
        success: true,
        user: doc,
      });
    });
  });

  app.post("/api/login", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (!user)
        return res.json({
          isAuth: false,
          message: "auth failled, email not found",
        });
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (!isMatch)
          return res.json({
            isAuth: false,
            message: "Wrong password",
          });

        user.generateToken((err, user) => {
          if (err) return res.status(400).send(err);

          res.cookie("auth", user.token).send({
            isAuth: true,
            id: user._id,
            email: user.email,
          });
        });
      });
    });
  });

  //UPDATE
  app.post("/api/update_profil", upload.single("file"), (req, res) => {
    var name = req.body.name;
    var lastname = req.body.lastname;
    console.log("req.file", req.file);
    let dataToSend = {
      name,
      lastname,
    };
    if (req.file !== undefined) {
      var avatar = req.file.filename;
      dataToSend = {
        name,
        lastname,
        avatar,
      };
    }

    User.findByIdAndUpdate(
      req.body.id,
      dataToSend,
      { new: true },
      (err, doc) => {
        if (err) return res.status(400).send(err);
        res.json({
          success: true,
          doc,
        });
      }
    );
  });
};
