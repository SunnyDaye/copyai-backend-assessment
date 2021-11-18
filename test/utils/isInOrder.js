/*
    @params
        field - string that represents which key the list of objects should be sorted by
        posts - an array of post objects
        compare function - function that returns true if comparison of two values is true
    @returns
        true if given array is in correct order
 */

const isInOrder= (compare,field,posts) => {
    let previous = posts[0][field];
    for(let i = 1; i < posts.length; i++){
        console.log(previous);
        if(!compare(previous,posts[i][field]))return false;
        previous = posts[i][field];
    }
    return true;
}


module.exports = isInOrder;