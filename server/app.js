'use strict';
const express = require("express");
const app = express();
const port = 4000;
const cors = require("cors");
const path = require("path");
const router = require("./router");

app.use(cors())

// app.use((req,res,next)=>{
//     res.setHeader('Access-Control-Allow-Origin','*');
//     res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
//     res.setHeader('Access-Control-Allow-Headers','Content-Type;Authorization');
//     next(); 
// })
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", router);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});