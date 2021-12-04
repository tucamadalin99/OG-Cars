const faker = require('faker');
const db = require('../config/db');

const controller = {
    generateFakeCarsData: async(req, res) => {
        try {
            const amount = req.params.cars_amount;
            for (let i = 0; i < amount; i++) {
                const fakeCar = {
                    make: faker.vehicle.manufacturer(),
                    model: faker.vehicle.model(),
                    type: faker.vehicle.type(),
                    fuel: faker.vehicle.fuel(),
                };
                await db.collection('cars').add(fakeCar);
            }
            res.status(201).send({ message: "Cars Data generated!" });
        } catch (err) {
            res.status(500).send({ message: "Server error: " + err });
        }
    },

    getAllCars: async(req, res) => {
        try {
            const carsSnapshot = await db.collection('cars').get();
            const carsResponse = [];
            carsSnapshot.forEach(doc => {
                carsResponse.push({
                    id: doc.id,
                    data: doc.data()
                });
            });
            res.status(200).send(carsResponse);
        } catch (err) {
            res.status(500).send({ message: `Server error: ${err}` });
        }
    },

    getCar: async(req, res) => {
        try {
            const carSnapshot = await (await db.collection('cars').doc(req.params.car_id).get()).data();
            res.status(200).send(carSnapshot);
        } catch (err) {
            res.status(500).send({ message: `Server error: ${err}` });
        }
    },

    deleteCar: async(req, res) => {
        try {
            await db.collection('cars').doc(req.params.car_id).delete();
            res.status(200).send({ message: "Car deleted" });
        } catch (err) {
            res.status(500).send({ message: `Server error: ${err}` });
        }
    },

    editCar: async(req, res) => {
        try {
            const editedCar = {
                make: req.body.make,
                model: req.body.model,
                fuel: req.body.fuel,
                type: req.body.type,
                engineCap: req.body.engineCap
            };
            if (editedCar.make || editedCar.model || editedCar.fuel || editedCar.type || editedCar.engineCap) {
                let finalEdit = {};
                for (let prop in editedCar) {
                    if (editedCar[prop]) {
                        finalEdit[`${prop}`] = editedCar[prop];
                    }
                }
                await db.collection('cars').doc(req.params.car_id).update(finalEdit);
                res.status(200).send({ message: "Car data updated" });
            } else {
                res.status(400).send({ message: "You must provide at least one updated field" });
            }
        } catch (err) {
            res.status(500).send({ message: `Server error: ${err}` });
        }
    }
};

module.exports = controller;