//=====================
// Scene 03: Slavery in the world
//====================

import * as d3 from 'd3';
import { cleanScene02 } from './scene_02';
import mapboxgl from 'mapbox-gl';
import { map, projectPoint} from './../map';
import { colors } from '../colors';
import { cleanScene04 } from './scene_04';

let key = d3.select('#colorsGradient');
let container = map.getCanvasContainer();
let svg;

let Scene03 = () => {
  cleanScene02();
  cleanScene04();

  key.style('display', 'block');

  d3.json('../../assets/data/countries.geo.json', function (err, data) {
    d3.csv('../../assets/data/modern_slavery.csv', function (error, modernSlaveryCountries) {
      let world = data.features;
      let worldData = [];
      modernSlaveryCountries.forEach(function (c, i) {
        world.forEach(function (w, j) {
          if (w.properties.name === c.country) {
            w.properties.slavery = c.modern_slavery;
            worldData.push(w);
          }
        });
      });

      mapDraw(worldData);
    });
  });
};

let mapDraw = (geojson, data) => {

  let color = d3.scaleQuantile()
  .domain([1, 100])
  .range(colors.a);

  svg = d3.select(container).append('svg');
  svg.style('position', 'absolute');
  svg.style('top', '0');
  svg.style('left', '0');
  svg.style('z-index', '200');
  svg.style('width', '100%');
  svg.style('height', '100%');
  let transform = d3.geoTransform({ point: projectPoint });
  let path = d3.geoPath().projection(transform);

  let featureElement = svg.selectAll('path')
  .data(geojson)
  .enter()
  .append('path')
  .attr('fill', function (d) {
    return color(d.properties.slavery);
  })
  .attr('fill-opacity', 0.4)
  .on('mouseover', handleMouseOver)
  .on('mouseout', handleMouseOut);

  // Event Handlers for mouse
  function handleMouseOver(d) {
    var xPosition = d3.mouse(this)[0];
    var yPosition = d3.mouse(this)[1] + 20;

    d3.select('body').append('div')
    .attr('id', 'tooltip')
    .html('<b>' + d.properties.name + '</b>' + '<b><br/> Percentage of population under Forced Labor</b>: ' + d.properties.slavery/100 + '%')
    .style('opacity', 0.8)
    .style('top', yPosition + 'px')
    .style('left', xPosition + 'px');

    d3.select(this)
    .style('fill', '#ffffff');
  }

  function handleMouseOut(d) {
    d3.select('#tooltip').remove();

    d3.select(this)
    .transition()
    .duration(250)
    .style('fill', function (d) {
      let slavery = d.properties.slavery;

      if (slavery) {
        return color(slavery);
      } else {
        return '#ddd';
      }
    });
  }

  let update = () => {
    featureElement.attr('d', path);
  };

  map.on('move', function () {
    update();
  });

  update();

};

let cleanScene03 = () =>  {
  key.style('display', 'none');
  d3.select('#tooltip').remove();
  if (svg != undefined)
    svg.selectAll('*').remove();
};

export { Scene03,  cleanScene03 };
