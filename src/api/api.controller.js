const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
const service = require('./api.service');

const ping = (req, res) => {
    const success = true;
    res.json({ success });
}

const validateParameters = (req,res,next) => {
    //get the paramters and store them in variables
    //Create a variable to hold Error message string
    //Check if tag is present
        //if not, add string 'tags parameter required' to error message
    //Check if tags are words seperated by commas
        //if not add string 'tags parameter must equal words seperated by commas only.'
    //Check if sortBy is present
        //Check if sort by is either id,likes,reads, or popularity only
            //if not add string 'sortBy parameter invalid. sortBy must equal id,likes,reads, or popularity' to error message
    //Check if direction is present
        //Check if parameter equals asc or desc only
            //If not add 'direction parameter invalid. direction must equal asc or desc only"
}

const filterPosts = (req, res, next) => {
    //fetch posts
    //create a map to hold ids and post objects
    //iterate from 0 to end of array
        //check if post id is in map
            //if not, add id and the post object to map
    // store Object.values(map) in res.locals to be passed
    //next() to move to next middleware

}

const sortPosts = (req,res,next) => {
    //
}

const posts = async (req,res) => {
    res.status(200).send("Posts");
}

module.exports = {
    ping: ping,
    list: posts,
}