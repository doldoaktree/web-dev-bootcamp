const mongoose = require("mongoose");

(async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/shopApp", {usenewUrlParser: true, useUnifiedTopology: true});
    console.log("CONNECTION OPEN");
    const productSchema = new mongoose.Schema({
        name: {
          type: String,
          required: true,
          maxlength: 20,
        },
        price: {
          type: Number,
          required: true,
          min: [0, "Price must be positive babeh!"],
        },
        onSale: {
          type: Boolean,
          default: false,
        },
        categories: [String],
        qty: {
          online: {
            type: Number,
            default: 0,
          },
          inStore: {
            type: Number,
            default: 0,
          },
        },
        size:{
          type: String,
          enum:['S', 'M', 'L']
        }
      });
  } catch (err) {
    console.log("errrorrr");
    console.log(err);
  }
})();
