/**
* *****************************************************************************
 * Function checks if you need anny autorizations
 * If yes function returns URL to set autorization
 * IF not returns message NOT_REQUIRED
 * ***************************************************************************** 
 * @return {string}
 */

function scriptAutorizationCheck() {
  const autorizationInfo = ScriptApp.getAuthorizationInfo(ScriptApp.AuthMode);
  const autorizationMessage = autorizationInfo.getAuthorizationStatus();

  if (autorizationMessage == 'REQUIRED') {
    const autorizationURL = autorizationInfo.getAuthorizationUrl();
    return autorizationURL;
  }
  return autorizationMessage;
}

/**
 * *****************************************************************************
 * Check user permisions to acces a folder and files
 * ***************************************************************************** 
 * @folderID {string} ID of the folder to check acces righst 
 * @return {string} acces information
 */

function checkAccesToFolder(folderID = "13wio10rwCuPL6aSxCgKXPdY2-RS6pGip") {

  let userAccesPermision = true;
  let folder = DriveApp.getFileById(folderID);
  let currentUserEmail = Session.getActiveUser().getEmail();
  let accesRights = folder.getAccess(currentUserEmail);

  if ((accesRights == "VIEW") || (accesRights == "COMMENT") || (accesRights == "NONE")) {
    userAccesPermision = false;
  }
  Logger.log(userAccesPermision)
  return userAccesPermision;
}

/**
 * *****************************************************************************
 * Function check acces rights on desired servers
 * ***************************************************************************** 
 * @serversInformation {arr} array with server informations: Server name, Template folder ID, Source folder ID
 * @return {arr} acces information to requested server
 */

function serversAccesInformation(serversInformation) {

  let accesRightsToFolders = [];
  let accesInformationTemplate;
  let accesinformationTargetFolder;

  for (var i = 0; i < serversInformation.length; i++) {

    accesInformationTemplate = checkAccesToFolder_(serversInformation[i].sourceFolderID);
    accesinformationTargetFolder = checkAccesToFolder_(serversInformation[i].targetFolderID);
    accesRightsToFolders.push(
      {
        "server": serversInformation[i].serverName,
        "template": accesInformationTemplate,
        "destination": accesinformationTargetFolder
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
 * @return {boolean} 
 */

function checkIfOtherFunctionsCanBeRun_(accesToServersInformation){

   for(let i = 0; i < accesToServersInformation.length; i++){
    if ((accesToServersInformation[i].template == false) || (accesToServersInformation[i].destination == false)){
            return false;
    }
  }
  return true;
}





