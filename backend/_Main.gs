async function createNewProject(projectInformation, prefixName, serverNumberToCreatePackage) {

  return createPackageOfFoldersAndFiles_(
    projectInformation.customerName,
    prefixName,
    serversInformation[serverNumberToCreatePackage].sourceFolderID,
    serversInformation[serverNumberToCreatePackage].targetFolderID
  );

}



