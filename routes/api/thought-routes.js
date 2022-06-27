const router = require('express').Router();

// Deconstruct user-controller
const {
  getAllThoughts,
  getThoughtById,
  addThought,
  removeThought,
  updateThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thought-controller');

// /api/thoughts/:userId
router.route('/:userId').post(addThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getThoughtById).put(updateThought);

// /api/thoughts/:userId/:thoughtId
router.route('/:userId/:thoughtId').delete(removeThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);

// /api/thoughts/:thoughtId/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

// /api/thoughts
router.route('/').get(getAllThoughts);

module.exports = router;
