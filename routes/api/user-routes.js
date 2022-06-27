const router = require('express').Router();

// Deconstruct user-controller
const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require('../../controllers/user-controller');

// /api/users
router.route('/').get(getAllUsers).post(createUser);

// api/users/:userId
router.route('/:userId').get(getUserById).put(updateUser).delete(deleteUser);

// api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;
