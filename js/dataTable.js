var selectRow = null;

function onformSubmit(){
    if (validate() ){
        var fromData = readFromData();

        if(selectRow == null)
        {
            insertNewBarcode(fromData);
        }
        else
        {
            onUpdate(fromData);
        }
        resetForm();
    }
}

function readFromData(){
    var fromData = {};

    fromData["fullName"] = document.getElementById("fullname").value;
    fromData["empCode"] = document.getElementById("empcode").value;
    fromData["salary"] = document.getElementById("salary").value;
    fromData["city"] = document.getElementById("city").value;

    return fromData;
}

function insertNewBarcode(data){

    var table = document.getElementById("empList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.lenght);

    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.fullName;
    
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.empCode;

    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.salary;

    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.city;

    cell5 = newRow.insertCell(4);
    cell5.innerHTML = `<a onclick=onEdit(this)>Edit</a>
                     <a onclick=onDelete(this)>Delete</a>`;

    closeModal();                     
}

function resetForm()
{
    document.getElementById("fullname").value = "";
    document.getElementById("empcode").value  = "";
    document.getElementById("salary").value   = "";
    document.getElementById("city").value     = "";
    selectRow = null;
}

function onEdit(td){
    openModal();
    selectRow = td.parentElement.parentElement;
    document.getElementById("fullname").value = selectRow.cells[0].innerHTML;
    document.getElementById("empcode").value = selectRow.cells[1].innerHTML;
    document.getElementById("salary").value = selectRow.cells[2].innerHTML;
    document.getElementById("city").value = selectRow.cells[3].innerHTML;
}

function onUpdate(td){

    selectRow.cells[0].innerHTML = td.fullName;
    selectRow.cells[1].innerHTML = td.empCode;
    selectRow.cells[2].innerHTML = td.salary;
    selectRow.cells[3].innerHTML = td.city;
    
    closeModal();

}

function onDelete(td){
    if(confirm("Are you sure you want to delete this record ?")){
        row = td.parentElement.parentElement;
    document.getElementById("empList").deleteRow(row.rowIndex);
    resetForm();
    }
}

function validate(){
    isValid = true;

    if ( document.getElementById("fullname").value == "") {
        isValid = false;
        document.getElementById("fullNameValidationError").classList.remove("hide");
    }
    else{
        isValid = true;
        if(!document.getElementById("fullNameValidationError").classList.contains("hide"))
            document.getElementById("fullNameValidationError").classList.add("hide");
    }
    return isValid;
}

// Modal funcitons

// Get modal element
var modal = document.getElementById("simpleModal");
// Get open modal button
var modalBtn = document.getElementById("modalBtn");
// Get close modal button
var closeBtn = document.getElementsByClassName("closeBtn")[0];

// Listen for open modal click
modalBtn.addEventListener('click',openModal);
// Listen for close modal click
closeBtn.addEventListener('click',closeModal);
// Listen for close modal ouside clisk
window.addEventListener('click',outsideClick);
// Function to open modal
function openModal(){
    resetForm();
    modal.style.display = 'block';
}

// Function to close modal
function closeModal(){
    modal.style.display = 'none';
}
// Function to outside click
function outsideClick(e){
    if(e.target == modal){
        modal.style.display = 'none';
    }
}

// -------------  Progress Bar functions  ------------------ //

const uploadFiles = () => {
    var progressBarId = document.getElementById("progressBarUploading");
    openAnyModal(progressBarId);
    const progressBar = document.querySelector('.progress-bar');
    progressBar.setAttribute('id','play-animation');
    // closeAnyModel(progressBarId);
}

function openAnyModal(tagId){
    tagId.style.display = 'block';
}

function closeAnyModel(tagId){
    tagId.style.display = 'none';
}


// ------------- Progress Bar Functions 2 -------------------- //

function increaseBar(){
    var tagId = document.querySelector(".progress");
    for(let i =0; i<=100; i++){
        updateProgressBar(tagId, i);
    }
}
    

function updateProgressBar(progressBar, value){
    value = Math.round(value);
    progressBar.querySelector(".progress__fill").style.width = `${value}%`;
    progressBar.querySelector('.progress__text').textContent = `${value}%`;
}
