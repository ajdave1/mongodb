const { json } = require("body-parser");
const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());
let data = fs.readFileSync("./data.js", "utf8");
const dataS = JSON.stringify(data);

app.get("/", (req, res) => {
  console.log(data);
  console.log(dataS);
  res.status(200).json({
    status: "succes",
  });
});
app.post("/", () => {
  fs.writeFileSync(
    "./data.json",
    { name: "Ogbanje", testing: "whatever " },
    console.log("we wrote file")
  );
});
app.listen(300, () => {
  console.log("started live server at 300");
});
