/**
 * ********************************************************************************************
 * Find Text in required sheet and return the Column number if text exists
 * ********************************************************************************************
 *  
 * @param sheetTosearchByName insert name of the sheet where you would like to perform a search
 * @param textToFind insert text wchich you would like to find in the sheet
 * 
 */

function findColumnByName(sheetToSearch, textToFind) {

    let textFinder = sheetToSearch.createTextFinder(textToFind).matchEntireCell(true);
    let foundRange = textFinder.findNext();

    if (foundRange != null) {
        var number = foundRange.getColumn();
        //number = parseInt(number,10);
        return number;
    }
    else {
        Logger.log("Can't find reqired txt (findColumnByName).");
        Logger.log("Text which can't be find: " + textToFind);
        return -1;
    }
}

/**
 * ******************************************************************************************** 
 * Find Text in required sheet and return the Row number if text exists
 * ********************************************************************************************
 *  
 * @param sheetTosearchByName insert name of the sheet where you would like to perform a search
 * @param textToFind insert text wchich you would like to find in the sheet
 *
 */

function findRowNumberByName(sheetToSearch, textToFind) {

    let textFinder = sheetToSearch.createTextFinder(textToFind).matchEntireCell(true);
    let foundRange = textFinder.findNext();

    if (foundRange != null) {
        var rowNumber = foundRange.getRowIndex();
        //number = parseInt(number,10);
        return rowNumber;
    }
    else {
        Logger.log("Can't find reqired txt (findRowNumberByName)");
        Logger.log("Text which can't be find: " + textToFind);
        return -1;
    }
}

/**
 * ******************************************************************************************** 
 * Find STRCode and return row number
 * ********************************************************************************************
 * @param arrayWithData {array} insert array with data to serch 
 * @param strCodeToFind {string} insert STR code
 * @returns index number in array
 */

function findIndexNumberOfStrCode(arrayWithData, strCodeToFind) {
    let indexNumber = [-1, -1];

    let i = arrayWithData.findIndex(subArray =>
        subArray.some((value, j) => {
            if (value === strCodeToFind) {
                indexNumber = [i, j];
                return true
            }
        }));

    return indexNumber;
}



function searchObjectByNameAndSetURLadres(nameOfTheObject, allObjects, urlAddress) {
    for (let i = 0; i < allObjects.length; i++) {
        if (allObjects[i].name === nameOfTheObject) {
            allObjects[i].URL = urlAddress
        };
    }
}

/**
* ******************************************************************************************** 
 * Find URL adress for required object
 * ******************************************************************************************** 
 * @param {object} arrayWithObjects 
 * @param {string} nameToFind name of the object to find
 * @returns {string} url addres to the object or NULL if can't find
 */

function findRequiredObjectAndReturnURL(arrayWithObjects, nameToFind) {
    const object = arrayWithObjects.find(obj => obj.name = nameToFind);

    if (object) {
        return object.URL;
    }

    return null;
}