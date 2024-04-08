const fs = require("fs");
const folderName = process.argv[2] || "Project";
// fs.mkdir('Pizza', { recursive: true }, (err) => {
//     console.log('in the call back')
//     if (err) throw err;
//   });
//   console.log('i come after mkdir')
try {
  fs.mkdirSync(folderName);
  fs.writeFileSync(`${folderName}/index.html`);
  fs.writeFileSync(`${folderName}/app.js`);
  fs.writeFileSync(`${folderName}/styles.css`);
} catch (e) {
  console.log("something went awfully wrong!");
  console.log(e);
}
