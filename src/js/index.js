import SVG from 'svg.js';
import tinycolor from 'tinycolor2';
import Shape from 'js/lib/shape.js';
import Shapes from 'js/lib/shapes.js';
import Patterns from 'js/lib/patterns.js';
import Utils from 'js/lib/utils.js';
import Seq from 'js/lib/seq.js'

import 'css/style.css';
var gridSVG = require("images/grid.svg");


// This just poops the SVG onto the page.
function component() {
  var element = document.createElement('div');
  element.innerHTML = gridSVG;
  return element;
}
document.body.appendChild(component());

Shapes.initialize();
//Seq.loop(function() {Seq.wave(Patterns.red_fade, null, Utils.getRandomInt(0,1))});
Seq.loop(function() {Seq.wave(Patterns.blue_fade, null, Utils.getRandomInt(0,1))});
//Seq.loop(function() {Seq.all(Patterns.blue_fade)});
//Seq.loop(function() {Seq.rowLine(Patterns.pinktile_fade)});
