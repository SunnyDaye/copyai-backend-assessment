const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
const service = require('./api.service');

const ping = (req, res) => {
    const success = true;
    res.json({ success });
}

const validateParameters = (req, res, next) => {
    //get the paramters and store them in variables
    const { tags, sortBy, direction } = req.query;
    //Create a variable to hold Error message string
    let message = '';
    //Check if tags is present
    if (!tags) message += 'Tags parameter is required. '
    //Check if tags are words seperated by commas
    const tagsRegex = new RegExp('^[a-z,]*$');
    const validTags = tagsRegex.test(tags);
    if (!validTags) message += 'Tags must be words seperated by commas only. '
    //Check if sortBy is present & check if sort by is either id,likes,reads, or popularity only
    const sortByRegex = new RegExp('\\bid\\b|\\blikes\\b|\\breads\\b|\\bpopularity\\b');
    if (sortBy && !sortByRegex.test(sortBy)) message += 'Sortby is invalid. Must equal id,likes,reads, or popularity. ';
    //Check if direction is present & check if parameter equals asc or desc only
    const directionRegex = new RegExp('\\basc\\b|\\bdesc\\b');
    if (direction && !directionRegex.test(direction)) message += 'Direction is invalid. Must be asc(ascending) or desc(descending).';

    //if error message is not an empty string, next with status and message
    //else store the parameters in res.locals to be passed to the next middleware
    if (message.length > 0) next({ status: 400, message });
    const tagsToQuery = tags.split(',').filter(word => word.length > 0);
    next();
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

const sortPosts = (req, res, next) => {
    //get posts from res.locals
    //get sortBy and direction params from res locals
    //sort array given the direction and the field
    //store array in res locals to be passed to the next middleware
}

const posts = async (req, res) => {
    res.status(200).send("Posts");
}

module.exports = {
    ping: ping,
    list: [validateParameters, posts],
}