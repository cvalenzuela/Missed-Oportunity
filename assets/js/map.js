/**

Main File for the Visualization

*/
var currentChapter = 1;
var title = document.getElementById('chapterName');
var descriptionOne = document.getElementById('chapterDescriptionOne');
var descriptionTwo = document.getElementById('chapterDescriptionTwo');
var colors = ['#fff7ec','#fee8c8','#fdd49e','#fdbb84','#fc8d59','#ef6548','#d7301f','#b30000','#7f0000']
var colorsUSA = ['#453B52','#41607A','#288993','#30B097','#73D487','#CAF270'];
var baseCountries = ["Bahrain", "United Arab Emirates", "Qatar", "Saudi Arabia"];
var forcedLaborData, militaryBaseData;
var usaDescription = document.getElementById("usaDescription");
var textUsaDescription = document.getElementById("textUsaDescription");
var labelUsaDescription = document.getElementById("labelUsaDescription");
var credits = document.getElementById("credits");
var next = document.getElementById("next");
var previous = document.getElementById("previous");
var nextasText = document.getElementById("nextAsText");
var previousasText = document.getElementById("previousAsText");
var d3div = document.getElementById("d3");
var heightUsa = 0;
var opacityUsa = 0;

// Locations
var locations = {
  us: [-113.53, 51.24],
  gulfAndAsia: [ 52.61, 24.08],
  gulfAndAsiaPlain: [ 50.62, 31.14],
  gulf: [40.101, 25.744],
  world: [-25.3, 24.4],
  worldTiltRight : [14.18,18.08],
  waterZoom : [88.307, 20.099]
};

var boudaries = ['country-label-lg', 'country-label-md', 'marine-label-lg-pt','marine-label-lg-ln', 'admin-2-boundaries','admin-3-4-boundaries'];

/* Slavery Index Data */
function loadJSONSlaveIndex(callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', 'assets/data/slaveryIndex.json', true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
    // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
    callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

// Call to function with anonymous callback
loadJSONSlaveIndex(function(response) {
    forcedLaborData = JSON.parse(response);
    //console.log(forcedLaborData);
});
/* Slavery Index Data */

/* Military Base Camps */
function loadJSONMilitaryCamps(callback){
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', 'assets/data/militarybases.geojson', true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
    // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
    callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

loadJSONMilitaryCamps(function(response){
    militaryBaseData = JSON.parse(response);
});
/* Military Base Camps */

/* Access to Mapbox gl */
mapboxgl.accessToken = 'pk.eyJ1IjoiY3ZhbGVuenVlbGEiLCJhIjoiY2l2ZzkweTQ3MDFuODJ5cDM2NmRnaG4wdyJ9.P_0JJXX6sD1oX2D0RQeWFA';
var map = new mapboxgl.Map({
    container: 'map',
    style: './stylemap/style.json',
    container: 'map',
    center: locations.waterZoom,
    zoom: 7.58,
    hash: true,
    interactive: false,
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

next.style.cursor = "pointer";
previous.style.cursor = "pointer";
nextAsText.style.cursor = "pointer";
previousAsText.style.cursor = "pointer";


/*== Select the View depending on the Current Chapter ==*/
function changeChapter(){

  /*= CH1: Water Zoom and Forced Labor =*/
  if(currentChapter == 1){

    // Change the content text
    title.textContent = "Chapter One: Forced Labor";
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

    //In case of going backwards, remove Layers from previous chapter
    if(document.getElementById("text-div") != null){
      document.getElementById("text-div").style.display = 'none';
      document.getElementById("d3").style.display = 'none';
    }

  }

  /*= CH2: Animation =*/
  else if(currentChapter == 2){

    // opacity of next
    setTimeout(function(){
      next.style.opacity = '0.04';
      nextAsText.style.opacity = '0.04';
    },400)
    setTimeout(function(){
      next.style.opacity = '1';
      nextAsText.style.opacity = '1';
    },52000)

    // Animation Start
    if(document.getElementById("text-div") != null){
      document.getElementById("text-div").style.display = 'block';
      document.getElementById("d3").style.display = 'block';
    }
    startAnimation();

    // Bar
    bar.animate(0.2);

    //In case of going backwards, remove Layers from previous chapter
    if(map.getLayer('India') != undefined){
      for(var key in forcedLaborData){
        map.setPaintProperty(key,'fill-opacity',0);
        map.setPaintProperty(key+"Name",'text-opacity',0);
      }
    }


  }

  /*= CH2: The World =*/
  else if(currentChapter == 3){

    // opacity of next
    setTimeout(function(){
      next.style.opacity = '0.04';
      nextAsText.style.opacity = '0.04';
    },400)
    setTimeout(function(){
      next.style.opacity = '1';
      nextAsText.style.opacity = '1';
    },25000)

    // Hide the d3 animation
    if(document.getElementById("text-div") != null){
      document.getElementById("text-div").setAttribute("class", "animated fadeOut");
      d3div.setAttribute("class", "animated fadeOut");
      d3div.style.display = 'none';
    }

    // Change the content text
    title.setAttribute("class", "animated fadeOut chapterNameOff");
    descriptionOne.setAttribute("class", "animated fadeOut chapterDescriptionOneOff");
    descriptionTwo.setAttribute("class", "animated fadeOut chapterDescriptionTwoOff");
    setTimeout(function(){
      title.setAttribute("class", "animated fadeIn chapterName");
      title.textContent = "Chapter Two: Forced Labor in the world";
      descriptionOne.setAttribute("class", "animated fadeIn chapterDescriptionOne");
      descriptionOne.textContent = "Forced labor exists in every country, but according to some estimates, more than half of the world’s forced laborers are located in five countries: India, China, Pakistan, Bangladesh, and Uzbekistan, or in the South and East Asia regions.";
      descriptionTwo.setAttribute("class", "animated fadeIn chapterDescriptionTwo");
      descriptionTwo.textContent = "The International Labour Organization (ILO) estimates that there are at least 20.9 million people in forced labour worldwide. The figure means that, at any given point in time, around three out of every 1,000 persons worldwide are suffering in forced labour.";
      // Show the gradient bar
      document.getElementById("colorsGradient").style.display = 'block';
      document.getElementById("colorsGradient").setAttribute("class", "animated fadeIn");
    }, 8000);


    // Bar
    bar.animate(0.34);

    // Opacity of Water and Satellite
    map.setPaintProperty("satellite", 'raster-opacity', 0.45);
    map.setPaintProperty("water", 'fill-opacity', 0.45);

    // Highlight 50 selected countries
    for(var key in forcedLaborData){
      // Normalize the Values
      var minValue = 128800;
      var maxValue = 3388400;
      var normalizeValue =  (forcedLaborData[key].data-minValue)/(maxValue-minValue); // Max value = 18354700, second = 3388400, Min value = 128800
      var colorLabor = Math.floor(map_range(normalizeValue,0, 1, 0, 8));
      var opacityLabor = map_range(normalizeValue,0, 1, 0.4, 0.75);
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
    // map.on("mousemove", function(e) {
    //    var features = map.queryRenderedFeatures(e.point, { layers: ["Countries"] });
    //    if (features.length) {
    //        map.setFilter("CountriesHover", ["==", "NAME", features[0].properties.NAME]);
    //    } else {
    //        map.setFilter("CountriesHover", ["==", "NAME", ""]);
    //    }
    //  });
    //
    //  // Reset the state-fills-hover layer's filter when the mouse leaves the map
    //  map.on("mouseout", function() {
    //      map.setFilter("CountriesHover", ["==", "NAME", ""]);
    //  });

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

  /*= CH3: The US: Part 1 =*/
  else if(currentChapter == 4){

    // opacity of next
    setTimeout(function(){
      next.style.opacity = '0.01';
      nextAsText.style.opacity = '0.01';
    },400)
    setTimeout(function(){
      next.style.opacity = '1';
      nextAsText.style.opacity = '1';
    },17000)

    title.setAttribute("class", "animated fadeOut chapterNameOff");
    descriptionOne.setAttribute("class", "animated fadeOut chapterDescriptionOneOff");
    descriptionTwo.setAttribute("class", "animated fadeOut chapterDescriptionTwoOff");
    // Hide the gradient bar
    document.getElementById("colorsGradient").setAttribute("class", "animated fadeOut");
    document.getElementById("colorsGradient").style.display = 'none';

    // Change the content text
    setTimeout(function(){
      title.setAttribute("class", "animated fadeIn chapterName");
      title.textContent = "Chapter Three: The role of the U.S. Government";
      descriptionOne.setAttribute("class", "animated fadeIn chapterDescriptionOne");
      descriptionOne.textContent = "The U.S. federal government is the largest single purchaser in the global economy, with annual procurement spending that totals between $350 and $500 billion. Like other mega-consumers, it procures through global supply chains that enable large-scale production of goods to varying specifications";
      descriptionTwo.setAttribute("class", "animated fadeIn chapterDescriptionTwo");
      descriptionTwo.textContent = "Given this amount of purchases some of this global supply chains are linked to a range of human rights violations. For example, part of the Military Spending.";
    }, 2000);

    //Remove Previous Layers
    for(var key in forcedLaborData){
      map.setPaintProperty(key,'fill-opacity',0);
      map.setPaintProperty(key+"Name",'text-opacity',0);
    }

    // Bar
    bar.animate(0.4);

    // Layouts
    map.setPaintProperty("satellite", 'raster-opacity', 0.2);
    map.setPaintProperty("water", 'fill-opacity', 0.2);
    map.setPaintProperty("admin-2-boundaries", 'line-opacity', 0.2);
    map.setPaintProperty("admin-3-4-boundaries", 'line-opacity', 0.2);

    // Fly to Map
    map.flyTo({
        center: locations.us,
        zoom : 2.79,
        speed: 0.04,
        curve: 1,
        bearing: 1,
        pitch: 80
    });

  }

  /*= CH3: The US: Part 2 =*/
  else if (currentChapter == 5){

    // opacity of next
    setTimeout(function(){
      next.style.opacity = '0.01';
      nextAsText.style.opacity = '0.01';
    },400)
    setTimeout(function(){
      next.style.opacity = '1';
      nextAsText.style.opacity = '1';
    },52000)

    // Show the USA Description
    setTimeout(function(){
      usaDescription.style.display = 'block';
      usaDescription.setAttribute("class", "animated fadeIn usaDescription");
      map.addLayer({
        "id": "totalAmount",
        "type": "fill-extrusion",
        "source": "usacontinent",
        "source-layer": "USA",
        "layout": {
            "visibility": "visible"
        },
        "paint": {
            "fill-extrusion-base": 0,
            "fill-extrusion-opacity": 0,
            "fill-extrusion-color": colorsUSA[1],
            "fill-extrusion-height": 100000
        }
      });
      animateUsaOne();
    },1000);

    setTimeout(function(){usaDescription.setAttribute("class", "animated fadeOut usaDescription");},18000);

    setTimeout(function(){
      textUsaDescription.innerHTML = "About 51% of the value of the US Government purchases are made with only 100 companies";
      labelUsaDescription.innerHTML = "Top 100 contractors value";
      labelUsaDescription.style.backgroundColor = colorsUSA[2];
      usaDescription.setAttribute("class", "animated fadeIn usaDescription");
      map.setPaintProperty("totalAmount", "fill-extrusion-color", colorsUSA[2]);
      animateUsaTwo();
    },21000);

    setTimeout(function(){usaDescription.setAttribute("class", "animated fadeOut usaDescription");},38000);

    setTimeout(function(){
      textUsaDescription.innerHTML = "Of the top 100 contractors engaged by the U.S. government, more than 46% are defense contractors that most of the times include work overseas that is related to Forced Labor";
      labelUsaDescription.innerHTML = "Military and Defense contractors value";
      labelUsaDescription.style.backgroundColor = colorsUSA[3];
      usaDescription.setAttribute("class", "animated fadeIn usaDescription");
      map.setPaintProperty("totalAmount", "fill-extrusion-color", colorsUSA[3]);
      animateUsaThree();
    },41000);

    // Fill Animations
    function animateUsaOne() {
      map.setPaintProperty("totalAmount", "fill-extrusion-opacity", opacityUsa);
      map.setPaintProperty("totalAmount", "fill-extrusion-height", heightUsa);
      if (heightUsa < 1200000) {
        requestAnimationFrame(animateUsaOne);
        heightUsa = heightUsa + 10000;
        if(opacityUsa < 0.9){
          opacityUsa = opacityUsa + 0.09;
        }
      }
    }

    function animateUsaTwo() {
      map.setPaintProperty("totalAmount", "fill-extrusion-height", heightUsa);
      if (heightUsa > 600000) {
        requestAnimationFrame(animateUsaTwo);
        heightUsa = heightUsa - 10000;
      }
    }

    function animateUsaThree() {
      map.setPaintProperty("totalAmount", "fill-extrusion-height", heightUsa);
      if (heightUsa > 300000) {
        requestAnimationFrame(animateUsaThree);
        heightUsa = heightUsa - 10000;
      }
    }
  }

  /*=  CH4: Military Bases =*/
  else if(currentChapter == 6){

    // opacity of next
    setTimeout(function(){
      next.style.opacity = '0.02';
      nextAsText.style.opacity = '0.02';
    },400)
    setTimeout(function(){
      next.style.opacity = '1';
      nextAsText.style.opacity = '1';
    },14000)

    // Hide the previuos text
    usaDescription.setAttribute("class", "animated fadeOut");
    title.setAttribute("class", "animated fadeOut chapterNameOff");
    descriptionOne.setAttribute("class", "animated fadeOut chapterDescriptionOneOff");
    descriptionTwo.setAttribute("class", "animated fadeOut chapterDescriptionTwoOff");
    document.getElementById("usaDescription").style.display = 'none';

    // Change the content text
    setTimeout(function(){
      // Change the content text
      title.setAttribute("class", "animated fadeIn chapterName");
      title.textContent = "Chapter Four: The Military Bases";
      descriptionOne.setAttribute("class", "animated fadeIn chapterDescriptionOne");
      descriptionOne.textContent = "That means that over 112 and 125 billions dollars are spend in military contractors. Considering that over half of the total military force in Iraq and Afghanistan consisted of private security contractors (PSCs), and, though U.S. law requires that such contractors not engage in “inherently governmental” functions, that definition is unclear and the lines have often blurred.";
      descriptionTwo.setAttribute("class", "animated fadeIn chapterDescriptionTwo");
      descriptionTwo.textContent = "The U.S. Defense Department alone had contractual obligations in Iraq and Afghanistan totaling $160 billion from FY 2007 to FY 2012, more than the total contractual obligations of any other U.S. federal agency";
      // Show the gradient bar
      document.getElementById("militaryBases").style.display = 'block';
      document.getElementById("militaryBases").setAttribute("class", "animated fadeIn chapterName");
    }, 2000);

    // Layouts
    map.setPaintProperty("satellite", 'raster-opacity', 0.35);
    map.setPaintProperty("water", 'fill-opacity', 0.4);
    map.setPaintProperty("admin-2-boundaries", 'line-opacity', 0.8);
    map.setPaintProperty("admin-3-4-boundaries", 'line-opacity', 0.8);

    // Bar
    bar.animate(0.6);

    // Show Previous Layers
    for(var key in forcedLaborData){
      map.setPaintProperty(key,'fill-opacity',0.4);
      map.setPaintProperty(key+"Name",'text-opacity',0.8);
    }

    //Overlay with military base data
    map.addSource('basecamps', {
      'type': 'geojson',
      'data': militaryBaseData
    });

    //Military base layer
    //Include base camps from all over the world
    map.addLayer({
    'id' : 'basecamp-circles',
    'type' : 'circle',
    'source' : 'basecamps',
    'paint' : {
      'circle-color' : '#FF8C00',
      'circle-opacity' : 0.35,
      'circle-radius' : {
        property: 'noCamps',
        stops:[
          [1, 6],
          [142, 50]
        ]
      }
     }
    });

   //popup
   var popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
    });

  map.on('mousemove', function(e) {
    var features = map.queryRenderedFeatures(e.point, { layers: ['basecamp-circles'] });
    // Change the cursor style as a UI indicator.
    map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';

    if (!features.length) {
        popup.remove();
        return;
    }

    var feature = features[0];
    // Populate the popup and set its coordinates
    // based on the feature found.
    popup.setLngLat(feature.geometry.coordinates)
         .setHTML(feature.properties.name + "<br> <b> Military Base </b> : " + feature.properties.noCamps)
         .addTo(map);
  });

    // Fly to Map
    map.flyTo({
        center: locations.worldTiltRight,
        zoom : 2.09,
        speed: 0.06,
        curve: 1,
        bearing: 0,
        pitch: 0
    });

  }

  /*=  CH5: The FAR =*/
  else if(currentChapter == 7){

    // opacity of next
    setTimeout(function(){
      next.style.opacity = '0.02';
      nextAsText.style.opacity = '0.02';
    },400)
    setTimeout(function(){
      next.style.opacity = '1';
      nextAsText.style.opacity = '1';
    },16000)

    // Hide the previuos text
    map.removeLayer("basecamp-circles");
    //reset functions to do nothing
    map.on("mousemove", function(e) {
      return;
    });

    // Reset the state-fills-hover layer's filter when the mouse leaves the map
    map.on("mouseout", function() {
      return;
    });

    title.setAttribute("class", "animated fadeOut chapterNameOff");
    descriptionOne.setAttribute("class", "animated fadeOut chapterDescriptionOneOff");
    descriptionTwo.setAttribute("class", "animated fadeOut chapterDescriptionTwoOff");
    map.setPaintProperty("totalAmount", "fill-extrusion-opacity", 0);

    // Change the content text
    setTimeout(function(){
      title.setAttribute("class", "animated fadeIn chapterName");
      title.textContent = "Chapter Five: The FAR";
      descriptionOne.setAttribute("class", "animated fadeIn chapterDescriptionOne");
      descriptionOne.textContent = "In its procurement code, entitled the Federal Acquisition Regulation (FAR), the United States implements standards for some, but not all, of the rights laid out in the treaties it has ratified. For example, the FAR includes procurement standards to prohibit forced or indentured child labor and human trafficking.";
      descriptionTwo.setAttribute("class", "animated fadeIn chapterDescriptionTwo");
      descriptionTwo.textContent = "The U.S. government’s effectivity set to protect Human Rights can be analyze with the amount of Banned Contractors related to Human Trafficking.";
      document.getElementById("militaryBases").style.display = 'none';
      document.getElementById("militaryBases").setAttribute("class", "animated fadeOut");
    }, 1000);

    //Remove Previous Layers
    for(var key in forcedLaborData){
      map.setPaintProperty(key,'fill-opacity',0);
      map.setPaintProperty(key+"Name",'text-opacity',0);
    }

    // Layouts
    map.setPaintProperty("satellite", 'raster-opacity', 0.0);
    map.setPaintProperty("water", 'fill-opacity', 0.0);
    map.setPaintProperty("admin-2-boundaries", 'line-opacity', 0);
    map.setPaintProperty("admin-3-4-boundaries", 'line-opacity', 0);

    // Bar
    bar.animate(0.8);

    // Show Graph
    setTimeout(function(){
      document.getElementById("d3-2").style.display = 'block';
      document.getElementById("d3-2").setAttribute("class", "animated fadeIn chapterDescriptionOne");
      textAnimation();
    },5000);

    //In case of going backwards
    credits.style.display = 'none';

  }

  /*=  CH6: The Finale =*/
  else if(currentChapter == 8){

    // opacity of next
    setTimeout(function(){
      next.style.opacity = '0.02';
      nextAsText.style.opacity = '0.02';
    },400)

    // Hide the previuos text
    document.getElementById("d3-2").style.display = 'none';
    title.setAttribute("class", "animated fadeOut");
    descriptionOne.setAttribute("class", "animated fadeOut");
    descriptionTwo.setAttribute("class", "animated fadeOut");

    // Change the content text
    setTimeout(function(){
      title.setAttribute("class", "animated fadeIn");
      title.textContent = "Chapter Six: What can goverments do?";
      descriptionOne.setAttribute("class", "animated fadeIn");
      descriptionOne.textContent = "Just in security, military and defense expendings alone, the U.S. Government global supply chains are linked to a range of human rights violations. Nontheless, not a single contractors has been terminated due to Forced Labor.";
      descriptionTwo.setAttribute("class", "animated fadeIn");
      descriptionTwo.textContent = "Using the U.S. government’s purchasing power in this way is in line with its duty to protect human rights under the United Nations Guiding Principles on Business and Human Rights";
    }, 2000);


    // Bar
    bar.animate(1);

    // Show the Credits
    setTimeout(function(){
      credits.style.display = 'block';
      credits.setAttribute("class", "animated fadeIn");
    },2000);
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
  if(currentChapter < 8 ){
    currentChapter += 1;
    console.log("Current chapter is: " + currentChapter);
    changeChapter();
    if(currentChapter < 1){
      currentChapter = 1;
    }
  }
});
// Previous
document.getElementById('previous').addEventListener('click', function () {
  if(currentChapter > 0){
    currentChapter -= 1;
    console.log("Current chapter is: " + currentChapter);
    changeChapter();
    if(currentChapter > 8){
      currentChapter = 8;
    }
  }
});

// Map Function
function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}
