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

        // override all others with remap if set
        if (options.remap) {
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
            if (bundl.args && bundl.args.verbose) {
                bundl.log('Renaming ' + r.name + ' to ' + newName);
            }
            r.name = newName;
            r.dest = path.dirname(r.dest) + '/' + newName;
        }

        return contents;
    }

    return {
        one: one
    };

};
