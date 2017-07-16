'use strict'

import tinycolor from 'tinycolor2';

var Utils = {};

// Utility function to map HSL values to hex since SVG.js can't deal with HSL.
Utils.hsl_vals_to_hex = function(hue, saturation, lightness) {
  hue = hue || 0;
  saturation = saturation || 100;
  lightness = lightness || 50;
  return '#' + tinycolor("hsl(" + hue + ", " + saturation + "%, " + lightness + "%)").toHex();
}

// Grabs a random int from a range.
Utils.getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default Utils;
