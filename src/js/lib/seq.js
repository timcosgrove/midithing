'use strict'

import Utils from 'js/lib/utils.js';
import Shape from 'js/lib/shape.js';
import Shapes from 'js/lib/shapes.js';

var Seq = {};

Seq.colLine = function(col, pattern, direction) {
  col = col || Utils.getRandomInt(1, 13);
  var directions = ['up', 'down'];
  direction = direction || directions[Utils.getRandomInt(0,1)];
  var start = 1;
  var end = 8;
  var lineSpeed = Utils.getRandomInt(25, 100);
  var lightSquare = function(row) {
    var shape = 'shape' + col + '_' + row;
    Shapes[shape].activatePattern(Shapes[shape].setPattern(pattern));
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
  row = row || Utils.getRandomInt(1, 8);
  var directions = ['left', 'right'];
  direction = direction || directions[Utils.getRandomInt(0,1)];
  var start = 1;
  var end = 13;
  var lineSpeed = Utils.getRandomInt(25, 100);
  var lightSquare = function(col) {
    var shape = 'shape' + col + '_' + row;
    Shapes[shape].activatePattern(Shapes[shape].setPattern(pattern));
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
  var interval = Math.floor(Math.random() * 1500);
  var next = setTimeout(Seq.loop, interval, seq);
}

export default Seq;

