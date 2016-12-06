/**

Main File for the Visualization

*/
var currentChapter = 1;
var title = document.getElementById('chapterName');
var descriptionOne = document.getElementById('chapterDescriptionOne');
var descriptionTwo = document.getElementById('chapterDescriptionTwo');
var colors = ['#fff7ec','#fee8c8','#fdd49e','#fdbb84','#fc8d59','#ef6548','#d7301f','#b30000','#7f0000']
// Locations
var locations = {
  us: [-109.14, 41.20],
  gulfAndAsia: [ 52.61, 24.08],
  gulfAndAsiaPlain: [ 50.62, 31.14],
  gulf: [40.101, 25.744],
  world: [-25.3, 24.4],
  worldTiltRight : [14.18,18.08],
  waterZoom : [88.307, 20.099]
};

var boudaries = ['country-label-lg', 'country-label-md', 'marine-label-lg-pt','marine-label-lg-ln', 'admin-2-boundaries','admin-3-4-boundaries'];

/* Slavery Index Data */
function loadJSON(callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', 'assets/data/slaveryIndex.json', true); // Replace 'my_data' with the path to your file
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
    // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
    callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

// Call to function with anonymous callback
loadJSON(function(response) {
    forcedLaborData = JSON.parse(response);
    //console.log(forcedLaborData);
});
/* Slavery Index Data */

/* Access to Mapbox gl */
mapboxgl.accessToken = 'pk.eyJ1IjoiYXZpa2FuYXJ1bGEiLCJhIjoiY2l0dDZnejR6MDAwZDJ6bnZidDAybG94dSJ9.WyetO8IYLs4sSKmSsZyuFA';
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

/*== Select the View depending on the Current Chapter ==*/
function changeChapter(){

  /*= CH1: Water Zoom and Forced Labor =*/
  if(currentChapter == 1){

    // Change the content text
    title.textContent = "Chapter One: Forced Labor, Facts and Figures";
    descriptionOne.textContent = "According to the International Labour Organization, forced labor occurs when people are coerced to work through violence, intimidation, and in more subtle ways. ";
    descriptionTwo.textContent = "Many workers are forced to stay in their jobs so they can pay off hefty recruitment fees. Some migrant workers have their identity papers confiscated by their employer, or are threatened with deportation if they attempt to switch jobs.";

    // Bar
    bar.animate(0.01);

    // Fly to Map
    map.flyTo({
        center: locations.waterZoom,
        zoom : 7.58,
        speed: 0.2,
        curve: 1
    });

  }

  /*= CH2: The World =*/
  else if(currentChapter == 2){

    // Hide the d3 animation
    document.getElementById("d3").style.display = 'none';

    // Change the content text
    title.textContent = "Chapter Two: Regions with Common Forced Labor";
    descriptionOne.textContent = "Forced labor exists in every country, but according to some estimates, more than half of the world’s forced laborers are located in five countries: India, China, Pakistan, Bangladesh, and Uzbekistan, or in the South and East Asia regions.";
    descriptionTwo.textContent = "Here are the 50 worst countries. Forced labor exists in every country, but according to some estimates, more than half of the world’s forced laborers are";

    // Bar
    bar.animate(0.2);

    // Opacity of Water and Satellite
    map.setPaintProperty("satellite", 'raster-opacity', 0.45);
    map.setPaintProperty("water", 'fill-opacity', 0.45);

    document.getElementById("colorsGradient").style.display = 'block';

    // Highlight 50 selected countries
    for(var key in forcedLaborData){
      // Normalize the Values
      var minValue = 128800;
      var maxValue = 3388400;
      var normalizeValue =  (forcedLaborData[key].data-minValue)/(maxValue-minValue); // Max value = 18354700, second = 3388400, Min value = 128800
      var colorLabor = Math.floor(map_range(normalizeValue,0, 1, 0, 8));
      var opacityLabor = map_range(normalizeValue,0, 1, 0.1, 0.75);
      if(colorLabor >= 8){
        colorLabor = 8;
      }
      if(opacityLabor >= 1){
        opacityLabor = 1;
      }

      map.addLayer({
        "id": key,
        "type": "fill",
        "source": "composite",
        "source-layer": "ne_10m_admin_0_countries-6howmk",
        "filter": ["==", "NAME", key],
        "paint": {
          "fill-opacity": opacityLabor,
          "fill-color": colors[colorLabor],
          "fill-outline-color": colors[colorLabor]
        }
      });

      map.addLayer({
        "id": key+"Name",
        "type": "symbol",
        "source": "composite",
        "source-layer": "country_label",
        "minzoom": 1,
        "filter": ["==", "name_en", key],
        "layout": {
            "visibility": "visible",
            "text-field": "{name_en}",
            "text-font": [
                "DIN Offc Pro Medium",
                "Arial Unicode MS Regular"
            ],
            "text-size": {
                "base": 1.1,
                "stops": [
                    [
                        2,
                        10
                    ],
                    [
                        5,
                        15
                    ]
                ]
            }
        },
        "paint": {
            "text-color": "hsl(0, 0%, 84%)",
            "text-opacity": 1
        }
        });



    }

    // Set the Hover Functionality
    //map.setFilter("Countries", ["in", "NAME", "China"]);
    //map.setLayoutProperty("Countries", 'visibility', 'visible');
    map.on("mousemove", function(e) {
       var features = map.queryRenderedFeatures(e.point, { layers: ["Countries"] });
       if (features.length) {
           map.setFilter("CountriesHover", ["==", "NAME", features[0].properties.NAME]);
       } else {
           map.setFilter("CountriesHover", ["==", "NAME", ""]);
       }
     });

     // Reset the state-fills-hover layer's filter when the mouse leaves the map
     map.on("mouseout", function() {
         map.setFilter("CountriesHover", ["==", "NAME", ""]);
     });

    // Fly to Map
    map.flyTo({
        center: locations.worldTiltRight,
        zoom : 2.09,
        speed: 0.06,
        curve: 2,
        bearing: 0,
        pitch: 0
    });



  }

  /*= CH3: The US =*/
  else if(currentChapter == 3){

    // Change the content text
    title.textContent = "Chapter Three: The U.S Goverment";
    descriptionOne.textContent = "Aside from enforcement measures to prevent force labor and trafficking at home, what can countries like the United States do to prevent forced labor and trafficking abroad?";
    descriptionTwo.textContent = "Forced labor exists in every country, but according to some estimates, more than half of the world’s forced laborers are located in five countries: India, China, Pakistan, Bangladesh, and Uzbekistan, or in the South and East Asia regions.";

    // Remove Previous Layers
    document.getElementById("colorsGradient").style.display = 'none';
    for(var key in forcedLaborData){
      map.removeLayer(key);
      map.removeLayer(key+"Name");
    }

    // Bar
    bar.animate(0.4);

    // Layouts
    map.setPaintProperty("satellite", 'raster-opacity', 0);
    map.setPaintProperty("water", 'fill-opacity', 0);
    map.setPaintProperty("admin-2-boundaries", 'line-opacity', 0);
    map.setPaintProperty("admin-3-4-boundaries", 'line-opacity', 0);


    map.addLayer({
      "id": "electronics",
      "type": "fill-extrusion",
      "source": "usacontinent",
      "source-layer": "USA",
      "layout": {
          "visibility": "visible"
      },
      "paint": {
          "fill-extrusion-base": 0,
          "fill-extrusion-opacity": 0.9,
          "fill-extrusion-color": "rgba(25, 100, 126, 1)",
          "fill-extrusion-height": 120000
      }
    });

    map.addLayer({
      "id": "minerals",
      "type": "fill-extrusion",
      "source": "usacontinent",
      "source-layer": "USA",
      "layout": {
          "visibility": "visible"
      },
      "paint": {
          "fill-extrusion-base": 120000,
          "fill-extrusion-opacity": 0.9,
          "fill-extrusion-color": "rgba(40, 175, 176, 1)",
          "fill-extrusion-height": 560000
      }
    });

    map.addLayer({
      "id": "security",
      "type": "fill-extrusion",
      "source": "usacontinent",
      "source-layer": "USA",
      "layout": {
          "visibility": "visible"
      },
      "paint": {
          "fill-extrusion-base": 560000,
          "fill-extrusion-opacity": 0.9,
          "fill-extrusion-color": "rgba(244, 211, 94, 1)",
          "fill-extrusion-height": 950000
      }
    });

    map.addLayer({
      "id": "clothes",
      "type": "fill-extrusion",
      "source": "usacontinent",
      "source-layer": "USA",
      "layout": {
          "visibility": "visible"
      },
      "paint": {
          "fill-extrusion-base": 950000,
          "fill-extrusion-opacity": 0.9,
          "fill-extrusion-color": "rgba(238, 150, 75, 1)",
          "fill-extrusion-height": 1050000
      }
    });

    // Fly to Map
    map.flyTo({
        center: locations.us,
        zoom : 3.15,
        speed: 0.04,
        curve: 2,
        bearing: 1,
        pitch: 80
    });

  }

  /*=  CH4: What can the US do? =*/
  else if(currentChapter == 4){

    // Change the content text
    title.textContent = "Chapter Four: What Can the U.S Government Do?";
    descriptionOne.textContent = "Forced labor exists in every country, but according to some estimates, more than half of the world’s forced laborers are located in five countries: India, China, Pakistan, Bangladesh, and Uzbekistan, or in the South and East Asia regions.";
    descriptionTwo.textContent = "Forced labor exists in every country, but according to some estimates, more than half of the world’s forced laborers are located in five countries: India, China, Pakistan, Bangladesh, and Uzbekistan, or in the South and East Asia regions.";

    // Layouts
    map.setPaintProperty("satellite", 'raster-opacity', 0.45);
    map.setPaintProperty("water", 'fill-opacity', 0.5);
    map.setPaintProperty("admin-2-boundaries", 'line-opacity', 1);
    map.setPaintProperty("admin-3-4-boundaries", 'line-opacity', 1);

    // Bar
    bar.animate(0.6);

    // Fly to Map
    map.flyTo({
        center: locations.world,
        zoom : 1.45,
        speed: 0.06,
        curve: 2,
        bearing: 0,
        pitch: 0
    });

  }

  /*=  CH5: Persian Gulf =*/
  else if(currentChapter == 5){

    // Change the content text
    title.textContent = "Chapter Five: Where are we now?";
    descriptionOne.textContent = "Forced labor exists in every country, but according to some estimates, more than half of the world’s forced laborers are located in five countries: India, China, Pakistan, Bangladesh, and Uzbekistan, or in the South and East Asia regions.";
    descriptionTwo.textContent = "Forced labor exists in every country, but according to some estimates, more than half of the world’s forced laborers are located in five countries: India, China, Pakistan, Bangladesh, and Uzbekistan, or in the South and East Asia regions.";

    // Bar
    bar.animate(0.8);

    // Fly to Map
    map.flyTo({
        center: locations.world,
        zoom : 1.8,
        speed: 0.2,
        curve: 1
    });

  }

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

// Map Function
function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}
