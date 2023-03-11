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
  await createNewBom(prefixName, customerName, projectName, strCode)
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
  let allLinksAndFilesOnTheServer = prepareAllNecessaryLinksForExportToSpreadsheets(objectWithCreatedDataOnTheServer, prefixName);
  //export links to object which will be used to populate a BOM
  exportRequiredLinksToObject(allLinksAndFilesOnTheServer, dataToExportToBOM);
  //export links to object wchich will be uset to populate a master Sheet with all projects
  exportRequiredLinksToObject(allLinksAndFilesOnTheServer, dataToExportToProjectList);
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
function exportRequiredLinksToObject(objectWithLinks, objectToExportLinks) {
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

function prepareAllNecessaryLinksForExportToSpreadsheets(serverData, prefixName) {
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
function importAllFilesAndFoldersToOneObject(serverData) {
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

