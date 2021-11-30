const db = require('../config/db');

const queryCarById = async(id) => {
    db.collection("cars").doc(id)
        .get().then(snapshot => {
            return snapshot.data();
        }).catch(err => {
            console.log("Error occured: " + err);
        });
};

module.exports = { queryCarById };