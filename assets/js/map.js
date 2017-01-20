/**

Main File for the Visualization

*/
var currentChapter = 1;
var title = document.getElementById('chapterName');
var descriptionOne = document.getElementById('chapterDescriptionOne');
var descriptionTwo = document.getElementById('chapterDescriptionTwo');
var descriptionThree = document.getElementById('chapterDescriptionThree');
var colors = ['#fff7ec','#fee8c8','#fdd49e','#fdbb84','#fc8d59','#ef6548','#d7301f','#b30000','#7f0000']
var colorsUSA = ['#453B52','#41607A','#288993','#30B097','#73D487','#CAF270'];
var baseCountries = ["Bahrain", "United Arab Emirates", "Qatar", "Saudi Arabia"];
var forcedLaborData, militaryBaseData;
var usaDescription = document.getElementById("usaDescription");
var textUsaDescription = document.getElementById("textUsaDescription");
var labelUsaDescription = document.getElementById("labelUsaDescription");
var labelUsaDescriptionTwo = document.getElementById("labelUsaDescription2");
var labelUsaDescriptionThree = document.getElementById("labelUsaDescription3");
var credits = document.getElementById("credits");
var next = document.getElementById("next");
var previous = document.getElementById("previous");
var nextasText = document.getElementById("nextAsText");
var previousasText = document.getElementById("previousAsText");
var d3div = document.getElementById("d3");
var textDiv = document.getElementById("text-div");
var soundIcon = document.getElementById("soundIcon");
var sound = document.getElementById("sound")
var heightUsa = 0;
var heightUsaTwo = 0;
var heightUsaThree = 0;
var opacityUsa = 0;
var opacityUsaTwo = 0;
var opacityUsaThree = 0;
var id = 1;
next.style.cursor = "pointer";
previous.style.cursor = "pointer";
nextAsText.style.cursor = "pointer";
previousAsText.style.cursor = "pointer";

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

// Show everything once all data is loaded
Pace.on('done', function() {
    if(document.documentElement.clientWidth < 930){
      document.getElementById("unsupported").style.display = "block";
      document.getElementById("content").style.display = "none";
    }
    else{
      document.getElementById("content").style.display = "block";
      document.getElementById("unsupported").style.display = "none";
    }
 });

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

// Change the Sound Icon
function soundOnOff(){
  console.log("here")
    if (soundIcon.alt == "soundOn"){
      soundIcon.alt = "soundOff";
      soundIcon.src = "./assets/imgs/sound_off.png"
      sound.pause();
    }
    else if (soundIcon.alt == "soundOff"){
      soundIcon.alt= "soundOn";
      soundIcon.src = "./assets/imgs/sound_on.png"
      sound.play();
    }
}

/* Access to Mapbox gl */
mapboxgl.accessToken = 'pk.eyJ1IjoiY3ZhbGVuenVlbGEiLCJhIjoiY2l2ZzkweTQ3MDFuODJ5cDM2NmRnaG4wdyJ9.P_0JJXX6sD1oX2D0RQeWFA';
if (!mapboxgl.supported()) {
    alert('Sorry, but your browser cannot not support this visualization.');
} else{
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
}
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

/* Show or Hide layers */
function showOrHide(type, arrayOfCountries){
  for(var i = 0; i < arrayOfCountries.length; i++){
    map.setLayoutProperty(arrayOfCountries[i], 'visibility', type);
  }
}

/* Listen to the Navegations Controlls and Change the Current Chapter*/
// Next
document.getElementById('next').addEventListener('click', function () {
  if(currentChapter < 9 ){
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
    if(currentChapter > 9){
      currentChapter = 9;
    }
  }
});

// Map Function
function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

/*== Select the View depending on the Current Chapter ==*/
function changeChapter(){

  /////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  ////////////////////// CH1: Blank Start ////////// //////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////

  if(currentChapter == 1){

    // Change the content text
    title.textContent = "Chapter One: Forced Labor";
    descriptionOne.textContent = "Forced labor occurs when people are coerced to work through violence, intimidation, and in more subtle ways.";
    descriptionTwo.textContent = "Many workers are forced to stay in their jobs so they can pay off hefty recruitment fees. Some migrant workers have their identity papers confiscated by their employer, or are threatened with deportation if they attempt to assert their rights.";

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
      clearAnimation();
    }

    // Opacity of navegation
    next.style.opacity = '1';
    nextAsText.style.opacity = '1';
  }

  /////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  ////////////////////// CH2: Animation ///////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////

  else if(currentChapter == 2){

    // Change the content text
    title.textContent = "Chapter One: Forced Labor";
    descriptionOne.textContent = "Forced labor occurs when people are coerced to work through violence, intimidation, and in more subtle ways. ";
    descriptionTwo.textContent = "Many workers are forced to stay in their jobs so they can pay off hefty recruitment fees. Some migrant workers have their identity papers confiscated by their employer, or are threatened with deportation if they attempt to assert their rights.";

    // Opacity of navegation
    setTimeout(function(){
      next.style.opacity = '0.04';
      nextAsText.style.opacity = '0.04';
    },400)
    setTimeout(function(){
      next.style.opacity = '1';
      nextAsText.style.opacity = '1';
    },38000)

    // Animation Start
    if(document.getElementById("text-div") != null){
      document.getElementById("text-div").style.display = 'block';
      document.getElementById("d3").style.display = 'block';
    }
    clearAnimation();
    beginAnimation();

    // Bar
    bar.animate(0.2);

    // Fly to Map
    map.flyTo({
        center: locations.waterZoom,
        zoom : 7.58,
        speed: 0.2,
        curve: 1
    });

    //In case of going backwards, remove Layers from previous chapter
    if(map.getLayer('Democratic Republic of the Congo') != undefined){
      for(var key in forcedLaborData){
        map.removeLayer(key);
        map.removeLayer("Name"+key);
      }
    }
    document.getElementById("colorsGradient").style.display = 'none'; // Hide the gradient bar

  }

  /////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  ////////////////////// CH3: Slavery in the Wolrd ////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////

  else if(currentChapter == 3){

    // Opacity of next
    setTimeout(function(){
      next.style.opacity = '0.04';
      nextAsText.style.opacity = '0.04';
    },400)
    setTimeout(function(){
      next.style.opacity = '1';
      nextAsText.style.opacity = '1';
    },19000)

    // Hide the previous D3 animation
    if(document.getElementById("text-div") != null){
      document.getElementById("text-div").setAttribute("class", "animated fadeOut");
      d3div.setAttribute("class", "animated fadeOut");
      d3div.style.display = 'none';
      clearAnimation();
    }

    // Change the content text
    title.setAttribute("class", "animated fadeOut chapterNameOff");
    descriptionOne.setAttribute("class", "animated fadeOut chapterDescriptionOneOff");
    descriptionTwo.setAttribute("class", "animated fadeOut chapterDescriptionTwoOff");
    setTimeout(function(){
      title.setAttribute("class", "animated fadeIn chapterName");
      title.textContent = "Chapter Two: Forced Labor Around the World";
      descriptionOne.setAttribute("class", "animated fadeIn chapterDescriptionOne");
      descriptionOne.textContent = "Forced labor exists in every country, but according to some estimates, more than half of the world’s forced laborers are located in just five countries - India, China, Pakistan, Bangladesh, and Uzbekistan - concentrated in the Central, South, and Southeast regions of Asia.";
      descriptionTwo.setAttribute("class", "animated fadeIn chapterDescriptionTwo");
      descriptionTwo.textContent = "The International Labour Organization (ILO) estimates that there are at least 20.9 million people in conditions of forced labor worldwide.";
      // Show the gradient bar
      document.getElementById("colorsGradient").style.display = 'block';
      document.getElementById("colorsGradient").setAttribute("class", "animated fadeIn");
    }, 2000);

    // Bar
    bar.animate(0.34);

    // Opacity of Water and Satellite
    map.setPaintProperty("satellite", 'raster-opacity', 0.25);
    map.setPaintProperty("water", 'fill-opacity', 0.45);

    // Highlight 50 selected countries
    for(var key in forcedLaborData){
      // Normalize the Values
      var minValue = -4.761904762;
      var maxValue = 31.86507937;
      var normalizeValue =  (forcedLaborData[key].slavery_index - minValue)/(maxValue-minValue);
      console.log(normalizeValue);
      var colorLabor = Math.floor(map_range(normalizeValue,0, 1, 1, 8));
      var opacityLabor = map_range(normalizeValue,0, 1, 0.1, 0.85);
      if(opacityLabor >= 1){
        opacityLabor = 1;
      }
      if(colorLabor >= 8){
        colorLabor = 8;
      }
      id++;
      map.addLayer({
        "id": key,
        "type": "fill",
        "source": "composite",
        "source-layer": "ne_10m_admin_0_countries-6howmk",
        "filter": ["==", "NAME", forcedLaborData[key].country],
        "paint": {
          "fill-opacity": opacityLabor,
          "fill-color": colors[colorLabor],
          "fill-outline-color": colors[colorLabor]
        }
      });

      map.addLayer({
        "id": "Name"+key,
        "type": "symbol",
        "source": "composite",
        "source-layer": "country_label",
        "minzoom": 0,
        "maxzoom": 22,
        "filter": ["==", "name_en", forcedLaborData[key].name_en],
        "layout": {
            "visibility": "visible",
            "text-field": "{name_en}",
            "text-font": [
                "DIN Offc Pro Medium",
                "Arial Unicode MS Regular"
            ],
            "text-size": {
                "base": 1,
                "stops": [[1,10],[2,10],[3,10]]
            }
        },
        "paint": {
            "text-color": "hsl(0, 0%, 84%)",
            "text-opacity": 1
        }
        });
    }

    // Fly to Map
    map.flyTo({
        center: locations.worldTiltRight,
        zoom : 2.1,
        speed: 0.06,
        curve: 2,
        bearing: 0,
        pitch: 0
    });

    // Hide the USA
    usaDescription.style.display = 'none';
    descriptionThree.style.display = 'none';
    if(map.getLayer("totalAmount") != undefined){
      map.setPaintProperty("totalAmount", "fill-extrusion-opacity", 0);
      map.setPaintProperty("totalAmount", "fill-extrusion-height", 300000);
    }

  }

  /////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  ////////////////////// CH4: The US: Part One ////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////

  else if(currentChapter == 4){

    // opacity of next
    setTimeout(function(){
      next.style.opacity = '0.01';
      nextAsText.style.opacity = '0.01';
    },400)
    setTimeout(function(){
      next.style.opacity = '1';
      nextAsText.style.opacity = '1';
    },10000)

    title.setAttribute("class", "animated fadeOut chapterNameOff");
    descriptionOne.setAttribute("class", "animated fadeOut chapterDescriptionOneOff");
    descriptionTwo.setAttribute("class", "animated fadeOut chapterDescriptionTwoOff");
    // Hide the gradient bar
    document.getElementById("colorsGradient").setAttribute("class", "animated fadeOut");
    document.getElementById("colorsGradient").style.display = 'none';

    // Change the content text
    setTimeout(function(){
      title.setAttribute("class", "animated fadeIn chapterName");
      title.textContent = "Chapter Three: The Role of the U.S. Government";
      descriptionOne.setAttribute("class", "animated fadeIn chapterDescriptionOne");
      descriptionOne.textContent = "The U.S. federal government is the largest single purchaser in the global economy, with annual procurement spending that totals between US $450 and $500 billion. Many of the products it procures are produced using global supply chains, by laborers in foreign countries.";
      descriptionTwo.setAttribute("class", "animated fadeIn chapterDescriptionTwo");
      descriptionTwo.textContent = "Given this amount of purchases, it is inevitable that concerns over human rights abuses, including forced labor, will arise in some of these supply chains.";
      descriptionThree.style.display = 'block';
      descriptionThree.textContent = "Defense-related spending constitutes the single largest type of procurement for the U.S. government.";
    }, 1000);

    //Remove Previous Layers
    for(var key in forcedLaborData){
      map.setPaintProperty(key,'fill-opacity',0);
      map.setPaintProperty("Name"+key,'text-opacity',0);
    }

    // Bar
    bar.animate(0.4);

    // Layouts
    map.setPaintProperty("satellite", 'raster-opacity', 0.1);
    map.setPaintProperty("water", 'fill-opacity', 0.1);
    map.setPaintProperty("admin-2-boundaries", 'line-opacity', 0.1);

    // Fly to Map
    map.flyTo({
        center: locations.us,
        zoom : 2.79,
        speed: 0.06,
        curve: 1,
        bearing: 1,
        pitch: 80
    });

  }

  /////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  ////////////////////// CH5: The US: Part Two ////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////

  else if (currentChapter == 5){

    // Change the content text
    setTimeout(function(){
      title.setAttribute("class", "animated fadeIn chapterName");
      title.textContent = "Chapter Three: The Role of the U.S. Government";
      descriptionOne.setAttribute("class", "animated fadeIn chapterDescriptionOne");
      descriptionOne.textContent = "The U.S. federal government is the largest single purchaser in the global economy, with annual procurement spending that totals between US $450 and $500 billion. Many of the products it procures are produced using global supply chains, by laborers in foreign countries.";
      descriptionTwo.setAttribute("class", "animated fadeIn chapterDescriptionTwo");
      descriptionTwo.textContent = "Given this amount of purchases, it is inevitable that concerns over human rights abuses, including forced labor, will arise in some of these supply chains.";
      descriptionThree.style.display = 'block';
      descriptionThree.textContent = "Defense-related spending constitutes the single largest type of procurement for the U.S. government.";
    }, 1000);

    // Layouts
    map.setPaintProperty("satellite", 'raster-opacity', 0.2);
    map.setPaintProperty("water", 'fill-opacity', 0.2);
    map.setPaintProperty("admin-2-boundaries", 'line-opacity', 0.2);

    // opacity of next
    setTimeout(function(){
      next.style.opacity = '0.01';
      nextAsText.style.opacity = '0.01';
    },400)
    setTimeout(function(){
      next.style.opacity = '1';
      nextAsText.style.opacity = '1';
    },31000)

    // Show the First Description
    setTimeout(function(){
      usaDescription.style.display = 'block';
      usaDescription.setAttribute("class", "animated fadeIn usaDescription");
      map.addLayer({
        "id": "defense",
        "type": "fill-extrusion",
        "source": "usacontinent",
        "source-layer": "USA",
        "layout": {
            "visibility": "none"
        },
        "paint": {
            "fill-extrusion-base": 0,
            "fill-extrusion-opacity": 0,
            "fill-extrusion-color": colorsUSA[0],
            "fill-extrusion-height": 100000
        }
      });
      map.addLayer({
        "id": "topHundred",
        "type": "fill-extrusion",
        "source": "usacontinent",
        "source-layer": "USA",
        "layout": {
            "visibility": "none"
        },
        "paint": {
            "fill-extrusion-base": 0,
            "fill-extrusion-opacity": 0,
            "fill-extrusion-color": colorsUSA[4],
            "fill-extrusion-height": 100000
        }
      });
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
    },200);

    // Show the Second Description
    setTimeout(function(){
      textUsaDescription.innerHTML = "The US government makes the majority of its purchases from only 100 contractors.";
      //textUsaDescription.setAttribute("class", "col-xs-12 animated fadeIn usaDescription");
      labelUsaDescriptionTwo.style.display = "inline-block";
      map.setLayoutProperty("topHundred", "visibility", "visible");
      animateUsaTwo();
    },11000);

    // Show the Third Description
    setTimeout(function(){
      textUsaDescription.innerHTML = "Of these top 100 contractors, more than 46% are defense and aerospace corporations. These corporations provide many defense-related services to the government, including weapons production and the maintenance of U.S. military bases around the world.";
      //textUsaDescription.setAttribute("class", "col-xs-12 animated fadeIn usaDescription");
      labelUsaDescriptionThree.style.display = "inline-block";
      map.setLayoutProperty("defense", "visibility", "visible");
      animateUsaThree();
    },22000);

    // Fill Animations
    function animateUsaOne() {
      map.setPaintProperty("totalAmount", "fill-extrusion-opacity", opacityUsa);
      map.setPaintProperty("totalAmount", "fill-extrusion-height", heightUsa);
      if (heightUsa < 1000000) {
        requestAnimationFrame(animateUsaOne);
        heightUsa = heightUsa + 10000;
        if(opacityUsa < 0.9){
          opacityUsa = opacityUsa + 0.2;
        }
      }
      else{
        cancelAnimationFrame(animateUsaOne);
      }
    }

    function animateUsaTwo() {
      map.setPaintProperty("topHundred", "fill-extrusion-opacity", opacityUsaTwo);
      map.setPaintProperty("topHundred", "fill-extrusion-height", heightUsaTwo);
      if (heightUsaTwo < 500000) {
        requestAnimationFrame(animateUsaTwo);
        heightUsaTwo = heightUsaTwo + 10000;
        if(opacityUsaTwo < 0.9){
          opacityUsaTwo = opacityUsaTwo + 0.2;
        }
      }
      else{
        map.setPaintProperty("totalAmount", "fill-extrusion-base", 500000);
        cancelAnimationFrame(animateUsaTwo);
      }
    }

    function animateUsaThree() {
      map.setPaintProperty("defense", "fill-extrusion-opacity", opacityUsaThree);
      map.setPaintProperty("defense", "fill-extrusion-height", heightUsaThree);
      if (heightUsaThree < 250000) {
        requestAnimationFrame(animateUsaThree);
        heightUsaThree = heightUsaThree + 10000;
        if(opacityUsaThree < 0.9){
          opacityUsaThree = opacityUsaThree + 0.2;
        }
      }
      else{
        map.setPaintProperty("topHundred", "fill-extrusion-base", 250000);
        cancelAnimationFrame(animateUsaThree);
      }
    }

    // Fly to Map
    map.flyTo({
        center: locations.us,
        zoom : 2.79,
        speed: 0.06,
        curve: 1,
        bearing: 1,
        pitch: 80
    });

    // In case of going backwards
    if(map.getLayer("basecamp-circles") != undefined){
      map.setPaintProperty("basecamp-circles", "circle-opacity", 0);
    }

  }

  /////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  ////////////////////// CH6: Military Bases in the World /////////////////////
  /////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////

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
    descriptionThree.setAttribute("class", "animated fadeOut chapterDescriptionTwoOff");
    //descriptionThree.style.display = 'none';
    map.removeLayer("totalAmount");
    map.removeLayer("topHundred");
    map.removeLayer("defense");

    // Change the content text
    setTimeout(function(){
      // Change the content text
      title.setAttribute("class", "animated fadeIn chapterName");
      title.textContent = "Chapter Four: U.S. Military Bases Around the World";
      descriptionOne.setAttribute("class", "animated fadeIn chapterDescriptionOne");
      descriptionOne.textContent = "That means that the U.S. Spends around US $200 each year on military-related services.";
      descriptionTwo.setAttribute("class", "animated fadeIn chapterDescriptionTwo");
      descriptionTwo.textContent = "The U.S. Defense Department had contractual obligations in Iraq and Afghanistan totaling $160 billion from 2007 to 2012, more than any other federal agency.";
      // Show the bases key
      document.getElementById("militaryBasesKey").style.display = 'block';
      document.getElementById("militaryBasesKey").setAttribute("class", "animated fadeIn chapterName");
      // Show the gradient bar
      document.getElementById("colorsGradient").setAttribute("class", "animated fadeIn");
      document.getElementById("colorsGradient").style.display = 'block';
    }, 2000);

    // Layouts
    map.setPaintProperty("satellite", 'raster-opacity', 0.3);
    map.setPaintProperty("water", 'fill-opacity', 0.4);
    map.setPaintProperty("admin-2-boundaries", 'line-opacity', 0.6);

    // Bar
    bar.animate(0.6);

    // Show Previous Layers
    for(var key in forcedLaborData){
      map.setPaintProperty(key,'fill-opacity',0.6);
      map.setPaintProperty("Name"+key,'text-opacity',0.8);
    }

    //overlay with military base data
     map.addSource('basecamps', {
             'type': 'geojson',
             'data': militaryBaseData
     });

     //military base layer
     //include base camps from all over the world
     map.addLayer({
       'id' : 'basecamp-circles',
       'type' : 'circle',
       'source' : 'basecamps',
       'paint' : {
           'circle-color' : '#FF8C00',
           'circle-opacity' : 0.45,
           'circle-radius' : {
             property: 'total',
             stops:[
               [0,0],
               [1, 5],
               [176, 65]
             ]
           }
       }
     });

     map.addLayer({
       'id' : 'unconfirmed-circles',
       'type' : 'circle',
       'source' : 'basecamps',
       'paint' : {
           'circle-color' : '#ff1919',
           'circle-opacity' : 0.35,
           'circle-radius' : {
             property: 'unconfirmed',
             stops:[
               [0,0],
               [1, 6]
             ]
           }
       }
     });

     var popup = new mapboxgl.Popup({
         closeButton: false,
         closeOnClick: false
     });

     //popup displays country & number of maps
    //  map.on('mousemove', function(e) {
    //    var features = map.queryRenderedFeatures(e.point, { layers: ['basecamp-circles'] });
    //    // Change the cursor style as a UI indicator.
    //    map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
     //
    //    if (!features.length) {
    //        popup.remove();
    //        return;
    //    }
     //
    //    var feature = features[0];
    //    // Populate the popup and set its coordinates
    //    // based on the feature found.
     //
    //    var prop = feature.properties;
    //    var popupstring = prop.name;
    //    if( prop.total > 0){
    //      popupstring += "<br> <b> Military Base </b> : " + prop.total;
    //    }
     //
    //    if(prop.unconfirmed > 0){
    //      popupstring += "<br> <b> Unconfirmed military bases </b> "
    //    }
     //
    //    popup.setLngLat(feature.geometry.coordinates)
    //        .setHTML(popupstring)
    //        .addTo(map);
    //  });

    // Fly to Map
    map.flyTo({
        center: locations.worldTiltRight,
        zoom : 2.09,
        speed: 0.06,
        curve: 1,
        bearing: 0,
        pitch: 0
    });

    // In case of going backwards
    document.getElementById("d3-2").style.display = 'none';

  }

  /////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  ////////////////////// CH7: The FAR /////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////

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

    // Hide the bases key
    document.getElementById("militaryBasesKey").style.display = 'none';
    document.getElementById("militaryBasesKey").setAttribute("class", "animated fadeOut");
    // Hide the gradient bar
    document.getElementById("colorsGradient").setAttribute("class", "animated fadeOut");
    document.getElementById("colorsGradient").style.display = 'none';
    // Fade off text descriptions
    title.setAttribute("class", "animated fadeOut chapterNameOff");
    descriptionOne.setAttribute("class", "animated fadeOut chapterDescriptionOneOff");
    descriptionTwo.setAttribute("class", "animated fadeOut chapterDescriptionTwoOff");

    // Change the content text
    setTimeout(function(){
      title.setAttribute("class", "animated fadeIn chapterName");
      title.textContent = "Chapter Five: The FAR";
      descriptionOne.setAttribute("class", "animated fadeIn chapterDescriptionOne");
      descriptionOne.textContent = "The U.S. Federal Acquisition Regulation (FAR) lays out the rules for government procurement. These rules include prohibitions on purchasing goods produced by forced or indentured labor, child labor or victims of human trafficking.";
      descriptionTwo.setAttribute("class", "animated fadeIn chapterDescriptionTwo");
      descriptionTwo.textContent = "In August 2007, the U.S. government adopted standards meant to ban the purchase of goods involving forced labor at any point in the supply chain.";
      descriptionThree.style.display = 'block';
      descriptionThree.textContent = "We can analyze the extent to which the government implements the FAR’s rules using its own data on the contractors it bans from receiving government contracts.";
    }, 1000);

    //Remove Previous Layers
    for(var key in forcedLaborData){
      map.setPaintProperty(key,'fill-opacity',0);
      map.setPaintProperty("Name"+key,'text-opacity',0);
    }

    map.removeLayer("unconfirmed-circles");
    map.removeLayer("basecamp-circles");

    // Layouts
    map.setPaintProperty("satellite", 'raster-opacity', 0.0);
    map.setPaintProperty("water", 'fill-opacity', 0.0);
    map.setPaintProperty("admin-2-boundaries", 'line-opacity', 0);

    // Bar
    bar.animate(0.8);

    // Show Graph
    setTimeout(function(){
      document.getElementById("d3-2").style.display = 'block';
      document.getElementById("d3-2").setAttribute("class", "animated fadeIn chapterDescriptionOne");
      textAnimation();
    },5000);

  }

  /////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  ////////////////////// CH8: What can Govermens Do? //////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////

  else if(currentChapter == 8){

    // opacity of next
    setTimeout(function(){
      next.style.opacity = '0.02';
      nextAsText.style.opacity = '0.02';
    },400)
    setTimeout(function(){
      next.style.opacity = '1';
      nextAsText.style.opacity = '1';
    },5000)

    // Hide the previuos D3 Chart
    document.getElementById("d3-2").style.display = 'none';
    title.setAttribute("class", "animated fadeOut");
    descriptionOne.setAttribute("class", "animated fadeOut");
    descriptionTwo.setAttribute("class", "animated fadeOut");
    document.getElementById("thePoint").style.display = 'none';

    // Change the content text
    setTimeout(function(){
      title.setAttribute("class", "animated fadeIn");
      title.textContent = "Chapter Six: What Can the Government Do, Anyway?";
      descriptionOne.setAttribute("class", "animated fadeIn");
      descriptionOne.textContent = "Since some materials for weapons are sourced abroad, and more than 70,000 foreign nationals are employed on U.S. military bases, it is unlikely that U.S. military purchases have never involved forced labor. Nonetheless, the data the government provides to the public does not list any restrictions for violations of rules related to forced labor or human trafficking. This either means that the government is not regularly implementing it's own rules, or that it is not providing public and transparent information on when it does.";
      descriptionTwo.setAttribute("class", "animated fadeIn");
      descriptionTwo.textContent = "The U.S. government can use its purchasing power to promote positive labor standards around the world. While it cannot oversee all aspects of supply chains related to its purchases, it can give teeth to some of the FAR’s stronger rules by implementing them more regularly, and by reporting on that implementation in its relevant public databases. This would send a message to suppliers around the world that if they want to have the world’s biggest purchaser as a customer, they need to shape up.";
      descriptionThree.style.display = 'none';
    }, 2000);

    // Show final image
    document.getElementById('finalImage').setAttribute("class", "animated fadeIn chapterName");
    document.getElementById('finalImage').style.display = 'block'

    // Bar
    bar.animate(0.9);

    // Make the point
    setTimeout(function(){
      none.style.display = 'inline-block';
      none.setAttribute("class", "animated fadeIn");
    },3000);
    setTimeout(function(){
      thePoint.style.display = 'inline-block';
      thePoint.setAttribute("class", "thePoint animated fadeIn chapterName");
    },5000);

    //In case of going backwards
    credits.style.display = 'none';

  }

  /////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  ////////////////////// CH9: The End /////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////

  else if(currentChapter == 9){

    // Hide the previuos text
    document.getElementById("navegation").setAttribute("class", "row text-center animated fadeOut");
    document.getElementById("d3-2").style.display = 'none';
    title.setAttribute("class", "animated fadeOut");
    descriptionOne.setAttribute("class", "animated fadeOut");
    descriptionTwo.setAttribute("class", "animated fadeOut");
    document.getElementById("thePoint").style.display = 'none';

    // Show the Credits
    setTimeout(function(){
      credits.style.display = 'block';
      credits.setAttribute("class", "animated fadeIn");
    },2000);

    // Hide final image
    document.getElementById('finalImage').setAttribute("class", "animated fadeOut chapterName");

    // Hide the menu bar
    document.getElementById('description').setAttribute("class", "animated fadeOut chapterName");

    // Bar
    bar.animate(1);

    // Layouts
    map.setPaintProperty("satellite", 'raster-opacity', 0.2);
    map.setPaintProperty("water", 'fill-opacity', 0.2);
    map.setPaintProperty("admin-2-boundaries", 'line-opacity', 0.2);
  }

}
