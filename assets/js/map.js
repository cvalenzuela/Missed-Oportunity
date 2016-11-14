/**

Main File for the Visualization

*/

var us = [31.2,-98.4],
    gulfAndAsia = [15.5,50.4];

var map = L.map('map',{
  scrollWheelZoom: false,
  center: gulfAndAsia,
  zoomControl: false,
  zoom: 4
});

//L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
//    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//}).addTo(map);


L.tileLayer('https://api.mapbox.com/styles/v1/cvalenzuela/civhiqsqi00212jo48kbqhy83/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY3ZhbGVuenVlbGEiLCJhIjoiY2l2ZzkweTQ3MDFuODJ5cDM2NmRnaG4wdyJ9.P_0JJXX6sD1oX2D0RQeWFA', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
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



var marker = L.marker(gulfAndAsia,{
  opacity: 0
}).addTo(map);


document.getElementById('next').onclick = function () {
 marker.slideTo(us, {
   duration:4000,
   keepAtCenter: true
 });
//  map.zoomOut(1);
  bar.animate(0.5);  // Number from 0.0 to 1.0
};

document.getElementById('previous').onclick = function () {
 marker.slideTo(gulfAndAsia, {
   duration:4000,
   keepAtCenter: true
 });
bar.animate(0.1);  // Number from 0.0 to 1.0
//  map.zoomOut(1);
};



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

 bar.animate(0.1);  // Number from 0.0 to 1.0
