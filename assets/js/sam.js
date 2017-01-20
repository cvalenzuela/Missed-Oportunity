var width2 = window.innerWidth / 1.85, height2 = window.innerHeight/ 1.65;

var svg2 = d3.select("#d3-2").append("svg").attr("width", width2).attr("height", height2),
    format = d3.format(",d"),
    color = ["#9FA8DA", "#FFB74D", "#FF7043", "#9CCC65", "#9575CD", "#BA68C8", "#EF5350", "#26A69A", "#26C6DA", "#66BB6A"];

// Define the div for the tooltip
var div_tip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

var treemap = d3.treemap()
    .tile(d3.treemapResquarify)
    .size([width2, height2])
    .round(true)
    .paddingInner(1);

d3.json("/assets/data/sam.json", function(error, data) {
  if (error) throw error;

  var root = d3.hierarchy(data)
      .eachBefore(function(d) { d.data.id = (d.parent ? d.parent.data.id + "." : "") + d.data.name; })
      .sum(sumBySize)
      .sort(function(a, b) { return b.height - a.height || b.value - a.value; });

  treemap(root);

  var cell = svg2.selectAll("g")
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
      .attr("x", width2/1.43)
      .attr("y", height2/3.25)
      .attr("fill", function(d, i) {
          return color[i];
      });


      cell.append("foreignObject")
          .attr("class", "foreignObject")
          .attr("width", function(d) {
              return d.width;
          })
          .attr("height", function(d) {
              return d.height;
          })
          .attr("x", width2/1.43)
          .attr("y", height2/3.25)
          .on("mouseover", function(d){
             div_tip.transition()
                    .duration(200)
                    .style("opacity", 1);
             div_tip.html("<b> Reason For Termination :  </b>" +  d.data.name  + "<br> <b> Contracts Terminated:  </b>" + d.data.size)
                    .style("left", (d.width / 2) + d.x0 +  width2/1.5 + "px")
                    .style("top",  (d.height / 2) + d.y0 +  height2/3.25 + "px");

          })
          .on("mouseout", function(d){
              div_tip.transition()
                 .duration(200)
                 .style("opacity", 0);
          })
          .append("xhtml:body")
          .attr("class", "labelbody")
          .append("div")
          .attr("class", "treemap-label")
          .text(function(d) {
              if(d.data.size < 1000){
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
	textDiv3.innerHTML = "Since August 1, 2007, at least 25,051 individuals and firms have been restricted from obtaining US government contracts. The following table is a breakdown of the types of violations leading to restrictions, when that information is publicly available."
	textDiv3.classList.add("animated");
	textDiv3.classList.add("fadeIn");

  // textDiv4.style.left = "33%";
  // textDiv4.style.top = "85%";
  // textDiv4.innerHTML = "NONE have been excluded from US government contracts due to human trafficking or forced labor."
  // textDiv4.classList.add("animated");
  // textDiv4.classList.add("fadeIn");
}

setTimeout(textAnimation, 3000);
