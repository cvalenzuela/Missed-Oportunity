var svg = d3.select("#d3").append("svg");
var texts = ["A square represents 10,000 people.", 
	"They all together represent the 21 million people who are victims of force labour." ,
	"11.4 million victims are women and girls and 9.5 million are men and boys.", 
	"Almost 19 million victims are exploited by private individuals or enterprises.",
	"Over 2 million by the state or rebel groups.",  
	"Of those exploited by individuals or enterprises,",
	 "4.5 million are victims of forced sexual exploitation."
];

var width  = window.innerWidth, height = window.innerHeight;
var dimension = 0, squares = []; 


var sSize = 11; 
var unit = sSize - 5;
var dimension = 46;
var baseColor = '#FFFFFF';
var totalSquares = 2100;
var starttext = 0; 
var text;
var text2; 
//one animation
//shift it by certain amounts
for(var j = 0; j < dimension * sSize; j+= sSize){
	for(var i = 0; i < dimension * sSize; i+= sSize){
		var rect = svg.append('rect')
				.attr('width', 0)
				.attr('height', 0)
				.attr('opacity', 0.80)
				.attr('x', i + width / 3.3 + ((width / 3) / 2))
				.attr('y', j + (height / 2) - (dimension * sSize) / 2 + 50)
				.style('fill', baseColor);
		squares.push(rect);
	}
}

text = svg.append("text")
					.attr('x', width / 3.3 + ((width / 3) / 2) + (dimension * sSize) / 2)
					.attr('y', (height / 2) - (dimension * sSize) / 2 )
					.attr('font-size', 18)
					.attr('font-family', '"Open Sans", sans-serif')
					.attr('text-anchor', 'middle')
					.style('fill', 'white')
					.text(texts[0]);

text2 = svg.append("text")
					.attr('x', width / 3.3 + ((width / 3) / 2) + (dimension * sSize) / 2)
					.attr('y', (height / 2) - (dimension * sSize) / 2 + 22 )
					.attr('font-size', 18)
					.attr('font-family', '"Open Sans", sans-serif')
					.attr('text-anchor', 'middle')
					.style('fill', 'white')
					.text("");

//data - 21 million people are victims of forced labour 
//each square represents 100,00 people
function animation1(){
	var numSquare = totalSquares; 

	for(var i = 0; i < numSquare; i++){
		squares[i].transition()
					.duration(600)
					.delay(function(){
						return i;
					})
					.attr('stroke', '#222222')
					.attr('width', unit)
					.attr('height', unit);
	}
}

//11.4 million women and girls and 9.5 million men and boys.
function textAnimation1(){
	text.transition()
		.duration(2000)
		.text(texts[1]);
}

function animation2(){

	text.transition()
		.duration(100)
		.text(texts[2]);

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
				  	.style('fill', '#C62828');
	}

	for(j; j < total; j++){
		squares[j].transition()
				  	.duration(600)
				  	.delay(function(){
				  		return j * 2;
				  	})
				  	.style('fill', '#283593');
	}
	
}


//Almost 19 million victims are exploited by private individuals or enterprises 
////over 2 million by the state or rebel groups.
function animation3(){

	text.transition()
		.duration(100)
		.text(texts[3])
		.style("fill", "#78909C");

	text2.transition()
		.duration(100)
		.text(texts[4])
		.style("fill", "#FFFFFF");

	var total = 1900;
	var all = 2100; 
	var rest = all - total; 
	for(var i = 0; i < total; i++){
		squares[i].transition()
				  	.duration(600)
				  	.delay(function(){
				  		return i * 2;
				  	})
				  	.style('fill', '#78909C')
	}


	//change the rest to dark purple
	for(var j = total; j < all; j++){
		squares[j].transition()
				.duration(600)
				.delay(function(){
				  	return j * 2;
				 })
				 .style('fill', '#FFFFFF');
	}
}

//Of those exploited by individuals or enterprises, 4.5 million are victims of forced sexual exploitation.
function animation4(){

	text.transition()
		.duration(100)
		.text(texts[5])
		.style("fill", "white");

	text2.transition()
		.duration(100)
		.text(texts[6])
		.style("fill", "#00BCD4");

	var assult = 450; 
	for(var i = 0; i < assult; i++){
		squares[i].transition()
				.duration(600)
				.delay(function(){
				  	return i * 2;
				})
				.style('fill', '#00BCD4');
	}
}


//change it back to all purple first, then chain the animations together
setTimeout(animation1, 1000);
setTimeout(textAnimation1, 5000);
setTimeout(animation2, 13000);
setTimeout(animation3, 24000);
setTimeout(animation4, 34000);

