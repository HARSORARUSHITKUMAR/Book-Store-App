const Order = require("./order.model")

const createAOrder = async (req, res) => {
    try {
        const newOrder = await Order(req.body);
        const saveOrder = await newOrder.save();
        res.status(200).json(saveOrder);
    } catch (error) {
        console.error("Error creating order", error);
        res.status(500).json({ message: "Failed to create order" });
    }
};

// get orders by users email
const getOrderByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const getOrders = await Order.find({ email }).sort({ createdAt: -1 });
        if (!getOrders) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(getOrders);
    } catch (error) {
        console.error("Error fetching order", error);
        res.status(500).json({ message: "Failed to fetch order" });
    }
}

// exports all 
module.exports = {
    createAOrder,
    getOrderByEmail
} 