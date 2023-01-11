function getDataFromGoogleSheet() {
    const spreadsheetWithData = SpreadsheetApp.openByUrl(projectsSpreadSheetURL);
    const dataTab = spreadsheetWithData.getSheetByName(dataTabName);

    const headerRowPosition = 2;
    const numberOfEmptyRows = 2;
    const numberOfColumns = dataTab.getLastColumn();
    const numberOfRows = dataTab.getLastRow();

    const dataRange = dataTab.getRange(headerRowPosition, 1, ((numberOfRows - headerRowPosition) + 1), numberOfColumns);
    const data = dataRange.getDisplayValues();
    const headers = data.shift();
    data.splice(0, numberOfEmptyRows);

    let dataForTable = data.map(row => {
        const tempObject = {};
        headers.forEach((header, index) => {
            tempObject[header] = row[index].toString();
        });
        return tempObject;
    });
    console.log(dataForTable);
    return dataForTable;
} //end getDataFromGoogleSheet



