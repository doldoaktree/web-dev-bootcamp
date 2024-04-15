const mongoose = require("mongoose");
const {Schema} = mongoose;

const productSchema = new Schema({
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
  farm: {
    type: Schema.Types.ObjectId,
    ref: 'Farm'
  }
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;


// productSchema.methods.findCategory =function(){
//   return new mongoose.model().find({category: this.category})
// }


