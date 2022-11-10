/**
 * *****************************************************************************
 * Function gethers names of all folders
 * *****************************************************************************
 * @param destinationFolderID {string} Folder ID  where new folder will be created
 * @return Array with names of all folders in destination folder
 */
function gerAllFoldersNamesInReqiredFolder_(destinationFolderID) {
    let destinationFolder = DriveApp.getFolderById(destinationFolderID);
    let allFoldersNames = [];
    let allFoldersIterator = destinationFolder.getFolders();

    while (allFoldersIterator.hasNext()) {
        let folder = allFoldersIterator.next();
        allFoldersNames.unshift(folder.getName());
    }

    return allFoldersNames;
}
