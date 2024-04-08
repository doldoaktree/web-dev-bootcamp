const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    enum: ["fruits", "vegetables", "dairy", "milk", "bulbs"],
  },
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;


// productSchema.methods.findCategory =function(){
//   return new mongoose.model().find({category: this.category})
// }