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
    deleteUser
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

module.exports = router;
