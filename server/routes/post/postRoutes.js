var multer = require("multer");
var path = require("path");

module.exports = function (app, Post, User) {
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/post/");
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

  // a detail of post referenced by id
  app.get("/api/getPost", (req, res) => {
    let id = req.query.id;
    Post.findById(id, (err, doc) => {
      if (err) return res.status(400).send(err);
      res.send(doc);
    });
  });

  // all posts
  app.get("/api/posts", (req, res) => {
    let skip = parseInt(req.query.skip);
    let limit = parseInt(req.query.limit);
    let order = parseInt(req.query.order);

    Post.find({ delete: false })
      .skip(skip)
      .sort({ _id: order })
      .limit(limit)
      .exec((err, doc) => {
        if (err) return res.status(400).send(err);
        res.send(doc);
      });
  });

  // all posts of a user
  app.get("/api/userPosts", (req, res) => {
    let skip = parseInt(req.query.skip);
    let limit = parseInt(req.query.limit);
    let order = parseInt(req.query.order);
    let id = req.query.id;
    Post.find({ delete: false, userId: id })
      .skip(skip)
      .sort({ _id: order })
      .limit(limit)
      .exec((err, doc) => {
        if (err) return res.status(400).send(err);
        res.send({
          numberOfPosts: doc.length,
        });
      });
  });

  // who writed this post
  app.get("/api/getUser", (req, res) => {
    let id = req.query.id;
    User.findById(id, (err, doc) => {
      if (err) return res.status(400).send(err);
      res.json({
        name: doc.name,
        lastname: doc.lastname,
        doc,
      });
    });
  });

  //POST upload.single("file")
  app.post("/api/post", upload.any(), (req, res) => {
    console.log('req.body', req.body)
    console.log('req.files', req.files)
    var userId = req.body.userId;
    var content = req.body.content;
    var title = req.body.title;
    var video = req.body.video;
    var img = [];
    req.files.map((item) => {
      img.push(item.filename);
    });
    const dataToSend = {
      userId,
      content,
      title,
      video,
      img
    };
    const post = new Post(dataToSend);
    post.save((err, doc) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({
        post: true,
        postId: doc._id,
      });
    });

  });

  //UPDATE

  app.post("/api/post_update", (req, res) => {
    Post.findByIdAndUpdate(
      req.body._id,
      req.body,
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

  //DELETE

  app.post("/api/delete_post", (req, res) => {
    req.body.delete = true;
    Post.findByIdAndUpdate(
      req.body._id,
      req.body,
      { new: true },
      (err, doc) => {
        if (err) return res.status(400).send(err);
        res.send(true);
      }
    );
  });

  /*app.post('/api/delete_post',(req,res)=>{
        let id = req.query.id;
        Post.findByIdAndRemove(id,(err,doc)=>{
            if(err) return res.status(400).send(err);
            res.send(true);
        })
    })*/
};
