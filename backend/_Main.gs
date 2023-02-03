async function createNewProject(projectInformation, prefixName, serverNumberToCreatePackage) {

  let projectData = createPackageOfFoldersAndFiles_(
    projectInformation.customerName,
    prefixName,
    serversInformation[serverNumberToCreatePackage].sourceFolderID,
    serversInformation[serverNumberToCreatePackage].targetFolderID
  );

  return projectData;
}



