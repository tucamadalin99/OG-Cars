const express = require('express');
const reviewRouter = express.Router();
const reviewController = require('../controllers/review');
const authGuard = require('../controllers/middleware');
const router = require('.');

reviewRouter.post("/generateReviews/:reviews_amount", authGuard.tokenGuard, reviewController.generateFakeCarReviews);
reviewRouter.get("/getAllReviews/:car_id", reviewController.getAllReviewsByCar);

module.exports = reviewRouter;