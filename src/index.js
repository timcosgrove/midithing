import SVG from 'svg.js';
import tinycolor from 'tinycolor2';

import './style.css';
var gridSVG = require("./grid.svg");


function component() {
  var element = document.createElement('div');
  element.innerHTML = gridSVG;
  return element;
}

document.body.appendChild(component());

var hsl_to_hex = function(hue, saturation, lightness, alpha) {
  hue = hue || 0;
  saturation = saturation || 100;
  lightness = lightness || 50;
  alpha = alpha || 1;
  return '#' + tinycolor("hsl(" + hue + ", " + saturation + "%, " + lightness + "%)").toHex();
}

var Shapes = {};

function Shape(shape_id) {
  this.shape_id = shape_id;
  this.shape_path = SVG.get(this.shape_id);
}


  Shape.prototype.colorShift = function(transition_ms) {
    var hue = Math.floor((Math.random() * 40 - 20) + (90));
    var saturation = Math.floor(Math.random() * 90) + 10;
    var lightness = Math.floor(Math.random() * 90) + 10;
    var alpha = Math.random();
    this.shape_path.fill(hsl_to_hex(hue, saturation, lightness, alpha)).animate(transition_ms).fill('#000000');

  };
  Shape.prototype.colorCycle = function() {
    var shape = this;
    var transition_ms = Math.floor(Math.random() * 2000) + 2000;
    var cycle_ms = transition_ms + Math.floor(Math.random() * 1000);
    var timeout = setTimeout(function() {
      shape.colorShift(transition_ms);
      shape.colorCycle();
    }, cycle_ms);
  };

  var paths = document.getElementsByTagName('path');
  for (var i = 0; i < paths.length; i++) {
    var initial_ms = Math.floor(Math.random() * 3000) + 3000;
    var shape_id = paths[i].id;
    Shapes[shape_id] = new Shape(shape_id);
    Shapes[shape_id].colorShift(initial_ms);
    Shapes[shape_id].colorCycle();   
  }




