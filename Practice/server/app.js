const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
let clients = [];


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(bodyParser.json());


app.get("/",(req,res,next) => {
    if(clients.length) {
        return res.status(200).json(clients);
    }
    res.status(404).json("error");
})

app.post("/login", (req,res,next) => {
    const client = req.body;
    const clientWIthID = {...client, id: Math.random().toString()}
    if(client) {
        clients.push(clientWIthID);
        return res.status(200).json(clientWIthID);
    }
    res.status(204).json("no client");
})

app.get('/reset', (req,res,next) => {
    clients.length = 0;
    res.status(200).json("done");
});


app.get('/reset/:id', (req,res,next) => {
    const id = req.params.id;
    clients = clients.filter((client) => client.id !== id);
    console.log(clients)

    res.status(200).json(clients);
});

app.listen(3001, () => {
    console.log("server started on 3001 port")
})