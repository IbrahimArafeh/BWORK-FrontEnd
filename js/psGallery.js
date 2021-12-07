// Declaring variable array of images. You can put as many as you want.
const myimages = ['t1.jpg', '08.jpg', '02.jpg', '09.png', '07.jpg', '04.jpg', 't1.jpg', '08.jpg', '02.jpg', '09.png', '07.jpg', '04.jpg'];
const prevBtn = document.getElementById("ImageViewer-Prev-btn"); // assigning variable for previous button
const nextBtn = document.getElementById("ImageViewer-Nxt-btn"); // assigning variable for next button
const imageContainer = document.getElementById("mainImg"); // assigning variable for image container div
const thumbNailList = document.getElementById("thumbnailList");
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

//Add Image List 
function addThumbImage() {
    var picThumbList = document.getElementById('thumbnailList');

    for (var i = 0; i < myimages.length; i++) {
        var ThumbnailDiv = document.createElement('div');
        ThumbnailDiv.setAttribute('class', 'thumbnail');
        picThumbList.appendChild(ThumbnailDiv);
        var TagaItem = document.createElement('a');
        TagaItem.setAttribute('href', '#');
        TagaItem.setAttribute('onclick', 'chooseImage(this)');
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
            chooseImage(TagaItem);
        }
    }

}
// check IMG tag info node and child node
function chooseImage(e) {
    if (checkIMG(e)) {
        var mainImg = document.getElementById('mainImg');
        mainImg.src = e.src;
        var imgDiv = document.getElementById('imgDiv');
        imgDiv.style.transform = null;
        imageContainer.style.transform = null;
    } else {
        var childEle = e.childNodes[0];
        chooseImage(childEle);
        imageContainer.style.transform = null;
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

// image zoom

var scale = 5,
    panning = false,
    pointX = 0,
    pointY = 0,
    start = {
        x: 0,
        y: 0
    },
    zoom = document.getElementById("imgDiv");

function setTransform() {
    zoom.style.transform = "translate(" + pointX + "px, " + pointY + "px) scale(" + scale + ")";
}

zoom.onmousedown = function(e) {
    e.preventDefault();
    start = {
        x: e.clientX - pointX,
        y: e.clientY - pointY
    };
    panning = true;
}

zoom.onmouseup = function(e) {
    panning = false;
}

zoom.onmousemove = function(e) {
    e.preventDefault();
    if (!panning) {
        return;
    }
    pointX = (e.clientX - start.x);
    pointY = (e.clientY - start.y);
    setTransform();
}

zoom.onwheel = function(e) {
    e.preventDefault();

    var xs = (e.clientX - pointX) / scale,
        ys = (e.clientY - pointY) / scale,
        delta = (e.wheelDelta ? e.wheelDelta : -e.deltaY);
    (delta > 0) ? (scale *= 1.2) : (scale /= 1.2);
    // pointX = e.clientX - xs * scale;
    // pointY = e.clientY - ys * scale;

    setTransform();
}

function rotateLeft() {
    imageContainer.style.transform = "rotate(90deg)";
    imageContainer.webkit = "rotate(90deg)";
}

function rotateRight() {
    imageContainer.style.transform = "rotate(-90deg)";
    imageContainer.webkit = "rotate(90deg)";
}