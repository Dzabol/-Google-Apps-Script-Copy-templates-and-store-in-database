/**
 * *****************************************************************************
 * Get All Folders Names and URLs to those folders
 * ***************************************************************************** 
 * @param {string} urlAddress server url to get folders name with URL
 * @returns {object} folderName and Url Adres
 */

function getFoldersNameAndURL(urlAddress) {
    let allFoldersWitheURLs = [];
    let serverFolderID = getIdFromUrl(urlAddress);

    let destinationFolder = DriveApp.getFolderById(serverFolderID);
    let allFoldersIterator = destinationFolder.getFolders();

    while (allFoldersIterator.hasNext()) {
        let folder = allFoldersIterator.next();
        allFoldersWitheURLs.push(
            {
                "folderName": folder.getName(),
                "folderURL": folder.getUrl(),
            }
        )
    }
    return allFoldersWitheURLs;
}

/**
  * *****************************************************************************
 * Get all Folders/Files names and theirs URLs
 * ***************************************************************************** 
 * @param {string} urlAddress URL Adres of the main folder
 * @returns {object} Returns all files and folders names with theirs URL adresses
 */

function getAllFilesNamesAndUrl(urlAddress) {
    let mainFolder = DriveApp.getFolderById(getIdFromUrl(urlAddress));
    let allFolders = mainFolder.getFolders();
    let dataObject = {};

    //Get Folders Names and URL
    while (allFolders.hasNext()) {
        let subFolder = allFolders.next();
        let folderName = subFolder.getName();
        let subFolderURL = subFolder.getUrl();

        dataObject[folderName] = subFolderURL; // save curent data
        dataObject[folderName] = getAllFilesNamesAndUrl(subFolderURL);
    }
    //Get Files Names and URL
    let allFiles = mainFolder.getFiles();
    while (allFiles.hasNext()) {
        let file = allFiles.next();
        let fileName = file.getName();
        let fileURL = file.getUrl();

        dataObject[fileName] = fileURL; // save curent data
    }
    return dataObject;
}

/**
 * *****************************************************************************
 * Get All Projects on the server
 * ***************************************************************************** 
 * @param {string} serverURLWithProjects URL adres with all customers 
 * @returns {Array} All Projects on required server
 */
function loadCurrentProjecOntTheServer(serverURLWithProjects) {
    let customers = getFoldersNameAndURL(serverURLWithProjects);
    let projects = [];
    let temporaryArray = [];

    for (let customer of customers) {
        let tempProjects = getAllFoldersNamesInReqiredFolder_(getIdFromUrl(customer.folderURL));
        temporaryArray.push(tempProjects);
    }
    projects = temporaryArray.flat().map(x => x); // one dimensional Array

    return projects;
}


