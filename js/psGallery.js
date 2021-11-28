// Declaring variable array of images. You can put as many as you want.
const myimages = ['nut1.jpg', '9.png', 'nut1.jpg', '8.jpg', '02.jpg', '9.png', '9.png', '8.jpg', '02.jpg'];

const prevBtn = document.getElementById("ImageViewer-Prev-btn"); // assigning variable for previous button
const nextBtn = document.getElementById("ImageViewer-Nxt-btn"); // assigning variable for next button
const imageContainer = document.getElementById("mainImg"); // assigning variable for image container div
var myimage = "9.png"; // Assigning initial value for the varibale to show on page loading

var counter = 0;
prevBtn.addEventListener("click", function() {
    if (counter > 0 && counter < myimages.length) {
        counter--;
        myimage = myimages[counter];
        // imageContainer.innerHTML = '<img src="Content/' + myimage + '" />';
        imageContainer.src = "Content/" + myimage;
    }
});

nextBtn.addEventListener("click", function() {
    if (counter < myimages.length - 1) {
        counter++;
        myimage = myimages[counter];
        // imageContainer.innerHTML = '<img src="Content/' + myimage + '" />';
        imageContainer.src = "Content/" + myimage;
    }
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