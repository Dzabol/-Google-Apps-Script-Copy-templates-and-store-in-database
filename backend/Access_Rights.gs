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

    accesInformationTemplate = checkAccesToFolder_(arrayWithServers[i].sourceFolderID);
    accesinformationTargetFolder = checkAccesToFolder_(arrayWithServers[i].targetFolderID);
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


