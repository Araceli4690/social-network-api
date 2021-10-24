const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    addThought,
    updateThought,
    removeThought,
    addReaction,
    removeReaction,

} = require('../../controllers/thought-controller');

//GET all thoughts api/thoughts
router.route('/')
    .get(getAllThoughts)
    .post(addThought);

// api/thoughts/<userId>/<thoughtId>
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(removeThought);

// api/comments/<UserId>/<thoughtId>/<replyId>
router.route('/:thoughtId/:reactions')
    .post(addReaction);

router.route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction);

module.exports = router;
