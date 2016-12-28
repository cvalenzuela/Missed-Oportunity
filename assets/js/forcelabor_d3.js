var svg = d3.select("#d3").append("svg");
var texts = ["This square represents 10,000 people.",
	"The squares together represent the 20.9 million victims of forced labor worldwide." ,
	"11.4 million victims are women and girls",
	"9.5 million are men and boys",
	"Almost 19 million victims are exploited by private individuals or enterprises.",
	"Over 2 million are exploited by governments and rebel groups.",
	"Forced labor in the private economy generates US $150 billion in illegal profits per year."
];

var width  = window.innerWidth, height = window.innerHeight;
var dimension = 0, squares = [];

var color2 = "#fff7ec";
var color1 = "#288993";

var sSize = 11;
var unit = sSize - 5;
var dimension = 46;
var baseColor = '#fafafa';
var totalSquares = 2090;
var starttext = 0;

var d3div = document.getElementById('d3');
var textDiv = document.getElementById("text-div");
var textDiv2 = document.createElement("div");
textDiv2.id = "text-div-2";

//one animation
//shift it by certain amounts
for(var j = 0; j < dimension * sSize; j+= sSize){
	for(var i = 0; i < dimension * sSize; i+= sSize){
		var rect = svg.append('rect')
				.attr('width', 0)
				.attr('height', 0)
				.attr('opacity', 0.80)
				.attr('x', i + width / 3.3 + ((width / 3) / 2))
				.attr('y', j + (height / 2) - (dimension * sSize) / 2)
				.style('fill', baseColor);
		squares.push(rect);
	}
}

function animation1(){
	d3div = document.getElementById('d3');
	textDiv = document.getElementById("text-div");
	//change size of 1 sqauare in the middle
	var middle = Math.round(dimension / 2);
	var third = Math.round(dimension / 3);
	var i = third * dimension + middle;
	squares[i].transition()
			.duration(300)
			.attr("width", unit)
			.attr("height", unit);
}

function textAnimation1(){
	textDiv.style.left = "33%";
	textDiv.style.top = "30%";
	textDiv.innerHTML = texts[0];
	d3div.appendChild(textDiv);

	//animate css
	textDiv.classList.add("animated");
	textDiv.classList.add("fadeInDown");
}

function animation2(){
	d3div.removeChild(d3div.childNodes[1]);
	textDiv.classList.remove("animated");
	textDiv.classList.remove("fadeInDown");

	var numSquare = totalSquares;

	for(var i = 0; i < numSquare; i++){
		squares[i].transition()
					.duration(300)
					.delay(function(){
						return i * 2;
					})
					.attr('width', unit)
					.attr('height', unit);
	}
}


function textAnimation2(){
	textDiv.style.left = "33%";
	textDiv.style.top = "11%";
	textDiv.innerHTML = texts[1];
	d3div.appendChild(textDiv);

	textDiv.classList.add("animated");
	textDiv.classList.add("fadeIn");
}

//11.4 million women and girls and 9.5 million men and boys.
function animation3(){
	d3div.removeChild(d3div.childNodes[1]);
	textDiv.classList.remove("animated");
	textDiv.classList.remove("fadeIn");

	var female = 1140;
	var male = 950;
	var total = female + male;

	var i = 0;
	var j = female;

	for(i; i < female; i++){
		squares[i].transition()
	 	.duration(600)
	 	.delay(function(){
	 	return i * 2;
	 	})
	  .style('fill', color1);
	}

	for(j; j < total; j++){
		squares[j].transition()
	  	.duration(600)
	  	.delay(function(){
			return j * 2;
		})
		.style('fill', color2);
	}

}

//add 2 text 2,3 with different colors
function textAnimation3(){
	textDiv.style.left = "32%";
	textDiv.style.top = "8%";
	textDiv.innerHTML = texts[2];
	textDiv.style.color = color1;
	d3div.appendChild(textDiv);

	textDiv2.style.left = "33%";
	textDiv2.style.top = "11%";
	textDiv2.innerHTML = texts[3];
	textDiv2.style.color = color2;
	d3div.appendChild(textDiv2);

	//animate css
	textDiv.classList.add("animated");
	textDiv.classList.add("fadeIn");
	textDiv2.classList.add("animated");
 	textDiv2.classList.add("fadeIn");
}

function animation4(){
	d3div.removeChild(d3div.childNodes[1]);
	textDiv.classList.remove("animated");
	textDiv.classList.remove("fadeIn");

	d3div.removeChild(d3div.childNodes[1]);
 	textDiv2.classList.remove("animated");
 	textDiv2.classList.remove("fadeIn");

	var total = 1900;
	var all = 2090;
	var rest = all - total;
	for(var i = 0; i < total; i++){
		squares[i].transition()
		.duration(600)
	  .delay(function(){
	 		return i * 2;
	 	})
	 	.style('fill', color1)
	}

	for(var j = total; j < all; j++){
		squares[j].transition()
	 		.duration(600)
	 		.delay(function(){
	 			return j * 2;
	 		})
	 		.style('fill', color2);
	}
}

function textAnimation4(){
	textDiv.style.left = "33%";
	textDiv.style.top = "11%";
	textDiv.innerHTML = texts[3];
	textDiv.style.left = "32%";
 	textDiv.style.top = "8%";
 	textDiv.innerHTML = texts[4];
 	textDiv.style.color = color1;
	d3div.appendChild(textDiv);

	textDiv2.style.left = "33%";
 	textDiv2.style.top = "11%";
 	textDiv2.innerHTML = texts[5];
 	textDiv2.style.color = color2;
 	d3div.appendChild(textDiv2);

	//animate css
	textDiv.classList.add("animated");
	textDiv.classList.add("fadeIn");
	textDiv2.classList.add("animated");
 	textDiv2.classList.add("fadeIn");
}

function animation5(){
	d3div.removeChild(d3div.childNodes[1]);
	textDiv.classList.remove("animated");
	textDiv.classList.remove("fadeIn");

	var total = 1900;
	var male = 950;

	for(var i = male; i < total; i++){
		squares[i].transition()
				.duration(300)
				.delay(function(){
				  	return (i - male) * 2;
				 })
				.attr('width', unit)
				.attr('height', unit);
	}
}

function textAnimation5(){
	textDiv.style.left = "33%";
	textDiv.style.top = "11%";
	textDiv.innerHTML = texts[4];
	d3div.appendChild(textDiv);

	//animate css
	textDiv.classList.add("animated");
	textDiv.classList.add("fadeIn");
}


function animation6(){
	d3div.removeChild(d3div.childNodes[1]);
	textDiv.classList.remove("animated");
	textDiv.classList.remove("fadeIn");

	var total = 200;
	var enterprises = 1900;

	for(var i = total; i < enterprises; i++){
		squares[i].transition()
				.duration(300)
				.delay(function(){
				  	return (i - total) * 2;
				 })
				.attr('width', 0)
				.attr('height', 0);
	}
}

function textAnimation6(){
	textDiv.style.left = "32%";
	textDiv.style.top = "11%";
	textDiv.innerHTML = texts[5];
	d3div.appendChild(textDiv);

	//animate css
	textDiv.classList.add("animated");
	textDiv.classList.add("fadeIn");
}



function animation7(){

	d3div.removeChild(d3div.childNodes[1]);
	textDiv.classList.remove("animated");
	textDiv.classList.remove("fadeIn");

	d3div.removeChild(d3div.childNodes[1]);
 	textDiv2.classList.remove("animated");
 	textDiv2.classList.remove("fadeIn");

	var numSquare = totalSquares;
	for(var i = 0; i < numSquare; i++){
		squares[i].transition()
					.duration(300)
					.delay(function(){
						return i;
					})
					.attr('width', 0)
					.attr('height', 0);
	}
}

function textAnimation7(){
	textDiv.style.left = "33%";
	textDiv.style.top = "40%";
	textDiv.innerHTML = texts[6];
	textDiv.style.color = "#ffffff";
	d3div.appendChild(textDiv);

	//animate css
	textDiv.classList.add("animated");
	textDiv.classList.add("fadeIn");
}


function startAnimation(){

	setTimeout(animation1, 2000);
  setTimeout(textAnimation1, 3000);
  setTimeout(animation2, 8000);
  setTimeout(textAnimation2, 13000);
  setTimeout(animation3, 18000);
	setTimeout(textAnimation3, 22000);
	setTimeout(animation4, 27000);
	setTimeout(textAnimation4, 30000);
	//setTimeout(animation5, 31000);
	//setTimeout(textAnimation5, 33000);
	//setTimeout(animation6, 38000);
	//setTimeout(textAnimation6, 42000);
	setTimeout(animation7, 35000);
	setTimeout(textAnimation7, 38000);
}
