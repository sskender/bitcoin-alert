const express = require('express');

const Router = express.Router();


Router.get('/', (req, res) => {

    res.status(200).send(mydata);

});


module.exports = Router;
