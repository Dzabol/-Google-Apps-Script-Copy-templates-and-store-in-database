/* 
*********************************************************************
                      IMPUT AND OUTPUT FOLDERS 
*********************************************************************
*/
//RD
const sourceFolderIDforRD = "13wio10rwCuPL6aSxCgKXPdY2-RS6pGip";
const targetFolderIDforRD = "1Xp4RqEUJaSEIZJDTCMGWymXl9f_6M_sH";

//CAD
const sourceFolderIDforCAD = "13wio10rwCuPL6aSxCgKXPdY2-RS6pGip";
const targetFolderIDforCAD = "1Xp4RqEUJaSEIZJDTCMGWymXl9f_6M_sH";

//Simulation
const sourceFolderIDforSimulation = "13wio10rwCuPL6aSxCgKXPdY2-RS6pGip";
const targetFolderIDforSimulation = "1Xp4RqEUJaSEIZJDTCMGWymXl9f_6M_sH";

/* ****************************************************************** */


function start() {

  let strCode = "123";
  let projectName = "AU270";
  let customerName = "Audi";

  let filesAndFoldersPrefix = strCode + " - " + projectName;

  let messageRD = "";
  let messageCAD = "";
  let messageSimulation = "";

  //Prepare data for RD
  messageRD = createPackageOfFoldersAndFiles_(customerName, filesAndFoldersPrefix, sourceFolderIDforRD, targetFolderIDforRD);

  Logger.log("RD = " + messageRD);
  Logger.log("CAD = " + messageCAD);
  Logger.log("Simulation = " + messageSimulation);
}

function createPackageOfFoldersAndFiles_(customerName, folderAndFileNamePrefix, sourceFolderID, targetMainFolderID) {

  let message ="";

  const template = DriveApp.getFolderById(sourceFolderID);
  const customerFolderID = setFolderToSetData_(customerName, targetMainFolderID);
  let allProjectsInDataBase = getAllFoldersNamesInReqiredFolder_(customerFolderID);

  let projectInDataBase = allProjectsInDataBase.indexOf(folderAndFileNamePrefix) ? false : true;

  if (!projectInDataBase) {
    const projectFolderID = setFolderToSetData_(folderAndFileNamePrefix, customerFolderID);
    const folderToSetDataFromTemplate = DriveApp.getFolderById(projectFolderID);

    copyFoldersAndFiles_(template,folderToSetDataFromTemplate,folderAndFileNamePrefix,"Yes", true);

    message = "done";
  }

  else {
    message = "Projekt juz jest w bazie";
  }

  return message;
}