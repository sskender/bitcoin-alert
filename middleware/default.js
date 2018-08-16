const Middleware = (req, res, next) => {
    /**
     * Do somethig here.
     * 
     * E.g.:
     */
    console.log('Middleware works :D')


    /**
     * Don't forget the server!
     */
    next();
}


module.exports = Middleware;
