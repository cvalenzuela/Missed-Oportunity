//=====================
// Base Map
//====================

mapboxgl.accessToken = 'pk.eyJ1IjoiY3ZhbGVuenVlbGEiLCJhIjoiY2l2ZzkweTQ3MDFuODJ5cDM2NmRnaG4wdyJ9.P_0JJXX6sD1oX2D0RQeWFA';
import {locations} from './locations';

let map;

if (!mapboxgl.supported()) {
  map = null;
  alert('Sorry, but your browser cannot not support this visualization.');
} else{
  map = new mapboxgl.Map({
    container: 'map',
    style: './stylemap/style.json',
    container: 'map',
    center: locations.waterZoom,
    zoom: 7.58,
    hash: true,
    interactive: true,
    attributionControl: true,
    scrollZoom :true
  });
}

/* When the map is loaded */
map.on('load', function(){
  // Nothing for now
});

export {map};
