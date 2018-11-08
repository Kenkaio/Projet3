var canvas = document.getElementById('sign');
var ctx = canvas.getContext('2d');

var draw = function(e){	
	var parentOffset = $(this).offset(); 
	var x = e.pageX - parentOffset.left;
	var y = e.pageY - parentOffset.top;
	ctx.lineTo(x, y);
	ctx.stroke();
}

function ajoutImage()
{
  baseImage = new Image();
  baseImage.src = 'images/plume.png';
  baseImage.onload = function(){
  	ctx.drawImage(baseImage, 10, 10, 50, 50);
  }
}

ajoutImage();

$('#clear').click(function(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ajoutImage();
});

$('#sign').mousedown(function(){
	canvas.addEventListener("mousemove", draw);	
});	

$('#sign').mouseup(function(){
	canvas.removeEventListener("mousemove", draw);
	ctx.beginPath();
});		

