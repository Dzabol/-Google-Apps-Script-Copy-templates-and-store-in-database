async function createNewProject(projectInformation, prefixName, serverNumberToCreatePackage) {

  let projectData = createPackageOfFoldersAndFiles_(
    projectInformation.customerName,
    prefixName,
    getIdFromUrl(serversInformation[serverNumberToCreatePackage].sourceFolderUrl),
    getIdFromUrl(serversInformation[serverNumberToCreatePackage].targetFolderUrl),
    serversInformation[serverNumberToCreatePackage].serverName
  );

  return projectData;
}



