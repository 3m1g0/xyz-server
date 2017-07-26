'use strict';
module.exports = function (obj, path, newValue) {
    var parts = path.split('.');
    while (parts.length > 1 && (obj = obj[parts.shift()]));
    obj[parts.shift()] = newValue;
    return obj;
}