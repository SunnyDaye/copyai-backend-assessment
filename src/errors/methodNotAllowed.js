//Middleware that handles errors for unwanted http methods
function methodNotAllowed(req,res,next){
    next({
        status: 405,
        message: `${req.method} not allowed for ${req.originalUrl}`
    });
}
module.exports = methodNotAllowed;