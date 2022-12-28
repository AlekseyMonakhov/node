const path = require('path');
const express =require("express");
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', "ejs");
app.set('views', 'views');

const mainPageData = require('./routes/main');
const users = require('./routes/users');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(mainPageData.router);
app.use(users);

app.use((req, res, next) => {
    res.status(404).render('404', {pageTitle:"Page not found"})
})



app.listen(3000, ()=> {
    console.log('Server is running on 3000 port');
});