/**
 * *****************************************************************************
 * Check user permisions to acces a folder and files
 * ***************************************************************************** 
 * @folderID {string} ID of the folder to check acces righst 
 * @return {boolean} acces information
 */

function checkAccesToFolder_(folderID) {

  let userAccesPermision = true;

  try {
    let folder = DriveApp.getFileById(folderID);
    let currentUserEmail = Session.getActiveUser().getEmail();
    let accesRights = folder.getAccess(currentUserEmail);

    if ((accesRights == "VIEW") || (accesRights == "COMMENT") || (accesRights == "NONE")) {
      userAccesPermision = false;
    }
  } catch (e) {
    userAccesPermision = false;
    Logger.log(e);
    console.log("You don't have permision to acces folder")
  }
  return userAccesPermision;
}

/**
 * * *****************************************************************************
 * Check user permisions to acces a folder and files basing on the URL
 * ***************************************************************************** 
 * @param {string} fileURL FIle or folder URL 
 * @returns {boolean} True or False
 */

function checkAccesToFileByURL(fileURL) {
  let fileID = getIdFromUrl(fileURL);
  Logger.log(fileID);

  return checkAccesToFolder_(fileID);
}

/**
 * *****************************************************************************
 * Function check acces rights on desired servers
 * ***************************************************************************** 
 * @serversInformation {arr} array with server informations: Server name, Template folder ID, Source folder ID
 * @return {arr} acces information to requested server
 */

function serversAccesInformation() {

  let arrayWithServers = serversInformation
  let accesRightsToFolders = [];
  let accesInformationTemplate;
  let accesinformationTargetFolder;

  for (var i = 0; i < arrayWithServers.length; i++) {

    accesInformationTemplate = checkAccesToFolder_(getIdFromUrl(arrayWithServers[i].sourceFolderUrl));
    accesinformationTargetFolder = checkAccesToFolder_(getIdFromUrl(arrayWithServers[i].targetFolderUrl));
    accesRightsToFolders.push(
      {
        "serverName": arrayWithServers[i].serverName,
        "sourceFolder": accesInformationTemplate,
        "targetFolder": accesinformationTargetFolder
      }
    );
  }
  return accesRightsToFolders;
}

/**
 * *****************************************************************************
 * Function check if user has an acces to all servers
 * ***************************************************************************** 
 * @serversInformation {array} array with server informations: Server name, Template folder ID, Source folder ID
 * @returns {boolean} 
 */

function checkIfOtherFunctionsCanBeRun(accesToServersInformation) {
  console.log(accesToServersInformation);
  let numberOfServers = accesToServersInformation.length;
  console.log("ilosc serv: " + numberOfServers);
  console.log(accesToServersInformation);
  for (let i = 0; i < numberOfServers; i++) {
    console.log("jestem");
    if ((accesToServersInformation[i].sourceFolder == false) || (accesToServersInformation[i].targetFolder == false)) {
      return false;
    }
  }
  return true;
}

/**
 * *****************************************************************************
 * Function gets data about user
 * ***************************************************************************** 
 * @returns 
 */

function getActiveUserInformation() {
  let userDataInformation = {};
  userDataInformation.email = Session.getActiveUser().getEmail();

  return userDataInformation;
}


