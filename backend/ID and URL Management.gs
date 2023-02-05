/**
 * *****************************************************************************
 * Return Folder / File URL from ID
 * *****************************************************************************
 * @param {string} Folder / File ID
 * @return {string} URL
 */

function getURLfromFileID(fileOrFolderID) { //returFileOrFolderURLfromID
    let url = "";
    let file = DriveApp.getFileById(fileOrFolderID);

    if (file.getMimeType() == MimeType.FOLDER) {
        let folder = DriveApp.getFolderById(fileOrFolderID);
        url = folder.getUrl();
    }
    else {
        url = file.getUrl();
    }

    return url;
}

/**
* *****************************************************************************
* Get ID to the file or folder from the URL
* ***************************************************************************** 
* @param {string} url 
* @returns {string} ID
*/

function getIdFromUrl(url) {
    const match = url.match(/[\w-_]{15,}/);
    return match ? match[0] : undefined;
}

/**
* *****************************************************************************
* Generates ID for all folders from URL
* ***************************************************************************** 
 */

function generateIDsforServersFromURL() {
    let numberOfServers = serversInformation.length;

    for (let i = 0; i < numberOfServers; i++) {
        //template ID
        serversInformation[i].sourceFolderID = getIdFromUrl(serversInformation[i].sourceFolderUrl);
        //Project Folder
        serversInformation[i].targetFolderID = getIdFromUrl(serversInformation[i].targetFolderUrl);
    }
    console.log(serversInformation);
} 