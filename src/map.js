//=====================
// Base Map
//====================

import { locations } from './locations';
import mapboxgl from 'mapbox-gl';
let isSupported = require('mapbox-gl-supported')();

let map;
mapboxgl.accessToken = 'pk.eyJ1IjoiY3ZhbGVuenVlbGEiLCJhIjoiY2l2ZzkweTQ3MDFuODJ5cDM2NmRnaG4wdyJ9.P_0JJXX6sD1oX2D0RQeWFA';

if (!mapboxgl.supported()) {
  map = null;
  alert('Sorry, but your browser cannot not support this visualization.');
} else {
  map = new mapboxgl.Map({
    container: 'map',
    style: './stylemap/style.json',
    container: 'map',
    center: locations.waterZoom,
    zoom: 7.58,
    hash: true,
    interactive: true,
    attributionControl: true,
    scrollZoom: false,
    maxZoom: 8,
    minZoom: 1.2,
    renderWorldCopies: false,
  });
}

/* When the map is loaded */
map.on('load', function () {
  // Nothing for now
});

function projectPoint (lon, lat) {
  let point = map.project(new mapboxgl.LngLat(lon, lat));
  this.stream.point(point.x, point.y);
};

export { map, projectPoint };
