/**
 * *****************************************************************************
 * Creates shortcut for the file or the folder.
 * Advance Drive service must be enabled
 * *****************************************************************************
 * 
 * @param fileIdToCreateShortcut {string} Id of the file or folder
 * @param nameOfTheShortcut {string} Name for the shortcut
 * @param folderIdToInsertShortCut {string} ID of the folder where shortcut will be placed
 */


function createShortcut(fileIdToCreateShortcut, nameOfTheShortcut, folderIdToInsertShortCut) {

  const resource = {
    shortcutDetails: { targetId: fileIdToCreateShortcut },
    title: nameOfTheShortcut,
    mimeType: "application/vnd.google-apps.shortcut",
    supportsTeamDrives: true,
    parents: [{ id: folderIdToInsertShortCut }]
  };

  const shortcut = Drive.Files.insert(resource);
}