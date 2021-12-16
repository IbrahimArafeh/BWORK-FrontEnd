// Declaring variable array of images. You can put as many as you want.
const myimages = ['t1.jpg', '08.jpg', '02.jpg', '09.png', '07.jpg', '04.jpg', 't1.jpg', '08.jpg', '02.jpg', '09.png', '07.jpg', '04.jpg'];
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