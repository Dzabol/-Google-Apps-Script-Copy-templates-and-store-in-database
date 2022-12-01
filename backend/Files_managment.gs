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