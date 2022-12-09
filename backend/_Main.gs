/* 
*********************************************************************
                      IMPUT AND OUTPUT FOLDERS 
*********************************************************************
*/
let serversInformation = [
  {
    "serverName": "RD",
    "sourceFolderID": "13wio10rwCuPL6aSxCgKXPdY2-RS6pGip",
    "targetFolderID": "1Xp4RqEUJaSEIZJDTCMGWymXl9f_6M_sH",
  },
  {
    "serverName": "Mechanical",
    "sourceFolderID": "13wio10rwCuPL6aSxCgKXPdY2-RS6pGip",
    "targetFolderID": "1Xp4RqEUJaSEIZJDTCMGWymXl9f_6M_sH",
  },
  {
    "serverName": "Simulation",
    "sourceFolderID": "13wio10rwCuPL6aSxCgKXPdY2-RS6pGip",
    "targetFolderID": "1Xp4RqEUJaSEIZJDTCMGWymXl9f_6M_sH",
  }
];


/* ****************************************************************** */


function createNewProject() {

  let projectInformation = {
    strCode: "123",
    projectName: "AU270",
    customerName: "AUDI"
  }
  let fileCreationMessage = [];
  let temporarryMessage = "";

  let numberOfServersToPrepareTemplate = serversInformation.length;
  let accesToServerInformation = serversAccesInformation(serversInformation);
  let correctAccesToServersForUser = checkIfOtherFunctionsCanBeRun_(accesToServerInformation);

  if (correctAccesToServersForUser) {

    let filesAndFoldersPrefix = projectInformation.strCode + " - " + projectInformation.projectName;

    for (let serverNumber = 0; serverNumber < numberOfServersToPrepareTemplate; serverNumber++) {

      temporarryMessage = createPackageOfFoldersAndFiles_(
        projectInformation.customerName,
        filesAndFoldersPrefix,
        serversInformation[serverNumber].sourceFolderID,
        serversInformation[serverNumber].targetFolderID
      );

      fileCreationMessage.push({
        serverName: serversInformation[serverNumber].serverName,
        fileCreationStatus: temporarryMessage
      });

      temporarryMessage = "";
    }
    Logger.log(fileCreationMessage);
  }

}

