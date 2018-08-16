const Middleware = (req, res, next) => {

    const currentTime = Date.now();
    req.time = currentTime;
    next();
    
}


module.exports = Middleware;
