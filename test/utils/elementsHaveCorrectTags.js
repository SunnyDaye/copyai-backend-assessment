/*
    @params
        tags- an array representing which tags an object should have
        posts - an array of post objects
    @reutrns
        true if all elements have the tags
 */
const elementsHaveCorrectTags = (tags, posts) => {
    for (let i = 0; i < posts.length; i++) {
        const postTags = new Set(posts[i].tags);
        let hasCorrectTag = false;
        for (let j = 0; j < tags.length; j++) {
            if (postTags.has(tags[j])) hasCorrectTag = true;
        }
        if(!hasCorrectTag) return false;
    }
    return true;
}


module.exports = elementsHaveCorrectTags;
