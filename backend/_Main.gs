/**
 * *****************************************************************************
 * Function creates a package of files and folder for required server,
 * files are coppied and renamed acc to template folder
 * *****************************************************************************   
 * @param {object} projectInformation 
 * @param {string} prefixName 
 * @param {ineger} serverNumberToCreatePackage 
 * @returns {object}
 */

async function createNewProject(projectInformation, prefixName, serverNumberToCreatePackage) {

  let projectData = createPackageOfFoldersAndFiles_(
    projectInformation.customerName,
    prefixName,
    getIdFromUrl(serversInformation[serverNumberToCreatePackage].sourceFolderUrl),
    getIdFromUrl(serversInformation[serverNumberToCreatePackage].targetFolderUrl),
    serversInformation[serverNumberToCreatePackage].serverName
  );

  return projectData;
}

async function createBOMwithLinks(prefixName, customerName, projectName, strCode, objectWithCreatedDataOnTheServer) {
  await exportLinksFromServerToObjects(objectWithCreatedDataOnTheServer, prefixName);
  await createNewBom(prefixName, customerName, projectName, strCode);
  await createShortcutsOnTheDrives();
  await addNewProjectToMasterSheet(strCode);
}

/**
* *****************************************************************************
 * Function exports links to Global variables
 * dataToExportToBOM 
 * dataToExportToProjectList
 * *****************************************************************************  
 * @param {object} objectWithCreatedDataOnTheServer 
 * @param {string} prefixName 
 */
async function exportLinksFromServerToObjects(objectWithCreatedDataOnTheServer, prefixName) {
  let allLinksAndFilesOnTheServer = await prepareAllNecessaryLinksForExportToSpreadsheets(objectWithCreatedDataOnTheServer, prefixName);
  //export links to object which will be used to populate a BOM
  await exportRequiredLinksToObject(allLinksAndFilesOnTheServer, dataToExportToBOM);
  //export links to object wchich will be uset to populate a master Sheet with all projects
  await exportRequiredLinksToObject(allLinksAndFilesOnTheServer, dataToExportToProjectList);
}


/**
 * *****************************************************************************
 * Function Checks if on the serves is a file which is required by the user
 * if yes then the URL adres is saved to the required object
 * Function checks File name and type
 * *****************************************************************************  
 * @param {object} objectWithLinks object with all files (type, URL) on the server
 * @param {object} objectToExportLinks Object where Link will be exported 
 */
async function exportRequiredLinksToObject(objectWithLinks, objectToExportLinks) {
  for (let [objectInBom, obj] of Object.entries(objectToExportLinks)) {
    let { name, fileType } = obj;
    let objectWithLinksProps = objectWithLinks[name];
    if (objectWithLinksProps && objectWithLinksProps.fileType === fileType) {
      obj.URL = objectWithLinksProps.URL;
    }
  }
}

/**
 * *****************************************************************************
 * Get all files from all servers and asemble it in one object
 * remove all prefixes fom files
 * *****************************************************************************  
 * @param {object} serverData 
 * @param {string} prefixName 
 * @returns {object} all files and folders in one object
 */

async function prepareAllNecessaryLinksForExportToSpreadsheets(serverData, prefixName) {
  //asemble all files and links on the server
  let allFilesAndFoldersAtServer = importAllFilesAndFoldersToOneObject(serverData);
  //remove all prefixes from files names to 
  let allFilesAndFoldersAtServerWithoutPrefix = removeAllPrefixesInObject(allFilesAndFoldersAtServer, prefixName);

  return allFilesAndFoldersAtServerWithoutPrefix;
}


/**
 * *****************************************************************************
 * Get all files from all servers and asemble it in one object
 * ***************************************************************************** 
 * @param {object} serverData 
 * @returns 
 */
async function importAllFilesAndFoldersToOneObject(serverData) {
  let newObject = {};

  serverData.forEach((server) => {
    newObject[server.serverName] = {
      "fileType": "folder",
      "URL": server.projectFolderUrl
    };

    if (server.foldersAndFiles) {
      server.foldersAndFiles.forEach((item) => {
        newObject[item.name] = {
          "fileType": item.type,
          "URL": item.url
        };
      });
    }
  });

  return newObject;
}

/**
 * *****************************************************************************
 * Remove prefixes from file
 * *****************************************************************************  
 * @param {object} objectWithData 
 * @param {string} prefixName 
 * @returns 
 */
function removeAllPrefixesInObject(objectWithData, prefixName) {

  for (const [key, value] of Object.entries(objectWithData)) {
    if (key.startsWith(prefixName)) {
      const newName = removePrefix(key, prefixName);
      objectWithData[newName] = value;
      delete objectWithData[key];
    }
  }

  return objectWithData;
}

/**
* *****************************************************************************
 * Remove prefixes from string
 * *****************************************************************************  
 * @param {string} textToRemoveString text to remove prefix
 * @param {string} prefix text to remove
 * @returns 
 */
function removePrefix(textToRemoveString, prefix) {
  const regex = new RegExp(`^${prefix}[^-]*\\s*-\\s*`, 'g');
  return textToRemoveString.replace(regex, '').trim();
}


/**
 * *****************************************************************************
 * Create Shortcuts to Files and folders 
 * ***************************************************************************** 
 */
async function createShortcutsOnTheDrives() {
  console.log(dataToExportToProjectList);
  let urlBOM = dataToExportToProjectList.find(obj => obj.name === "BOM").URL;
  console.log("Link BOM: " +  urlBOM);

  let urlFolderMechanical = dataToExportToBOM.find(obj => obj.name === "Mechanical").URL;
  console.log("Link Mechanical: " + urlFolderMechanical);
  let urlFolderRD = dataToExportToBOM.find(obj => obj.name === "RD").URL;
  console.log("URL RD: " + urlFolderRD);
  let urlFolderSimulation = dataToExportToBOM.find(obj => obj.name === "Simulation").URL;
  console.log("URL Simulation: " + urlFolderSimulation);


  //BOM Shortcuts
  createShortCutsToBOM(urlBOM, urlFolderMechanical, urlFolderRD);

  /* ------------- Mechanical Folder -----------------*/
  //create shortcut to RD folder at Mechanical server
  createShortCutToFolder(urlFolderMechanical, "02. R&D", urlFolderRD);
  //create shortcut to Simulation folder at Mechanical server
  createShortCutToFolder(urlFolderMechanical, "03. Simulation", urlFolderSimulation);

  /* ------------- RD Folder -----------------*/
  //create shortcut to Mechanical folder at RD server
  createShortCutToFolder(urlFolderRD, "03. Mechanical", urlFolderMechanical);
  //create shortcut to Simulation folder at RD server
  createShortCutToFolder(urlFolderRD, "04. Simulation", urlFolderSimulation);
}

function testowanko(){
   let urlBOM = dataToExportToProjectList.find(obj => obj.name === "BOM").URL;
  console.log("Link BOM: " +  urlBOM);
  console.log(dataToExportToProjectList);
}

function wyswietlanie(){
  console.log(dataToExportToBOM);
  console.log(dataToExportToProjectList)
}

/**
 * *****************************************************************************
 * Create Shortcuts to BOM at required server
 * *****************************************************************************  
 * @param {string} bomURL URL address to BOM
 * @param  {string} mainFolders URL addres to main folder to set shortcut to BOM
 */
function createShortCutsToBOM(bomURL, ...mainFolders) {

  let nameBOMfolder = "01. E_BOM";
  let ids = [];

  //Find or create Folder to set BOM Shortcut
  for (let url of mainFolders) {
    let mainFolder = DriveApp.getFolderById(getIdFromUrl(url))
    let folders = mainFolder.getFolders();
    let folderID = getIDToRequiredFolder(folders, nameBOMfolder);

    if (folderID === null) {
      folderID = mainFolder.createFolder(nameBOMfolder).getId();
    }
    ids.push(folderID);
  }

  //Create shortcuts of the BOM
  let idBOM = getIdFromUrl(bomURL);
  let bomName = DriveApp.getFileById(idBOM).getName();

  for (let idOfTheFolder of ids) {
    createShortcut(idBOM, bomName, idOfTheFolder);
  }
}

/**
 * *****************************************************************************
 * Create Shortcut to folder at server 
 * *****************************************************************************   
 * @param {string} mainFolderURL URL adress where the shortcut to folder will be set
 * @param {string} shortcutFolderName Name of the ShortCut 
 * @param {string} urlOfTheShortCutFolder URL adress of the folder to create shortcut
 */
function createShortCutToFolder(mainFolderURL, shortcutFolderName, urlOfTheShortCutFolder) {
  let allFoldersInMainFolder = DriveApp.getFolderById(getIdFromUrl(mainFolderURL)).getFolders();
  let folderID = getIDToRequiredFolder(allFoldersInMainFolder, shortcutFolderName);
  let folderIDforShortcut = getIdFromUrl(urlOfTheShortCutFolder);

  if (folderID !== null) {
    DriveApp.getFolderById(folderID).setTrashed(true);
  }
  createShortcut(folderIDforShortcut, shortcutFolderName, getIdFromUrl(mainFolderURL));
}


/**
* *****************************************************************************
 * Get ID to folder at servis
 * *****************************************************************************  
 * @param {folders} folders All folders at server
 * @param {string} nameToFind Name of the folder to find
 * @returns ID addres or null if can't find folder
 */
function getIDToRequiredFolder(folders, nameToFind) {
  while (folders.hasNext()) {
    let folder = folders.next();
    let folderName = folder.getName();
    if (folderName === nameToFind) {
      return folder.getId();
    }
  }
  return null;
}