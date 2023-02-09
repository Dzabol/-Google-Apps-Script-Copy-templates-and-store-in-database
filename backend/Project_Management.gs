/**
 * *****************************************************************************
 * Get All Folders Names and Urls to those folders
 * ***************************************************************************** 
 * @param {string} urlAddress server url to get folders name with URL
 * @returns {object} folderName and Url Adres
 */

function getFoldersNameAndURL(urlAddress = "https://drive.google.com/drive/folders/1jwsroENMFggtVHiLCccKV4gES3hlRPtH") {
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


function getAllFilesNamesAndUrl(urlAddress = "https://drive.google.com/drive/folders/1rqotmMMaFHy3dZtFLc1-bewnsCMrZZ87") {
  let mainFolder = DriveApp.getFolderById(getIdFromUrl(urlAddress));
  let allFolders = mainFolder.getFolders();
  let dataObject = {};
  
  //Get Folders Names and URL
  while (allFolders.hasNext()) {
    let subFolder = allFolders.next();
    let folderName = subFolder.getName();
    let subFolderURL = subFolder.getUrl();

    dataObject[folderName] = subFolderURL; // save data
    getAllFilesNamesAndUrl(subFolderURL,dataObject);
  }
  
  //Get Files Names and URL
  let allFiles = mainFolder.getFiles();
  while (allFiles.hasNext()) {
    let file = allFiles.next();
    let fileName = file.getName();
    let fileURL = file.getUrl();
    
    dataObject[fileName] = fileURL; // save data
  }

  return dataObject;

}

function test() {
  let wartosc = {};
  wartosc = getAllFilesNamesAndUrl("https://drive.google.com/drive/folders/1rqotmMMaFHy3dZtFLc1-bewnsCMrZZ87");
  console.log(wartosc);


}

function getAvaiableProjectsOnTheServer() {
  let customers = [];
  let projects = [];
  let numberOfServers = serversInformation.length;

  for (let serverNumber = 0; serverNumber < numberOfServers; serverNumber++) {
    customers = getAllFoldersNamesInReqiredFolder_();
  }


}