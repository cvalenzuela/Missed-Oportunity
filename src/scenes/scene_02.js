//=====================
// Scene 02: D3 squares animation
//====================

import * as d3 from 'd3';
import { introduction } from './../texts';
import { colors } from '../colors';
import { cleanScene03 } from './scene_03';
import { hideNext, showNext } from './../buttons';

let width = 400;
let height = 500;
let squares = [];
let sSize = 11;
let unit = sSize - 5;
let dimension = 36;
let totalSquares = dimension * dimension;
let subScenes = [];
let cueAnimations = [];
let cueTimes = [200, 4000, 11000, 17000, 25000, 28000];
let text = d3.select('#textScene');
let svg = d3.select('#animations').append('svg');
text.style('-webkit-animation-duration:', '4s');
svg.style('position', 'relative');
svg.style('left', '0em');
svg.style('top', '10em');
svg.style('width', width);
svg.style('height', height);
svg.attr('class', 'animated');
svg.style('-webkit-animation-duration:', '3s');

let Scene02 = () => {
  cleanScene03();
  cssRemoveAnimate()
  hideNext();
  text.style('top', '100px')

  for (let j = 4; j < dimension * sSize; j += sSize) {
    for (let i = 4; i < dimension * sSize; i += sSize) {
      let rect = svg.append('rect')
      .attr('width', 0)
      .attr('height', 0)
      .attr('opacity', 0.80)
      .attr('x', i)
      .attr('y', j)
      .style('fill', colors.a[0]);
      squares.push(rect);
    }
  }

  // Animation cue for subscenes
  subScenes.forEach((s, i) => {
    cueAnimations[i] = setTimeout(s, cueTimes[i]);
  });

};

// A single square
subScenes[0] = () => {
  cssRemoveAnimate();
  cssAddAnimate();

  text.html(introduction[0]);
  var middle = Math.round(dimension / 2);
  var third = Math.round(dimension / 3);
  var i = third * dimension + middle;
  squares[i].transition()
  .duration(1000)
  .attr('width', unit)
  .attr('height', unit);
};

// Total Squares
subScenes[1] = () => {
  cssRemoveAnimate();
  cssAddAnimate();

  text.html(introduction[1]);
  for (var i = 0; i < totalSquares; i++) {
    squares[i].transition()
    .duration(400)
    .delay(function () {
      return i * 2;
    })
    .attr('width', unit)
    .attr('height', unit);
  }
};

// Male and female
subScenes[2] = () => {
  text.html('<div style="color: ' + colors.b[3] + ' ">' + introduction[2] + '</div>\n<div style="color:' + colors.a[0] + '">' + introduction[3] + '</div>');
  let female = 713;
  let male = 583;
  let total = female + male;

  for (let i = 0; i < female; i++) {
    squares[i].transition()
    .duration(600)
    .delay(function () {
      return i * 2;
    })
    .style('fill', colors.b[3]);
  }

  for (female; female < total; female++) {
    squares[female].transition()
    .duration(600)
    .delay(function () {
      return female * 2;
    })
    .style('fill', colors.a[0]);
  }
};

// Explotation
subScenes[3] = () => {
  text.html('<div style="color: ' + colors.b[2] + ' ">' + introduction[4] + '</div>\n<div style="color:' + colors.a[0] + '">' + introduction[5] + '</div>');
  let total = 1166;
  let all = 1296;
  let rest = all - total;

  cssRemoveAnimate();

  for (let i = 0; i < total; i++) {
    squares[i].transition()
    .duration(600)
    .delay(function () {
      return i * 2;
    })
    .style('fill', colors.b[2]);
  }

  for (let j = total; j < all; j++) {
    squares[j].transition()
    .duration(600)
    .delay(function () {
      return j * 2;
    })
    .style('fill', colors.a[0]);
  }
};

// Profits
subScenes[4] = () => {
  text.html(' ');
  text.style('top', '300px')
  for (let i = 0; i < totalSquares; i++) {
    squares[i].transition()
    .duration(600)
    .delay(function () {
      return i;
    })
    .attr('width', 0)
    .attr('height', 0);
  }
};

subScenes[5] = () => {
  cssAddAnimate();
  showNext();
  text.html(introduction[6]);
};

let cleanScene02 = () =>  {
  squares = [];
  text.html(' ');
  svg.selectAll('*').remove();

  // Clear animation cues for subscenes
  cueAnimations.forEach((a) => {
    clearTimeout(a);
  });

  showNext();
};

let cssAddAnimate = () => {
  text.classed('fadeInDown', true);
  svg.classed('fadeInDown', true);
}

let cssRemoveAnimate = () => {
  text.classed('fadeInDown', false);
  svg.classed('fadeInDown', false);
}

export { Scene02, cleanScene02 };
