var mainImg = document.getElementById("mainImg");

var thmub1 = document.getElementById('thumb1');
var thumb1Src = document.getElementById('thumb1').src;

var thmub2 = document.getElementById('thumb2');
var thumb2Src = document.getElementById('thumb2').src;

var thmub3 = document.getElementById('thumb3');
var thumb3Src = document.getElementById('thumb3').src;

var thmub4 = document.getElementById('thumb4');
var thumb4Src = document.getElementById('thumb4').src;

var thmub5 = document.getElementById('thumb5');
var thumb5Src = document.getElementById('thumb5').src;

thumb1.addEventListener("click", function() {
    mainImg.src = thumb1Src
})

thumb2.addEventListener("click", function() {
    mainImg.src = thumb2Src
})
thumb3.addEventListener("click", function() {
    mainImg.src = thumb3Src
})
thumb4.addEventListener("click", function() {
    mainImg.src = thumb4Src
})
thumb5.addEventListener("click", function() {
    mainImg.src = thumb5Src
})