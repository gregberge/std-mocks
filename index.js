// Expose methods.
exports.use = use;
exports.restore = restore;
exports.flush = flush;

/**
 * Store original writes.
 */

var originalWrites = {
  stdout: process.stdout.write,
  stderr: process.stderr.write,
};

/**
 * Data.
 */

var cachedData = {
  stdout: [],
  stderr: [],
};

/**
 * Defaults.
 */

var defaultOpts = {
  stdout: true,
  stderr: true,
  print: false,
};

/**
 * Start mocking std output.
 *
 * @param {object} [options] Options
 * @param {boolean} [options.stdout=true] Mock stdout
 * @param {boolean} [options.stderr=true] Mock stderr
 * @param {boolean} [options.print=false] Also print to std
 */

function use(options = {}) {
  options = { ...defaultOpts, ...options };

  if (options.stdout) wrapWrite("stdout", options.print);

  if (options.stderr) wrapWrite("stderr", options.print);
}

/**
 * Wrap write method.
 *
 * @param {string} std Std
 * @param {boolean} print Also print to std
 */

function wrapWrite(std, print) {
  process[std].write = function (data) {
    cachedData[std].push(data);

    if (print) originalWrites[std].apply(process[std], arguments);
  };
}

/**
 * Restore std output.
 *
 * @param {object} [options] Options
 * @param {boolean} [options.stdout=true] Mock stdout
 * @param {boolean} [options.stderr=true] Mock stderr
 */

function restore(options = {}) {
  options = { ...defaultOpts, ...options };

  if (options.stdout) process.stdout.write = originalWrites.stdout;

  if (options.stderr) process.stderr.write = originalWrites.stderr;
}

/**
 * Flush collected data.
 *
 * @param {object} [options] Options
 * @param {boolean} [options.stdout=true] Mock stdout
 * @param {boolean} [options.stderr=true] Mock stderr
 * @returns {object} Object containing two array corresponding to outputs.
 */

function flush(options = {}) {
  options = { ...defaultOpts, ...options };

  var flushed = {};

  if (options.stdout) {
    flushed.stdout = cachedData.stdout;
    cachedData.stdout = [];
  }

  if (options.stderr) {
    flushed.stderr = cachedData.stderr;
    cachedData.stderr = [];
  }

  return flushed;
}
