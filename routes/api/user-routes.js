const router = require('express').Router();
const {
    //importing controllers into api routes for user
    //get all
    getAllUser,
    //get by id
    getUserById,
    //post new user
    createUser,
    //put a updated user
    updateUser,
    //delete user 
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller');

//user api route api/users **all
router
    .route('/')
    .get(getAllUser)
    .post(createUser)

//user api route by id api/users/:id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)

//Post and delete friend /api/users/:userid/friends/:friendid
router
    .route('/:id/friends/:freindsId')
    .post(addFriend)
    .delete(deleteFriend)

module.exports = router;
