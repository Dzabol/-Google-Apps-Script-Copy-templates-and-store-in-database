/**
 * *****************************************************************************
 * Collect all customers and projects in data base 
 * and store it in global variable - serversInformation
 * ***************************************************************************** 
 */

function getProjectsListFromTheServers() {
    let numberOfServers = serversInformation.length;

    for (let i = 0; i < numberOfServers; i++) {
        let customersFolder = DriveApp.getFolderById(serversInformation[i].targetFolderID);
        let customerFoldersIteratior = customersFolder.getFolders();

        while (customerFoldersIteratior.hasNext()) {
            let customerFolder = customerFoldersIteratior.next();
            let projectsIterator = customerFolder.getFolders();
            let projects = [];

            while (projectsIterator.hasNext()) {
                let projectFolder = projectsIterator.next();
                projects.push({
                    projectName: projectFolder.getName(),
                    projectFolderUrl: projectFolder.getUrl(),
                })
            }

            serversInformation[i].projectsList.push({
                customerName: customerFolder.getName(),
                customerFolderUrl: customerFolder.getUrl(),
                projectList: projects,
            });
        }
    }
}


/**
 * *****************************************************************************
 * Collect all data from google sheet
 * *****************************************************************************  
 * @returns 
 */

function getDataFromGoogleSheet_() {
    const spreadsheetWithData = SpreadsheetApp.openByUrl(projectsSpreadSheet.SpreadSheetURL);
    const dataTab = spreadsheetWithData.getSheetByName(projectsSpreadSheet.dataTabName);

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

/**
 * *****************************************************************************
 * Get All Project codes and project names
 * *****************************************************************************  
 *  
 * @retuns {array} data from sheet 
 */

function getProjectsInformation() {

    const spreadsheetWithData = SpreadsheetApp.openByUrl(projectsSpreadSheet.SpreadSheetURL);
    const tabWithData = spreadsheetWithData.getSheetByName(projectsSpreadSheet.strDataTabName);

    let dataFromSheet = [];
    let values = [];
    let oneDimensionalArray = [];

    let dataToCollect = projectsSpreadSheet.projectBasicInformations;
    let numberOfColumnsToCollect = dataToCollect.length;
    const headerPosition = findRowNumberByName(spreadsheetWithData, dataToCollect[0]);
    let numberOfRownsWithData = tabWithData.getLastRow();

    for (let i = 0; i < numberOfColumnsToCollect; i++) {
        columnPosition = findColumnByName(spreadsheetWithData, dataToCollect[i]);
        //if there is no data in google sheet
        if (columnPosition == -1) {
            values = Array.from({ length: numberOfRownsWithData }, () => null);
        }
        else {
            values = tabWithData.getRange(headerPosition, columnPosition, numberOfRownsWithData, 1).getValues();
            oneDimensionalArray = values.map(function (e) {
                return e[0].toString();
            });
        }

        dataFromSheet.push(oneDimensionalArray);

        values = [];
        oneDimensionalArray = [];
    }

    return dataFromSheet;
}


