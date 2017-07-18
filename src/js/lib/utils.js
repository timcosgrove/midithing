import tinycolor from 'tinycolor2';

const Utils = {};

// Utility function to map HSL values to hex since SVG.js can't deal with HSL.
Utils.hslValsToHex = function hslValsToHex(hue = 0, saturation = 100, lightness = 50) {
  return `#${tinycolor(`hsl(${hue}, ${saturation}%, ${lightness}%)`).toHex()}`;
};

// Grabs a random int from a range.
Utils.getRandomInt = function getRandomInt(min, max) {
  return Math.floor(Math.random() * ((max - min) + 1)) + min;
};

export default Utils;
