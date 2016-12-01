/**

Main File for the Visualization

*/

// Chapters

//first chapter
var chapters = ["Beginning"];

var currentChapter = 0;

// Locations
var locations = {
  //add the sea locations here
  gulfsea: [63.632813, 16.204125]
};

/* Access to Mapbox gl */
//my own access token
mapboxgl.accessToken = 'pk.eyJ1IjoiYXZpa2FuYXJ1bGEiLCJhIjoiY2l0dDZnejR6MDAwZDJ6bnZidDAybG94dSJ9.WyetO8IYLs4sSKmSsZyuFA';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/avikanarula/ciw5fdxvm001l2klf3vly5wh6',
    container: 'map',
    center: locations.gulfsea,
    zoom: 6,
    hash: true,
    interactive: true,
    attributionControl: true,
    scrollZoom :true
});

/* Events to load once the map is loaded */
map.on('load', function(){
  // Nothing for now...
});

/* Progress Line */
var bar = new ProgressBar.Line(progressBar, {
  strokeWidth: 4,
  easing: 'easeInOut',
  duration: 1400,
  color: '#FFEA82',
  trailColor: '#eee',
  trailWidth: 1,
  svgStyle: {width: '100%', height: '100%'},
  from: {color: '#293896'},
  to: {color: '#ff4e47'},
  step: (state, bar) => {
    bar.path.setAttribute('stroke', state.color);
  }
});
// Start with a little animation
bar.animate(0.01);

/* Select the View depending on the current chapter */
function changeChapter(){

}


/* Listen to the Navegations Controlls and Change the Current Chapter*/
// Next
document.getElementById('next').addEventListener('click', function () {
  if(currentChapter < chapters.length ){
    currentChapter += 1;
    changeChapter();
  }
});
// Previous
document.getElementById('previous').addEventListener('click', function () {
  if(currentChapter > 0){
    currentChapter -= 1;
    changeChapter();
  }
});
