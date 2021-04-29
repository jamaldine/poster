module.exports = function (app, Comment, Post, User) {
  //GET

  // a detail of comment referenced by id
  app.get("/api/getComment", (req, res) => {
    let id = req.query.id;

    Comment.findById(id, (err, doc) => {
      if (err) return res.status(400).send(err);
      res.send(doc);
    });
  });

  // all comments
  app.get("/api/comments", (req, res) => {
    let skip = parseInt(req.query.skip);
    let limit = parseInt(req.query.limit);
    let order = parseInt(req.query.order);

    Comment.find({ delete: false })
      /*.skip(skip)
        .sort({ _id: order })
        .limit(limit)*/
      .exec((err, doc) => {
        if (err) return res.status(400).send(err);
        res.send(doc);
      });
  });

  // all comments of a user
  app.get("/api/userComments", (req, res) => {
    let skip = parseInt(req.query.skip);
    let limit = parseInt(req.query.limit);
    let order = parseInt(req.query.order);
    let postId = req.query.postId;
    let userId = req.query.userId;
    Comment.find({ delete: false, userId })
      .skip(skip)
      .limit(limit)
      .exec((err, doc) => {
        if (err) return res.status(400).send(err);
        res.send({
          numberOfComments: doc.length,
        });
      });
  });

  // all comments of a post
  app.get("/api/postComments", (req, res) => {
    let skip = parseInt(req.query.skip);
    let limit = parseInt(req.query.limit);
    let order = parseInt(req.query.order);
    let postId = req.query.postId;
    let userId = req.query.userId;
    Comment.find({ delete: false, postId })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: order })
      .exec((err, doc) => {
        if (err) return res.status(400).send(err);
        res.send({
          doc,
        });
      });
  });

  // who commented this post
  app.get("/api/getAvatarUser", (req, res) => {
    let id = req.query.id;
    User.findById(id, (err, doc) => {
      if (err) return res.status(400).send(err);
      res.json({
        avatar: doc.avatar,
      });
    });
  });

  //POST
  app.post("/api/comment", (req, res) => {
    const comment = new Comment(req.body);
    comment.save((err, doc) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({
        comment: true,
        commentId: doc._id,
      });
    });
  });

  //UPDATE
  app.post("/api/comment_update", (req, res) => {
    Comment.findByIdAndUpdate(
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
  app.post("/api/delete_comment", (req, res) => {
    req.body.delete = true;

    Comment.findByIdAndUpdate(
      req.body._id,
      req.body,
      { new: true },
      (err, doc) => {
        if (err) return res.status(400).send(err);
        res.send(true);
      }
    );
  });
};
