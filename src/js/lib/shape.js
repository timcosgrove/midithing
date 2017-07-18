import SVG from 'svg.js';

// Super basic class.
function Shape(shapeId, activePattern) {
  this.shapeId = shapeId;
  this.shapePath = SVG.get(this.shapeId);
  this.activePattern = activePattern;
}

Shape.prototype.activate = function activate() {
  if (typeof this.activePattern === 'function') {
    this.activePattern.call(this);
  }
};

Shape.prototype.activatePattern = function activatePattertn(pattern) {
  if (this.timeout) {
    window.clearTimeout(this.timeout);
  }
  this.activePattern = pattern;
  this.activate();
};

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
Shape.prototype.setPattern = function setPattern(options) {
  return function thisPattern() {
    let current;
    let i;
    let j;
    let k;
    const shapePath = this.shapePath.clone();
    let currentFX;
    let method;
    let args;
    // Normalize shape
    shapePath.finish()
      .opacity(0)
      .fill('#000000')
      .scale(1.0, 1.0)
      .stroke({ color: '#000000', width: 2 });
    for (i = 0; i < options.length; i += 1) {
      current = options[i];
      if (current.animate) {
        currentFX = shapePath.animate(current.animate);
      } else {
        currentFX = shapePath;
      }
      for (j = 0; j < current.methods.length; j += 1) {
        method = current.methods[j];
        args = [];
        for (k = 0; k < method[1].length; k += 1) {
          if (typeof method[1][k] === 'string') {
            args.push(`"${method[1][k].replace(/"/g, '"')}"`);
          } else {
            args.push(method[1][k]);
          }
        }
        /* eslint-disable no-eval */
        eval(`currentFX.${method[0]}(${args.join(',')});`);
        /* eslint-enable no-eval */
      }
    }
    currentFX.afterAll(function removeClone() {
      this.remove();
    });
  };
};

export default Shape;

