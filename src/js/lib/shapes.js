import Shape from 'js/lib/shape';

const Shapes = {};
window.Shapes = {};

Shapes.initialize = function initialize() {
  const paths = document.getElementsByTagName('path');
  for (let i = 0; i < paths.length; i += 1) {
    const shapeId = paths[i].id;
    Shapes[shapeId] = new Shape(shapeId, (() => {}));
    const shape = Shapes[shapeId];
    shape.shapePath.opacity(0);
  }
};

export default Shapes;
