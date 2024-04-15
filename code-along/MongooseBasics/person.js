const mongoose = require("mongoose");
async function main() {
  await mongoose.connect("mongodb://localhost:27017/shopApp");
  console.log("CONNECTION OPEN!");
}
main().catch((err) => console.log(err));

const personSchema = new mongoose.Schema({
  first: String,
  last: String,
});
personSchema.virtual("fullName").get(function () {
    return`${this.first} ${this.last}`;
  })
  .set(function (v) {
    const first = v.substring(0, v.indexOf(" "));
    const last = v.substring(v.indexOf(" ") + 1);
     this.set(first,last);
  });

personSchema.pre('save', async function(){
    this.first ='YO';
    this.last ='FRODO';
    console.log('about to save')
})
personSchema.post('save', async function(){
    console.log('SAVED')
})

const Person = mongoose.model("Person", personSchema);
const human = new Person();
// let jenny = new Person({first:'Jenny', last:'Ang'})

const momo = new Person({first: 'Momo', last:'Ang'})
const john = new Person({first: 'John', last:'Escobar'})