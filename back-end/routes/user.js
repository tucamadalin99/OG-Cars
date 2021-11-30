const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/user');
const authGuard = require('../controllers/middleware');

userRouter.post("/generateUsers/:users_amount", authGuard.tokenGuard, userController.generateFakeUserData);
userRouter.post("/addReview/:car_id", authGuard.tokenGuard, userController.addReview);
userRouter.delete('/deleteReview/:car_id', authGuard.tokenGuard, userController.deleteReview);
userRouter.put('/editReview/:car_id', authGuard.tokenGuard, userController.editReview);

module.exports = userRouter;