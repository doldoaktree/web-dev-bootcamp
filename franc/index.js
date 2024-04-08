import { franc, francAll } from "franc";
import langs from "langs";
import { argv } from "process";
const sentence = process.argv;
const code = franc(`${sentence}`);
for (let i = 2; i < sentence.length; i++) {
  const langShow = langs.where("3", `${code}`);
  console.log(`${langShow.name}`);
}
  