const express = require('express');

const Router = express.Router();


Router.get('/', (req, res) => {

    /**
     * Do somethig here.
     * 
     * E.g.:
     */
    res.send('Router works :D');

});


module.exports = Router;
