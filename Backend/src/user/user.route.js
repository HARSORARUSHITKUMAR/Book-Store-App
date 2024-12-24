const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('./user.model');

const router = express.Router();

// get secret key of jwt
const JWT_SECRET = process.env.JWT_SECRET_KEY;

// get admin dashboard
router.post("/admin", async (req, res) => {
    const { username, password } = req.body;
    try {
        // check if admin already exists
        const admin = await User.findOne({ username });
        if (!admin) {
            res.status(404).send({ message: "Admin not found!" });
        }
        // check if password matches or not 
        if (admin.password !== password) {
            res.status(401).send({ message: "Invalid password!" })
        }

        // generate token and expire token 
        const token = jwt.sign(
            { id: admin._id, username: admin.username, role: admin.role },
            JWT_SECRET,
            { expiresIn: "1h" }
        )

        return res.status(200).json(
            {
                message: "Authentication successful",
                token: token,
                user: {
                    username: admin.username,
                    role: admin.role
                }
            }
        );
    } catch (error) {
        console.error("Failed to login as admin", error)
        res.status(401).send({ message: "Failed to login as admin" })
    }
})

module.exports = router;