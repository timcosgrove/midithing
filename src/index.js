import _ from 'lodash';
import './style.css';
import $ from 'jquery';
var gridSVG = require("./grid.svg");


function component() {
  var element = document.createElement('div');
  element.innerHTML = gridSVG;


  return element;
}

document.body.appendChild(component());

var hsl_string = function(hue, saturation, lightness, alpha) {
  hue = hue || 0;
  saturation = saturation || 100;
  lightness = lightness || 50;
  alpha = alpha || 1
  return "hsl(" + hue + ", " + saturation + "%, " + lightness + "%)";
}

var Shapes = {};

function Shape(shape_id) {
  this.shape_id = shape_id;
}


  Shape.prototype.colorShift = function(transition_ms) {
    var hue = Math.floor(Math.random() * 40 + (360));
    var saturation = Math.floor(Math.random() * 90) + 10;
    var lightness = Math.floor(Math.random() * 90) + 10;
    var alpha = Math.random();
    var target = $('#' + this.shape_id);
    target.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
      target.css('transition', 'fill ' + transition_ms + 'ms');
      target.css('fill', 'black');

    });
    target.css('transition', 'fill 1ms');
    //target.css('opacity', alpha);
    target.css('fill', hsl_string(hue, saturation, lightness, alpha));
  };
  Shape.prototype.colorCycle = function() {
    var shape = this;
    var transition_ms = Math.floor(Math.random() * 4000) + 4000;
    var cycle_ms = transition_ms - (3500);
    var timeout = setTimeout(function() {
      shape.colorShift(transition_ms);
      shape.colorCycle();
    }, cycle_ms);
  };
  $(function() {
    $('path').each(function() {
      var shape_id = $(this).attr('id');
      var initial_ms = Math.floor(Math.random() * 4000) + 4000;
      Shapes[shape_id] = new Shape(shape_id);

      Shapes[shape_id].colorShift(initial_ms);
      Shapes[shape_id].colorCycle();
    })

  });



