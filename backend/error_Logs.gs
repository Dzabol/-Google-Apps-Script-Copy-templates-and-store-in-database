function saveErrorLog(error, errorLogSheetURL = projectsSpreadSheet.SpreadSheetURL, errorLogTabName = projectsSpreadSheet.erorLogTabName ) {
    const sheetWithErroLogs = SpreadsheetApp.openByUrl(errorLogSheetURL);
    const tabWithErrorLogs = sheetWithErroLogs.getSheetByName(errorLogTabName);
 

    //basic informations
    const lastRowPosition = tabWithErrorLogs.getLastRow() + 1;
    const userName = getActiveUserInformation();
    const date = getCurrentDateAndTime(true);

    const columnsPositionInErrorLog = {
        userName: 1,
        dateAndTime: 2,        
        scriptVersion: 3,
        errorMessage: 4,
        fixedOrNot: 5,
    }

    //save informations
    tabWithErrorLogs.getRange(lastRowPosition, columnsPositionInErrorLog.userName).setValue(userName.email);
    tabWithErrorLogs.getRange(lastRowPosition, columnsPositionInErrorLog.dateAndTime).setValue(date);
    tabWithErrorLogs.getRange(lastRowPosition, columnsPositionInErrorLog.errorMessage).setValue(error);
    tabWithErrorLogs.getRange(lastRowPosition, columnsPositionInErrorLog.scriptVersion).setValue(scriptVersion);
    tabWithErrorLogs.getRange(lastRowPosition, columnsPositionInErrorLog.fixedOrNot).setValue('No');
}