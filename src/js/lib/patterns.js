'use strict'

import Utils from 'js/lib/utils.js';

var kitty = require("images/kitty.jpg");
var pinktile = require("images/pinktile.jpg");
var pinktile_invert = require("images/pinktile_invert.jpg");

var Patterns = {};

Patterns.basic = function() {
  var shape = this;
  // Time to fade from color to black.
  var transition_ms = Math.floor(Math.random() * 2000) + 2000;
  // time before repeating the next cycle.
  var cycle_ms = transition_ms + Math.floor(Math.random() * 1000);

  // randomish HSLa values.
  var hue = Math.floor((Math.random() * 40 - 20) + (180));
  var saturation = Math.floor(Math.random() * 90) + 10;
  var lightness = Math.floor(Math.random() * 90) + 10;
  shape.shape_path.finish().fill(Utils.hsl_vals_to_hex(hue, saturation, lightness)).animate(transition_ms).fill('#000000');
  shape.timeout = setTimeout(function() {
    shape.active_pattern.call(shape);
  }, cycle_ms);
};

Patterns.basicRed = function() {
  var shape = this;
  // Time to fade from color to black.
  var transition_ms = Math.floor(Math.random() * 2000) + 2000;
  // time before repeating the next cycle.
  var cycle_ms = transition_ms + Math.floor(Math.random() * 1000);

  // randomish HSLa values.
  var hue = Math.floor((Math.random() * 40 - 20) + (0));
  var saturation = Math.floor(Math.random() * 90) + 10;
  var lightness = Math.floor(Math.random() * 90) + 10;
  shape.shape_path.finish().fill(Utils.hsl_vals_to_hex(hue, saturation, lightness)).animate(transition_ms).fill('#000000');
  shape.timeout = setTimeout(function() {
    shape.active_pattern.call(shape);
  }, cycle_ms);
};

Patterns.throb = function() {
  var shape = this;
    // Time to fade from color to black.
  var transition_ms = Math.floor(Math.random() * 5000) + 1000;
  // time before repeating the next cycle.
  var transition_ms2 = Math.floor(Math.random() * 5000) + 1000;
    // randomish HSLa values.
  var hue = Math.floor((Math.random() * 40 - 20) + (Math.floor(Math.random() * 360)));
  var saturation = Math.floor(Math.random() * 90) + 10;
  var lightness = Math.floor(Math.random() * 90) + 10;
  var hue2 = Math.floor((Math.random() * 40 - 20) + (Math.floor(Math.random() * 360)));
  var saturation2 = Math.floor(Math.random() * 90) + 10;
  var lightness2 = Math.floor(Math.random() * 90) + 10;
  shape.shape_path.finish().animate(transition_ms).fill(Utils.hsl_vals_to_hex(hue, saturation, lightness)).animate(transition_ms2).fill(Utils.hsl_vals_to_hex(hue2, saturation2, lightness2)).loop(null, true);
};

Patterns.red_fade = (function() {
  // Time to fade from color to black.
  var transition_ms = 1000;
  // randomish HSLa values.
  var hue = 10, saturation = 100, lightness = 50;
  var pattern = [
    {
      methods: [
        ['scale', [0.8, 0.8]],
        ['opacity', [1]],
        ['fill', ["'" + Utils.hsl_vals_to_hex(hue, saturation - 90, lightness) + "'"]]
      ]
    },
    {
      animate: {
        duration: transition_ms,
        ease: '<'
      },
      methods: [
        ['scale', [1.0, 1.0]],
        ['opacity', [0]],
        ['fill', ["'" + Utils.hsl_vals_to_hex(hue, saturation, lightness) + "'"]]

      ]
    }
  ];
  return pattern;
})();

Patterns.blue_fade = function() {
  var shape = this;
    // Time to fade from color to black.
  var transition_ms = 4000;
    // randomish HSLa values.
  var hue = 197, saturation = 100, lightness = 50;
  shape.shape_path.finish().opacity(1).fill(Utils.hsl_vals_to_hex(hue, saturation, lightness)).animate(transition_ms, '>').opacity(0);
};

Patterns.kitty_fade = function() {
  var shape = this;
    // Time to fade from color to black.
  var transition_ms = 500;
  shape.shape_path.finish().opacity(1).fill(kitty).animate(transition_ms, '>').opacity(0);
};

Patterns.pinktile_fade = function() {
  var shape = this;
    // Time to fade from color to black.
  var transition_ms = 1000;
  shape.shape_path.finish().opacity(1).fill(pinktile).animate(transition_ms, '>').opacity(0);
};

Patterns.pinktile_invert_fade = function() {
  var shape = this;
    // Time to fade from color to black.
  var transition_ms = 1000;
  shape.shape_path.finish().opacity(1).fill(pinktile_invert).animate(transition_ms, '>').opacity(0);
};

export default Patterns;
