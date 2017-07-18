import Utils from 'js/lib/utils';
import Shapes from 'js/lib/shapes';

const Seq = {};

Seq.colLine = function colLine(pattern, col = Utils.getRandomInt(1, 13),
  direction = ['up', 'down'][Utils.getRandomInt(0, 1)]) {
  const start = 1;
  const end = 8;
  const lineSpeed = Utils.getRandomInt(25, 100);
  const lightSquare = function lightSquare(row) {
    const shape = `shape${col}_${row}`;
    Shapes[shape].activatePattern(Shapes[shape].setPattern(pattern));
    if (direction === 'down') {
      if (row < end) {
        window.setTimeout(lightSquare, lineSpeed, row + 1);
      }
    } else if (row > start) {
      window.setTimeout(lightSquare, lineSpeed, row - 1);
    }
  };
  if (direction === 'down') {
    lightSquare(start);
  } else {
    lightSquare(end);
  }
};

Seq.rowLine = function rowLine(pattern, row = Utils.getRandomInt(1, 8),
  direction = ['left', 'right'][Utils.getRandomInt(0, 1)]) {
  const start = 1;
  const end = 13;
  const lineSpeed = Utils.getRandomInt(25, 100);
  const lightSquare = function lightSquare(col) {
    const shape = `shape${col}_${row}`;
    Shapes[shape].activatePattern(Shapes[shape].setPattern(pattern));
    if (direction === 'left') {
      if (col < end) {
        window.setTimeout(lightSquare, lineSpeed, col + 1);
      }
    } else if (col > start) {
      window.setTimeout(lightSquare, lineSpeed, col - 1);
    }
  };
  if (direction === 'left') {
    lightSquare(start);
  } else {
    lightSquare(end);
  }
};

Seq.all = function all(pattern) {
  const rows = 8;
  const cols = 13;
  let col;
  let row;
  let shape;
  for (row = 1; row <= rows; row += 1) {
    for (col = 1; col <= cols; col += 1) {
      shape = `shape${col}_${row}`;
      Shapes[shape].activatePattern(Shapes[shape].setPattern(pattern));
    }
  }
};

Seq.wave = function wave(
  pattern,
  propagationSpeed = Utils.getRandomInt(25, 125),
  backward = false,
  waveChoice = ['xWave', 'yWave', 'sideWaveLong', 'sideWaveShort'][Utils.getRandomInt(0, 3)],
) {
  let shape;
  // define the arrangement of shapes
  const xWave = [
    ['shape1_7', 'shape1_8'],
    ['shape2_6', 'shape2_7', 'shape2_8'],
    ['shape3_5', 'shape3_6', 'shape3_7', 'shape3_8'],
    ['shape4_4', 'shape4_5', 'shape4_6', 'shape4_7', 'shape4_8'],
    ['shape5_4', 'shape5_5', 'shape5_6', 'shape5_7', 'shape5_8'],
    ['shape6_3', 'shape6_4', 'shape6_5', 'shape6_6', 'shape6_7', 'shape6_8'],
    ['shape7_2', 'shape7_3', 'shape7_4', 'shape7_5', 'shape7_6', 'shape7_7', 'shape7_8'],
    ['shape8_1', 'shape8_2', 'shape8_3', 'shape8_4', 'shape8_5', 'shape8_6', 'shape8_7', 'shape8_8'],
    ['shape9_1', 'shape9_2', 'shape9_3', 'shape9_4', 'shape9_5', 'shape9_6', 'shape9_7'],
    ['shape10_1', 'shape10_2', 'shape10_3', 'shape10_4', 'shape10_5', 'shape10_6'],
    ['shape11_1', 'shape11_2', 'shape11_3', 'shape11_4', 'shape11_5'],
    ['shape12_1', 'shape12_2', 'shape12_3', 'shape12_4'],
    ['shape13_1', 'shape13_2', 'shape13_3'],
  ];
  const yWave = [
    ['shape8_1', 'shape9_1', 'shape10_1', 'shape11_1', 'shape12_1', 'shape13_1'],
    ['shape7_2', 'shape8_2', 'shape9_2', 'shape10_2', 'shape11_2', 'shape12_2', 'shape13_2'],
    ['shape6_3', 'shape7_3', 'shape8_3', 'shape9_3', 'shape10_3', 'shape11_3', 'shape12_3', 'shape13_3'],
    ['shape4_4', 'shape5_4', 'shape6_4', 'shape7_4', 'shape8_4', 'shape9_4', 'shape10_4', 'shape11_4', 'shape12_4'],
    ['shape3_5', 'shape4_5', 'shape5_5', 'shape6_5', 'shape7_5', 'shape8_5', 'shape9_5', 'shape10_5', 'shape11_5'],
    ['shape2_6', 'shape3_6', 'shape4_6', 'shape5_6', 'shape6_6', 'shape7_6', 'shape8_6', 'shape9_6', 'shape10_6'],
    ['shape1_7', 'shape2_7', 'shape3_7', 'shape4_7', 'shape5_7', 'shape6_7', 'shape7_7', 'shape8_7', 'shape9_7'],
    ['shape1_8', 'shape2_8', 'shape3_8', 'shape4_8', 'shape5_8', 'shape6_8', 'shape7_8', 'shape8_8'],
  ];
  const sideWaveLong = [
    ['shape8_8', 'shape9_7', 'shape10_6', 'shape11_5', 'shape12_4', 'shape13_3'],
    ['shape7_8', 'shape8_7', 'shape9_6', 'shape10_5', 'shape11_4', 'shape12_3', 'shape13_2'],
    ['shape6_8', 'shape7_7', 'shape8_6', 'shape9_5', 'shape10_4', 'shape11_3', 'shape12_2', 'shape13_1'],
    ['shape5_8', 'shape6_7', 'shape7_6', 'shape8_5', 'shape9_4', 'shape10_3', 'shape11_2', 'shape12_1'],
    ['shape4_8', 'shape5_7', 'shape6_6', 'shape7_5', 'shape8_4', 'shape9_3', 'shape10_2', 'shape11_1'],
    ['shape3_8', 'shape4_7', 'shape5_6', 'shape6_5', 'shape7_4', 'shape8_3', 'shape9_2', 'shape10_1'],
    ['shape2_8', 'shape3_7', 'shape4_6', 'shape5_5', 'shape6_4', 'shape7_3', 'shape8_2', 'shape9_1'],
    ['shape1_8', 'shape2_7', 'shape3_6', 'shape4_5', 'shape5_4', 'shape6_3', 'shape7_2', 'shape8_1'],
    ['shape1_7', 'shape2_6', 'shape3_5', 'shape4_4'],
  ];
  const sideWaveShort = [
    ['shape1_8'],
    ['shape1_7', 'shape2_8'],
    ['shape2_7', 'shape3_8'],
    ['shape2_6', 'shape3_7', 'shape4_8'],
    ['shape3_6', 'shape4_7', 'shape5_8'],
    ['shape3_5', 'shape4_6', 'shape5_7', 'shape6_8'],
    ['shape4_5', 'shape5_6', 'shape6_7', 'shape7_8'],
    ['shape4_4', 'shape5_5', 'shape6_6', 'shape7_7', 'shape8_8'],
    ['shape5_4', 'shape6_5', 'shape7_6', 'shape8_7'],
    ['shape6_4', 'shape7_5', 'shape8_6', 'shape9_7'],
    ['shape6_3', 'shape7_4', 'shape8_5', 'shape9_6'],
    ['shape7_3', 'shape8_4', 'shape9_5', 'shape10_6'],
    ['shape7_2', 'shape8_3', 'shape9_4', 'shape10_5'],
    ['shape8_2', 'shape9_3', 'shape10_4', 'shape11_5'],
    ['shape8_1', 'shape9_2', 'shape10_3', 'shape11_4'],
    ['shape9_1', 'shape10_2', 'shape11_3', 'shape12_4'],
    ['shape10_1', 'shape11_2', 'shape12_3'],
    ['shape11_1', 'shape12_2', 'shape13_3'],
    ['shape12_1', 'shape13_2'],
    ['shape13_1'],
  ];
  const troughLong = [
    ['shape5_3', 'shape6_2', 'shape7_1'],
    ['shape1_6', 'shape2_5', 'shape3_4', 'shape4_3', 'shape5_2', 'shape6_1', 'shape9_8', 'shape10_7', 'shape11_6', 'shape12_5', 'shape13_4'],
    ['shape1_5', 'shape2_4', 'shape3_3', 'shape4_2', 'shape5_1', 'shape10_8', 'shape11_7', 'shape12_6', 'shape13_5'],
    ['shape1_4', 'shape2_3', 'shape3_2', 'shape4_1', 'shape11_8', 'shape12_7', 'shape13_6'],
    ['shape1_3', 'shape2_2', 'shape3_1', 'shape12_8', 'shape13_7'],
    ['shape1_2', 'shape2_1', 'shape13_8'],
    ['shape1_1'],
  ];
  let whichWave;
  switch (waveChoice) {
    case 'xWave':
      whichWave = xWave;
      break;
    case 'yWave':
      whichWave = yWave;
      break;
    case 'sideWaveShort':
      whichWave = sideWaveShort;
      break;
    case 'troughLong':
      whichWave = troughLong;
      break;
    default:
      whichWave = sideWaveLong;
      break;
  }
  const lightSegment = function lightSegment(segment) {
    for (let i = 0; i < whichWave[segment].length; i += 1) {
      shape = whichWave[segment][i];
      Shapes[shape].activatePattern(Shapes[shape].setPattern(pattern));
    }
    if (backward) {
      if ((segment) > 0) {
        window.setTimeout(lightSegment, propagationSpeed, segment - 1);
      }
    } else if ((segment + 1) < whichWave.length) {
      window.setTimeout(lightSegment, propagationSpeed, segment + 1);
    }
  };
  lightSegment(backward ? whichWave.length - 1 : 0);
};


Seq.loop = function loop(seq) {
  seq.call();
  const interval = Math.floor(Math.random() * 5000);
  window.setTimeout(Seq.loop, interval, seq);
};

export default Seq;
