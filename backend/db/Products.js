const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    userId: String,
    company:String
}, {
    timestamps:true
});

module.exports = mongoose.model("products",productSchema);