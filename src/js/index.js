import SVG from 'svg.js';
import tinycolor from 'tinycolor2';

import '../css/style.css';
var gridSVG = require("../images/grid.svg");
var kitty = require("../images/kitty.jpg");
var pinktile = require("../images/pinktile.jpg");
var pinktile_invert = require("../images/pinktile_invert.jpg");

// This just poops the SVG onto the page.
function component() {
  var element = document.createElement('div');
  element.innerHTML = gridSVG;
  return element;
}
document.body.appendChild(component());

// Utility function to map HSL values to hex since SVG.js can't deal with HSL.
var hsl_vals_to_hex = function(hue, saturation, lightness) {
  hue = hue || 0;
  saturation = saturation || 100;
  lightness = lightness || 50;
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
  shape.shape_path.finish().fill(hsl_vals_to_hex(hue, saturation, lightness)).animate(transition_ms).fill('#000000');
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
  shape.shape_path.finish().fill(hsl_vals_to_hex(hue, saturation, lightness)).animate(transition_ms).fill('#000000');
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
  shape.shape_path.finish().animate(transition_ms).fill(hsl_vals_to_hex(hue, saturation, lightness)).animate(transition_ms2).fill(hsl_vals_to_hex(hue2, saturation2, lightness2)).loop(null, true);
};

Patterns.red_fade = function() {
  var shape = this;
    // Time to fade from color to black.
  var transition_ms = 1000;
    // randomish HSLa values.
  var hue = 10, saturation = 100, lightness = 50;
  shape.shape_path.finish().opacity(1).fill(hsl_vals_to_hex(hue, saturation, lightness)).animate(transition_ms, '>').opacity(0);
};

Patterns.blue_fade = function() {
  var shape = this;
    // Time to fade from color to black.
  var transition_ms = 4000;
    // randomish HSLa values.
  var hue = 197, saturation = 100, lightness = 50;
  shape.shape_path.finish().opacity(1).fill(hsl_vals_to_hex(hue, saturation, lightness)).animate(transition_ms, '>').opacity(0);
};

Patterns.kitty_fade = function() {
  var shape = this;
    // Time to fade from color to black.
  var transition_ms = 1000;
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

var Groups = window.Groups = {};


var Shapes = window.Shapes = {};

var paths = document.getElementsByTagName('path');
for (var i = 0; i < paths.length; i++) {
  var shape_id = paths[i].id;
  var shape = Shapes[shape_id] = new Shape(shape_id, function(){});
  shape.activate();
  shape.shape_path.opacity(0);
}

var Seq = window.Seq = {};

var getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

Seq.colLine = function(col, pattern, direction) {
  col = col || getRandomInt(1, 13);
  var directions = ['up', 'down'];
  direction = direction || directions[getRandomInt(0,1)];
  var start = 1;
  var end = 8;
  var lineSpeed = getRandomInt(25, 100);
  var lightSquare = function(row) {
    var shape = 'shape' + col + '_' + row;
    Shapes[shape].activatePattern(pattern);
    if (direction == 'down')  {
      if (row < end) {
        var nextSquare = window.setTimeout(lightSquare, lineSpeed, row + 1);
      }
    }
    else {
      if (row > start) {
        var nextSquare = window.setTimeout(lightSquare, lineSpeed, row - 1);
      }
    }
  };
  if (direction == 'down') {
    lightSquare(start);
  }
  else {
    lightSquare(end);
  }
}

Seq.rowLine = function(row, pattern, direction) {
  row = row || getRandomInt(1, 8);
  var directions = ['left', 'right'];
  direction = direction || directions[getRandomInt(0,1)];
  var start = 1;
  var end = 13;
  var lineSpeed = getRandomInt(25, 100);
  var lightSquare = function(col) {
    var shape = 'shape' + col + '_' + row;
    console.log(shape);
    Shapes[shape].activatePattern(pattern);
    if (direction == 'left')  {
      if (col < end) {
        var nextSquare = window.setTimeout(lightSquare, lineSpeed, col + 1);
      }
    }
    else {
      if (col > start) {
        var nextSquare = window.setTimeout(lightSquare, lineSpeed, col - 1);
      }
    }
  };
  if (direction == 'left') {
    lightSquare(start);
  }
  else {
    lightSquare(end);
  }
}


Seq.loop = function(seq) {
  seq.call();
  var interval = Math.floor(Math.random() * 2000);
  var next = setTimeout(Seq.loop, interval, seq);
}
Seq.loop(function() {Seq.rowLine(null, Patterns.pinktile_invert_fade)});
Seq.loop(function() {Seq.colLine(null, Patterns.pinktile_fade)});

