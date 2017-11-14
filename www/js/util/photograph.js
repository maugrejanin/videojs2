// Wait for PhoneGap to connect with the device
//
document.addEventListener("deviceready",prepareDevicePhoto,false);

function prepareDevicePhoto() {
	pictureSource = navigator.camera.PictureSourceType;
	destinationType = navigator.camera.DestinationType;
}

// Called when a photo is successfully retrieved
//
function onPhotoFileSuccess(imageData) {
	// Get image handle
	console.log(JSON.stringify(imageData));
	
		// Get image handle
	//
	var smallImage = document.getElementById('smallImage');
	// Unhide image elements
	//
	smallImage.style.display = 'block';
	// Show the captured photo
	// The inline CSS rules are used to resize the image
	//
	smallImage.src = imageData;
}

// Called when a photo is successfully retrieved
//
function onPhotoURISuccess(imageURI) {
	// Uncomment to view the image file URI 
	// console.log(imageURI);
	// Get image handle
	//
	var largeImage = document.getElementById('largeImage');
	// Unhide image elements
	//
	largeImage.style.display = 'block';
	// Show the captured photo
	// The inline CSS rules are used to resize the image
	//
	largeImage.src = imageURI;
}

// A button will call this function
//
function capturePhotoWithData(onPhotoDataSuccess) {
	// Take picture using device camera and retrieve image as base64-encoded string
	navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
		quality: 50,
		destinationType: Camera.DestinationType.DATA_URL,
		encodingType: Camera.EncodingType.JPEG
	});
}

function capturePhotoWithFile() {
	navigator.camera.getPicture(onPhotoFileSuccess, onFail, {
		quality: 50,
		destinationType: Camera.DestinationType.FILE_URI,
		encodingType: Camera.EncodingType.JPEG
	});
}

// A button will call this function
//
function getPhoto(source) {
	// Retrieve image file location from specified source
	navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50, 
	destinationType: destinationType.FILE_URI,
	sourceType: source });
}

// Called if something bad happens.
// 
function onFail(message) {
	alert('Failed because: ' + message);
}

// <button onclick="capturePhotoWithData();">Capture Photo With Image Data</button> <br>
// <button onclick="capturePhotoWithFile();">Capture Photo With Image File URI</button> <br>
// <button onclick="getPhoto(pictureSource.PHOTOLIBRARY);">From Photo Library</button><br>
// <button onclick="getPhoto(pictureSource.SAVEDPHOTOALBUM);">From Photo Album</button><br>
// <img style="display:none;width:60px;height:60px;" id="smallImage" src="" />
// <img style="display:none;" id="largeImage" src="" />