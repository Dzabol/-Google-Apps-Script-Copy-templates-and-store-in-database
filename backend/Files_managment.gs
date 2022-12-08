/**
 * *****************************************************************************
 * Function copy all files from sorce folder to new localization
 * *****************************************************************************
 * @param sourceFolder {folder} Source folder with files
 * @param destinationFolder {folder} New folder to copy files
 * @param prefixforTheFileName {string} put prefix for file name
 * @param duplicateFileFromShortcut {string} Yes / No
 */

/* */

function copyAllFilesInFolder_(sourceFolder, destinationFolder, prefixforTheFileName, duplicateFileFromShortcut = "No") {

  let fileName = "";
  const allFilesInFolder = sourceFolder.getFiles();

  while (allFilesInFolder.hasNext()) {
    const file = allFilesInFolder.next();

    if (file.getMimeType() == MimeType.SHORTCUT) {
      //Duplicate shortcuts
      fileName = file.getName();
      file.makeCopy(fileName, destinationFolder);
    }

    else {
      //copy for nomal file
      fileName = setNewFileName_(file, prefixforTheFileName);
      file.makeCopy(fileName, destinationFolder);
    }

    if ((file.getMimeType() == MimeType.SHORTCUT) && (duplicateFileFromShortcut == "Yes")) {
      //duplicate file from shortcut
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
 * Return Folder / File URL from ID
 * *****************************************************************************
 * @param {string} Folder / File ID
 * @return {string} URL
 */

function returFileOrFolderURLfromID(fileOrFolderID = "1Sl9GKp-lE-aEheB-rkXuc7wEEczJof6hhRTp-GBDowY") {
  let url = "";
  let file = DriveApp.getFileById(fileOrFolderID);

  if (file.getMimeType() == MimeType.FOLDER) {
    let folder = DriveApp.getFolderById(fileOrFolderID);
    url = folder.getUrl();
  }
  else {
    url = file.getUrl();
  }

  return url;
}