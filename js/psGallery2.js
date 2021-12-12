// Declaring variable array of images. You can put as many as you want.
const myimages = ['t1.jpg', '08.jpg', '02.jpg', '09.png', '07.jpg', '04.jpg', 't1.jpg', '08.jpg', '02.jpg', '09.png', '07.jpg', '04.jpg'];
const prevBtn = document.getElementById("ImageViewer-Prev-btn"); // assigning variable for previous button
const nextBtn = document.getElementById("ImageViewer-Nxt-btn"); // assigning variable for next button
const imageContainer = document.getElementById("mainImg"); // assigning variable for image container div
const thumbNailList = document.getElementById("thumbnailList");
var canvas = window._canvas = new fabric.Canvas("imageCanvas");
var myimage = "9.png"; // Assigning initial value for the varibale to show on page loading

// Previous Image button
prevBtn.addEventListener("click", function() {
    var streetaddress = imageContainer.src.substr(imageContainer.src.length - 6);
    var arrayIndex = searchStringInArray(streetaddress, myimages);
    if (arrayIndex > 0) {
        arrayIndex--;
        imageContainer.src = "Content/" + myimages[arrayIndex]
    } else if (arrayIndex == 0) {
        imageContainer.src = "Content/" + myimages[myimages.length - 1]
    }

});
// Next Image button
nextBtn.addEventListener("click", function() {
    var streetaddress = imageContainer.src.substr(imageContainer.src.length - 6);
    var arrayIndex = searchStringInArray(streetaddress, myimages);
    if (arrayIndex < myimages.length - 1) {
        arrayIndex++;
        imageContainer.src = "Content/" + myimages[arrayIndex]
    } else if (arrayIndex = myimages.length - 1) {
        imageContainer.src = "Content/" + myimages[0]
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
            // working on canvas width
            let imgWidth = img.width;
            let imgHeight = img.height;
            let canvasWidth = canvas.getWidth();
            let canvasHeight = canvas.getHeight();

            let imgRatio = imgWidth / imgHeight;
            let canvasRatio = canvasWidth / canvasHeight;
            if (imgRatio <= canvasRatio) {
                if (imgHeight > canvasHeight) {
                    image.scaleToHeight(canvasHeight, false);
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

// check if this tag is image
function checkIMG(e) {
    if (e.nodeName == 'IMG') {
        return true;
    } else {
        return false;
    }
}

function getRotatedImage(image, angle, cb) {
    const canvas = document.createElement('canvas');
    const { degree, rad: _rad } = angle;

    const rad = _rad || degree * Math.PI / 180 || 0;
    debug('rad', rad);

    const { width, height } = calcProjectedRectSizeOfRotatedRect({ width: image.width, height: image.height }, rad);
    debug('image size', image.width, image.height);
    debug('projected size', width, height);

    canvas.width = Math.ceil(width);
    canvas.height = Math.ceil(height);

    const ctx = canvas.getContext('2d');
    ctx.save();

    const sin_Height = image.height * Math.abs(Math.sin(rad))
    const cos_Height = image.height * Math.abs(Math.cos(rad))
    const cos_Width = image.width * Math.abs(Math.cos(rad))
    const sin_Width = image.width * Math.abs(Math.sin(rad))

    debug('sin_Height, cos_Width', sin_Height, cos_Width);
    debug('cos_Height, sin_Width', cos_Height, sin_Width);

    let xOrigin, yOrigin;

    if (rad < app.boundaryRad) {
        debug('case1');
        xOrigin = Math.min(sin_Height, cos_Width);
        yOrigin = 0;
    } else if (rad < Math.PI / 2) {
        debug('case2');
        xOrigin = Math.max(sin_Height, cos_Width);
        yOrigin = 0;
    } else if (rad < Math.PI / 2 + app.boundaryRad) {
        debug('case3');
        xOrigin = width;
        yOrigin = Math.min(cos_Height, sin_Width);
    } else if (rad < Math.PI) {
        debug('case4');
        xOrigin = width;
        yOrigin = Math.max(cos_Height, sin_Width);
    } else if (rad < Math.PI + app.boundaryRad) {
        debug('case5');
        xOrigin = Math.max(sin_Height, cos_Width);
        yOrigin = height;
    } else if (rad < Math.PI / 2 * 3) {
        debug('case6');
        xOrigin = Math.min(sin_Height, cos_Width);
        yOrigin = height;
    } else if (rad < Math.PI / 2 * 3 + app.boundaryRad) {
        debug('case7');
        xOrigin = 0;
        yOrigin = Math.max(cos_Height, sin_Width);
    } else if (rad < Math.PI * 2) {
        debug('case8');
        xOrigin = 0;
        yOrigin = Math.min(cos_Height, sin_Width);
    }

    debug('xOrigin, yOrigin', xOrigin, yOrigin)

    ctx.translate(xOrigin, yOrigin)
    ctx.rotate(rad);
    ctx.drawImage(image, 0, 0);
    if (DEBUG) drawMarker(ctx, 'red');

    ctx.restore();

    const dataURL = canvas.toDataURL('image/jpg');

    cb(dataURL);
}

$("#rotate").click(function() {
    var curAngle = canvas.item(0).angle;
    canvas.item(0).angle = (curAngle + 90);
    canvas.renderAll();
});

function rotateImageCanvas(angle) {
    var curAngle = canvas.item(0).angle;
    canvas.item(0).angle = (curAngle + angle);
    canvas.renderAll();
}