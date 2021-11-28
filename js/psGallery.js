// Declaring variable array of images. You can put as many as you want.
const myimages = ['t1.jpg', '08.jpg', '02.jpg', '09.png', '07.jpg', '04.jpg', '02.jpg', '09.png', '07.jpg', '04.jpg'];
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
    }
});
// Next Image button
nextBtn.addEventListener("click", function() {
    var streetaddress = imageContainer.src.substr(imageContainer.src.length - 6);
    var arrayIndex = searchStringInArray(streetaddress, myimages);
    if (arrayIndex < myimages.length - 1) {
        arrayIndex++;
        imageContainer.src = "Content/" + myimages[arrayIndex]
    }
});
// search about string into array
function searchStringInArray(str, strArray) {
    for (var j = 0; j < strArray.length; j++) {
        if (strArray[j].match(str)) return j;
    }
    return -1;
}

thumbNailList.addEventListener('wheel', (event) => {
    alert('X: ' + event.deltaX + ' , Y: ' + event.deltaY + ' , Z: ' + event.deltaZ + ' , Client X: ' + event.clientX);
    event.preventDefault();

    thumbNailList.scrollBy({
        left: event.deltaY < 0 ? -100 : 100,

    });
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
    } else {
        var childEle = e.childNodes[0];
        chooseImage(childEle);
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