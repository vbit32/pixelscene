var skyColors = ['#00378A','#6666FF','#CC99FF', '#FFCCCC', '#FFCC99', '#FF9999'] ;
var layersPerColor = 15 ;
//change this hardcoded later to let the user input 
var deezColors = [];

//prepare the sky
for (var i = 0 ; i < skyColors.length-1 ; i ++)
{
	generateColors (skyColors[i], skyColors[i+1], layersPerColor) 
}

//show the sky
//creates and places each div with its color on the screen
for (var i = 0 ; i < deezColors.length ; i ++)
{
	console.log(deezColors[i]) ;
	createAndAppend('#' + deezColors[i]) ;
}

function get2DigitHex(value) {
	value = Math.floor(value);
	return value < 16 ? '0' + value.toString(16) : value.toString(16);
}

function generateColors(c1, c2, n) 
{
	var colors = [];

	if (n > 0) {
		var colors1 = hexToRgb(c1);
		var colors2 = hexToRgb(c2);
		var d = [(colors2.r - colors1.r) / n, (colors2.g - colors1.g) / n, (colors2.b - colors1.b) / n]

		colors1 = [colors1.r, colors1.g, colors1.b];

		for (var i = 0 ; i < n ; ++i) {
			var colorStr = "";
			for (var j = 0 ; j < 3 ; ++j){
				colorStr += get2DigitHex(colors1[j] + d[j] * (i + 1)); 
			}
			colors.push(colorStr);
			deezColors.push(colorStr) ;
			//createAndAppend('#' + colorStr) ;
		}
	}

	return colors;
}

//will create a div with those css dimensions
//then will set the color to the hex code that was passed in
function createAndAppend (color)
{
	var div = document.createElement("div");
	console.log(document);
	div.className = 'div1';
	div.style.background = color;
	//append the div
	document.body.appendChild(div);
	//love the div
}

//used for lightening/darkening a color
function colorLuminance(hex, lum) {

	// validate hex string
	hex = String(hex).replace(/[^0-9a-f]/gi, '');
	if (hex.length < 6) {
		hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	}
	lum = lum || 0;

	// convert to decimal and change luminosity
	var rgb = "#", c, i;
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i*2,2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ("00"+c).substr(c.length);
	}

	return rgb;
}

//input in quotes, dont forget
//access inidivudal colors with .g .r .b
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}


function drawClouds(idName) {
	//create div 
	var canvas = document.getElementById(idName);
	var context = canvas.getContext('2d');

	//begin custom shape
	context.beginPath();
	context.moveTo(170, 80);
	context.bezierCurveTo(130, 100, 130, 150, 230, 150);
	context.bezierCurveTo(250, 180, 320, 180, 340, 150);
	context.bezierCurveTo(420, 200, 420, 120, 390, 100);
	context.bezierCurveTo(430, 40, 370, 30, 340, 50);
	context.bezierCurveTo(320, 5, 250, 20, 250, 50);
	context.bezierCurveTo(200, 5, 150, 20, 170, 80);

	//complete custom shape
	//later remove js styles, add css style class to canvas element in html
	context.closePath();
	context.lineWidth = 5;
	context.strokeStyle = 'blue';
	context.stroke();
}
