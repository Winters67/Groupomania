const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select("-password");
  res.status(200).json(users);
};

module.exports.userInfo = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  UserModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID unknown : " + err);
  }).select("-password");
};

module.exports.updateUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id || req.body.isAdmin))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          bio: req.body.bio,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    )
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }));
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.deleteUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id || req.body.isAdmin))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await UserModel.remove({ _id: req.params.id }).exec();
    res.status(200).json({ message: "Successfully deleted. " });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.follow = (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToFollow)
  )
    return res.status(404).send("ID unknown :" + req.params.id);

  try {
    UserModel.findByIdAndUpdate(
      req.params.id,
      { $push: { following: req.body.idToFollow } },
      { new: true, upsert: true },
      (err, docs) => {
        if (!err) {
          res.status(200).json(docs);
        } else return res.status(404).json(err);
      }
    );
    UserModel.findByIdAndUpdate(
      req.body.idToFollow,
      { $push: { followers: req.params.id } },
      { new: true, upsert: true },
      (err, docs) => {
        if (err) return res.status(404).json(err);
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

module.exports.unfollow = (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToUnfollow)
  )
    return res.status(404).send("ID unknown :" + req.params.id);

  try {
    UserModel.findByIdAndUpdate(
      // find the user and update the following array
      req.params.id,
      { $pull: { following: req.body.idToUnfollow } },
      { new: true },
      (err, docs) => {
        if (!err) {
          res.status(200).json(docs);
        } else return res.status(404).json(err);
      }
    );
    UserModel.findByIdAndUpdate(
      // find the user followed and update his follower array
      req.body.idToUnfollow,
      { $pull: { followers: req.params.id } },
      (err, docs) => {
        if (err) return res.status(404).json(err);
      }
    );
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
