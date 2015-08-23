drawProfilePicContainer = function(){
	context.beginPath();
	context.rect(15,164,183,164);
	context.lineWidth = 4;
	context.strokeStyle = 'red';
	context.stroke();
}
var canvas = document.getElementById('mycanvas'),
	context = canvas.getContext('2d'),
	pcanvas = document.getElementById('photo');
drawProfilePicContainer();
function uploadImage(evt){
  var input = evt.target;
  var fileReader = new FileReader();
  fileReader.onloadend = () => {
	  $("body").css("cursor","wait");
		resizeImage(fileReader.result,(uri) => {
			imageObj = new Image();
			imageObj.onload = function(){
				context.drawImage(imageObj,15+4,164+4,174,160);
			}
			imageObj.src = uri;
			$("body").css("cursor","default");
		});
  }
  fileReader.readAsDataURL(input.files[0]);
}
function uploadBackground(evt){
  var input = evt.target;
  var fileReader = new FileReader();
  fileReader.onloadend = () => {
	  $("body").css("cursor","wait");
		resizeImage(fileReader.result,(uri) => {
			imageObj = new Image();
			imageObj.onload = function(){
				context.drawImage(imageObj,4,4,851,350);
			}
			imageObj.src = uri;
			$("body").css("cursor","default");
		});
  }
  fileReader.readAsDataURL(input.files[0]);
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
