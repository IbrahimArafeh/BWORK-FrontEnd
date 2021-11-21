 // Checking on form fields
 function getFormElelemets() {
     var myForm = document.getElementById("formID");
     for (var i = 0; i < myForm.elements.length; i++) {
         if (myForm.elements[i].tagName.toLowerCase() == 'input') {
             var spanEle = document.getElementById(myForm.elements[i].id + "_");
             if (hasValue(myForm.elements[i]) == false) {
                 validation(myForm.elements[i], spanEle);
             } else {
                 myForm.elements[i].classList.remove("login-input-validation");
                 myForm.elements[i].classList.add("login-input");
                 spanEle.style.display = "none";
             }
         }
     }

     // Send Value to Back-End
     //
 }

 function hasValue(e) {
     var value = e.value;
     if (value == null || value == '' || value == 0) {
         return false;
     } else {
         true;
     }
 }

 function validation(e, s) {
     e.classList.remove();
     e.classList.add("login-input-validation");
     s.style.display = "block";
 }