async function addNewProjectToMasterSheet(strCode) {
    const masterSheet = SpreadsheetApp.openByUrl(projectsSpreadSheet.SpreadSheetURL);
    const tabToSetData = masterSheet.getSheetByName(projectsSpreadSheet.dataTabName);

    const rowPositionWithAllFormulas = 4;
    let lastRowNumber = tabToSetData.getLastRow();
    let lastColumnNumber = tabToSetData.getLastColumn();

    tabToSetData.insertRowAfter(lastRowNumber);

    let formulasSourceRange = tabToSetData.getRange(rowPositionWithAllFormulas, 1, 1, lastColumnNumber);
    let destinationRangeToSetData = tabToSetData.getRange(lastRowNumber + 1, 1, 1, lastColumnNumber)

    //add formulas to new Line
    formulasSourceRange.copyTo(destinationRangeToSetData, SpreadsheetApp.CopyPasteType.PASTE_FORMULA, false);

    //AddValues
    tabToSetData.getRange(lastRowNumber + 1, 1).setValue(strCode);
    setURLsInMasterSheet(tabToSetData, (lastRowNumber + 1), dataToExportToProjectList);

    //add package creation date
    let columnPositionToSetCreationDate = findColumnByName(tabToSetData, projectsSpreadSheet.creationDateColumnName)
    let cellToSetCreationDate = tabToSetData.getRange(lastRowNumber + 1, columnPositionToSetCreationDate);

    let currentDate = new Date();
    let currentTimeZone = Session.getScriptTimeZone();
    let formatedDate = Utilities.formatDate(currentDate, currentTimeZone, "yyyy-MM-dd");

    cellToSetCreationDate.setValue(formatedDate);
}



function setURLsInMasterSheet(sheetToSetData, rownumber, objectInformation) {
    for (let i = 0; i < objectInformation.length; i++) {
        sheetToSetData.getRange(rownumber, objectInformation[i].ColumnNumberToSetData).setValue(objectInformation[i].URL);
    }
}