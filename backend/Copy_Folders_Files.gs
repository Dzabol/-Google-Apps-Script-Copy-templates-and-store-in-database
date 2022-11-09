function start() {
  const sourceFolderID = '13wio10rwCuPL6aSxCgKXPdY2-RS6pGip';
  const targetFolderID = '19pwJ2lr-D4FnQ1o9Ojfz_GaYwvmYJQ2u';
  let newFolderName = "Test";

  let sourceFolder = DriveApp.getFolderById(sourceFolderID);

  //Create new folder
  let newDestinationFolderID = createSingleFolderAndRename_(targetFolderID, newFolderName);
  //Copy files in new destination
  let destinationFolder = DriveApp.getFolderById(newDestinationFolderID);
  copyFoldersAndFiles_(sourceFolder, destinationFolder);
}

//=============================================================================================================================================

/**
 * *****************************************************************************
 * Function creates new folder with desired name in required localization
 * *****************************************************************************
 * @param destinationFolderID {string} Main folder ID where new folder will be created
 * @param folderName {string} Folder name
 * @return newly created folder ID
 */

function createSingleFolderAndRename_(destinationFolderID, folderName) {

  let destinationFolder = DriveApp.getFolderById(destinationFolderID);
  let newFolder = destinationFolder.createFolder(folderName);
  let newFolderID = newFolder.getId();

  return newFolderID;
}

/**
 * *****************************************************************************
 * Function gethers names of all folders
 * *****************************************************************************
 * @param destinationFolderID {string} Folder ID  where new folder will be created
 * @return Array with names of all folders in destination folder
 */
function gerAllFoldersNamesInReqiredFolder_(destinationFolderID) {

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
 * Function copy all folders from desired destination
 * *****************************************************************************
 * @param sourceFolder {folder} Folder to copy
 * @param destinationFolder {folder} Folder where copy will be set
 * @param copyAlsoFiles {bool} true - copy also files from folders, false - copy only folders
 */

function copyFoldersAndFiles_(sourceFolder, destinationFolder, copyAlsoFiles = true) {

  let allFolders = sourceFolder.getFolders();

  if (copyAlsoFiles = true) {
    //Copy content of the folder
    copyAllFilesInFolder_(sourceFolder, destinationFolder);
  }

  while (allFolders.hasNext()) {

    let subFolder = allFolders.next();
    let folderName = subFolder.getName();
    let targetFolder = destinationFolder.createFolder(folderName);

    copyFoldersAndFiles_(subFolder, targetFolder);
  }
}

/**
 * *****************************************************************************
 * Function copy all files from sorce folder to new localization
 * ***************************************************************************** 
 * @param sourceFolder {folder} Source folder with files
 * @param destinationFolder {folder} New folder to copy files
 */

function copyAllFilesInFolder_(sourceFolder, destinationFolder) {

  const allFilesInFolder = sourceFolder.getFiles();

  while (allFilesInFolder.hasNext()) {
    const file = allFilesInFolder.next();
    file.makeCopy(file.getName(), destinationFolder);
  }
}

