var selectRow = null;
var selectRowCon = null;
var selectRowIt = null;

function onformSubmit() {
    if (validate()) {
        var fromData = readFromData();

        if (selectRow === null) {
            insertNewTabpage(fromData);
        } else {
            onUpdate(fromData);
        }
        resetForm();
    }
}

function onformSubmitCon() {
    if (validateCon()) {
        var fromData = readFromDataCon();

        if (selectRowCon === null) {
            insertNewContainer(fromData);
        } else {
            onUpdateCon(fromData);
        }
        resetFormCon();
    }
}

function onformSubmitIt() {
    if (validateIt()) {
        var fromData = readFromDataIt();

        if (selectRowIt === null) {
            insertNewItem(fromData);
        } else {
            onUpdateIt(fromData);
        }
        resetFormIt();
    }
}

function readFromData() {
    var fromData = {};

    fromData["tabpagename"] = document.getElementById("tabpagename").value;
    return fromData;
}

function readFromDataCon() {
    var fromData = {};
    fromData["containername"] = document.getElementById("containername").value;
    fromData["containertab"] = document.getElementById("containertab").value;
    fromData["containerforeground"] = document.getElementById("containerforeground").value;
    fromData["containerbackground"] = document.getElementById("containerbackground").value;
    fromData["containerfont"] = document.getElementById("containerfont").value;
    fromData["containerfontfamily"] = document.getElementById("containerfontfamily").value;
    fromData["containerfontsize"] = document.getElementById("containerfontsize").value;
    fromData["containerfontstyle"] = document.getElementById("containerfontstyle").value;
    fromData["containerhidden"] = document.getElementById("containerhidden").checked;
    fromData["containerwidth"] = document.getElementById("containerwidth").value;
    return fromData;
}

function readFromDataIt() {
    var fromData = {};

    fromData["itemid"] = document.getElementById("itemid").value;
    alert(document.getElementById("itemclass").selected);
    fromData["itemclass"] = document.getElementById("itemclass").selected;
    fromData["itemdatabasefield"] = document.getElementById("itemdatabasefield").value;
    fromData["itemmandatory"] = document.getElementById("itemmandatory").checked;
    fromData["itemdefaultvalue"] = document.getElementById("itemdefaultvalue").value;
    fromData["itemlabel"] = document.getElementById("itemlabel").value;
    fromData["itemsearchable"] = document.getElementById("itemsearchable").checked;
    fromData["itemprintable"] = document.getElementById("itemprintable").checked;
    fromData["itemtabpage"] = document.getElementById("itemtabpage").value;
    fromData["itemcontainer"] = document.getElementById("itemcontainer").value;
    fromData["itemfont"] = document.getElementById("itemfont").value;
    fromData["itemfontfamily"] = document.getElementById("itemfontfamily").value;
    fromData["itemfontsize"] = document.getElementById("itemfontsize").value;
    fromData["itemfontstyle"] = document.getElementById("itemfontstyle").value;
    fromData["itemforeground"] = document.getElementById("itemforeground").value;
    fromData["itembackground"] = document.getElementById("itembackground").value;
    fromData["itemhidden"] = document.getElementById("itemhidden").checked;
    fromData["itemwidth"] = document.getElementById("itemwidth").value;
    fromData["itemchangeevent"] = document.getElementById("itemchangeevent").value;
    return fromData;
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function insertNewTabpage(data) {
    var table = document.getElementById("tabpagestable").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.lenght);

    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.tabpagename;

    //alert ( hexToRgb( data.tabpagebackground ).r + "," + hexToRgb( data.tabpagebackground ).g + "," + hexToRgb( data.tabpagebackground ).b );

    cell2 = newRow.insertCell(1);
    cell2.innerHTML = `<a onclick=onEdit(this)>Edit</a>
                     <a onclick=onDelete(this)>Delete</a>`;

    closeModal();
}

function insertNewContainer(data) {
    var table = document.getElementById("containerstable").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.lenght);

    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.containername;

    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.containertab;

    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.containerforeground;
    cell3.style.display = "none";

    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.containerbackground;
    cell4.style.display = "none";

    cell5 = newRow.insertCell(4);
    cell5.innerHTML = data.containerfont;
    cell5.style.display = "none";

    cell6 = newRow.insertCell(5);
    cell6.innerHTML = data.containerfontfamily;
    cell6.style.display = "none";

    cell7 = newRow.insertCell(6);
    cell7.innerHTML = data.containerfontsize;
    cell7.style.display = "none";

    cell8 = newRow.insertCell(7);
    cell8.innerHTML = data.containerfontstyle;
    cell8.style.display = "none";

    cell9 = newRow.insertCell(8);
    cell9.innerHTML = data.containerhidden;

    cell10 = newRow.insertCell(9);
    cell10.innerHTML = data.containerwidth;

    cell11 = newRow.insertCell(10);
    cell11.innerHTML = `<a onclick=onEditCon(this)>Edit</a>
                     <a onclick=onDeleteCon(this)>Delete</a>`;

    closeModalCon();
}

function insertNewItem(data) {
    var table = document.getElementById("itemstable").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.lenght);

    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.itemid;

    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.itemclass;

    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.itemdatabasefield;

    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.itemmandatory;

    cell5 = newRow.insertCell(4);
    cell5.innerHTML = data.itemdefaultvalue;
    cell5.style.display = "none";

    cell6 = newRow.insertCell(5);
    cell6.innerHTML = data.itemlabel;

    cell7 = newRow.insertCell(6);
    cell7.innerHTML = data.itemsearchable;
    cell7.style.display = "none";

    cell8 = newRow.insertCell(7);
    cell8.innerHTML = data.itemprintable;
    cell8.style.display = "none";

    cell9 = newRow.insertCell(8);
    cell9.innerHTML = data.itemtabpage;
    cell9.style.display = "none";

    cell10 = newRow.insertCell(9);
    cell10.innerHTML = data.itemcontainer;
    cell10.style.display = "none";

    cell11 = newRow.insertCell(10);
    cell11.innerHTML = data.itemfont;
    cell11.style.display = "none";

    cell12 = newRow.insertCell(11);
    cell12.innerHTML = data.itemfontfamily;
    cell12.style.display = "none";

    cell13 = newRow.insertCell(12);
    cell13.innerHTML = data.itemfontsize;
    cell13.style.display = "none";

    cell14 = newRow.insertCell(13);
    cell14.innerHTML = data.itemfontstyle;
    cell14.style.display = "none";

    cell15 = newRow.insertCell(14);
    cell15.innerHTML = data.itemforeground;
    cell15.style.display = "none";

    cell16 = newRow.insertCell(15);
    cell16.innerHTML = data.itembackground;
    cell16.style.display = "none";

    cell17 = newRow.insertCell(16);
    cell17.innerHTML = data.itemhidden;
    cell17.style.display = "none";

    cell18 = newRow.insertCell(17);
    cell18.innerHTML = data.itemwidth;
    cell18.style.display = "none";

    cell19 = newRow.insertCell(18);
    cell19.innerHTML = data.itemchangeevent;
    cell19.style.display = "none";

    cell20 = newRow.insertCell(19);
    cell20.innerHTML = `<a onclick=onEditIt(this)>Edit</a>
                     <a onclick=onDeleteIt(this)>Delete</a>`;

    closeModalIt();
}


function resetForm() {
    document.getElementById("tabpagename").value = "";
    selectRow = null;
}

function resetFormCon() {
    document.getElementById("containername").value = "";
    document.getElementById("containertab").value = "";
    document.getElementById("containerforeground").value = "";
    document.getElementById("containerbackground").value = "";
    document.getElementById("containerfont").value = "";
    document.getElementById("containerfontfamily").value = "";
    document.getElementById("containerfontsize").value = "";
    document.getElementById("containerfontstyle").value = "";
    document.getElementById("containerhidden").checked = false;
    document.getElementById("containerwidth").value = "";
    selectRowCon = null;
}

function resetFormIt() {
    document.getElementById("itemid").value = "";
    document.getElementById("itemclass").value = "";
    document.getElementById("itemdatabasefield").value = "";
    document.getElementById("itemmandatory").checked = false;
    document.getElementById("itemdefaultvalue").value = "";
    document.getElementById("itemlabel").value = "";
    document.getElementById("itemsearchable").checked = false;
    document.getElementById("itemprintable").checked = false;
    document.getElementById("itemtabpage").value = "";
    document.getElementById("itemcontainer").value = "";
    document.getElementById("itemfont").value = "";
    document.getElementById("itemfontfamily").value = "";
    document.getElementById("itemfontsize").value = "";
    document.getElementById("itemfontstyle").value = "";
    document.getElementById("itemforeground").value = "";
    document.getElementById("itembackground").value = "";
    document.getElementById("itemhidden").checked = false;
    document.getElementById("itemwidth").value = "";
    document.getElementById("itemchangeevent").value = "";
    selectRowIt = null;
}

function onEdit(td) {
    openModal();
    selectRow = td.parentElement.parentElement;
    document.getElementById("tabpagename").value = selectRow.cells[0].innerHTML;
}

function onEditCon(td) {
    openModalCon();
    selectRowCon = td.parentElement.parentElement;
    document.getElementById("containername").value = selectRowCon.cells[0].innerHTML;
    document.getElementById("containertab").value = selectRowCon.cells[1].innerHTML;
    document.getElementById("containerforeground").value = selectRowCon.cells[2].innerHTML;
    document.getElementById("containerbackground").value = selectRowCon.cells[3].innerHTML;
    document.getElementById("containerfont").value = selectRowCon.cells[4].innerHTML;
    document.getElementById("containerfontfamily").value = selectRowCon.cells[5].innerHTML;
    document.getElementById("containerfontsize").value = selectRowCon.cells[6].innerHTML;
    document.getElementById("containerfontstyle").value = selectRowCon.cells[7].innerHTML;
    if (selectRowCon.cells[8].innerHTML === "true") {
        document.getElementById("containerhidden").checked = true;
    } else {
        document.getElementById("containerhidden").checked = false;
    }
    document.getElementById("containerwidth").value = selectRowCon.cells[9].innerHTML;
}

function onEditIt(td) {
    openModalIt();
    selectRowIt = td.parentElement.parentElement;
    document.getElementById("itemid").value = selectRowIt.cells[0].innerHTML;
    document.getElementById("itemclass").value = selectRowIt.cells[1].innerHTML;
    document.getElementById("itemdatabasefield").value = selectRowIt.cells[2].innerHTML;
    if (selectRowIt.cells[3].innerHTML === "true") {
        document.getElementById("itemmandatory").checked = true;
    } else {
        document.getElementById("itemmandatory").checked = false;
    }
    document.getElementById("itemdefaultvalue").value = selectRowIt.cells[4].innerHTML;
    document.getElementById("itemlabel").value = selectRowIt.cells[5].innerHTML;
    if (selectRowIt.cells[6].innerHTML === "true") {
        document.getElementById("itemsearchable").checked = true;
    } else {
        document.getElementById("itemsearchable").checked = false;
    }
    if (selectRowIt.cells[7].innerHTML === "true") {
        document.getElementById("itemprintable").checked = true;
    } else {
        document.getElementById("itemprintable").checked = false;
    }
    document.getElementById("itemtabpage").value = selectRowIt.cells[8].innerHTML;
    document.getElementById("itemcontainer").value = selectRowIt.cells[9].innerHTML;
    document.getElementById("itemfont").value = selectRowIt.cells[10].innerHTML;
    document.getElementById("itemfontfamily").value = selectRowIt.cells[11].innerHTML;
    document.getElementById("itemfontsize").value = selectRowIt.cells[12].innerHTML;
    document.getElementById("itemfontstyle").value = selectRowIt.cells[13].innerHTML;
    document.getElementById("itemforeground").value = selectRowIt.cells[14].innerHTML;
    document.getElementById("itembackground").value = selectRowIt.cells[15].innerHTML;
    if (selectRowIt.cells[16].innerHTML === "true") {
        document.getElementById("itemhidden").checked = true;
    } else {
        document.getElementById("itemhidden").checked = false;
    }
    document.getElementById("itemwidth").value = selectRowIt.cells[17].innerHTML;
    document.getElementById("itemchangeevent").value = selectRowIt.cells[18].innerHTML;
}


function onUpdate(td) {

    selectRow.cells[0].innerHTML = td.tabpagename;
    closeModal();
}

function onUpdateCon(td) {
    selectRowCon.cells[0].innerHTML = td.containername;
    selectRowCon.cells[1].innerHTML = td.containertab;
    selectRowCon.cells[2].innerHTML = td.containerforeground;
    selectRowCon.cells[3].innerHTML = td.containerbackground;
    selectRowCon.cells[4].innerHTML = td.containerfont;
    selectRowCon.cells[5].innerHTML = td.containerfontfamily;
    selectRowCon.cells[6].innerHTML = td.containerfontsize;
    selectRowCon.cells[7].innerHTML = td.containerfontstyle;
    selectRowCon.cells[8].innerHTML = td.containerhidden;
    selectRowCon.cells[9].innerHTML = td.containerwidth;
    closeModalCon();
}

function onUpdateIt(td) {
    selectRowIt.cells[0].innerHTML = td.itemid;
    selectRowIt.cells[1].innerHTML = td.itemclass;
    selectRowIt.cells[2].innerHTML = td.itemdatabasefield;
    selectRowIt.cells[3].innerHTML = td.itemmandatory;
    selectRowIt.cells[4].innerHTML = td.itemdefaultvalue;
    selectRowIt.cells[5].innerHTML = td.itemlabel;
    selectRowIt.cells[6].innerHTML = td.itemsearchable;
    selectRowIt.cells[7].innerHTML = td.itemprintable;
    selectRowIt.cells[8].innerHTML = td.itemtabpage;
    selectRowIt.cells[9].innerHTML = td.itemcontainer;
    selectRowIt.cells[10].innerHTML = td.itemfont;
    selectRowIt.cells[11].innerHTML = td.itemfontfamily;
    selectRowIt.cells[12].innerHTML = td.itemfontsize;
    selectRowIt.cells[13].innerHTML = td.itemfontstyle;
    selectRowIt.cells[14].innerHTML = td.itemforeground;
    selectRowIt.cells[15].innerHTML = td.itembackground;
    selectRowIt.cells[16].innerHTML = td.itemhidden;
    selectRowIt.cells[17].innerHTML = td.itemwidth;
    selectRowIt.cells[18].innerHTML = td.itemchangeevent;
    closeModalIt();
}

function onDelete(td) {
    if (confirm("Are you sure you want to delete this record ?")) {
        row = td.parentElement.parentElement;
        document.getElementById("tabpagestable").deleteRow(row.rowIndex);
        resetForm();
    }
}

function onDeleteCon(td) {
    if (confirm("Are you sure you want to delete this record ?")) {
        row = td.parentElement.parentElement;
        document.getElementById("containerstable").deleteRow(row.rowIndex);
        resetFormCon();
    }
}

function onDeleteIt(td) {
    if (confirm("Are you sure you want to delete this record ?")) {
        row = td.parentElement.parentElement;
        document.getElementById("itemstable").deleteRow(row.rowIndex);
        resetFormIt();
    }
}

function validate() {
    isValid = true;

    if (document.getElementById("tabpagename").value === "") {
        isValid = false;
        document.getElementById("tabpagenameValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("tabpagenameValidationError").classList.contains("hide"))
            document.getElementById("tabpagenameValidationError").classList.add("hide");
    }
    return isValid;
}


function validateCon() {
    isValid = true;

    if (document.getElementById("containertab").value === "" || document.getElementById("containername").value === "") {
        isValid = false;
        if (document.getElementById("containertab").value === "") {
            document.getElementById("containertabValidationError").classList.remove("hide");
        }
        if (document.getElementById("containername").value === "") {
            document.getElementById("containernameValidationError").classList.remove("hide");
        }
    } else {
        isValid = true;
        if (!document.getElementById("containertabValidationError").classList.contains("hide"))
            document.getElementById("containernameValidationError").classList.add("hide");
    }
    return isValid;
}

function validateIt() {
    isValid = true;

    if (document.getElementById("itemid").value === "" || document.getElementById("itemclass").value === "") {
        isValid = false;
        if (document.getElementById("itemid").value === "") {
            document.getElementById("itemidValidationError").classList.remove("hide");
        }
        if (document.getElementById("itemclass").value === "") {
            document.getElementById("itemclassValidationError").classList.remove("hide");
        }
    } else {
        isValid = true;
        if (!document.getElementById("itemidValidationError").classList.contains("hide"))
            document.getElementById("itemidValidationError").classList.add("hide");
        if (!document.getElementById("itemclassValidationError").classList.contains("hide"))
            document.getElementById("itemclassValidationError").classList.add("hide");
    }
    return isValid;
}

// Modal funcitons

// Get modal element
var modal = document.getElementById("simpleModal");
var modalCon = document.getElementById("simpleModalCon");
var modalIt = document.getElementById("simpleModalIt");
// Get open modal button
var modalBtn = document.getElementById("modalBtn");
var modalBtnCon = document.getElementById("modalBtnCon");
var modalBtnIt = document.getElementById("modalBtnIt");
// Get close modal button
var closeBtn = document.getElementsByClassName("closeBtn")[0];
var closeBtnCon = document.getElementsByClassName("closeBtnCon")[0];
var closeBtnIt = document.getElementsByClassName("closeBtnIt")[0];
// Listen for open modal click
modalBtn.addEventListener('click', openModal);
modalBtnCon.addEventListener('click', openModalCon);
modalBtnIt.addEventListener('click', openModalIt);
// Listen for close modal click
closeBtn.addEventListener('click', closeModal);
closeBtnCon.addEventListener('click', closeModalCon);
closeBtnIt.addEventListener('click', closeModalIt);
// Listen for close modal ouside clisk
window.addEventListener('click', outsideClick);
// Function to open modal
function openModal() {
    resetForm();
    modal.style.display = 'block';
}

function openModalCon() {
    resetFormCon();
    modalCon.style.display = 'block';
}

function openModalIt() {
    resetFormIt();
    modalIt.style.display = 'block';
}

// Function to close modal
function closeModal() {
    modal.style.display = 'none';
}

function closeModalCon() {
    modalCon.style.display = 'none';
}

function closeModalIt() {
    modalIt.style.display = 'none';
}
// Function to outside click
function outsideClick(e) {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
    if (e.target === modalCon) {
        modalCon.style.display = 'none';
    }
    if (e.target === modalIt) {
        modalIt.style.display = 'none';
    }
}