//=====================
// Scene 05: Military Bases
//====================

import { cleanScene04 } from './scene_04';
import { cleanScene03, Scene03 } from './scene_03';
import { cleanScene06 } from './scene_06';
import * as d3 from 'd3';
import mapboxgl from 'mapbox-gl';
import { map, projectPoint } from './../map';
import { colors } from './../colors'

let key = d3.select('#basesLegend');
let container = map.getCanvasContainer();
let svg = d3.select(container).append('svg');

let Scene05 = () => {
  cleanScene03();
  cleanScene04();
  cleanScene06();

  Scene03();

  map.setPaintProperty('satellite', 'raster-opacity', 0.44);
  map.setPaintProperty('admin-2-boundaries', 'line-opacity', 1);
  map.setPaintProperty('water', 'fill-opacity', 1);

  d3.select('#textScene').style('top', '100px')

  d3.json('../../assets/data/militarybases.geojson', function (data) {
    drawPoints(data.features);
  })
};

let drawPoints = (points) => {
  key.style('display', 'block');

  svg.style('position', 'absolute');
  svg.style('top', '0');
  svg.style('left', '0');
  svg.style('z-index', '300');
  svg.style('width', '100%');
  svg.style('height', '100%');

  let size = d3.scaleLinear()
  .domain([0, 176])
  .range([3,12]);

  let transform = d3.geoTransform({ point: projectPoint });
  let path = d3.geoPath().projection(transform);

  let featureElement = svg.selectAll('circle')
  .data(points)
  .enter()
  .append('circle')
  .attr('r', function (d){
    return size(d.properties.total)
  })
  .attr('fill', function (d){
    if(d.properties.unconfirmed > 0){
      return colors.b[2]
    } else {
      return colors.a[0];
    }
  })
  .style('cursor', 'pointer')
  .attr('stroke', 'black')
  .attr('stroke-opacity', 0.5)
  .attr('fill-opacity', 0.7)
  .on('mouseover', handleMouseOver)
  .on('mouseout', handleMouseOut);

  // Event Handlers for mouse
  function handleMouseOver(d) {
    var xPosition = d3.mouse(this)[0];
    var yPosition = d3.mouse(this)[1] + 20;

    d3.select('body').append('div')
    .attr('id', 'tooltip')
    .html('<b>' + d.properties.name + '</b><br/><u> U.S. Military Bases </u><br/>Unconfirmed: ' + d.properties.unconfirmed + '<br/>Confirmed: ' + d.properties.total + '<br/>Others: ' + d.properties.lily)
    .style('opacity', 0.8)
    .style('top', yPosition + 'px')
    .style('left', xPosition + 'px');
    d3.select(this)
  }

  function handleMouseOut(d) {
    d3.select('#tooltip').remove();
    d3.select(this)
    .transition()
    .duration(250)
  }

  let update = () => {
    featureElement.attr('cx', function(d){
      return latlng(d.geometry.coordinates[0], 0).x
    })
    .attr('cy', function(d){
      return latlng(0, d.geometry.coordinates[1]).y
    })
  };

  map.on('move', function () {
    update();
  });

  update();
}

let latlng = (lat, lng) => {
  return map.project(new mapboxgl.LngLat(lat, lng));
}

let cleanScene05 = () =>  {
  key.style('display', 'none');
  if (svg != undefined){
    svg.selectAll('*').remove();
    // svg.remove()
  }
};

export { Scene05,  cleanScene05 };
