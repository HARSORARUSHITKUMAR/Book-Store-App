const express = require('express')
const app = express()

const mongoose = require('mongoose');
require('dotenv').config()
const port = process.env.PORT || 5000;



async function main() {
    await mongoose.connect(process.env.DB_URL);
    // routes

    app.use('/', (req, res) => {
        res.send('Book  Server')
    });
}

main().then(() => console.log("MongoDB connected Successfully")).catch(err => console.log(err));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})