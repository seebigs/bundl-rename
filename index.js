/**
 * Rename extension for Bundl
 */

var path = require('path');

/**
 * @option options
 *   {String} new extension to be applied to each file
 *   {Object}
 *      ext: new extension to be applied to each file
 *      prefix: prepend each file name
 *      suffix: add to the end of each file name
 *      remap: { 'old_bundle.js': 'new_bundle.js' }
 */
module.exports = function (options) {
    options = options || {};

    if (typeof options === 'string') {
        options = {
            ext: options
        };
    }

    function one (contents, r) {
        var bundl = this;
        var newName = r.name;

        if (typeof options === 'function') {
            newName = options(r.name, r);

        } else if (options.remap) {
            newName = options.remap[r.name] || r.name;

        } else {
            // change extensions
            if (options.ext) {
                var extSplit = newName.split('.');
                extSplit.pop();
                newName = extSplit.join('.') + options.ext;
            }

            // prefix and suffix
            newName = (options.prefix || '') + newName + (options.suffix || '');
        }

        if (newName !== r.name) {
            r.name = newName;
            r.dest = (path.isAbsolute(r.dest) ? path.resolve(r.options.outputDir) : path.dirname(r.dest)) + '/' + newName;
        }

        return contents;
    }

    return {
        one: one
    };

};
