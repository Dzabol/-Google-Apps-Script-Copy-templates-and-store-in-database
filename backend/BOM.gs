function createNewBom(prefixName, customerName, projectName, dataToSetInBOM) {
    let bomName = `${prefixName} - BOM`;
    let folderToSetBOM = setFolderToSetData(customerName);
    let bomURL = duplicateBOMtemplate(folderToSetBOM, bomName);
    cleanNewBOMtemplateTab(bomURL);

    return bomURL;
}


/**
* *****************************************************************************
 * Create name for the new BOM
 * *****************************************************************************
 * @param {Object} projectInformation strCode / projectName
 * @returns {string} correct name for the BOM
 */

function setNewBomDescription(projectInformation) {
    let bomName = `${projectInformation.strCode} - ${projectInformation.projectName} - BOM`;

    return bomName;
}

/**
 * *****************************************************************************
 * Create new BOM
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