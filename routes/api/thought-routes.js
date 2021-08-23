const router = require('express').Router();
const {
    addThought,
    addReaction,
    removeThought,
    removeReaction,
    getAllThought
} = require('../../controllers/thought-controller');

//GET all thoughts api/thoughts
router.route('/')
    .get(getAllThought)
// api/thoughts/<userId>
router.route('/:userId')
    .post(addThought);

// api/thoughts/<userId>/<thoughtId>
router
    .route('/:userId/:thoughtId')
    .put(addReaction)
    .delete(removeThought);

// api/comments/<UserId>/<thoughtId>/<replyId>
router.route('/:userId/:thoughtId/:reactionId')
    .delete(removeReaction);

module.exports = router;
