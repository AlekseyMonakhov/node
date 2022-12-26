const express =  require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const indexRoute = require('./routes/main');
const usersRoute = require('./routes/users');


app.use(express.static(path.join(__dirname, 'public')));

app.use(indexRoute);
app.use(usersRoute);


app.listen(3000, () => {
    console.log("Server running on 3000 port")
})