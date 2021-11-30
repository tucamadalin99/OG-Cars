const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./routes/index');
const dotenv = require('dotenv');

dotenv.config();
app.use(cors());
app.use(express.json());
app.use('/api', router);

app.listen(8080, () => {
    console.log("Server running on 8080");
});