import Utils from 'js/lib/utils';

const kitty = require('images/kitty.jpg');
const pinktile = require('images/pinktile.jpg');
const pinktileInvert = require('images/pinktile_invert.jpg');

const Patterns = {};

Patterns.basic = function basic() {
  const shape = this;
  // Time to fade from color to black.
  const transitionMS = Math.floor(Math.random() * 2000) + 2000;
  // time before repeating the next cycle.
  const cycleMS = transitionMS + Math.floor(Math.random() * 1000);

  // randomish HSLa values.
  const hue = Math.floor(((Math.random() * 40) - 20) + (180));
  const saturation = Math.floor(Math.random() * 90) + 10;
  const lightness = Math.floor(Math.random() * 90) + 10;
  shape.shape_path.finish().fill(Utils.hslValsToHex(hue, saturation, lightness)).animate(transitionMS).fill('#000000');
  shape.timeout = setTimeout(() => {
    shape.active_pattern.call(shape);
  }, cycleMS);
};

Patterns.basicRed = function basicRed() {
  const shape = this;
  // Time to fade from color to black.
  const transitionMS = Math.floor(Math.random() * 2000) + 2000;
  // time before repeating the next cycle.
  const cycleMS = transitionMS + Math.floor(Math.random() * 1000);

  // randomish HSLa values.
  const hue = Math.floor(((Math.random() * 40) - 20) + (0));
  const saturation = Math.floor(Math.random() * 90) + 10;
  const lightness = Math.floor(Math.random() * 90) + 10;
  shape.shape_path.finish().fill(Utils.hslValsToHex(hue, saturation, lightness)).animate(transitionMS).fill('#000000');
  shape.timeout = setTimeout(() => {
    shape.active_pattern.call(shape);
  }, cycleMS);
};

Patterns.throb = function throb() {
  const shape = this;
  // Time to fade from color to black.
  const transitionMS = Math.floor(Math.random() * 5000) + 1000;
  // time before repeating the next cycle.
  const transitionMS2 = Math.floor(Math.random() * 5000) + 1000;
  // randomish HSLa values.
  const hue = Math.floor(((Math.random() * 40) - 20) + (Math.floor(Math.random() * 360)));
  const saturation = Math.floor(Math.random() * 90) + 10;
  const lightness = Math.floor(Math.random() * 90) + 10;
  const hue2 = Math.floor(((Math.random() * 40) - 20) + (Math.floor(Math.random() * 360)));
  const saturation2 = Math.floor(Math.random() * 90) + 10;
  const lightness2 = Math.floor(Math.random() * 90) + 10;
  shape.shape_path.finish()
    .animate(transitionMS)
    .fill(Utils.hslValsToHex(hue, saturation, lightness))
    .animate(transitionMS2)
    .fill(Utils.hslValsToHex(hue2, saturation2, lightness2))
    .loop(null, true);
};

Patterns.redFade = (function redFade() {
  // Time to fade from color to black.
  const transitionMS = 1000;
  // randomish HSLa values.
  const hue = 10;
  const saturation = 100;
  const lightness = 50;
  const pattern = [
    {
      methods: [
        ['opacity', [1]],
        ['fill', [Utils.hslValsToHex(hue, saturation, lightness)]],
      ],
    },
    {
      animate: {
        duration: transitionMS,
        ease: '<',
      },
      methods: [
        ['opacity', [0]],
        ['scale', [0.7, 0.7]],
      ],
    },
  ];
  return pattern;
}());

Patterns.blueFade = (function blueFade() {
  // Time to fade from color to black.
  const transitionMS = 1000;
  // randomish HSLa values.
  const hue = 197;
  const saturation = 100;
  const lightness = 50;
  const pattern = [
    {
      methods: [
        ['opacity', [0]],
        ['fill', [Utils.hslValsToHex(hue, 10, lightness)]],
      ],
    },
    {
      animate: {
        duration: 300,
        ease: '>',
      },
      methods: [
        ['opacity', [1]],
        ['fill', [Utils.hslValsToHex(hue, saturation, lightness)]],
      ],
    },
    {
      animate: {
        duration: transitionMS,
        ease: '<',
      },
      methods: [
        ['opacity', [0]],
        ['scale', [0.5, 0.5]],
        ['fill', [Utils.hslValsToHex(hue, 10, lightness)]],
      ],
    },
  ];
  return pattern;
}());

Patterns.blueGreyFade = (function blueGreyFade() {
  // Time to fade from color to black.
  const transitionMS = 1000;
  // randomish HSLa values.
  const hue = 197;
  const saturation = 30;
  const lightness = 30;
  const pattern = [
    {
      methods: [
        ['opacity', [0]],
        ['fill', [Utils.hslValsToHex(hue, 10, lightness)]],
      ],
    },
    {
      animate: {
        duration: 300,
        ease: '>',
      },
      methods: [
        ['opacity', [1]],
        ['fill', [Utils.hslValsToHex(hue, saturation, lightness)]],
      ],
    },
    {
      animate: {
        duration: transitionMS,
        ease: '<',
      },
      methods: [
        ['opacity', [0]],
        ['scale', [0.5, 0.5]],
        ['fill', [Utils.hslValsToHex(hue, 10, lightness)]],
      ],
    },
  ];
  return pattern;
}());

Patterns.kittyFade = (function kittyFade() {
  // Time to fade from color to black.
  const transitionMS = 1000;
  const pattern = [
    {
      methods: [
        ['opacity', [1]],
        ['fill', [kitty]],
      ],
    },
    {
      animate: {
        duration: transitionMS,
        ease: '<',
      },
      methods: [
        ['opacity', [0]],
      ],
    },
  ];
  return pattern;
}());

Patterns.pinktileFade = (function pinktileFade() {
  // Time to fade from color to black.
  const transitionMS = 1000;
  const pattern = [
    {
      methods: [
        ['opacity', [0.5]],
        ['fill', [pinktile]],
      ],
    },
    {
      animate: {
        duration: transitionMS,
        ease: '<',
      },
      methods: [
        ['opacity', [0]],
      ],
    },
  ];
  return pattern;
}());

Patterns.pinktileInvertFade = (function pinktileInvertFade() {
  // Time to fade from color to black.
  const transitionMS = 1000;
  const pattern = [
    {
      methods: [
        ['opacity', [1]],
        ['fill', [pinktileInvert]],
      ],
    },
    {
      animate: {
        duration: transitionMS,
        ease: '<',
      },
      methods: [
        ['opacity', [0]],
      ],
    },
  ];
  return pattern;
}());

export default Patterns;
