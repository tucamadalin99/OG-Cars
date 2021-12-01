const express = require('express');
const carRouter = express.Router();
const carController = require('../controllers/car');
const authGuard = require('../controllers/middleware');

carRouter.get("/getAllCars", carController.getAllCars);
carRouter.get("/getCar/:car_id", carController.getCar);
carRouter.post("/generateCars/:cars_amount", authGuard.tokenGuard, carController.generateFakeCarsData);
carRouter.put("/editCar/:car_id", authGuard.tokenGuard, carController.editCar);
carRouter.delete("/deleteCar/:car_id", authGuard.tokenGuard, carController.deleteCar);

module.exports = carRouter;