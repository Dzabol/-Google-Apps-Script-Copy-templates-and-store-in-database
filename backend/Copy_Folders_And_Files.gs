
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

/**
 * *****************************************************************************
 * Function copy all folders and theirs content from desired destination
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
 * @param prefixforTheFileName {string} put prefix for file name
 * @param duplicateFileFromShortcut {string} Yes / No
 */

/* sourceFolder, destinationFolder, prefixforTheFileName = "none", duplicateFileFromShortcut = "No" */

function copyAllFilesInFolder(sourceFolder = DriveApp.getFolderById("1zIZDyO5V9mfY6dVAPXdK1_-ToigvNofu"), destinationFolder = DriveApp.getFolderById("1fI6tUlRsgbyaQp1o4ESw14cUHftrwU6d"), prefixforTheFileName = "Nowa", duplicateFileFromShortcut = "Yes") {

  let fileName = "";
  const allFilesInFolder = sourceFolder.getFiles();

  while (allFilesInFolder.hasNext()) {
    const file = allFilesInFolder.next();

    //Duplicate shortcuts
    fileName = file.getName();
    file.makeCopy(fileName, destinationFolder);

    if ((file.getMimeType() == MimeType.SHORTCUT) && (duplicateFileFromShortcut == "Yes")) {
      let parentFileFromShortcutID = file.getTargetId();
      let parentFileFromShortcut = DriveApp.getFileById(parentFileFromShortcutID);

      fileName = setNewFileName_(file, prefixforTheFileName);
      parentFileFromShortcut.makeCopy(fileName, destinationFolder);
    }
  }
}

/**
 * *****************************************************************************
 * Set Name For the File
 * *****************************************************************************
 * @param file {file} File As an input
 * @param prefixforTheFileName {string} prefix for the new file name
 * @return {string}
 */

function setNewFileName_(file, prefixforTheFileName) {

  let templateEndString = "-template";
  let imputFileName = "";
  let fileName = "";

  imputFileName = file.getName();

  if (imputFileName.match(templateEndString) != null) {
    imputFileName = imputFileName.replace(templateEndString, "");
  }

  fileName = prefixforTheFileName + " - " + imputFileName;

  return fileName;
}

/**
 * *****************************************************************************
 * Check if shortcut and get parent ID
 * *****************************************************************************
 * @param {file} file to check
 * @return {string} returns file ID or Parent ID
 */

function getFileIDfromShortcut_(file) {
  
 let fileID = file.getMimeType() == MimeType.SHORTCUT ? file.getTargetId() : file.getId();

return fileID;
}


/**
 * *****************************************************************************
 * Creates shortcut for the file or the folder.
 * Advance Drive service must be enabled
 * *****************************************************************************
 * 
 * @param fileIdToCreateShortcut {string} Id of the file or folder
 * @param nameOfTheShortcut {string} Name for the shortcut
 * @param folderIdToInsertShortCut {string} ID of the folder where shortcut will be placed
 */


function createShortcut(fileIdToCreateShortcut, nameOfTheShortcut, folderIdToInsertShortCut) {

  const resource = {
    shortcutDetails: { targetId: fileIdToCreateShortcut },
    title: nameOfTheShortcut,
    mimeType: "application/vnd.google-apps.shortcut",
    supportsTeamDrives: true,
    parents: [{ id: folderIdToInsertShortCut }]
  };

  const shortcut = Drive.Files.insert(resource);
}
