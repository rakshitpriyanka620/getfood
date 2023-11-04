const express = require("express");
const router = express.Router();
const Order = require('../models/Orders');
const { Send } = require("@mui/icons-material");

router.post('/orderData', async (req, res) => {
  try {
    const data = req.body.order_data;
    data.unshift({ Order_date: req.body.order_date });

    const existingOrder = await Order.findOne({ email: req.body.email });

    if (existingOrder === null) {
      await Order.create({
        email: req.body.email,
        order_data: [data] // Use 'order_data' property here
      });
    } else {
      await Order.findOneAndUpdate(
        { email: req.body.email },
        { $push: { order_data: data } }
      );
    }

    res.json({ success: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/myorderData', async (req, res) =>{
try {
    let myData= await Order.findOne({'email':req.body.email})
    res.json({orderData:myData})
} catch (error) {
    res.send("server error",error)
}
}
)
module.exports = router;
