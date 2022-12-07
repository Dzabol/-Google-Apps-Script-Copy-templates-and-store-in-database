/**
 * *****************************************************************************
 * Function copy all folders and theirs content from desired destination
 * *****************************************************************************
 * @param sourceFolder {Folder} Folder to copy
 * @param destinationFolder {folder} Folder where copy will be set
 * @param prefixforTheFileName {string} prefix which will be added to all files
 * @param copyAlsoFiles {bool} true - copy also files from folders, false - copy only folders
 */

function copyFoldersAndFiles_(
  sourceFolder,
  destinationFolder,
  prefixforTheFileName,
  duplicateFileFromShortcut,
  copyAlsoFiles = true
) {
  let allFolders = sourceFolder.getFolders();

  if ((copyAlsoFiles = true)) {
    //Copy content of the folder
    copyAllFilesInFolder_(sourceFolder, destinationFolder, prefixforTheFileName, duplicateFileFromShortcut);
  }

  while (allFolders.hasNext()) {
    let subFolder = allFolders.next();
    let folderName = subFolder.getName();
    let targetFolder = destinationFolder.createFolder(folderName);

    copyFoldersAndFiles_(subFolder, targetFolder, prefixforTheFileName, duplicateFileFromShortcut, copyAlsoFiles);
  }
}





