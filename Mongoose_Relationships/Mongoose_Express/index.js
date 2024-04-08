const express = require("express");
const methodOverride = require("method-override");
const app = express();
const port = 3000;
const path = require("path");
const mongoose = require("mongoose");

const Product = require("./models/product");
const Farm = require('./models/farm');
const categories = ["fruits", "vegetables", "dairy", "milk", "bulbs"];

async function main() {
  await mongoose.connect("mongodb://localhost:27017/farmStandTake2");
  console.log("CONNECTION OPEN!");
}
main().catch((err) => {
  console.log("Houston, we have a problem!");
  console.log(err);
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

//FARM ROUTES

app.get('/farms', async (req,res)=>{
  const farms = await Farm.find({});
  res.render('farms/index',{farms})
});

app.get('/farms/new', (req,res)=>{
  res.render('farms/new')
});

app.get('/farms/:id', async (req,res)=>{
  const farm = await Farm.findById(req.params.id).populate('products');
  res.render('farms/show',{farm});
});

app.delete('/farms/:id', async (req,res)=>{
  const farm = await Farm.findByIdAndDelete(req.params.id);
  console.log(farm)
  res.redirect('/farms');
});

app.post('/farms', async (req,res)=>{
  const farm = new Farm(req.body);
  await farm.save();
  res.redirect('/farms');
});


app.get('/farms/:id/products/new', (req,res)=>{
  const {id} = req.params;
  res.render('products/new', {categories, id});
});

app.post('/farms/:id/products', async(req,res)=>{
  const {id} = req.params;
  const farm = await Farm.findById(id);
  const {name,price, category} = req.body;
  const product = new Product({name,price, category});
  farm.products.push(product);
  product.farm = farm
  await farm.save();
  await product.save();
  res.redirect(`/farms/${farm.id}`)
})



//PRODUCT ROUTES

app.get("/products", async (req, res) => {
  const products = await Product.find({});
  res.render("products/index", { products });
});

app.get("/products", async (req, res) => {
  const {category} = req.query;
  console.log(category)
  if(category){
    const products = await Product.find({category})
    res.render("products/index", { products, category  });
  }else{
    const products = await Product.find({});
    res.render("products/index", { products, category:"All" });
  }
 
});

// creating new products
app.get("/products/new", async (req, res) => {
  const products = await Product.find({});
  res.render("products/new", { products });
});

app.post("/products", async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.redirect(`products/${newProduct._id}`);
});

// user to choose then show products
app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id).populate('farm','name');
  console.log(product)
  res.render("products/show", {product});
});

// edit
app.get("/products/:id/edit", async (req, res) => {
  const products = await Product.find({});
  const { id } = req.params;
  const productId = await Product.findById(id);
  res.render("products/edit", { products, productId });
});

// show edited product
app.put("/products/:id/", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.redirect(`/products/${product._id}`);
});

// ADD TIMESTAMP above

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.redirect('/products');
});

// app.put('/products/:id/',async (req, res) => {
//   const products = await Product.find({});
//   const product = await Product.findByIdAndUpdate(id,req.body,{runValidators:true});
//   const { id } = req.params;
//   const productId = await Product.findById(id);
//   console.log(req.body)
//  res.redirect(`/products/${product._id}`);
//   // res.redirect("products/saved",{products, productId} );
// });

// productSchema.methods.findCategory =function(){
//   return new mongoose.model().find({category: this.category})
// }

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
//
