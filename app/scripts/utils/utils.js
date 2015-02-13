

var addUniqueItem = function (collection, item) {
    collection = collection || [];
    if (-1 === collection.indexOf(item)) {
        collection.push(item);
    }
};

var getUniqueTime = function() {
    var time = new Date().getTime();
    while (time == new Date().getTime());
    return new Date().getTime();
};