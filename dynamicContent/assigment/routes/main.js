const express =require('express');
const router = express.Router();


const usersNames = [];

router.get("/", (req,res,next) => {
    res.render('main', {pageTitle: "Form page"});
});
router.post("/add-user", (req,res,next) => {
    usersNames.push(req.body.username);
    res.status(302).redirect('/');
});

module.exports.router = router;
module.exports.usersNames = usersNames;