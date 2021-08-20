const router = require('express').Router();
const thoughtRoutes = require('./thought-routes');
const userRoutes = require('./user-routes');

//api endpoints for thought and user
router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

module.exports = router;