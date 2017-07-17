'use strict'

import SVG from 'svg.js';

export default Shape;

// Super basic class.
function Shape(shape_id, active_pattern) {
  this.shape_id = shape_id;
  this.shape_path = SVG.get(this.shape_id);
  this.active_pattern = active_pattern;
}

Shape.prototype.activate = function() {
  if (typeof this.active_pattern == 'function') {
    this.active_pattern.call(this);
  }
}

Shape.prototype.activatePattern = function(pattern) {
  if (this.timeout) {
    window.clearTimeout(this.timeout);
  }
  this.active_pattern = pattern;
  this.activate();
}

// options is an array of objects of the form
// [
//   {
//    // animate object is optional
//     animate: {
//       duration: 1000ms,
//       ease: '<>',
//       delay: ''
//     },
//     methods: [
//        [methodName, [arg1, arg2]],
//          [fill, [fillColor]]
//     ]
//   },
//   {
//     animate: {
//       ... etc.
//     }
//   }
// ]
//
Shape.prototype.setPattern = function(options) {
  return function() {
    var current, i, j, k;
    var shape_path = this.shape_path.clone();
    var currentFX;
    var method;
    var args;
    // Normalize shape
    shape_path.finish().opacity(0).fill('#000000').scale(1.0, 1.0);
    for (i = 0; i < options.length; i++) {
      current = options[i];
      if (current.animate) {
        currentFX = shape_path.animate(current.animate);
      }
      else {
        currentFX = shape_path;
      }
      for (j = 0; j < current.methods.length; j++) {
        method = current.methods[j];
        args = [];
        for (k = 0; k < method[1].length; k++) {
          if (typeof method[1][k] == 'string') {
            args.push('"' + method[1][k].replace(/"/g, '\"') + '"');
          }
          else {
            args.push(method[1][k]);
          }
        }
        eval("currentFX." + method[0] + "(" + (args.join(',')) + ");");
      }
    }
    currentFX.afterAll(function() {
      this.remove();
    })
  }
}