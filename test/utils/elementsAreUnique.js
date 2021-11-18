/*
    @params
        arr- the array of elements to check
        field - string that represents the key of the value to check if unique. Helpful for array of objects
    @returns
        true if all elements or values are unique
*/
const elementsAreUnique = (arr,field=null) => {
    const valuesSet = new Set();
    arr.forEach((element) => {
        if(field){
            if(valuesSet.has(element[field])) return false
        }else{
            if(valuesSet.has(element)) return false;
        }     
    });
    return true;

    
}
module.exports = elementsAreUnique;