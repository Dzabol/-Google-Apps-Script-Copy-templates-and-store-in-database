/**
* *****************************************************************************
 * Function checks if you need anny autorizations to use aplication
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
