//=====================
// Scene 06: SAM Diagram
//====================

import { cleanScene03 } from './scene_03';
import { cleanScene05 } from './scene_05';
import { colors } from './../colors';
import { map } from './../map';
import * as d3 from 'd3';
import { sam } from './../texts';

let svg;
let levelY = 1;
let levelX = 1;
let text = d3.select('#textScene')
let texts = document.getElementById('textScene').childNodes;
let div;
let divs;

let Scene06 = () => {
  cleanScene03();
  cleanScene05();

  d3.select('#textScene').style('top', '50px')
  text.html(sam[0] + '</br><div id="quote">' + sam[1] + '</div>');

  let size = d3.scaleLinear()
  .domain([18, 12825])
  .range([2,45]);

  let color = d3.scaleQuantile()
  .domain([18, 12825])
  .range(colors.a);

  d3.json('../../assets/data/sam.json', function(error, sam) {

    div = d3.select('#animations').append('div').attr('id', 'sam')
    divs = div.selectAll('div')
    .data(sam)
    .enter()
    .append('div')
    .attr('class', 'samTip')
    .html(function(d){
      return ('<div class="textTip"><i>' + d.name + '</i><br>' + '<b>Amount: </b>' + d.size + '</div>')
    })
    .append('svg')
    .attr('width', '100%')
    .attr('height', '100%')
    .append('circle')
    .attr('r', function(d, i){
      return size(d.size)
    })
    .attr('opacity', 0.8)
    .attr('cy', 55)
    .attr('cx', 57)
    .style('fill', function(d,i){
      return color(d.size)
    })
  });
}

let cleanScene06 = () => {
  text.html(' ')
  d3.selectAll('#id').remove()
  d3.selectAll('.samTip').remove()
}

export { Scene06, cleanScene06 };
