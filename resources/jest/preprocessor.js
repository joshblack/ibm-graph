'use strict';

var babel = require('babel-core');

module.exports = {
  process: function (src, path) {
    return babel.transform(src, {
      filename: path,
      presets: ['es2015', 'stage-1'],
      plugins: ['transform-flow-strip-types', 'syntax-flow']
    }).code;
  }
};
