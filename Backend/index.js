const express = require('express');
const app = express();
const cors = require('cors');

const mongoose = require('mongoose');
require('dotenv').config();
const port = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}))

// routes
const bookRoutes = require('./src/books/book.route');
const orderRoutes = require('./src/orders/order.route');
const userRoutes = require('./src/user/user.route');
const AdminRoutes = require('./src/stat/admin.stat');


// get all books data
app.use("/api/books", bookRoutes);
// get all orders
app.use("/api/orders", orderRoutes);
// check the user credentials
app.use("/api/auth", userRoutes);
// go to admin 
app.use("/api/admin", userRoutes);



async function main() {
    await mongoose.connect(process.env.DB_URL);
    app.use('/', (req, res) => {
        res.send('Book  Server')
    });
}

main().then(() => console.log("MongoDB connected Successfully")).catch(err => console.log(err));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});