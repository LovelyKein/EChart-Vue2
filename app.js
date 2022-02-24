const express = require("express");
const fs = require("fs");
const app = express();

app.listen(5000, function (error) {
  console.log("Success");
});

// 开启静态资源；
app.use("/data/", express.static("./data/"));

app.all('',function(request,response){
  response.setHeader('Access-Control-Allow-Origin','*')
})