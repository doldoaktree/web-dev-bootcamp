const mongoose = require('mongoose');
const Schema = mongoose.Schema;


async function database() {
    await mongoose.connect("mongodb://localhost:27017/relationshipDemo");
    console.log("DATABASE CONNECTED!");
  }
  database().catch((err) => {
    console.log("Errr, need help here!");
    console.log(err);
  });

  const productSchema = new Schema({
       name: String,
       price: Number,
       season:{
           type: String,
           enum:['Winter','Spring', 'Summer', 'Fall']
       }
  });
  const farmSchema = new Schema({
    name: String,
    city: String,
    products: [{type: Schema.Types.ObjectId, ref:'Product'}]
})

  const Product = mongoose.model('Product', productSchema);
  const Farm = mongoose.model('Farm', farmSchema);
//   Product.insertMany([
//       {
//           name: 'Melon', price: 2.99, season:'Summer'
//       },
//       {
//         name: 'Banana', price: 1.99, season:'Spring'
//     },
//     {
//         name: 'Okra', price: 4.79, season:'Winter'
//     }
//   ])

// const makeFarm = async()=>{
//     const farm = new Farm({name: 'Full Belly Farms', city: 'Almadillo, Texas'});
//     const melon = await Product.findOne({name:'Melon'});
//     farm.products.push(melon);
//     farm.save();
//     console.log(farm);
// }

// makeFarm();

const addProduct = async() =>{
    const farm = await Farm.findOne({name: 'Full Belly Farms'});
    const okra = await Product.findOne({name: 'Okra'});
    farm.products.push(okra);
    await farm.save();
    console.log(farm);
}
Farm.findOne({name:'Full Belly Farms'})
.populate('products')
.then(farm=>console.log(farm))

