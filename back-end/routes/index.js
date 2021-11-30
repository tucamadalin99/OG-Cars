const express = require('express');
const router = express.Router();
const userRouter = require('./user');
const authRouter = require('./jwt-auth');
const carRouter = require('./car');
const reviewRouter = require('./review');

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/cars', carRouter);
router.use('/review', reviewRouter);

module.exports = router;