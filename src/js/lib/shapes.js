'use strict'

import Shape from 'js/lib/shape.js';

var Shapes = window.Shapes = {};

Shapes.initialize = function() {
	var paths = document.getElementsByTagName('path');
  for (var i = 0; i < paths.length; i++) {
    var shape_id = paths[i].id;
    var shape = Shapes[shape_id] = new Shape(shape_id, function(){});
    shape.shape_path.opacity(0);
  }
};

export default Shapes;