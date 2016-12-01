/**

Main File for the Visualization

*/

var currentChapter = 1;
var title = document.getElementById('chapterName');
var descriptionOne = document.getElementById('chapterDescriptionOne');
var descriptionTwo = document.getElementById('chapterDescriptionTwo');

// Locations
var locations = {
  us: [-109.14, 41.20],
  gulfAndAsia: [ 52.61, 24.08],
  gulfAndAsiaPlain: [ 50.62, 31.14],
  gulf: [40.101, 25.744],
  world: [-25.3, 24.4],
  waterZoom : [87.793, 20.085]
};

var boudaries = ['country-label-lg', 'country-label-md', 'marine-label-lg-pt','marine-label-lg-ln', 'admin-2-boundaries','admin-3-4-boundaries'];

/* Access to Mapbox gl */
mapboxgl.accessToken = 'pk.eyJ1IjoiY3ZhbGVuenVlbGEiLCJhIjoiY2l2ZzkweTQ3MDFuODJ5cDM2NmRnaG4wdyJ9.P_0JJXX6sD1oX2D0RQeWFA';
var map = new mapboxgl.Map({
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

/* When the map is loaded */
map.on('load', function(){
  // Nothing for now
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

  // CH1: Water Zoom and Forced Labor
  if(currentChapter == 1){

    title.textContent = "Chapter One: Forced Labor, Facts and Figures";
    descriptionOne.textContent = "According to the International Labour Organization, forced labor occurs when people are coerced to work through violence, intimidation, and in more subtle ways. ";
    descriptionTwo.textContent = "Many workers are forced to stay in their jobs so they can pay off hefty recruitment fees. Some migrant workers have their identity papers confiscated by their employer, or are threatened with deportation if they attempt to switch jobs.";

    bar.animate(0.01);

    map.flyTo({
        center: locations.waterZoom,
        zoom : 7.58,
        speed: 0.2,
        curve: 1
    });

  }

  // CH2: The World
  else if(currentChapter == 2){

    title.textContent = "Chapter Two: The World";
    descriptionOne.textContent = "There are an estimated 21 - 46 million victims of forced labor worldwide, including victims of commercial sexual exploitation. Many of these victims are forcibly trafficked across borders in order to work.";
    descriptionTwo.textContent = "Forced labor exists in every country, but according to some estimates, more than half of the world’s forced laborers are located in five countries: India, China, Pakistan, Bangladesh, and Uzbekistan, or in the South and East Asia regions.";

    bar.animate(0.2);
    map.setPaintProperty("satellite", 'raster-opacity', 0.45);
    map.setPaintProperty("water", 'fill-opacity', 0.45);
    // Highlight selected countries

    map.flyTo({
        center: locations.world,
        zoom : 1.45,
        speed: 0.06,
        curve: 2,
        bearing: 0,
        pitch: 0
    });

  }

  // CH3: The US
  else if(currentChapter == 3){

    title.textContent = "Chapter Three: The U.S Goverment";
    descriptionOne.textContent = " Aside from enforcement measures to prevent force labor and trafficking at home, what can countries like the United States do to prevent forced labor and trafficking abroad?";
    descriptionTwo.textContent = "Aside from enforcement measures to prevent force labor and trafficking at home, what can coun";

    // map.setFilter('Countries', ['==', 'NAME', 'United States']);
    // map.setLayoutProperty('Countries', 'visibility', 'visible');

    map.setPaintProperty("satellite", 'raster-opacity', 0);
    map.setPaintProperty("water", 'fill-opacity', 0);
    map.setPaintProperty("admin-2-boundaries", 'line-opacity', 0);
    map.setPaintProperty("admin-3-4-boundaries", 'line-opacity', 0);


    map.addLayer({
      "id": "electronics",
      "type": "fill-extrusion",
      "source": "composite",
      "source-layer": "ne_10m_admin_0_countries-6howmk",
      "layout": {
          "visibility": "visible"
      },
      "filter": [
          "in",
          "NAME",
          "United States"
      ],
      "paint": {
          "fill-extrusion-base": 0,
          "fill-extrusion-opacity": 0.9,
          "fill-extrusion-color": "rgba(8, 61, 119, 1)",
          "fill-extrusion-height": 120000
      }
    });

    map.addLayer({
      "id": "minerals",
      "type": "fill-extrusion",
      "source": "composite",
      "source-layer": "ne_10m_admin_0_countries-6howmk",
      "layout": {
          "visibility": "visible"
      },
      "filter": [
          "in",
          "NAME",
          "United States"
      ],
      "paint": {
          "fill-extrusion-base": 120000,
          "fill-extrusion-opacity": 0.9,
          "fill-extrusion-color": "rgba(244, 211, 94, 1)",
          "fill-extrusion-height": 560000
      }
    });

    map.addLayer({
      "id": "security",
      "type": "fill-extrusion",
      "source": "composite",
      "source-layer": "ne_10m_admin_0_countries-6howmk",
      "layout": {
          "visibility": "visible"
      },
      "filter": [
          "in",
          "NAME",
          "United States"
      ],
      "paint": {
          "fill-extrusion-base": 560000,
          "fill-extrusion-opacity": 0.9,
          "fill-extrusion-color": "rgba(238, 150, 75, 1)",
          "fill-extrusion-height": 950000
      }
    });

    // map.setFilter('Countries3D', ['==', 'NAME', 'United States']);
      // map.setLayoutProperty('Countries3D', 'visibility', 'visible');
    // map.setPaintProperty('Countries3D', 'fill-extrusion-height', 500000);

    // showOrHide('visible',gulfCountries3D);
    // showOrHide('visible',southAsiaCountries3D);

    // showOrHide('visible', groupedCountries);
    // showOrHide('none',gulfCountries3D);
    // showOrHide('none',southAsiaCountries3D);

    bar.animate(0.4);

    map.flyTo({
        center: locations.us,
        zoom : 3.15,
        speed: 0.04,
        curve: 2,
        bearing: 1,
        pitch: 80
    });

  }

  // CH4: What can the US do?
  else if(currentChapter == 4){

    title.textContent = "Chapter Four: What Can the U.S Government Do?";
    descriptionOne.textContent = "Aside from enforcement measures to prevent force labor and trafficking at home, what can coun";
    descriptionTwo.textContent = "Aside from enforcement measures to prevent force labor and trafficking at home, what can coun";

    showOrHide('none',gulfCountries3D);
    showOrHide('none',southAsiaCountries3D);
    showOrHide('none', groupedCountries);

    bar.animate(0.6);

    map.flyTo({
        center: locations.us,
        zoom : 3.76,
        speed: 0.07,
        curve: 1,
        bearing: 0,
        pitch: 0
    });

  }

  // CH5: Persian Gulf
  else if(currentChapter == 5){

    title.textContent = "Chapter Five: Where are we now?";
    descriptionOne.textContent = "Aside from enforcement measures to prevent force labor and trafficking at home, what can coun";
    descriptionTwo.textContent = "Aside from enforcement measures to prevent force labor and trafficking at home, what can coun";

    bar.animate(0.8);
    map.flyTo({
        center: locations.world,
        zoom : 1.8,
        speed: 0.2,
        curve: 1
    });

  }

  // CH6: World View
  // else if(currentChapter == 6){
  //
  //   title.textContent = "Chapter";
  //   descriptionOne.textContent = "";
  //   descriptionTwo.textContent = "";
  //
  //   bar.animate(1);
  //   map.flyTo({
  //       center: locations.world,
  //       zoom : 2.03,
  //       speed: 0.2,
  //       curve: 1
  //   });
  // }

}

/* Show or Hide layers */
function showOrHide(type, arrayOfCountries){
  for(var i = 0; i < arrayOfCountries.length; i++){
    map.setLayoutProperty(arrayOfCountries[i], 'visibility', type);
  }
}

/* Listen to the Navegations Controlls and Change the Current Chapter*/
// Next
document.getElementById('next').addEventListener('click', function () {
  if(currentChapter < 6 ){
    currentChapter += 1;
    changeChapter();
  }
});
// Previous
document.getElementById('previous').addEventListener('click', function () {
  if(currentChapter > 0){
    currentChapter -= 1;
    console.log(currentChapter);
    changeChapter();
  }
});
