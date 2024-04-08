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

  const userSchema = new Schema({
      username: String,
      age: Number
  });

  const tweetSchema = new Schema({
    text: String,
    likes: Number,
    user: {type: Schema.Types.ObjectId, ref: 'User'}
})

const User = mongoose.model('User', userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);

// const makeTweets = async () =>{
//     // const user = new User({username:'momosuperdog', age: 2});
//     const user = await User.findOne({username:'momosuperdog'})
//     const tweet2 = new Tweet({text: 'bark bark bark', likes: 2})
//     // const tweet1 = new Tweet({text: 'I love to sleep', likes: 23})
//     tweet2.user = user;
//     // user.save();
//     tweet2.save();

// }
// makeTweets();

const findTweet = async() =>{
    const t = await Tweet.find({}).populate('user', 'username')
    console.log(t);
}
findTweet();









//   const farmSchema = new Schema({
//     name: String,
//     city: String,
//     products: [{type: Schema.Types.ObjectId, ref:'Product'}]
// })

//   const Product = mongoose.model('Product', productSchema);
//   const Farm = mongoose.model('Farm', farmSchema);
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

// const addProduct = async() =>{
//     const farm = await Farm.findOne({name: 'Full Belly Farms'});
//     const okra = await Product.findOne({name: 'Okra'});
//     farm.products.push(okra);
//     await farm.save();
//     console.log(farm);
// }
// Farm.findOne({name:'Full Belly Farms'})
// .populate('products')
// .then(farm=>console.log(farm))

