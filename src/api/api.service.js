require('dotenv').config({ path: '../../.env' });
const axios = require('axios');

const { ASSESSMENT_API_URL } = process.env;

const fetchPosts = async (tags) => {
    const responses = await Promise.all(tags.map((tag) => axios.get(`${ASSESSMENT_API_URL}?tag=${tag}`)));
    const cumulativePost = responses.reduce((accumulator, response) => {
        const { posts } = response.data;
        accumulator = [...accumulator, ...posts];
        return accumulator;
    }, []);

    return cumulativePost
}

module.exports = {
    fetchPosts
}