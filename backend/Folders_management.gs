/**
 * *****************************************************************************
 * Function gethers names of all folders
 * *****************************************************************************
 * @param destinationFolderID {string} Folder ID  where new folder will be created
 * @return Array with names of all folders in destination folder
 */
function getAllFoldersNamesInReqiredFolder_(destinationFolderID) {
  let destinationFolder = DriveApp.getFolderById(destinationFolderID);
  let allFoldersNames = [];
  let allFoldersIterator = destinationFolder.getFolders();

  while (allFoldersIterator.hasNext()) {
    let folder = allFoldersIterator.next();
    allFoldersNames.unshift(folder.getName());
  }

  return allFoldersNames;
}


/**
 * *****************************************************************************
 * Function checks if requider folder exist,
 * if not new folder with reqired name is created
 * *****************************************************************************
 * @param folderName {string} Folder Name to get id
 * @param mainFolderID {string} Main folder ID to set data
 * @return {string} ID of the folder where files is going to be stored
 */
function setFolderToSetData_(folderName, mainFolderID) {
  let mainFolder = DriveApp.getFolderById(mainFolderID);

  let folders = mainFolder.getFolders(); //get all folders in parent folder
  let folder;
  let folderID = "";

  while (folders.hasNext()) {
    folder = folders.next();

    if (folder.getName().toLowerCase() == folderName.toLowerCase()) {
      folderID = folder.getId();
      return folderID; // existing folder ID
    }
  }

  folder = mainFolder.createFolder(folderName);
  folderID = folder.getId();

  return folderID; // New Folder ID
}


/**
 * *****************************************************************************
 * Function creates new folder with desired name in required localization
 * *****************************************************************************
 * @param destinationFolderID {string} Main folder ID where new folder will be created
 * @param folderName {newFolderName} Folder name
 * @return newly created folder ID
 */

function createSingleFolderAndRename_(destinationFolderID, newFolderName) {
  let destinationFolder = DriveApp.getFolderById(destinationFolderID);
  let newFolder = destinationFolder.createFolder(newFolderName);
  let newFolderID = newFolder.getId();

  return newFolderID;
}