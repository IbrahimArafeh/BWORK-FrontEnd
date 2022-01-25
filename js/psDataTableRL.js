var arrHead = new Array();
var arrHeadType = new Array();

arrHead = [{
    "colHeader": "EmpName",
    "type": "string",
    "class": "mandatory hidden"
}, {
    "colHeader": "Check in",
    "type": "checkbox",
    "class": ""
}, {
    "colHeader": "Age",
    "type": "int",
    "class": ""
}, {
    "colHeader": "Date",
    "type": "date",
    "class": "mandatory"
}, {
    "colHeader": "Password",
    "type": "password",
    "class": ""
}, {
    "colHeader": "hanan",
    "type": "checkbox",
    "class": "hidden"
}, {
    "colHeader": "color",
    "type": "color",
    "class": ""
}, {
    "colHeader": "employeeNumber",
    "type": "int",
    "class": "mandatory hidden"
}]

var dataArr = new Array();
dataArr = [{
        "EmpName": "Ibrahim",
        "checkIn": "1",
        "Age": "28",
        "Date": "1994-01-01",
        "Password": "1111111",
        "hanan": "1",
        "color": "#D5C4C0",
        "employeeNumber": "131138"
    },
    {
        "EmpName": "Omar",
        "checkIn": "0",
        "Age": "28",
        "Date": "2001-01-09",
        "Password": "2222222",
        "hanan": "1",
        "color": "#D5C4C0",
        "employeeNumber": "11780"
    },
    {
        "EmpName": "Hanan",
        "checkIn": "1",
        "Age": "28",
        "Date": "2010-09-12",
        "Password": "333333",
        "hanan": "0",
        "color": "#3F3432",
        "employeeNumber": "888881"
    },
    {
        "EmpName": "Rami",
        "checkIn": "0",
        "Age": "28",
        "Date": "1998-09-09",
        "Password": "444444",
        "hanan": "0",
        "color": "#30F74B",
        "employeeNumber": "198"
    },
    {
        "EmpName": "Zaid",
        "checkIn": "1",
        "Age": "28",
        "Date": "2001-01-01",
        "Password": "5555555",
        "hanan": "0",
        "color": "#3060F7",
        "employeeNumber": "13313"
    },
    {
        "EmpName": "Zaid",
        "checkIn": "1",
        "Age": "28",
        "Date": "2001-01-01",
        "Password": "5555555",
        "hanan": "0",
        "color": "#3060F7",
        "employeeNumber": "120"
    }
]


function getLastId(type) {
    var tbleCount = document.getElementsByClassName(type);
    var containerCount = parseInt(tbleCount.length) + 1;
    return type + containerCount;
}
// first create a TABLE structure by adding few headers.
function createTable() {

    // body
    var body1 = document.getElementById('psBody');
    var containerId = getLastId('tblContainer');
    var tableId = getLastId('tableId');
    var tblContai = getLastId('subCont');

    // general Container
    var container = document.createElement('div');
    container.setAttribute('id', containerId);
    container.setAttribute('class', 'genContainer');
    body1.appendChild(container);

    // Container contains table and Buttons
    var subCont = document.createElement('div');
    subCont.setAttribute('id', tblContai);
    subCont.setAttribute('class', 'tblContainer');
    container.appendChild(subCont);

    // table
    var empTable = document.createElement('table');
    empTable.setAttribute('id', getLastId('empTable')); // table id.
    empTable.setAttribute('class', 'empTable');


    var tr = empTable.insertRow(-1);

    for (var h = 0; h < arrHead.length; h++) {
        var th = document.createElement('th'); // the header object.
        th.setAttribute('class', 'tblHeaderFixed');
        th.innerHTML = arrHead[h].colHeader;

        // to hide column has hidden class
        if (arrHead[h].class.includes("hidden")) {
            th.style.display = 'none';
        }

        tr.appendChild(th);
    }

    var th = document.createElement('th'); // the header object.
    th.setAttribute('class', 'tblHeaderFixed');
    th.innerHTML = "Actions";
    tr.appendChild(th);

    // space between 
    var newLine = document.createElement('br');
    subCont.appendChild(empTable); // add table to a container.
    container.appendChild(newLine);

    // container buttons
    var btnContainer = document.createElement('div');
    btnContainer.setAttribute('style', 'position: sticky;');
    container.appendChild(btnContainer);

    // Button -- Add Row of spreed sheet
    var addRowButton = document.createElement('button');
    addRowButton.setAttribute('id', 'addRow');
    addRowButton.setAttribute('type', 'button');
    addRowButton.innerHTML = "Add Row";
    addRowButton.setAttribute('onclick', 'addRow(this)');
    addRowButton.setAttribute('class', 'ps-btn-light-primary');
    // addRowButton.setAttribute('style', 'position: absolute; left:10%;')
    btnContainer.appendChild(addRowButton);

    // Button -- Submit of spreed sheet
    var submitButton = document.createElement('button');
    submitButton.setAttribute('id', 'bt');
    submitButton.setAttribute('type', 'button');
    submitButton.innerHTML = "Submit";
    submitButton.setAttribute('onclick', 'submit(this)');
    submitButton.setAttribute('value', 'Submit Data');
    submitButton.setAttribute('class', 'ps-btn-light-success');
    // submitButton.setAttribute('style', 'position: absolute; left:10%;')
    btnContainer.appendChild(submitButton);

    // Button -- Fetch data of spreed sheet
    var dataButton = document.createElement('button');
    dataButton.setAttribute('id', 'loadData');
    dataButton.setAttribute('type', 'button');
    dataButton.innerHTML = "Load Data";
	
    dataButton.setAttribute('onclick', 'extractData');
    dataButton.setAttribute('value', 'Load data');
    dataButton.setAttribute('class', 'ps-btn-light-warning');
    // submitButton.setAttribute('style', 'position: absolute; left:10%;')
    btnContainer.appendChild(dataButton);

    // Button -- Clear data of spreed sheet
    var clearButton = document.createElement('button');
    clearButton.setAttribute('id', 'clearData');
    clearButton.setAttribute('type', 'button');
    clearButton.innerHTML = "Clear";
    clearButton.setAttribute('onclick', 'clearData(this)');
    clearButton.setAttribute('value', 'Clear Data');
    clearButton.setAttribute('class', 'ps-btn-light-danger');
    // submitButton.setAttribute('style', 'position: absolute; left:10%;')
    btnContainer.appendChild(clearButton);

    // space between 
    var newLine1 = document.createElement('br');
    document.body.appendChild(newLine1);

    var newLine2 = document.createElement('br');
    document.body.appendChild(newLine2);

    var newLine3 = document.createElement('br');
    document.body.appendChild(newLine3);
}

// function to add new row.
function addRow(e) {
    var parentDiv = e.parentNode;
    let parentPDiv = parentDiv.parentNode;
    let tbl = parentPDiv.getElementsByClassName('empTable')[0];

    var rowCnt = tbl.rows.length; // get the number of rows.
    var tr = tbl.insertRow(rowCnt); // table row.

    // add action Header static.
    var td = document.createElement('td');
    td = tr.insertCell("Action");

    // add action button.
    var btnRemove = document.createElement('input');
    var btnUpdate = document.createElement('input');

    // set the attributes to button.
    btnRemove.setAttribute('type', 'button');
    btnRemove.setAttribute('value', 'Remove');
    btnRemove.setAttribute('class', 'ps-btn-danger');
    // add button's "onclick" event.
    btnRemove.setAttribute('onclick', 'removeRow(this)');
    td.appendChild(btnRemove);

    btnUpdate.setAttribute('type', 'button');
    btnUpdate.setAttribute('value', 'Update');
    btnUpdate.setAttribute('onclick', 'updateDataRow(this)');
    btnUpdate.setAttribute('class', 'ps-btn-success');

    // add button's "onclick" event.
    btnUpdate.setAttribute('onclick', 'updateDataRow(this)');
    td.appendChild(btnUpdate);

    for (var c = arrHead.length - 1; c >= 0; c--) {
        var td = document.createElement('td'); // TABLE DEFINITION.
        td = tr.insertCell(arrHead[c].colHeader);
        var typeStr = arrHead[c].type.toLowerCase();
        // declare a hidden class
        if (arrHead[c].class.includes('hidden')) {
            td.setAttribute('style', 'display:none;');
        }
        // the 2nd, 3rd and 4th column, will have textbox.
        var ele = document.createElement('input');
        switch (typeStr) {
            case 'string':
            case 'text':
                ele.setAttribute('type', 'text');
                break;
            case 'int' || 'number':
                ele.setAttribute('type', 'number');
                break;
            case 'checkbox':
                ele.setAttribute('type', 'checkbox');
                break;
            case 'password':
                ele.setAttribute('type', 'password');
                break;
            case 'date':
                ele.setAttribute('type', 'date');
                break;
            default:
                ele.setAttribute('type', typeStr);
        }

        ele.setAttribute('class', arrHead[c].class);
        if (ele)
            td.appendChild(ele);
    }
}

function addDataRow(e, tblId) {

    // let tbl = document.getElementById('empTable1');
    // var rowCnt = tbl.rows.length; // get the number of rows.
    // var tr = tbl.insertRow(rowCnt); // table row.

    var rowCnt = tblId.rows.length; // get the number of rows.
    var tr = tblId.insertRow(rowCnt); // table row.

    // add action Header static.
    var td = document.createElement('td');
    td = tr.insertCell("Action");

    // add action button.
    var btnRemove = document.createElement('input');
    var btnUpdate = document.createElement('input');

    // set the attributes to button.
    btnRemove.setAttribute('type', 'button');
    btnRemove.setAttribute('value', 'Remove');
    btnRemove.setAttribute('class', 'ps-btn-danger');
    // add button's "onclick" event.
    btnRemove.setAttribute('onclick', 'removeRow(this)');
    td.appendChild(btnRemove);


    btnUpdate.setAttribute('type', 'button');
    btnUpdate.setAttribute('value', 'Update');
    btnUpdate.setAttribute('class', 'ps-btn-success');
    // add button's "onclick" event.
    btnUpdate.setAttribute('onclick', 'updateDataRow(this)');
    td.appendChild(btnUpdate);
    var keys = Object.keys(e);

    for (var c = arrHead.length - 1; c >= 0; c--) {
        var td = document.createElement('td'); // TABLE DEFINITION.
        td = tr.insertCell(arrHead[c].colHeader);
        var typeStr = arrHead[c].type.toLowerCase();
        var el = e;

        // declare a hidden class
        if (arrHead[c].class.includes('hidden')) {
            td.setAttribute('style', 'display:none;');
        }
        // the 2nd, 3rd and 4th column, will have textbox.
        var ele = document.createElement('input');
        switch (typeStr) {
            case 'string':
            case 'text':
                ele.setAttribute('type', 'text');
                ele.setAttribute('value', e[keys[c]]);
                break;
            case 'int':
            case 'number':
                ele.setAttribute('type', 'number');
                ele.setAttribute('value', e[keys[c]]);
                break;
            case 'checkbox':
                ele.setAttribute('type', 'checkbox');
                if (e[keys[c]] == "1") {
                    ele.checked = true;
                } else {
                    ele.checked = false;
                }
                break;
            case 'password':
                ele.setAttribute('type', 'password');
                ele.setAttribute('value', e[keys[c]]);
                break;
            case 'date':
                ele.setAttribute('type', 'date');
                ele.setAttribute('value', e[keys[c]]);
                break;
            default:
                ele.setAttribute('type', typeStr);
                ele.setAttribute('value', e[keys[c]]);
        }

        ele.setAttribute('class', arrHead[c].class)
        td.appendChild(ele);
    }
}
// function to delete a row.
function removeRow(oButton) {
    var p1 = oButton.parentNode;
    let p2 = p1.parentNode;
    let p3 = p2.parentNode;
    let p4 = p3.parentNode;
    p4.deleteRow(oButton.parentNode.parentNode.rowIndex); // buttton -> td -> tr
}

function clearData(e) {
    var tableHeaderRowCount = 1;
    var parentDiv = e.parentNode;
    let parentPDiv = parentDiv.parentNode;
    let myTab = parentPDiv.getElementsByClassName('empTable')[0];
    var rowCount = myTab.rows.length;

    for (var i = tableHeaderRowCount; i < rowCount; i++) {
        myTab.deleteRow(tableHeaderRowCount);
    }
}
// function to extract and submit table data.
function submit(e) {
    var parentDiv = e.parentNode;
    let parentPDiv = parentDiv.parentNode;
    let myTab = parentPDiv.getElementsByClassName('empTable')[0];


    // var myTab = document.getElementById('empTable');
    var arrValues = new Array();
    var arrNew = new Array();
    var rowArray;

    // loop through each row of the table.
    for (row = 1; row <= myTab.rows.length - 1; row++) {
        // loop through each cell in a row.
        rowArray = new Array();
        var colunNumber = myTab.rows[row].cells.length - 1;

        for (c = 0; c < myTab.rows[row].cells.length - 1; c++) {
            var element = myTab.rows.item(row).cells[c];
            var classN = element.childNodes[0];

            if (isMandatory(element.childNodes[0])) {
                if (!isCheckedValue(element.childNodes[0])) {
                    alert("You missed a mandatory Value");
                }
            }
            if (element.childNodes[0].type == "checkbox") {
                if (element.childNodes[0].checked) {
                    element.childNodes[0].value = 1;
                } else {
                    element.childNodes[0].value = 0;
                }
            }
            // arrValues.push(element.childNodes[0].value);
            rowArray.push(element.childNodes[0].value);
        }
        arrValues.push({
            rowArray
        });
    }
    JSON.stringify(arrValues);
    // JSON.parse(arrValues);
    // finally, show the result in the console.
    console.log(arrValues);
    console.log(arrNew);
}

function updateDataRow(e) {
    var parentDiv = e.parentNode;
    let parentPDiv = parentDiv.parentNode;

    var rowArray = new Array();
    var arrValues = new Array();

    for (c = 0; c < parentPDiv.cells.length - 1; c++) {
        var element = parentPDiv.cells[c];

        var classN = element.childNodes[0];

        if (isMandatory(element.childNodes[0])) {
            if (!isValue(element.childNodes[0])) {
                alert("You missed a mandatory Value");
            }
        }
        if (element.childNodes[0].type == "checkbox") {
            if (element.childNodes[0].checked) {
                element.childNodes[0].value = 1;
            } else {
                element.childNodes[0].value = 0;
            }
        }
        // arrValues.push(element.childNodes[0].value);
        rowArray.push(element.childNodes[0].value);
    }
    arrValues.push({
        rowArray
    });

    JSON.stringify(arrValues);
    console.log(arrValues);

}

function isMandatory(element) {
    if (element.getAttribute("class") == "mandatory") {
        return true;
    } else {
        return false;
    }
}

function isCheckedValue(element) {
    if (element.type == "checkbox") {
        if (element.checked) {
            return true;
        } else {
            return false;
        }
    } else {
        if (element.value == null || element.value == "") {
            return false;
        } else {
            return true;
        }
    }
}

function isColor(element) {
    if (element.getAttribute("type") == "color") {
        return true;
    } else {
        return false;
    }
}

/*
function extractData(e, values) {
    var parentDiv = e.parentNode;
    let parentPDiv = parentDiv.parentNode;
    let myTab = parentPDiv.getElementsByClassName('empTable')[0];
    for (d = 0; d < 1000; d++) {
        for (c = 0; c < values.length; c++) {
            addDataRow(values[c], myTab);
        }
    }
}*/

function extractData(  ) {
	
	var tbody = document.getElementById( 'test' );
	for( r = 0; r < 1000; r++ ){		
		var row   = tbody.insertRow( 0 );	  
			for( i =0; i < 5; i++ ){
				var cell = row.insertCell( i );			
				cell.innerText = "This is a test " + i;					
				cell.className = "mandatory";
			}
			var cellButton = row.insertCell( 5 );
			var btn1 = document.createElement( 'button' );
			btn1.innerText = "Update";
			var btn2 = document.createElement( 'button' );
			btn2.innerText = "Remove";
			cellButton.appendChild( btn1 );
			cellButton.appendChild( btn2 );
		}
	}



function DataSample() {
    var dataArr = new Array();
    dataArr = [{
            "EmpName": "Ibrahim",
            "checkIn": "1",
            "Age": "28",
            "Date": "1994-01-01",
            "Password": "1111111",
            "hanan": "1",
            "color": "#D5C4C0",
            "employeeNumber": "131138"
        },
        {
            "EmpName": "Omar",
            "checkIn": "0",
            "Age": "28",
            "Date": "2001-01-09",
            "Password": "2222222",
            "hanan": "1",
            "color": "#D5C4C0",
            "employeeNumber": "11780"
        },
        {
            "EmpName": "Hanan",
            "checkIn": "1",
            "Age": "28",
            "Date": "2010-09-12",
            "Password": "333333",
            "hanan": "0",
            "color": "#3F3432",
            "employeeNumber": "888881"
        },
        {
            "EmpName": "Rami",
            "checkIn": "0",
            "Age": "28",
            "Date": "1998-09-09",
            "Password": "444444",
            "hanan": "0",
            "color": "#30F74B",
            "employeeNumber": "198"
        },
        {
            "EmpName": "Zaid",
            "checkIn": "1",
            "Age": "28",
            "Date": "2001-01-01",
            "Password": "5555555",
            "hanan": "0",
            "color": "#3060F7",
            "employeeNumber": "13313"
        },
        {
            "EmpName": "Zaid",
            "checkIn": "1",
            "Age": "28",
            "Date": "2001-01-01",
            "Password": "5555555",
            "hanan": "0",
            "color": "#3060F7",
            "employeeNumber": "120"
        }
    ]
    return dataArr;
}