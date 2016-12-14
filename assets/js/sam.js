var width = 800, height = 470;

var svg = d3.select("#d3-2").append("svg").attr("width", width).attr("height", height);


var fader = function(color) { return d3.interpolateRgb(color, "#fff")(0.2); },
    color = d3.scaleOrdinal(d3.schemeCategory20.map(fader)),
    format = d3.format(",d");

// Define the div for the tooltip
var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

var treemap = d3.treemap()
    .tile(d3.treemapResquarify)
    .size([width, height])
    .round(true)
    .paddingInner(1);

d3.json("assets/data/sam.json", function(error, data) {
  if (error) throw error;

  var root = d3.hierarchy(data)
      .eachBefore(function(d) { d.data.id = (d.parent ? d.parent.data.id + "." : "") + d.data.name; })
      .sum(sumBySize)
      .sort(function(a, b) { return b.height - a.height || b.value - a.value; });

  treemap(root);

  var cell = svg.selectAll("g")
    .data(root.leaves())
    .enter().append("g")
      .attr("pointer-events", "all")
      .attr("transform", function(d) { return "translate(" + d.x0 + "," + d.y0 + ")"; });


  cell.append("rect")
      .attr("id", function(d) { return d.data.id; })
      .attr("class", "sam")
      .attr("width", function(d) {
      		d.width = d.x1 - d.x0 - 1.5;
      		return d.x1 - d.x0 - 1.5;
      	}
      	)
      .attr("height", function(d) {
      		d.height = d.y1 - d.y0 - 1.5;
      		return d.y1 - d.y0 - 1.5;
      })
      .attr("x", width/1.5)
      .attr("y", height/3.25)
      .attr("fill", function(d) {
      	return color(d.data.color);
      });


      cell.append("foreignObject")
          .attr("class", "foreignObject")
          .attr("width", function(d) {
              return d.width;
          })
          .attr("height", function(d) {
              return d.height;
          })
          .attr("x", width/1.5)
          .attr("y", height/3.25)
          .on("mouseover", function(d){
             div.transition()
                    .duration(200)
                    .style("opacity", 1);
             div.html("<b> Reason For Termination :  </b>" +  d.data.name  + "<br> <b> Contracts Terminated:  </b>" + d.data.size +
                      "<br> <b> Percentage: </b> " + d.data.percent + "%")
                    .style("left", (d.width / 2) + d.x0 +  width/1.5 + "px")
                    .style("top",  (d.height / 2) + d.y0 +  height/3.25 + "px");

          })
          .on("mouseout", function(d){
              div.transition()
                 .duration(200)
                 .style("opacity", 0);
          })
          .append("xhtml:body")
          .attr("class", "labelbody")
          .append("div")
          .attr("class", "treemap-label")
          .text(function(d) {
              if(d.data.percent < 0.04){
                return "";
              }
              return d.data.name;
          })
          .attr("text-anchor", "middle");

  var timeout = d3.timeout(function() {
    d3.select("input[value=\"sumByCount\"]")
        .property("checked", true)
        .dispatch("change");
  }, 2000);

  function changed(sum) {
    timeout.stop();

    treemap(root.sum(sum));

    cell.transition()
        .duration(750)
        .attr("transform", function(d) { return "translate(" + d.x0 + "," + d.y0 + ")"; })
      .select("rect")
        .attr("width", function(d) { return d.x1 - d.x0; })
        .attr("height", function(d) { return d.y1 - d.y0; });
  }
});


function sumBySize(d) {
  return d.size;
}

// //text animation
var d3div2 = document.getElementById('d3-2');
var textDiv3 = document.createElement("div");
var textDiv4 = document.createElement("div");
d3div2.appendChild(textDiv3);
d3div2.appendChild(textDiv4);

textDiv3.id = "text-div-3";
textDiv4.id = "text-div-4";

function textAnimation(){
	textDiv3.style.left = "33%";
	textDiv3.style.top = "9%";
	textDiv3.innerHTML = "Since August 1, 2007, at least 25051 individuals and firms have been restricted from obtaining US government contracts due to convictions related to vilations visualized below."
	textDiv3.classList.add("animated");
	textDiv3.classList.add("fadeIn");

  textDiv4.style.left = "33%";
  textDiv4.style.top = "85%";
  textDiv4.innerHTML = "NONE have been excluded from US government contracts due to human trafficking or forced labor."
  textDiv4.classList.add("animated");
  textDiv4.classList.add("fadeIn");
}

//setTimeout(textAnimation, 3000);
