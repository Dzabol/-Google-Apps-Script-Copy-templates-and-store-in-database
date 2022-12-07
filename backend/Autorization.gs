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
 * @return {string}
 */

function checkAccesToFolder(folderID = "13wio10rwCuPL6aSxCgKXPdY2-RS6pGip"){
  let folder = DriveApp.getFileById(folderID);
  let currentUserEmail = Session.getActiveUser().getEmail();
  let accesRights = folder.getAccess(currentUserEmail);

  Logger.log(accesRights);

}

/**
 * *****************************************************************************
 * Function decides if user can work in required folder
 * ***************************************************************************** 
 * @folderID {string} ID of the folder to check acces righst 
 * @return {bool}
 */

function informationIfUserCanWorkInRequiredFolder(accesRightsInformation){
  let userAccesPermision = true;

  if ((accesRightsInformation == "VIEW") || (accesRightsInformation == "COMMENT") || (accesRightsInformation =="NONE")){
    userAccesPermision = false;
  }

  return userAccesPermision;
}