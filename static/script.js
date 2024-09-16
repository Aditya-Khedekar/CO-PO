function generateRows() {
    const num_rows = document.querySelector('input[name="rowCount"]').value;
    const container = document.getElementById('rows_container');
    container.innerHTML = '';

    const fragment = document.createDocumentFragment()

    for (let i = 1; i <= num_rows; i++) {
        const rowDiv = document.createElement('div');
        container.innerHTML += `
        <div>
            <input type="text" size="10" name="id_${i}" placeholder="id ${i}">
            <input type="text" size="20" name="name_${i}" placeholder="name ${i}">
 
            <input type="text" size="3" name="aa_${i}" placeholder="1a ${i}">
            <input type="text" size="3" name="ab_${i}" placeholder="1b ${i}">
            <input type="text" size="3" name="ac_${i}" placeholder="1c ${i}">
            <input type="text" size="3" name="ad_${i}" placeholder="1d ${i}">
            <input type="text" size="3" name="ae_${i}" placeholder="1e ${i}">
            <input type="text" size="3" name="af_${i}" placeholder="1f ${i}">
            <input type="text" size="3" name="ba_${i}" placeholder="2a ${i}">
            <input type="text" size="3" name="bb_${i}" placeholder="2b ${i}">
            <input type="text" size="3"  name="ca_${i}" placeholder="3a ${i}">
            <input type="text" size="3" name="cb_${i}" placeholder="3b ${i}">
            
            <input type="text" size="3" name="baa_${i}" placeholder="1a ${i}">
            <input type="text" size="3" name="bab_${i}" placeholder="1b ${i}">
            <input type="text" size="3" name="bac_${i}" placeholder="1c ${i}">
            <input type="text" size="3" name="bad_${i}" placeholder="1d ${i}">
            <input type="text" size="3" name="bae_${i}" placeholder="1e ${i}">
            <input type="text" size="3" name="baf_${i}" placeholder="1f ${i}">
            <input type="text" size="3" name="bba_${i}" placeholder="2a ${i}">
            <input type="text" size="3" name="bbb_${i}" placeholder="2b ${i}">
            <input type="text" size="3"  name="bca_${i}" placeholder="3a ${i}">
            <input type="text" size="3" name="bcb_${i}" placeholder="3b ${i}">
       </div>
       `;
       fragment.appendChild(rowDiv);
    }
    container.appendChild(fragment);
}

function handlePaste(e) {
    e.preventDefault(); // Prevent the default paste behavior

    const clipboardData = e.clipboardData || window.clipboardData;
    const pastedData = clipboardData.getData('text/plain').split('\n');
    const rows = document.querySelectorAll('#rows_container div');

    pastedData.forEach((rowData, rowIndex) => {
        const cells = rowData.split('\t');
        const inputs = rows[rowIndex].querySelectorAll('input[type="text"]');

        cells.forEach((cellData, cellIndex) => {
            if (inputs[cellIndex] && cells[cellIndex]) {
                inputs[cellIndex].value = cells[cellIndex].trim();
            }
        });
    });
}

document.addEventListener('paste', handlePaste);
document.addEventListener('paste', handlePaste);

function toggleOutcomeTableVisibility() {
    var tableContainer = document.getElementById('courseOutcomesContainer');
    tableContainer.style.display = tableContainer.style.display === 'none' ? 'block' : 'none';
}



function toggleOutcomes() {
    var outcomesContainer = document.querySelector('.outcomes-container');
    var outcomesText = document.getElementById('outcomesText');
    var hasInputs = outcomesContainer.querySelector('input[type="text"]');
    outcomesText.style.display = hasInputs ? 'none' : 'block';
    outcomesContainer.classList.toggle('show');
    outcomesContainer.style.display = outcomesContainer.classList.contains('show') ? 'block' : 'none';
}

function addOutcome() {
    var outcomesContainer = document.querySelector('.outcomes-container');
    var outcomesText = document.getElementById('outcomesText');
    var printButton = document.querySelector('.print-button');

    var currentScrollTop = window.scrollY || document.documentElement.scrollTop;

    if (!outcomesContainer.classList.contains('show')) {
        toggleOutcomes();
    }
    

    for (let i = 1; i < 7; i++) {
        var newRow = document.createElement('div');
        newRow.classList.add('form-row', 'mt-2');

        var input1 = document.createElement('div');
        input1.classList.add('form-group', 'col-10');
        input1.innerHTML = `<input type="text" name="co_${i}" class="form-control course-input" placeholder="Outcome Description">`;

        var input2 = document.createElement('div');
        input2.classList.add('form-group', 'col-2');
        input2.innerHTML += '<input type="text" class="form-control level-input" placeholder="Outcome Assessment">';

        newRow.appendChild(input1);
        newRow.appendChild(input2);

        outcomesContainer.appendChild(newRow);
    }

    printButton.style.display = 'block';
    toggleOutcomes();

    outcomesContainer.lastElementChild.lastElementChild.querySelector('input').focus();

    setTimeout(function () {
        window.scrollTo(0, currentScrollTop);
    }, 0);
}

function collectAndStoreOutcomes() {
    var allOutcomes = [];
    var evenIndexOutcomes = [];
                
    var outcomeInputs = document.querySelectorAll('.outcomes-container input[type="text"]');
                
    outcomeInputs.forEach(function (input, index) {
    allOutcomes.push(input.value);
                
    if (index % 2 === 0) {
        evenIndexOutcomes.push(input.value);
    }
                });
                
    createOutcomeTable(evenIndexOutcomes);
                
    console.log('All Outcomes:', allOutcomes);
    console.log('Even Index Outcomes:', evenIndexOutcomes);
                
    return allOutcomes;
}
  

function printOutcomes() {
    collectAndStoreOutcomes();
}



function toggleCourseOutcomes() {
var courseOutcomesContainer = document.querySelector('.new-course-outcomes-container');
courseOutcomesContainer.classList.toggle('show');
}



function toggleCourseExitSurvey() {
    var courseExitSurvey = document.getElementById('courseExitSurvey');
    courseExitSurvey.style.display = courseExitSurvey.style.display === 'none' ? 'block' : 'none';
}



async function updateAndDownload() {
    var fileInputInput = document.getElementById('fileInput');
    var file = fileInputInput.files[0];

    if (!file) {
        resultDiv.innerHTML = '<p>Please upload an Excel file.</p>';
        return;
    }

    try {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(file);
        const sheet = workbook.getWorksheet(1);

//Basic inputs
        sheet.getCell('D5').value = document.getElementById('input1').value;
        sheet.getCell('D6').value = document.getElementById('input2').value;
        sheet.getCell('D7').value = document.getElementById('input3').value;
        sheet.getCell('J5').value = document.getElementById('rowCount').value;
//Threshold setting
        sheet.getCell('C11').value = document.getElementById('input5').value;
        sheet.getCell('C12').value = document.getElementById('input6').value;
        sheet.getCell('C13').value = document.getElementById('input7').value;
        sheet.getCell('F11').value = document.getElementById('input8').value;

        

//auto generated table
        const dynamicTableRows = document.querySelectorAll('#rows_container > div');
        let rowIndex = 19; 
        dynamicTableRows.forEach(row => {
            const cells = row.querySelectorAll('input[type="text"]');
            let columnIndex = 2; 
        
            cells.forEach(cell => {
                sheet.getCell(getColumnLetter(columnIndex) + rowIndex).value = cell.value;
                columnIndex++; 
            });
        
            rowIndex++; 
        });
        
        

       

//course outcome
        const outcomesInputs = document.querySelectorAll('.outcomes-container .course-input');
        let row = 157;
        
        outcomesInputs.forEach(input => {
            sheet.getCell('D' + row).value = input.value;
            row++;
        });
        

//course articulation matrix
        const matrixInputs1 = document.querySelectorAll('.new-outcomes-container input[type="text"]');
        let row1 = 175; 
        let column1 = 4; 

        matrixInputs1.forEach(input => {
            sheet.getCell(getColumnLetter(column1) + row1).value = input.value;
            column1++; 
            if (column1 > 17) {
                column1 = 4;
                row1++; 
            }

            if (row1 > 60) {
                return;
            }
        });


        const matrixInputs2 = document.querySelectorAll('.new-outcomes-container input[type="text"]');
        let row2 = 166; 
        let column2 = 7; 

        matrixInputs2.forEach(input => {
            sheet.getCell(getColumnLetter(column2) + row2).value = input.value;
            column2++; 
            if (column2 > 20) {
                column2 = 7;
                row2++; 
            }

            if (row2 > 51) {
                return;
            }
        });


//course exit survey div
        const surveyInputs = document.querySelectorAll('#courseExitSurvey input[type="text"]');
        let row3 = 186;
        let column3 = 6; 
        surveyInputs.forEach(input => {
            sheet.getCell(getColumnLetter(column3) + row3).value = input.value;
            column3++;
            if (column3 > 12) {
                column3 = 6;
                row3++;
            }
        });


        // Save the workbook
        const updatedData = await workbook.xlsx.writeBuffer();
        const blob = new Blob([updatedData], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);

        var a = document.createElement('a');
        a.href = url;
        a.download = 'CO & PO.xlsx';
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    } catch (error) {
        console.error('Error processing file:', error);
    }
}

function getColumnLetter(columnNumber) {
    let temp, letter = '';
    while (columnNumber > 0) {
        temp = (columnNumber - 1) % 26;
        letter = String.fromCharCode(temp + 65) + letter;
        columnNumber = (columnNumber - temp - 1) / 26;
    }
    return letter;
}











