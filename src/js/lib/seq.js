'use strict'

import Utils from 'js/lib/utils.js';
import Shape from 'js/lib/shape.js';
import Shapes from 'js/lib/shapes.js';

var Seq = {};

Seq.colLine = function(pattern, col, direction) {
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

Seq.rowLine = function(pattern, row, direction) {
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

Seq.all = function(pattern) {
  var rows = 8, cols = 13, col, row, shape;
  for (row = 1; row <= rows; row++) {
    for (col = 1; col <= cols; col++) {
      shape = 'shape' + col + '_' + row;
      Shapes[shape].activatePattern(Shapes[shape].setPattern(pattern));
    }
  }
}

Seq.wave = function(pattern, propagationSpeed, backward, wave) {
  propagationSpeed = propagationSpeed || Utils.getRandomInt(50,200);
  backward = backward || false;
  wave = wave || ['xWave', 'yWave', 'sideWave'][Utils.getRandomInt(0,2)];
  var shape;
  // define the arrangement of shapes
  var xWave = [
    ["shape1_7","shape1_8"],
    ["shape2_6","shape2_7","shape2_8"],
    ["shape3_5","shape3_6","shape3_7","shape3_8"],
    ["shape4_4","shape4_5","shape4_6","shape4_7","shape4_8"],
    ["shape5_4","shape5_5","shape5_6","shape5_7","shape5_8"],
    ["shape6_3","shape6_4","shape6_5","shape6_6","shape6_7","shape6_8"],
    ["shape7_2","shape7_3","shape7_4","shape7_5","shape7_6","shape7_7","shape7_8"],
    ["shape8_1","shape8_2","shape8_3","shape8_4","shape8_5","shape8_6","shape8_7", "shape8_8"],
    ["shape9_1","shape9_2","shape9_3","shape9_4","shape9_5","shape9_6","shape9_7"],
    ["shape10_1","shape10_2","shape10_3","shape10_4","shape10_5","shape10_6"],
    ["shape11_1","shape11_2","shape11_3","shape11_4","shape11_5"],
    ["shape12_1","shape12_2","shape12_3","shape12_4"],
    ["shape13_1","shape13_2","shape13_3"]
  ];
  var yWave = [
    ["shape8_1","shape9_1","shape10_1","shape11_1","shape12_1","shape13_1"],
    ["shape7_2","shape8_2","shape9_2","shape10_2","shape11_2","shape12_2","shape13_2"],
    ["shape6_3","shape7_3","shape8_3","shape9_3","shape10_3","shape11_3","shape12_3","shape13_3"],
    ["shape4_4","shape5_4","shape6_4","shape7_4","shape8_4","shape9_4","shape10_4","shape11_4","shape12_4"],
    ["shape3_5","shape4_5","shape5_5","shape6_5","shape7_5","shape8_5","shape9_5","shape10_5","shape11_5"],
    ["shape2_6","shape3_6","shape4_6","shape5_6","shape6_6","shape7_6","shape8_6","shape9_6","shape10_6"],
    ["shape1_7","shape2_7","shape3_7","shape4_7","shape5_7","shape6_7","shape7_7","shape8_7","shape9_7"],
    ["shape1_8","shape2_8","shape3_8","shape4_8","shape5_8","shape6_8","shape7_8","shape8_8"]
  ];
  var sideWave = [
    ["shape8_8","shape9_7","shape10_6","shape11_5","shape12_4","shape13_3"],
    ["shape7_8","shape8_7","shape9_6","shape10_5","shape11_4","shape12_3","shape13_2"],
    ["shape6_8","shape7_7","shape8_6","shape9_5","shape10_4","shape11_3","shape12_2","shape13_1"],
    ["shape5_8","shape6_7","shape7_6","shape8_5","shape9_4","shape10_3","shape11_2","shape12_1"],
    ["shape4_8","shape5_7","shape6_6","shape7_5","shape8_4","shape9_3","shape10_2","shape11_1"],
    ["shape3_8","shape4_7","shape5_6","shape6_5","shape7_4","shape8_3","shape9_2","shape10_1"],
    ["shape2_8","shape3_7","shape4_6","shape5_5","shape6_4","shape7_3","shape8_2","shape9_1"],
    ["shape1_8","shape2_7","shape3_6","shape4_5","shape5_4","shape6_3","shape7_2","shape8_1"],
    ["shape1_7","shape2_6","shape3_5","shape4_4"]
  ];
  var whichWave;
  switch (wave) {
    case 'xWave':
      whichWave = xWave;
      break;
    case 'yWave':
      whichWave = yWave;
      break;
    default:
      whichWave = sideWave;
      break
  }
  if (backward) {
    var lightSegment = function(segment) {
      for (var i = 0; i < whichWave[segment].length; i++) {
        shape = whichWave[segment][i];
        Shapes[shape].activatePattern(Shapes[shape].setPattern(pattern));
      }
      if ((segment) > 0) {
        var nextSegment = window.setTimeout(lightSegment, propagationSpeed, segment - 1);
      }
    }
    lightSegment(whichWave.length - 1);
  }
  else {
    var lightSegment = function(segment) {
      for (var i = 0; i < whichWave[segment].length; i++) {
        shape = whichWave[segment][i];
        Shapes[shape].activatePattern(Shapes[shape].setPattern(pattern));
      }
      if ((segment + 1) < whichWave.length) {
        var nextSegment = window.setTimeout(lightSegment, propagationSpeed, segment + 1);
      }
    }
    lightSegment(0);
  }
}


Seq.loop = function(seq) {
  seq.call();
  var interval = Math.floor(Math.random() * 1500);
  var next = setTimeout(Seq.loop, interval, seq);
}

export default Seq;

