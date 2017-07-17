// import pica from 'pica/dist/pica';
const pica = require("pica/dist/pica");

//export const BACKEND = "//localhost:8080"
export const BACKEND = "";

// Take an image URL, downscale it to the given width, and return a new image URL.
export const downscaleImage = function(
	dataUrl,
	newWidth,
	imageType,
	imageArguments,
	callback
) {
	var image, oldWidth, oldHeight, newHeight, canvas, newDataUrl;

	// Provide default values
	imageType = imageType || "image/jpeg";
	imageArguments = imageArguments || 0.7;

	// Create a temporary image so that we can compute the height of the downscaled image.
	image = new Image();
	image.src = dataUrl;
	oldWidth = image.width;
	oldHeight = image.height;
	newHeight = Math.floor(oldHeight / oldWidth * newWidth);

	// Create a temporary canvas to draw the downscaled image on.
	canvas = document.createElement("canvas");
	canvas.width = newWidth;
	canvas.height = newHeight;

	let canvas2 = document.createElement("canvas");
	canvas2.width = newWidth;
	canvas2.height = newHeight;

	console.log(pica);
	pica
		.resize(image, canvas, {
			unsharpAmount: 80,
			unsharpRadius: 0.6,
			unsharpThreshold: 2
		})
		.then(result => {
			console.log(result);
			newDataUrl = canvas.toDataURL(imageType, imageArguments);
			callback(newDataUrl);
		});
};
