const { User, Thought } = require('../models');

const userController = {
  // Get all Users
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: 'thoughts',
        // Adding a '-' indicates we don't want to return this data '__v"
        select: '-__v',
      })
      // This select statement is attached to the parent User data
      .select('-__v')
      // This would sort based on the User ID and return the newest Users first
      .sort({ _id: -1 })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.userId }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },
  getUserById({ params }, res) {
    User.findOne({ _id: params.userId })
      .populate({
        path: 'thoughts',
        select: '-__v',
      })
      .select('-__v')
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      // By adding addToSet, it will only add unique data to the array
      { $addToSet: { friends: { _id: params.friendId } } },
      { new: true, runValidators: true }
    )
      .then((dbFriendData) => {
        if (!dbFriendData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(dbFriendData);
      })
      .catch((err) => res.json(err));
  },

  deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: { _id: params.friendId } } },
      { new: true }
    )
      .then((dbFriendData) => res.json(dbFriendData))
      .catch((err) => res.json(err));
  },

  deleteUser({ params }, res) {
    User.find({})
      .populate({
        path: 'thoughts',
        // Adding a '-' indicates we don't want to return this data '__v"
        select: '-__v',
      })
      .then((thoughtData) => {
        // Iterate through the Users Thoughts
        thoughtData[0].thoughts.forEach((item) => {
          // Extract the ID Object and stringify it then remove the ""
          var thoughtID = JSON.stringify(item._id).replace(/['"]+/g, '');

          // For each thought, if it matches the users ThoughtId, delete it
          Thought.findOneAndDelete({ _id: thoughtID }).then(
            (deletedThought) => {
              if (!deletedThought) {
                return res
                  .status(404)
                  .json({ message: 'No Thought with this id!' });
              }
              User.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { thoughts: params.thoughtID } },
                { new: true }
              );
            }
          );
        });
      })
      .then(() => {
        User.findOneAndDelete({ _id: params.userId })
          .then((dbUserData) => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No User found with this id!' });
              return;
            }
            res.json('User and associated Thoughts deleted!');
          })
          .catch((err) => res.status(400).json(err));
      });
  },
};
module.exports = userController;
