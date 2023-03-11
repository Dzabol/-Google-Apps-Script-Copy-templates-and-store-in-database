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
 * @param {string} customerName - The name of the customer.
 * @param {string} folderAndFileNamePrefix - The prefix for the name of the new project folder and files.
 * @param {string} sourceFolderID - The ID of the folder that contains the template folder to be copied.
 * @param {string} targetMainFolderID - The ID of the folder where the new project folder should be created.
 * @param {string} serverName - The name of the server where the project will be hosted.
 * @returns {Object} projectData - An object containing information about the newly created project folder and its contents.
 */

function createPackageOfFoldersAndFiles_(customerName, folderAndFileNamePrefix, sourceFolderID, targetMainFolderID, serverName) {
  // Inicjalizacja danych projektu
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
    // Download the template folder and create a root folder for the client
    const templateFolder = DriveApp.getFolderById(sourceFolderID);
    const customerFolderID = setFolderToSetData_(customerName, targetMainFolderID);

    // Retrieving the names of all projects
    const allProjectsInDataBase = getAllFoldersNamesInReqiredFolder_(customerFolderID);

    // Checks if a project with the given name already exists
    if (allProjectsInDataBase.includes(folderAndFileNamePrefix)) {
      projectData.message = "This project already exists in the database.";
      return projectData;
    }

    // Creating a project folder and copying files from the template folder
    const projectFolderID = setFolderToSetData_(folderAndFileNamePrefix, customerFolderID);
    const projectFolder = DriveApp.getFolderById(projectFolderID);

    projectData.projectFolderUrl = getURLfromFileID(projectFolderID);
    projectData.projectName = projectFolder.getName();

    copyFoldersAndFiles_(templateFolder, projectFolder, folderAndFileNamePrefix, "Yes", true);

    // Preparation of project data
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





