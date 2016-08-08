/**
 * Rename extension for Bundl
 */

var path = require('path');

module.exports = function (remap) {

    function renameEach (contents, r) {
        var bundl = this;

        var newName = remap[r.name];
        if (newName) {
            bundl.log('Renaming ' + r.name + ' to ' + newName);
            r.name = newName;
            r.dest = path.dirname(r.dest) + '/' + newName;
        }

        return contents;
    }

    return {
        each: renameEach
    };

};
