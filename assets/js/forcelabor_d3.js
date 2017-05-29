

function animation5(){



}

function textAnimation5(){
	textDiv.style.left = "33%";
	textDiv.style.top = "40%";
	textDiv.innerHTML = texts[6];
	textDiv.style.color = "#ffffff";
	//d3div.appendChild(textDiv);
	//animate css
	textDiv.classList.add("animated");
	textDiv.classList.add("fadeIn");
}


var function1;
var function2;
var function3;
var function4;
var function5;
var function6;
var function7;
var function8;
var function9;
var function10;

var called = false;

function beginAnimation(){
	called = true;

	function1 = setTimeout(animation1, 2000);
	function2 = setTimeout(textAnimation1, 3000);
	function3 = setTimeout(animation2, 8000);
	function4 = setTimeout(textAnimation2, 13000);
	function5 = setTimeout(animation3, 18000);
	function6 = setTimeout(textAnimation3, 22000);
	function7 = setTimeout(animation4, 27000);
	function8 = setTimeout(textAnimation4, 30000);
	function9 = setTimeout(animation5, 35000);
	function10 = setTimeout(textAnimation5, 38000);
}

function clearCSS(){
	if(textDiv.classList.contains("fadeIn")){
		textDiv.classList.remove("fadeIn");
	}

	if(textDiv.classList.contains("fadeInDown")){
		textDiv.classList.remove("fadeInDown");
	}

	if(textDiv.classList.contains("animated")){
		textDiv.classList.remove("animated");
	}

	if(textDiv2.classList.contains("fadeIn")){
		textDiv2.classList.remove("fadeIn");
	}

	if(textDiv2.classList.contains("fadeInDown")){
		textDiv2.classList.remove("fadeInDown");
	}

	if(textDiv2.classList.contains("animated")){
		textDiv2.classList.remove("animated");
	}
}


function clearAnimation(){

	//clear everything
	console.log("clear");
	textDiv.innerHTML = "";
	textDiv2.innerHTML = "";
	textDiv.style.color = "#ffffff";
	textDiv2.style.color = "#ffffff";

	clearCSS();

	var numSquare = totalSquares;
	for(var i = 0; i < numSquare; i++){
		squares[i]
			.attr('width', 0)
			.attr('height', 0)
			.style("fill", baseColor);
	}

	if(called) {
		clearTimeout(function1);
		clearTimeout(function2);
		clearTimeout(function3);
		clearTimeout(function4);
		clearTimeout(function5);
		clearTimeout(function6);
		clearTimeout(function7);
		clearTimeout(function8);
		clearTimeout(function9);
		clearTimeout(function10);
	}
}
