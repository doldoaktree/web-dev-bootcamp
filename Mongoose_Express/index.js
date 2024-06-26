const express = require("express");
const methodOverride = require("method-override");
const app = express();
const port = 3000;
const path = require("path");
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

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

//FARM ROUTES
app.get('/farms/new', (req,res)=>{
  res.render('farms/new')
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
  const product = await Product.findById(id);
  console.log(product);
  res.render("products/show", { product });
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


app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
//
