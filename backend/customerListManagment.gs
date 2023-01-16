/**
 * *****************************************************************************
 * Get List of the all customers in your database
 * *****************************************************************************  
 * @returns {array} list of the all customers in database
 */
function getListOfTheAllCustomers() {
    const spreadsheetWithCustomerList = SpreadsheetApp.openByUrl(projectsSpreadSheetURL);
    const sheetWithCustomerList = spreadsheetWithCustomerList.getSheetByName(tabWithAditionalInformations);
    const columnNumberWithAllCustomers = findColumnByName(sheetWithCustomerList, columnNameWithAllCustomers);

    let customers = [];

    if (columnNumberWithAllCustomers !== -1) {
        const firstLineWithCustomers = findRowNumberByName(sheetWithCustomerList, columnNameWithAllCustomers) + 1;
        customers = sheetWithCustomerList.getRange(
            firstLineWithCustomers,
            columnNumberWithAllCustomers,
            sheetWithCustomerList.getLastRow(),
            1
        )
            .getValues();
        customers = customers.filter(String);
        customers.sort();
    }
    return customers;
}

/**
 * *****************************************************************************
 * Function adds new customer to the list
 * ***************************************************************************** 
 * @param {string} newCustomerName 
 *  
 * */

function addNewCustomerToDataBase(newCustomerName) {
    const spreadsheetWithCustomerList = SpreadsheetApp.openByUrl(projectsSpreadSheetURL);
    const sheetWithCustomerList = spreadsheetWithCustomerList.getSheetByName(tabWithAditionalInformations);
    const columnNumberWithAllCustomers = findColumnByName(sheetWithCustomerList, columnNameWithAllCustomers);
    const firstLineWithCustomers = findRowNumberByName(sheetWithCustomerList, columnNameWithAllCustomers) + 1;

    let customers = [];
    customers = getListOfTheAllCustomers();
    newCustomerName = newCustomerName.toString();
    customers.push(newCustomerName);
    customers = customers.filter(String).sort();

    sheetWithCustomerList.getRange(
        firstLineWithCustomers,
        columnNumberWithAllCustomers,
        customers.length,
        1
    ).setValues(customers.map(c => [c]));
}
