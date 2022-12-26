const express = require("express");

const app = express();

app.use("/users",(req, res) => {
    console.log("hello2")
    res.send(`<h1>Hello Users</h1>`)
})
app.use("/", (req,res, next) =>{
    console.log("hello")
    res.send(`<h1>Hello from Express</h1>`)
})

app.listen(3000, () => {
    console.log("server running on 3000 port")
})