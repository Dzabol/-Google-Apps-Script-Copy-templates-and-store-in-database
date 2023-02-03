/**
 * *****************************************************************************
 * Return Folder / File URL from ID
 * *****************************************************************************
 * @param {string} Folder / File ID
 * @return {string} URL
 */

function returFileOrFolderURLfromID(fileOrFolderID = "1Sl9GKp-lE-aEheB-rkXuc7wEEczJof6hhRTp-GBDowY") {
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