function pslogincheck() {
    var userName = document.getElementById("loginUsrename");
    var password = document.getElementById("loginPassword");

    if (hasValue(userName) || hasValue(password)) {
        // alert("there is no value")

    }
}

function hasValue(e) {
    var value = e.value;
    if (value == null || value == '' || value == 0) {
        return false;
    } else {
        true;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    var elements = document.getElementsByTagName("INPUT");
    for (var i = 0; i < elements.length; i++) {
        elements[i].oninvalid = function(e) {
            e.target.setCustomValidity("");
            if (!e.target.validity.valid) {
                e.target.setCustomValidity("This field cannot be left blank");
            }
        };
        elements[i].oninput = function(e) {
            e.target.setCustomValidity("");
        };
    }
})