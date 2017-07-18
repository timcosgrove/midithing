import Shapes from 'js/lib/shapes';
import Patterns from 'js/lib/patterns';
import Utils from 'js/lib/utils';
import Seq from 'js/lib/seq';

import 'css/style.css';

const gridSVG = require('images/grid.svg');


// This just poops the SVG onto the page.
function component() {
  const element = document.createElement('div');
  element.innerHTML = gridSVG;
  return element;
}
document.body.appendChild(component());

Shapes.initialize();
// Seq.loop(function() {Seq.wave(Patterns.blueFade, null, Utils.getRandomInt(0,1))});
Seq.loop(() => { Seq.wave(Patterns.redFade, null, Utils.getRandomInt(0, 1)); });
Seq.loop(() => { Seq.wave(Patterns.blueGreyFade, null, Utils.getRandomInt(0, 1), 'troughLong'); });
// Seq.loop(function() {Seq.all(Patterns.blueFade)});
// Seq.loop(function() {Seq.rowLine(Patterns.pinktileFade)});

