/**
 * *****************************************************************************
 * Function prpares prefix name for all folders and files
 * *****************************************************************************
 * @param {string} strCode StrCode
 * @param {string} projectName Project Name
 * @returns {string} prefix for all files and folders
 */

function setPrefixNameForFoldersAndFiles(projectInformation) {
  return (filesAndFoldersPrefix =
    projectInformation.strCode + " - " + projectInformation.projectName);
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

/* */

function copyAllFilesInFolder_(
  sourceFolder,
  destinationFolder,
  prefixforTheFileName,
  duplicateFileFromShortcut = "No"
) {
  let fileName = "";
  const allFilesInFolder = sourceFolder.getFiles();

  while (allFilesInFolder.hasNext()) {
    const file = allFilesInFolder.next();

    if (file.getMimeType() == MimeType.SHORTCUT) {
      //Duplicate shortcuts
      fileName = file.getName();
      file.makeCopy(fileName, destinationFolder);
    } else {
      //copy for nomal file
      fileName = setNewFileName_(file, prefixforTheFileName);
      file.makeCopy(fileName, destinationFolder);
    }

    if (
      file.getMimeType() == MimeType.SHORTCUT &&
      duplicateFileFromShortcut == "Yes"
    ) {
      //duplicate file from shortcut
      let parentFileFromShortcutID = file.getTargetId();
      let parentFileFromShortcut = DriveApp.getFileById(
        parentFileFromShortcutID
      );

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
  let inputFileName = file.getName().trim();
  const templateEndString = "-template";
  const fileNameInLowerCase = inputFileName.toLocaleLowerCase();
  const positionOfTemplateName = fileNameInLowerCase.indexOf(templateEndString);

  let fileName = inputFileName;

  if (positionOfTemplateName !== -1) {
    const trimmedInputFileName = inputFileName.substring(0, positionOfTemplateName).trim();
    //If there is aditional string after template TBC if needed
    //const stringToBeAdded = inputFileName.substring(positionOfTemplateName + templateEndString.length);
    //fileName = `${prefixforTheFileName} - ${trimmedInputFileName}${stringToBeAdded}`;
    fileName = `${prefixforTheFileName} - ${trimmedInputFileName}`;
  } else {
    fileName = `${prefixforTheFileName} - ${fileName}`;
  }

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
  let fileID =
    file.getMimeType() == MimeType.SHORTCUT ? file.getTargetId() : file.getId();

  return fileID;
}
