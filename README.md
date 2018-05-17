# bundl-rename

*Rename bundles*

*Runs with the amazing [Bundl](https://github.com/seebigs/bundl) build tool*

## Install

```
$ npm install --save-dev bundl-rename
```

## Use

```js
var Bundl = require('bundl');
var minify = require('bundl-minify');
var rename = require('bundl-rename');
var write = require('bundl-write');

new Bundl(targets)
    .then(write())
    .then(minify())
    .then(rename(options))
    .then(write())
    .go();
```

## Options

### Replace file extension only
```js
rename('.new.ext')
rename({
    ext: '.new.ext'
})

// original1.js --> original1.new.ext
// original2.js --> original2.new.ext
// original3.js --> original3.new.ext
```

### Prefix or Suffix
```js
rename({
    prefix: '__',
    suffix: '.new'
})

// original1.js --> __original1.js.new
// original2.js --> __original2.js.new
// original3.js --> __original3.js.new
```

### Remap specific file names
*(files not included in the map will not be renamed)*
```js
rename({
    remap: {
        'original1.js': 'one.new',
        'original2.js': 'two.new'
    }
})

// original1.js --> one.new
// original2.js --> two.new
// original3.js --> original3.js
```
