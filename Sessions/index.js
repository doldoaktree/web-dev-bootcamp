const express = require('express');
const app = express();
const port = 3000;
const session = require('express-session');

async function main() {
    console.log("CONNECTION OPEN!");
   }
   
   main().catch((err) => {
     console.log("Houston, we have a problem!");
     console.log(err);
   });
   
   
   app.listen(port, () => {
       console.log(`App listening on port ${port}`);
     });
   