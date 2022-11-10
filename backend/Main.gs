function start() {
    const sourceFolderID = "13wio10rwCuPL6aSxCgKXPdY2-RS6pGip";
    const targetFolderID = "19pwJ2lr-D4FnQ1o9Ojfz_GaYwvmYJQ2u";
    let newFolderName = "Test";

    let sourceFolder = DriveApp.getFolderById(sourceFolderID);

    //Create new folder
    let newDestinationFolderID = createSingleFolderAndRename_(
        targetFolderID,
        newFolderName
    );
    //Copy files in new destination
    let destinationFolder = DriveApp.getFolderById(newDestinationFolderID);
    copyFoldersAndFiles_(sourceFolder, destinationFolder);
}