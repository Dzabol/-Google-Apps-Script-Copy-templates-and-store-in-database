/**
 * *****************************************************************************
 * Function Creates new BOM from template and populate Main Sheet with
 * the links with newly created files/folders on servers
 * ***************************************************************************** 
 * @param {string} prefixName 
 * @param {string} customerName 
 * @param {string} projectName 
 * @param {string} strCode 
 */
async function createNewBom(prefixName, customerName, projectName, strCode) {
    let bomName = `${prefixName} - BOM`;
    let folderToSetBOM = setFolderToSetData(customerName);
    let bomURL = duplicateBOMtemplate(folderToSetBOM, bomName);
    //save BOM link to global variables 
    searchObjectByNameAndSetURLadres("BOM", dataToExportToProjectList, bomURL);
    //Clear template and set links from server
    cleanNewBOMtemplateTab(bomURL);
    setDataInBOM(bomURL, projectName, strCode);
}


/**
 * *****************************************************************************
 * Duplicate BOM Template
 * *****************************************************************************
 * @param {string} folderURL folder URL to set new BOM 
 * @param {string} bomName new bom name
 * @returns {string} New Bom URL
 */

function duplicateBOMtemplate(folderURL, bomName) {
    let destinationFolder = DriveApp.getFolderById(getIdFromUrl(folderURL));
    let newBom = DriveApp.getFileById(getIdFromUrl(bomTemplateSpreadSheet.templateURL)).makeCopy(bomName, destinationFolder);
    let bomUrl = newBom.getUrl();

    return bomUrl;
}

/**
 * *****************************************************************************
 * Prepare BOM tab (Erase all templates)
 * ***************************************************************************** 
 * @param {string} bomURL 
 */

function cleanNewBOMtemplateTab(bomURL) {
    let bomSheet = SpreadsheetApp.openByUrl(bomURL);
    let sheetWithTemplate = bomSheet.getSheetByName(bomTemplateSpreadSheet.tabNameWithAllTemplates);

    let firstRowToDelate = findRowNumberByName(sheetWithTemplate, bomTemplateSpreadSheet.rowToKeepInTemplate) + 1;
    let lastRowToDelete = sheetWithTemplate.getLastRow();
    let numberOfRowsToDelete = (lastRowToDelete - firstRowToDelate) + 1;

    if (numberOfRowsToDelete > 0) {
        sheetWithTemplate.deleteRows(firstRowToDelate, numberOfRowsToDelete);
    }
    //set new name for the BOM
    sheetWithTemplate.setName("BOM");
}

/**
 * *****************************************************************************
 * Create or set existing folder for new BOM
 * ***************************************************************************** 
 * @param {string} customerName 
 * @returns {string} folder ID to set new BOM
 */

function setFolderToSetData(customerName) {
    let folder;
    let folderID = "";
    let folderName = "";
    let customerNameUpperCase = customerName.toUpperCase().trim();

    let folderWithBOMs = DriveApp.getFolderById(getIdFromUrl(bomTemplateSpreadSheet.folderURLWithAllBOMS));
    let existingCustomers = folderWithBOMs.getFolders();

    while (existingCustomers.hasNext()) {
        folder = existingCustomers.next();
        folderName = folder.getName().toUpperCase().trim();

        if (folderName === customerNameUpperCase) {
            folderID = folder.getId();
            return folderID;
        }
    }
    folder = folderWithBOMs.createFolder(customerName.trim());
    folderID = folder.getId();

    return folderID; //New folder ID
}

/**
 * *****************************************************************************
 * set URLs in BOM
 * ***************************************************************************** 
 * @param {string} bomUrl 
 * @param {string} projectName 
 * @param {string} strCode 
 */

function setDataInBOM(bomUrl, projectName, strCode) {
    console.log(dataToExportToBOM);
    let bomSheet = SpreadsheetApp.openByUrl(bomUrl);
    let sheetToSetData = bomSheet.getSheetByName(bomTemplateSpreadSheet.tabNameToSetBasicData);

    //set project name and STR code
    sheetToSetData.getRange(bomTemplateSpreadSheet.cellToSetProjectName).setValue(projectName); //set project name
    sheetToSetData.getRange(bomTemplateSpreadSheet.cellToSetProjectCode).setValue(strCode); //set STR code

    //set main folders data
    setURLsInBOM(sheetToSetData, dataToExportToBOM);
}


function setURLsInBOM(sheetToSetData, objectInformation) {
    for (let i = 0; i < objectInformation.length; i++) {
        sheetToSetData.getRange(objectInformation[i].cellAddressToSetData).setValue(objectInformation[i].URL);
    }
}


/**
 * *****************************************************************************
 * Function clears all URL addresses in object used to populate a BOM
 * main sheet
 * ***************************************************************************** 
 */
function clearURLaddressesInBOMexportData() {

    for (let obj of dataToExportToBOM) {
        obj.URL = "";
    }

    for (let obj of dataToExportToProjectList) {
        obj.URL = "";
    }

}