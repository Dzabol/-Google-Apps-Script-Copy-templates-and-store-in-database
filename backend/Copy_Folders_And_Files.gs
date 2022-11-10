
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
 * Function copy all folders from desired destination
 * *****************************************************************************
 * @param sourceFolder {folder} Folder to copy
 * @param destinationFolder {folder} Folder where copy will be set
 * @param copyAlsoFiles {bool} true - copy also files from folders, false - copy only folders
 */

function copyFoldersAndFiles_(
  sourceFolder,
  destinationFolder,
  copyAlsoFiles = true
) {
  let allFolders = sourceFolder.getFolders();

  if ((copyAlsoFiles = true)) {
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
