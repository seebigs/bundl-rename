
var rename = require('../../index.js');

describe('rename', function () {

    function doRename (rn) {
        var resource = {
            name: 'original.file_name.js',
            dest: '/absolute/path/original.file_name.js'
        };
        rn.one('', resource);
        return resource.name;
    }

    describe('handles empty options', function (expect) {
        var rn = rename();
        expect(doRename(rn)).toBe('original.file_name.js');
    });

    describe('uses String options as ext', function (expect) {
        var rn = rename('.min.js');
        expect(doRename(rn)).toBe('original.file_name.min.js');
    });

    describe('respects prefix and suffix options', function (expect) {
        var rn = rename({
            prefix: 'before-',
            suffix: '-after'
        });
        expect(doRename(rn)).toBe('before-original.file_name.js-after');
    });

    describe('remap options override all others', function (expect) {
        var rn = rename({
            ext: '.min.js',
            prefix: 'before-',
            suffix: '-after',
            remap: {
                'original.file_name.js': 'totally_new.js'
            }
        });
        expect(doRename(rn)).toBe('totally_new.js');
    });

});
