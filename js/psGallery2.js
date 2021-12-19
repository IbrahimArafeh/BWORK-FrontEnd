// Declaring variable array of images. You can put as many as you want.
const myimages = ['t1.jpg', '08.jpg', '02.jpg', '07.jpg', '04.jpg', 't1.jpg', '08.jpg', '02.jpg', '07.jpg', '04.jpg'];
const prevBtn = document.getElementById("ImageViewer-Prev-btn"); // assigning variable for previous button
const nextBtn = document.getElementById("ImageViewer-Nxt-btn"); // assigning variable for next button
const imageContainer = document.getElementById("mainImg"); // assigning variable for image container div
const thumbNailList = document.getElementById("thumbnailList");
var canvas = window._canvas = new fabric.Canvas("imageCanvas");
var myimage = "9.png"; // Assigning initial value for the varibale to show on page loading

// Previous Image button
// get src from canvas and replace it with previous item into myimages array
function previousImage() {
    var imgElem = image._element; //reference to actual image element
    var currentImageSrc = imgElem.src //set image source
    var streetaddress = currentImageSrc.substr(currentImageSrc.length - 6);
    var arrayIndex = searchStringInArray(streetaddress, myimages);
    if (arrayIndex > 0) {
        arrayIndex--;
        var newImageSrc = "Content/" + myimages[arrayIndex];
        replaceImage(newImageSrc);
    } else if (arrayIndex == 0) {
        var newImageSrc = "Content/" + myimages[myimages.length - 1];
        replaceImage(newImageSrc);
    }
}
prevBtn.addEventListener("click", function() {
    var imgElem = image._element; //reference to actual image element
    var currentImageSrc = imgElem.src //set image source
    var streetaddress = currentImageSrc.substr(currentImageSrc.length - 6);
    var arrayIndex = searchStringInArray(streetaddress, myimages);
    if (arrayIndex > 0) {
        arrayIndex--;
        var newImageSrc = "Content/" + myimages[arrayIndex];
        replaceImage(newImageSrc);
    } else if (arrayIndex == 0) {
        var newImageSrc = "Content/" + myimages[myimages.length - 1];
        replaceImage(newImageSrc);
    }

});
// Next Image button
// get src from canvas and replace it with next item into myimages array
function nextImage() {
    var imgElem = image._element; //reference to actual image element
    var currentImageSrc = imgElem.src //set image source
    var streetaddress = currentImageSrc.substr(currentImageSrc.length - 6);
    var arrayIndex = searchStringInArray(streetaddress, myimages);
    if (arrayIndex < myimages.length - 1) {
        arrayIndex++;
        var newImageSrc = "Content/" + myimages[arrayIndex];
        replaceImage(newImageSrc);
    } else if (arrayIndex = myimages.length - 1) {
        var newImageSrc = "Content/" + myimages[arrayIndex];
        replaceImage(newImageSrc);
    }
}
nextBtn.addEventListener("click", function() {
    var imgElem = image._element; //reference to actual image element
    var currentImageSrc = imgElem.src //set image source
    var streetaddress = currentImageSrc.substr(currentImageSrc.length - 6);
    var arrayIndex = searchStringInArray(streetaddress, myimages);
    if (arrayIndex < myimages.length - 1) {
        arrayIndex++;
        var newImageSrc = "Content/" + myimages[arrayIndex];
        replaceImage(newImageSrc);
    } else if (arrayIndex = myimages.length - 1) {
        var newImageSrc = "Content/" + myimages[arrayIndex];
        replaceImage(newImageSrc);
    }

});
// get last image from myimage array
function lastImage() {
    var newImageSrc = "Content/" + myimages[myimage.length];
    replaceImage(newImageSrc);
}
// get first image from myimage array
function firstImage() {
    var newImageSrc = "Content/" + myimages[0];
    replaceImage(newImageSrc);
}
// search about string into array
function searchStringInArray(str, strArray) {
    for (var j = 0; j < strArray.length; j++) {
        if (strArray[j].match(str)) return j;
    }
    return -1;
}

// mouse move
canvas.on("mouse:move", function(event) {
    currentMouseY = Math.round(event.e.y - canvas._offset.top);
    currentMouseX = Math.round(event.e.x - canvas._offset.left);
});

// zoom function
function zoom(delta, target) {
    var factor = 0.8;
    if (delta < 0) {
        factor = 1 / factor;
    }
    // Zoom into the image.
    image.setScaleX(image.getScaleX() * factor);
    image.setScaleY(image.getScaleY() * factor);
    // Calculate displacement of zooming position.
    var dx = (currentMouseX - image.getLeft()) * (factor - 1),
        dy = (currentMouseY - image.getTop()) * (factor - 1);
    // Compensate for displacement.
    image.setLeft(image.getLeft() - dx);
    image.setTop(image.getTop() - dy);
    canvas.renderAll();
}

$(canvas.wrapperEl).on("mousewheel", function(event) {
    var target = canvas.findTarget(event);
    if (target) {
        var delta = event.originalEvent.wheelDelta / 120;
        zoom(delta, target);
    };
    event.preventDefault() && false;
});

//Add Image List 
function addThumbImage() {
    var picThumbList = document.getElementById('thumbnailList');

    for (var i = 0; i < myimages.length; i++) {
        var ThumbnailDiv = document.createElement('div');
        ThumbnailDiv.setAttribute('class', 'thumbnail');
        picThumbList.appendChild(ThumbnailDiv);
        var TagaItem = document.createElement('a');
        TagaItem.setAttribute('href', '#');
        TagaItem.setAttribute('onclick', 'fillMainImage(this)');
        ThumbnailDiv.appendChild(TagaItem);
        var imgDiv = document.createElement('div');
        imgDiv.setAttribute('id', 'imgDiv');
        imgDiv.setAttribute('class', 'info-container');
        TagaItem.appendChild(imgDiv);
        var imgTag = document.createElement('img');
        imgTag.setAttribute('alt', 'picture');
        imgTag.setAttribute('class', 'info-thumb-pic');
        imgTag.setAttribute('id', 'Imagethumb' + i);
        imgTag.src = 'Content/' + myimages[i];
        imgDiv.appendChild(imgTag);
        if (i == 0) {
            fillMainImage(TagaItem);
        }
    }
}
// fill Display image
function fillMainImage(e) {
    if (checkIMG(e)) {
        var img = document.createElement("img");
        img.setAttribute('id', 'mainImg');
        img.src = e.src;

        // load image        
        $(img).on('load', function() {
            image = new fabric.Image(img, {
                centeredRotation: true,
                centeredScaling: true,
                top: 0,
                left: 0,
            });
            // add canvas dimension
            resizeCanvas();
            // working on canvas width
            let imgWidth = img.width;
            let imgHeight = img.height;
            let canvasWidth = canvas.getWidth();
            let canvasHeight = canvas.getHeight();

            let imgRatio = imgWidth / imgHeight;
            let canvasRatio = canvasWidth / canvasHeight;
            if (imgRatio <= canvasRatio) {
                if (imgHeight > canvasHeight) {
                    image.scaleToHeight(canvasHeight);
                }
            } else {
                if (imgWidth > canvasWidth) {
                    image.scaleToWidth(canvasWidth);
                }
            }

            var  base64Canvas = canvas.toDataURL();
            ///
            canvas.clear();
            canvas.centerObject(image);
            canvas.add(image);
            
        });
    } else {
        var childEle = e.childNodes[0];
        fillMainImage(childEle);
    }
}

// replace image src into canvas tag by pass img src
function replaceImage(imgUrl) {
    var imgElem = image._element; //reference to actual image element
    imgElem.src = imgUrl; //set image source
    imgElem.onload = () => canvas.renderAll(); //render on image load
}

// check img tag
function checkIMG(e) {
    if (e.nodeName == 'IMG') {
        return true;
    } else {
        return false;
    }
}

// rotate image by pass angle
function rotateImageCanvas(angle) {
    var curAngle = canvas.item(0).angle;
    canvas.item(0).angle = (curAngle + angle);
    canvas.renderAll();
    canvas.centerObject(image);
}
// change canvas dimensions pass new width and height
function canvasDimensions(width, height) {
    if (width == null) {
        canvas.setHeight(height);
    } else if (height == null) {
        canvas.setWidth(width);
    } else {
        canvas.setHeight(height);
        canvas.setWidth(width);
    }


}
// event change screen width
window.addEventListener('resize', function(event) {
    resizeCanvas();
}, true);

// Resize Canvas which contains image
function resizeCanvas() {
    var scrWidth = document.body.clientWidth;
    var scrHeight = document.body.clientHeight;
    // 600,800,1000,1200 related with @mediain css file
    if (scrWidth < 600 && scrWidth > 0) {
        canvasDimensions(400, 330);
        canvas.centerObject(image);
    }
    if (scrWidth >= 600 && scrWidth < 800) {
        canvasDimensions(490, 330);
        canvas.centerObject(image);
    }
    if (scrWidth >= 800 && scrWidth < 1000) {
        canvasDimensions(695, 330);
        canvas.centerObject(image);
    }
    if (scrWidth >= 1000 && scrWidth < 1400) {
        canvasDimensions(700, 330);
        canvas.centerObject(image);
    }
    if (scrWidth >= 1400) {
        canvasDimensions(950, 400);
        canvas.centerObject(image);
    }
}

// Convert a base64 string into a binary Uint8 Array 
// https://gist.github.com/borismus/1032746
var blobURL;
var fileName;

function convertDataURIToBinary(dataURI) {
	var BASE64_MARKER = ';base64,';
	var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
	var base64 = dataURI.substring(base64Index);
	var raw = window.atob(base64);
	var rawLength = raw.length;
	var array = new Uint8Array(new ArrayBuffer(rawLength));

	for(i = 0; i < rawLength; i++) {
		array[i] = raw.charCodeAt(i);
	}
	return array;
}

// File Reader
// https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
function readFile(e) {
    // var imgElem = image._element; //reference to actual image element
    var f = e.target.files[0];

    if (f) {
		if ( /(jpe?g|png|gif)$/i.test(f.type) ) {
			var r = new FileReader();
			r.onload = function(e) { 
				var base64Img = e.target.result;
				var binaryImg = convertDataURIToBinary(base64Img);
				var blob = new Blob([binaryImg], {type: f.type});
				blobURL = window.URL.createObjectURL(blob);
				fileName = f.name;
				document.getElementById('nameImg').value = fileName;
				document.getElementById('typeImg').value = f.type;
				document.getElementById('sizeImg').value = f.size;
				document.getElementById('base64Url').value = base64Img;
				document.getElementById('blobUrl').value = blobURL;
				document.getElementById('base64Img').src = base64Img;
				document.getElementById('blobImg').src = blobURL;
				document.getElementById('binaryImg').innerHTML = JSON.stringify(binaryImg, null, 2);
			}
			r.readAsDataURL(f);
		} else { 
			alert("Failed file type");
		}
    } else { 
		alert("Failed to load file");
    }
}

function toBase64Bit(){
    var ctx = canvas.getContext("2d");

    var image = new Image();
    image.onload = function() {
      ctx.drawImage(image, 0, 0);
    };
    image.src = "data:image/png;base64,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";
}