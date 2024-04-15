const express = require('express');
const app = express();
const port = 3000;
const shelterRoutes = require('./routes/shelters');
const router = express.Router();
const cookieParser = require('cookie-parser');

async function main() {
 console.log("CONNECTION OPEN!");
}

main().catch((err) => {
  console.log("Houston, we have a problem!");
  console.log(err);
});

// router.use((req,res,next)=>{
//   if(req.query.isAdmin){
//       next();
//   }
//   res.send('RESTRICTED ACCESS TOP SECRET!'

//   )
// });
app.use(cookieParser('locked'));
app.use('/shelters', shelterRoutes);





app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
