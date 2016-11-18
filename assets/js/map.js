/**

Main File for the Visualization

*/

// Chapters
var chapters = ["Beginning", "Gulf and Asia", "Gulf and Asia Plain" ,"US", "Gulf", "World" ];

var currentChapter = 0;

// Locations
var locations = {
  us: [-109.14, 41.20],
  gulfAndAsia: [ 52.61, 24.08],
  gulfAndAsiaPlain: [ 50.62, 31.14],
  gulf: [40.101, 25.744],
  world: [-45.82, 37.70]
};

/* Access to Mapbox gl */
mapboxgl.accessToken = 'pk.eyJ1IjoiY3ZhbGVuenVlbGEiLCJhIjoiY2l2ZzkweTQ3MDFuODJ5cDM2NmRnaG4wdyJ9.P_0JJXX6sD1oX2D0RQeWFA';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/cvalenzuela/civhiqsqi00212jo48kbqhy83',
    container: 'map',
    center: locations.gulfAndAsia,
    zoom: 3.7,
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

/* Select the View depending on the Current Chapter */
function changeChapter(){

  // CH1: Beginning
  if(chapters[currentChapter] == "Beginning" ){
    bar.animate(0.01);
    GulfAndAsiaPlain('none');
    realMode('visible');
    map.flyTo({
        center: locations.gulfAndAsia,
        zoom : 3.7
    });
  }

  // CH2: Gulf and Asia Together
  else if(chapters[currentChapter] == "Gulf and Asia" ){

    bar.animate(0.2);
    GulfAndAsiaPlain('visible');
    map.flyTo({
        center: locations.gulfAndAsia,
        zoom : 3.7,
        speed: 0.2,
        curve: 1,
        bearing: 0,
        pitch: 0
    });
  }

  // CH3: Gulf and Asia Together in Flat Plain Mode
  else if(chapters[currentChapter] == "Gulf and Asia Plain" ){
    bar.animate(0.4);
    realMode('none');
    map.flyTo({
        center: locations.gulfAndAsiaPlain,
        zoom : 3.15,
        speed: 0.2,
        curve: 1,
        bearing: 0,
        pitch: 60
    });
  }

  // CH4: The US
  else if(chapters[currentChapter] == "US"){
    bar.animate(0.6);
    realMode('visible');
    map.flyTo({
        center: locations.us,
        zoom : 3.76,
        speed: 0.2,
        curve: 1,
        bearing: 0,
        pitch: 0
    });
  }

  // CH5: Persian Gulf
  else if(chapters[currentChapter] == "Gulf"){
    bar.animate(0.8);
    map.flyTo({
        center: locations.gulf,
        zoom : 4.3,
        speed: 0.2,
        curve: 1
    });
  }

  // CH6: World View
  else if(chapters[currentChapter] == "World"){
    bar.animate(1);
    map.flyTo({
        center: locations.world,
        zoom : 2.03,
        speed: 0.2,
        curve: 1
    });
  }

}

/* Set a Flat Plain or Satellite view of the Map */
function realMode(type){
  var layers = ['satellite', 'country-label-lg', 'country-label-md', 'marine-label-lg-pt',
  'marine-label-lg-ln', 'admin-2-boundaries','admin-3-4-boundaries','water'];

  for(var i = 0; i < layers.length; i++){
    map.setLayoutProperty(layers[i], 'visibility', type);
  }
}

/* Show Gulf and Asia Countries in Flat Plain */
function GulfAndAsiaPlain(type){
  var layers = ['SouthAsiaCountries', 'PersialGulfCountries', 'SelectedCountries-Name'];

  for(var i = 0; i < layers.length; i++){
    map.setLayoutProperty(layers[i], 'visibility', type);
  }
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
