//=====================
// Control and hide the buttons
//====================

import * as d3 from 'd3';

let next = d3.select('#next');
let previous = d3.select('#previous');

let hideNext = () => {
  next.style('color', 'rgba(255, 255, 255, 0.08)')
}

let showNext = () => {
  next.style('color', 'rgba(255, 255, 255, 1)')
}

export { hideNext, showNext };
