const mongoose = require('mongoose');
async function main() {
  await mongoose.connect('mongodb://localhost:27017/shopApp');
  console.log('CONNECTION OPEN!')
}
main().catch(err => console.log(err));


// const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost:27017/shopApp")
//   .then(() => {
//     console.log("CONNECTION OPEN! YAHOO!");
//   })
//   .catch((err) => {
//     console.log("Error Here, There and Everywhere!");
//     console.log(err);
//   });

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
productSchema.methods.stockCheck = function (){
  console.log(`product running low, reorder ${this.name} soon.`)
}

productSchema.methods.greet = function(){
  console.log('gudday!')
}

productSchema.methods.toggleOnSale = function(){
  this.onSale=!this.onSale;
  return this.save();
}

productSchema.methods.addCategory = function(newCat){
this.categories.push(newCat);
 return this.save();
}

productSchema.statics.fireSale = function(){
  return this.updateMany({}, {onSale: true, price:0})
}

const Product = mongoose.model('Product', productSchema);



const findProduct = async () =>{
  const foundProduct = await Product.findOne({name:'bike bag'});
  console.log(foundProduct)
  await foundProduct.toggleOnSale();
  console.log(foundProduct)
  await foundProduct.addCategory('Outdoors');
  console.log(foundProduct)
}
// findProduct();
Product.fireSale().then(res => {
  console.log('fireSale is On!')
  console.log(res)
});



// const foundBag = Product.findOne({name:'bike bag'});
// const headPhone = new Product({name:'head phone', price:50})

// const findProduct2 = async () =>{
//   const foundBag = await Product.findOne({name:'bike bag'});
//   console.log(foundBag)
//   await foundBag.toggleOnSale();
//   console.log(foundBag)
// }
// findProduct2();


// const myFound = Product.find({name:'bike bag'}).then(data=>console.log(data));



// Product.findOneAndUpdate(
//   { name: "Tire Pump" },
//   { price: -10.99 },
//   { new: true, runValidators: true }
// )
//   .then((data) => {
//     console.log("it workeeeeed");
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log("Houston, we have a problem!");
//     console.log(err);
//   });


// const bike = new Product({ name: "Cycling Jersey", price: 299.50, categories:['Cycling','Clothing'], size: 'XS'});
// bike
//   .save()
//   .then((data) => {
//     console.log("it workeeeeed");
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log("Houston, we have a problem!");
//     console.log(err);
//   });

// const bikeBag = new Product({ name: "bike bag", price: 10, categories:['Accessories']});
// bikeBag
//   .save()
//   .then((data) => {
//     console.log("it workeeeeed");
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log("Houston, we have a problem!");
//     console.log(err);
//   });