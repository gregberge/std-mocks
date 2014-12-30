# std-mocks
[![Build Status](https://travis-ci.org/neoziro/std-mocks.svg?branch=master)](https://travis-ci.org/neoziro/std-mocks)
[![Dependency Status](https://david-dm.org/neoziro/std-mocks.svg?theme=shields.io)](https://david-dm.org/neoziro/std-mocks)
[![devDependency Status](https://david-dm.org/neoziro/std-mocks/dev-status.svg?theme=shields.io)](https://david-dm.org/neoziro/std-mocks#info=devDependencies)

Mock node stdout and stderr without pain.

## Install

```
npm install std-mocks
```

## Usage

```js
var stdMocks = require('std-mocks');

stdMocks.use();
process.stdout.write('ok');
console.log('log test\n');
stdMocks.restore();

var output = stdMocks.flush();
console.log(output.stdout); // ['ok', 'log test\n']
```

### stdMocks.use([options])

Start mocking std output, by default both are mocked.

**Options:**

```
@param {object} [options] Options
@param {boolean} [options.stdout=true] Mock stdout
@param {boolean} [options.stderr=true] Mock stderr
@param {boolean} [options.print=false] Also print to std
```

### stdMocks.restore([options])

Restore std output, by default both are restored.

**Options:**

```
@param {object} [options] Options
@param {boolean} [options.stdout=true] Mock stdout
@param {boolean} [options.stderr=true] Mock stderr
```

### stdMocks.flush([options])

Flush collected data, by default both are collected.

**Options:**

```
@param {object} [options] Options
@param {boolean} [options.stdout=true] Mock stdout
@param {boolean} [options.stderr=true] Mock stderr
@returns {object} Object containing two array corresponding to outputs.
```


## License

MIT
