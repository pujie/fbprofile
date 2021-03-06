drawProfilePicContainer = function(){
	context.beginPath();
	context.rect(15,175,183,166);
	context.lineWidth = 4;
	context.strokeStyle = 'red';
	context.stroke();
}
customline = (startx,starty,endx,endy,ocolor,linewidth) => {
	context.beginPath();
	context.moveTo(startx,starty);
	context.lineTo(endx,endy);
	context.strokeStyle=ocolor;
	context.lineWidth = linewidth;
	context.stroke();	
}
drawBackgroundPicContainer = function(){
	context.beginPath();
	customline(1,1,1,315,'red',4);
	customline(1,315,15,315,'red',4);
	customline(198,315,851,315,'red',4);
	customline(851,315,851,1,'red',4);
	customline(1,1,851,1,'red',4);
}
doupload = function(elem){
	setTimeout(function(){
		document.getElementById(elem).click();
		},0);
}
$("#btnSave").click(function(){
	var imageData = context.getImageData(0, 0, 851, 315);
	bgcanvas = document.createElement('canvas');
	bgcanvas.setAttribute('width',851);
	bgcanvas.setAttribute('height',315);
	bgcontext = bgcanvas.getContext('2d');
	bgcontext.putImageData(imageData,0,0);
	download(this,bgcanvas,'d-background.png');
});
$("#btnProfileSave").click(function(){
	var imageData = context.getImageData(15+4, 175+4, 168-4, 168-4);
	prcanvas = document.createElement('canvas');
	prcanvas.setAttribute('width',160);
	prcanvas.setAttribute('height',160);
	ctcanvas = prcanvas.getContext('2d');
	ctcanvas.putImageData(imageData,0,0);
	download(this,prcanvas,'d-profile.png');
});
$('#btnProfileFrame').click(function(){
	drawProfilePicContainer();
});
$('#btnBackgroundFrame').click(function(){
	drawBackgroundPicContainer();
});
var canvas = document.getElementById('mycanvas'),
	context = canvas.getContext('2d');
drawProfilePicContainer();
detectEvent = function(event){
	var rect = canvas.getBoundingClientRect();
	posX = event.clientX -rect.left;
	posY = event.clientY - rect.top;
	if(posX>15 && posX<198 && posY<326 && posY>164){
		doupload('profilepic');
	}
}
canvas.addEventListener('click',detectEvent,false);
upload = function(evt){
	var input = evt.target;
	var fileReader = new FileReader();
	fileReader.onloadend = () => {
	  $("body").css("cursor","wait");
		resizeImage(fileReader.result,(uri) => {
			imageObj = new Image();
			imageObj.onload = function(){
				context.drawImage(imageObj,x1,y1,x2,y2);
			}
			imageObj.src = uri;
			$("body").css("cursor","default");
		});
	}
	fileReader.readAsDataURL(input.files[0]);
}
uplbackground = function(evt){
	var input = evt.target,
	fileReader = new FileReader(),
	imageObj = new Image();
	fileReader.onload = () => {
		imageObj.onload = function(){
			context.drawImage(imageObj,x1,y1,x2,y2);
			context.clearRect(0,315,19,100);
			context.clearRect(194,315,851,100);
			drawProfilePicContainer();
			drawBackgroundPicContainer();
		}
		imageObj.src = fileReader.result;
	};
	fileReader.readAsDataURL(input.files[0]);
}
function uploadImage(elem,evt){
	switch(elem){
		case "profile":
			x1=15+4;y1=175+4;x2=174;y2=160-4;
			upload(evt);
		break;
		case "background":
			x1=4;y1=4;x2=851-4;y2=335-4;
			uplbackground(evt);

		break;
		case 'custom':
			//make custom stamp
		break;
	}
}
function resizeImage(url, callback){
	var canvas = document.createElement("canvas");
	var MAX_WIDTH_ALLOWED = 1000;
	var MAX_HEIGHT = 0;
	canvas.width = 1000;
	var img = new Image();
	img.onload = function(){
		MAX_HEIGHT = img.height * MAX_WIDTH_ALLOWED / img.width;
		canvas.height = MAX_HEIGHT;
		var ctx = canvas.getContext("2d");
		ctx.drawImage(img, 0, 0, MAX_WIDTH_ALLOWED, MAX_HEIGHT);
		callback(canvas.toDataURL("image/jpeg"));
	}
	img.src = url;
}
