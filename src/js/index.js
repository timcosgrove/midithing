import SVG from 'svg.js';
import tinycolor from 'tinycolor2';

import '../css/style.css';
var gridSVG = require("../images/grid.svg");

// This just poops the SVG onto the page.
function component() {
  var element = document.createElement('div');
  element.innerHTML = gridSVG;
  return element;
}
document.body.appendChild(component());

// Utility function to map HSL values to hex since SVG.js can't deal with HSL.
var hsl_vals_to_hex = function(hue, saturation, lightness, alpha) {
  hue = hue || 0;
  saturation = saturation || 100;
  lightness = lightness || 50;
  alpha = alpha || 1;
  return '#' + tinycolor("hsl(" + hue + ", " + saturation + "%, " + lightness + "%)").toHex();
}

// Super basic class.
function Shape(shape_id, active_pattern) {
  this.shape_id = shape_id;
  this.shape_path = SVG.get(this.shape_id);
  this.active_pattern = active_pattern;
}

Shape.prototype.activate = function() {
  this.active_pattern.call(this);
}

Shape.prototype.activatePattern = function(pattern) {
  if (this.timeout) {
    window.clearTimeout(this.timeout);
  }
  this.active_pattern = pattern;
  this.activate();
}

var Patterns = window.Patterns = {};

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
  var alpha = Math.random();
  shape.shape_path.finish().fill(hsl_vals_to_hex(hue, saturation, lightness, alpha)).animate(transition_ms).fill('#000000');    
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
  var alpha = Math.random();
  shape.shape_path.finish().fill(hsl_vals_to_hex(hue, saturation, lightness, alpha)).animate(transition_ms).fill('#000000');    
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
  var alpha = Math.random();
  var hue2 = Math.floor((Math.random() * 40 - 20) + (Math.floor(Math.random() * 360)));
  var saturation2 = Math.floor(Math.random() * 90) + 10;
  var lightness2 = Math.floor(Math.random() * 90) + 10;
  var alpha2 = Math.random();
  shape.shape_path.finish().animate(transition_ms).fill(hsl_vals_to_hex(hue, saturation, lightness, alpha)).animate(transition_ms2).fill(hsl_vals_to_hex(hue2, saturation2, lightness2, alpha2)).loop(null, true);    
};

var Shapes = window.Shapes = {};

var paths = document.getElementsByTagName('path');
for (var i = 0; i < paths.length; i++) {
  var shape_id = paths[i].id;
  var shape = Shapes[shape_id] = new Shape(shape_id, Patterns.basic);
  shape.activate();
}

