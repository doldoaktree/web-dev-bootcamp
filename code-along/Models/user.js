const mongoose = require('mongoose');

async function database() {
    await mongoose.connect("mongodb://localhost:27017/relationshipDemo");
    console.log("DATABASE CONNECTED!");
  }
  database().catch((err) => {
    console.log("Errr, need help here!");
    console.log(err);
  });

  const userSchema = new mongoose.Schema({
      first: String,
      last: String,
      addresses: [
    {
        _id: { id: false },
        street: String,
        city: String,
        state: String,
        country: String
    }]          
  });

  const User = mongoose.model('User', userSchema);

  const makeUser = async () => {
      const u = new User({
          first:'Harry',
          last:'Potter'
      })
      u.addresses.push({
          street:'123 Sesame Street',
          city: 'New York',
          state: 'NY',
          country:'USA'
      })
      const res = await u.save();
      console.log(res)
  } 

  const addAddress = async (id)=>{
    const user = await User.findById(id);
    user.addresses.push(
      {
        street: '2 Maplewood St.',
        city: 'Melbourne',
        state: 'VIC',
        country:'Australia'
      }
    )
    const res = await user.save();
    console.log(res);
  }
 addAddress('6237e73ff7afd1a70850bba0');

