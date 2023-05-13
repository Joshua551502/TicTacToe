
var element1 = document.getElementById("item3");
var rect = element1.getBoundingClientRect();

var centerX = rect.left;
var centerY = rect.top;

var element2 = document.getElementById("item2");
var rect = element2.getBoundingClientRect();

var centerXE = rect.left;
var centerYE = rect.top;

var canvas = document.getElementById("myCanvas");

// Get the 2D rendering context
var ctx = canvas.getContext("2d");

// Set the starting point of the line
var startX = centerX;
var startY = centerY;

// Set the ending point of the line
var endX = centerXE;
var endY = centerYE;

var lineWidth = 15;

var lineColor = "red";

ctx.strokeStyle = lineColor;

ctx.lineWidth = lineWidth;

// Draw the line
ctx.beginPath();
ctx.moveTo(startX, startY);
ctx.lineTo(endX, endY);
ctx.stroke();
