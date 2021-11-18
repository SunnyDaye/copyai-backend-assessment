const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
const service = require('./api.service');
const quickSort = require('./utils/quickSort');
const NodeCache = require('node-cache');
const postsCache = new NodeCache({ stdTTL: 30 }); //Hold response in cache for 30 secsonds

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
    if (message.length > 0) {
        next({ status: 400, message });
    } else {
        const tagsToQuery = tags.split(',').filter(word => word.length > 0);
        res.locals.tags = tagsToQuery;
        next();
    }
}
const generateCacheKey = (req, res, next) => {
    let { tags, sortBy, direction } = req.query;
    if (!sortBy) sortBy = 'id';
    if (!direction) direction = 'asc';
    const key = `${tags}/${sortBy}/${direction}`
    res.locals.cacheKey = key;
    next();
}
const handleCacheResponse = (req, res, next) => {
    if (postsCache.has(res.locals.cacheKey)) {
        res.json(postsCache.get(res.locals.cacheKey));
    } else {
        next();
    }

}
const filterPosts = async (req, res, next) => {
    //fetch posts
    const { tags } = res.locals
    const posts = await service.fetchPosts(tags);
    //create a map to hold ids and post objects
    const uniquePostCache = {};
    //iterate from 0 to end of array
    posts.forEach(post => {
        if (!uniquePostCache[post.id]) uniquePostCache[post.id] = post;
    })
    // store Object.values(map) in res.locals to be passed
    const filteredPosts = Object.values(uniquePostCache);

    res.locals.posts = filteredPosts;
    //next() to move to next middleware
    next();

}

const sortPosts = (req, res, next) => {
    const { posts } = res.locals;
    let { sortBy, direction } = req.query;
    if (!sortBy) sortBy = 'id';

    let sortedPosts;
    if (!direction || direction === 'asc') {
        sortedPosts = quickSort((left, right) => left[sortBy] - right[sortBy], posts);
    } else {
        sortedPosts = quickSort((left, right) => right[sortBy] - left[sortBy], posts);
    }

    res.locals.posts = sortedPosts;

    next();
}

const posts = async (req, res) => {
    const { posts, cacheKey } = res.locals;
    postsCache.set(cacheKey, posts);
    res.json({ posts });
}

module.exports = {
    ping: ping,
    list: [validateParameters, generateCacheKey, handleCacheResponse, asyncErrorBoundary(filterPosts), sortPosts, posts],
}