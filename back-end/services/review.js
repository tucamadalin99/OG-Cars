const db = require('../config/db');

const queryReviewByUserId = async(carId, id) => {
    const foundReview = db.collection("cars").doc(carId).collection('reviews').where('userId', '==', id)
        .get().then(snapshot => {
            let review = {};
            snapshot.forEach(doc => {
                review = doc.data();
                review.id = doc.id;
            });
            return review;
        }).catch((err) => {
            console.log("Error occured: " + err);
        });

    return foundReview;
};

module.exports = { queryReviewByUserId };