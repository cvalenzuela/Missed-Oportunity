var svg = d3.select("#d3").append("svg");
var texts = ["This square represents 10,000 people.",
	"The squares together represent the 21 million people who are victims of force labour." ,
	"11.4 million victims are women and girls",
	"9.5 million are men and boys",
	"Almost 19 million victims are exploited by private individuals or enterprises.",
	"Over 2 million are exploited by the state or rebel groups.",
	"Forced labour in the private economy generates US$ 150 billion in illegal profits per year."
];

var width  = window.innerWidth, height = window.innerHeight;
var dimension = 0, squares = [];

var sSize = 11;
var unit = sSize - 5;
var dimension = 46;
var baseColor = '#fafafa';
var totalSquares = 2100;
var starttext = 0;
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


var d3div = document.getElementById('d3');
var textDiv = document.createElement("div");
textDiv.id = "text-div";


function animation1(){
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
	textDiv.style.top = "40%";
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


function animation3(){
	d3div.removeChild(d3div.childNodes[1]);
	textDiv.classList.remove("animated");
	textDiv.classList.remove("fadeIn");

	var total = 2100;
	var female = 1140;
	var i = female;
	for(i; i < total; i++){
		squares[i].transition()
				.duration(300)
				.delay(function(){
				  	return (i - female) * 2;
				})
				.attr('width', 0)
				.attr('height', 0);
	}

}

function textAnimation3(){
	textDiv.style.left = "32%";
	textDiv.style.top = "11%";
	textDiv.innerHTML = texts[2];
	d3div.appendChild(textDiv);

	//animate css
	textDiv.classList.add("animated");
	textDiv.classList.add("fadeIn");
}

function animation4(){
	d3div.removeChild(d3div.childNodes[1]);
	textDiv.classList.remove("animated");
	textDiv.classList.remove("fadeIn");

	var female = 1140;
	var male = 950;

	for(var i = male; i < female; i++){
		squares[i].transition()
				.duration(300)
				.delay(function(){
				  	return (i - male) * 2;
				 })
				.attr('width', 0)
				.attr('height', 0);
	}
}

function textAnimation4(){
	textDiv.style.left = "33%";
	textDiv.style.top = "11%";
	textDiv.innerHTML = texts[3];
	d3div.appendChild(textDiv);

	//animate css
	textDiv.classList.add("animated");
	textDiv.classList.add("fadeIn");
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
	d3div.appendChild(textDiv);

	//animate css
	textDiv.classList.add("animated");
	textDiv.classList.add("fadeIn");
}


setTimeout(animation1, 2000);
setTimeout(textAnimation1, 3000);
setTimeout(animation2, 8000);
setTimeout(textAnimation2, 13000);
setTimeout(animation3, 18000);
setTimeout(textAnimation3, 20000);
setTimeout(animation4, 25000);
setTimeout(textAnimation4, 26000);
setTimeout(animation5, 31000);
setTimeout(textAnimation5, 33000);
setTimeout(animation6, 38000);
setTimeout(textAnimation6, 42000);
setTimeout(animation7, 47000);
setTimeout(textAnimation7, 48000);
