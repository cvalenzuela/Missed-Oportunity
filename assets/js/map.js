/**

Main File for the Visualization

*/

var us = [33.2,-92.4],
    gulfAndAsia = [15.5,66.4];



var map = L.map('map',{
  scrollWheelZoom: false,
  center: [15.5,66.4],
  zoomControl: false,
  zoom: 5
});

L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


//var circle = L.circle([22.586511, 65.4649318], {
//    color: 'red',
//    fillColor: '#f03',
//    fillOpacity: 0.5,
//    radius: 500
//}).addTo(map);

//setTimeout(function(){
//  map.zoomIn(1);
//  }, 2000);



var marker = L.marker(gulfAndAsia).addTo(map);


//document.getElementById('us').onclick = function () { 
//  marker.slideTo(us, {
//    duration:1000,
//    keepAtCenter: true
//  });
////  map.zoomOut(1);
//};



/* Progress Line */
var bar = new ProgressBar.Line(progressBar, {
  strokeWidth: 4,
  easing: 'easeInOut',
  duration: 1400,
  color: '#FFEA82',
  trailColor: '#eee',
  trailWidth: 1,
  svgStyle: {width: '100%', height: '100%'},
  from: {color: '#FFEA82'},
  to: {color: '#ED6A5A'},
  step: (state, bar) => {
    bar.path.setAttribute('stroke', state.color);
  }
});

bar.animate(0.4);  // Number from 0.0 to 1.0