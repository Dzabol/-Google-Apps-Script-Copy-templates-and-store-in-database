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

function createPackageOfFoldersAndFiles_(customerName, folderAndFileNamePrefix, sourceFolderID, targetMainFolderID) {

  let projectData =
  {
    "serverName": "",
    "projectName": "",
    "projectFolderUrl": "",
    "customerName": "",
    "message": "Project added to the data base",
    "succesfullyCreated": false,
  };

   try {

    const template = DriveApp.getFolderById(sourceFolderID);
    let customerFolderID;
    let allProjectsInDataBase;

    try {
      customerFolderID = setFolderToSetData_(customerName, targetMainFolderID);
    } catch (e) {
      projectData.message = "Error while setting up customer folder: " + e.message;
      projectData.succesfullyCreated = false;
      Logger.log(e.stack);
      return projectData;
    }

    try {
      allProjectsInDataBase = getAllFoldersNamesInReqiredFolder_(customerFolderID);
    } catch (e) {
      projectData.message = "Error while getting all projects from database: " + e.message;
      projectData.succesfullyCreated = false;
      Logger.log(e.stack);
      return projectData;
    }

    let existenceOfProjectInDataBase = allProjectsInDataBase.includes(folderAndFileNamePrefix);

    if (!existenceOfProjectInDataBase) {
      let projectFolderID;

      try {
        projectFolderID = setFolderToSetData_(folderAndFileNamePrefix, customerFolderID);
      } catch (e) {
        projectData.message = "Error while setting up project folder: " + e.message;
        projectData.succesfullyCreated = false;
        Logger.log(e.stack);
        return projectData;
      }

      const folderToSetDataFromTemplate = DriveApp.getFolderById(projectFolderID);
      copyFoldersAndFiles_(template, folderToSetDataFromTemplate, folderAndFileNamePrefix, "Yes", true);

      projectData.customerName = customerName;
      projectData.projectName = folderAndFileNamePrefix;
      projectData.projectFolderUrl = returFileOrFolderURLfromID(projectFolderID);
      projectData.succesfullyCreated = true;
      projectData.message = "New Project has been added to the data base";
      console.log(projectData);
      return projectData;
    }

    if (existenceOfProjectInDataBase) {
      projectData.message = "This Project exists in your database";
      projectData.succesfullyCreated = false;
      return projectData;
    }
  } catch (e) {
    Logger.log(e.stack);
    projectData.message = "Error while setting up project folder: " + e.stack;
    projectData.succesfullyCreated = false;
    return projectData;
  }

  return projectData;
}





