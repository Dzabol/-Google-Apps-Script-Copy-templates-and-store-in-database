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


function start() {

  

  let projectInformation = {
    strCode: "123",
    projectName: "AU270",
    customerName: "AUDI"
  }

  let accesToServerInformation = serversAccesInformation(serversInformation);
  let correctAccesForUser = checkIfOtherFunctionsCanBeRun_(accesToServerInformation);
  Logger.log(correctAccesForUser);

  

  /*  for (let i = 0; i < servers.length(); i++) {
     for(key in servers[i]){
       Logger.log
     }
   } */


  /*let filesAndFoldersPrefix = projectInformation.strCode + " - " + projectInformation.projectName;

  let messages = {
    fileCreationRD: "",
    fileCreationMechanical: "",
    fileCreationSimulation: "",

    autorizationRD: "",
    autorizationCAD: "",
    autorizationSimulation: ""
  }

  //Prepare data for RD
  messages.fileCreationRD = createPackageOfFoldersAndFiles_(projectInformation.customerName, filesAndFoldersPrefix, sourceFolderIDforRD, targetFolderIDforRD);

  Logger.log("RD = " + messages.fileCreationRD);
  // Logger.log("CAD = " + messageCAD);
  // Logger.log("Simulation = " + messageSimulation);*/
}

