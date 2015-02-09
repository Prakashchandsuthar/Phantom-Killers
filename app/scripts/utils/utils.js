

var addUniqueItem = function (collection, item) {
    collection = collection || [];
    if (-1 === collection.indexOf(item)) {
        collection.push(item);
    }
};