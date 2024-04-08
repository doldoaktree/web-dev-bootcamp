const mongoose = require("mongoose");
const Product = require("./models/product");

async function main() {
  await mongoose.connect("mongodb://localhost:27017/farmStand");
  console.log("CONNECTION OPEN!");
}
main().catch((err) => {
  console.log("Houston, we have a problem!");
  console.log(err);
});

// const produce = new Product({
//     name: "Momo's Cow Milk",
//     price: 1.75,
//     category: ('milk', 'dairy')
// });
// produce.save()
// .then(data => console.log(data))
// .catch(e => console.log(e))

const seedProducts = [
  {
    name: "Momo's Cow Milk",
    price: 1.75,
    category: ("milk", "dairy"),
  },
  {
    name: "Carrots",
    price: 0.5,
    category: "vegetables",
  },
  {
    name: "Onion",
    price: 2.5,
    category: "bulbs",
  },
  {
    name: "Cucumber",
    price: 1.7,
    category: "vegetables",
  },
  {
    name: "Lemon",
    price: 0.2,
    category: "fruits",
  },
  {
    name: "Tomatoes",
    price: 3.99,
    category: "vegetables",
  },
  {
    name: "String Beans",
    price: 4.95,
    category: "vegetables",
  },
];

Product.insertMany(seedProducts)
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e);
  });
 