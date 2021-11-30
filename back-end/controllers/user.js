const faker = require('faker');
const db = require('../config/db');
const bcrypt = require('bcrypt');
const reviewService = require('../services/review');

const controller = {
    generateFakeUserData: async(req, res) => {
        try {
            const amount = req.params.users_amount;
            for (let i = 0; i < amount; i++) {
                const fakeUser = {
                    firstName: faker.name.firstName(),
                    lastName: faker.name.lastName(),
                    email: faker.internet.email(),
                    password: bcrypt.hashSync(faker.internet.password(), 10)
                };
                await db.collection('users').add(fakeUser);
            }
            res.status(201).send({ message: "User Data generated!" });
        } catch (err) {
            res.status(500).send({ message: `Server error: ${err}` });
        }
    },

    addReview: async(req, res) => {
        try {
            const newReview = {
                userId: req.user.id,
                message: req.body.message,
                rating: req.body.rating,
            };
            if (!newReview.message || !newReview.rating) {
                res.status(401).send({ message: "Message or rating not provided.." });
            } else {
                await db.collection('cars').doc(req.params.car_id).collection('reviews').add(newReview);
                res.status(201).send({ message: "Review added succesfully!" });
            }
        } catch (err) {
            res.status(500).send({ message: `Server error: ${err}` });
        }
    },

    deleteReview: async(req, res) => {
        try {
            await db.collection('cars').doc(req.params.car_id).collection('reviews').where('userId', '==', req.user.id)
                .get().then((snapshot) => {
                    snapshot.forEach(doc => {
                        doc.ref.delete();
                    });
                });
            res.status(200).send({ message: "Review deleted!" });
        } catch (err) {
            res.status(500).send({ message: `Server error: ${err}` });
        }
    },

    editReview: async(req, res) => {
        const updatedReview = {
            message: req.body.message,
            rating: req.body.rating
        };

        if (!updatedReview.message || !updatedReview.rating) {
            res.status(401).send({ message: "Message or rating not provided" });
        } else {
            try {
                await db.collection('cars').doc(req.params.car_id).collection('reviews').where('userId', '==', req.user.id)
                    .get().then((snapshot) => {
                        snapshot.forEach(doc => {
                            doc.ref.update(updatedReview);
                        });
                    });
                res.status(200).send({ message: "Review updated" });
            } catch (err) {
                res.status(500).send({ message: `Server error: ${err}` });
            }
        }
    }
};

module.exports = controller;