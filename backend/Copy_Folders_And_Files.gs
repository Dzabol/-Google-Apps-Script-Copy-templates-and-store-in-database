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

/**
 * *****************************************************************************
 * Create package of Folders an files in desired localization 
 * Folders and files organization is based on the template folder 
 * *****************************************************************************
 * @param customerName {string} Customer Name
 * @param folderAndFileNamePrefix {string} prefix which will be added to all files and project folder
 * @param sourceFolderID {string} ID of the folder with templates 
 * @param targetMainFolderID {string} ID of the folder where project will be added
 * @return {object} 
 */

function createPackageOfFoldersAndFiles_(customerName, folderAndFileNamePrefix, sourceFolderID, targetMainFolderID, serverName) {
  
  const projectData = {
    serverName: serverName,
    projectName: "",
    projectFolderUrl: "",
    customerName: customerName,
    foldersAndFiles: {},
    message: "",
    successfullyCreated: false
  };

  try {
    const templateFolder = DriveApp.getFolderById(sourceFolderID);
    const customerFolderID = setFolderToSetData_(customerName, targetMainFolderID);
    const allProjectsInDataBase = getAllFoldersNamesInReqiredFolder_(customerFolderID);

    if (allProjectsInDataBase.includes(folderAndFileNamePrefix)) {
      projectData.message = "This project already exists in the database.";
      return projectData;
    }

    const projectFolderID = setFolderToSetData_(folderAndFileNamePrefix, customerFolderID);
    const projectFolder = DriveApp.getFolderById(projectFolderID);
    projectData.projectFolderUrl = getURLfromFileID(projectFolderID);
    projectData.projectName = projectFolder.getName();

    copyFoldersAndFiles_(templateFolder, projectFolder, folderAndFileNamePrefix, "Yes", true);

    projectData.customerName = customerName;
    projectData.projectName = folderAndFileNamePrefix;
    projectData.successfullyCreated = true;
    projectData.foldersAndFiles = getAllFilesNamesAndUrl(projectData.projectFolderUrl);
    projectData.message = "New project has been added to the database.";

    return projectData;
  } catch (e) {
    Logger.log(e.stack);
    projectData.message = `Error while setting up project folder: ${e.message}`;
    return projectData;
  }
}





