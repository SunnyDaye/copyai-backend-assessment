const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
const ping = (req, res) => {
    const success = true;
    res.json({ success });
}

const posts = async (req,res) => {
    res.status(200).send("Posts");
}

module.exports = {
    ping: ping,
    list: posts,
}