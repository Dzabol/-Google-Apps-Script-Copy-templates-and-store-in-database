/**
 * *****************************************************************************
 * Get List of the all customers in your database
 * *****************************************************************************  
 * @returns {array} list of the all customers in database
 */
function getListOfTheAllCustomers() {
    const spreadsheetWithCustomerList = SpreadsheetApp.openByUrl(projectsSpreadSheet.SpreadSheetURL);
    const sheetWithCustomerList = spreadsheetWithCustomerList.getSheetByName(projectsSpreadSheet.tabWithAditionalInformations);
    const columnNumberWithAllCustomers = findColumnByName(sheetWithCustomerList, projectsSpreadSheet.columnNameWithAllCustomers);

    let customers = [];

    if (columnNumberWithAllCustomers !== -1) {
        const firstLineWithCustomers = findRowNumberByName(sheetWithCustomerList, projectsSpreadSheet.columnNameWithAllCustomers) + 1;
        customers = sheetWithCustomerList.getRange(
            firstLineWithCustomers,
            columnNumberWithAllCustomers,
            sheetWithCustomerList.getLastRow(),
            1
        )
            .getValues();
        customers = Array.from(new Set(customers.flat()));
        customers = customers.map(c => [c]);
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
    const spreadsheetWithCustomerList = SpreadsheetApp.openByUrl(projectsSpreadSheet.SpreadSheetURL);
    const sheetWithCustomerList = spreadsheetWithCustomerList.getSheetByName(projectsSpreadSheet.tabWithAditionalInformations);
    const columnNumberWithAllCustomers = findColumnByName(sheetWithCustomerList, projectsSpreadSheet.columnNameWithAllCustomers);
    const firstLineWithCustomers = findRowNumberByName(sheetWithCustomerList, projectsSpreadSheet.columnNameWithAllCustomers) + 1;
    let message;

    let customers = [];
    customers = getListOfTheAllCustomers();
    newCustomerName = newCustomerName.toString();
    customers = Array.from(new Set(customers.flat()));
    customers = customers.filter(String);

    if (customers.flat().indexOf(newCustomerName) !== -1) return message = "Customer exists in Your database";

    customers.push(newCustomerName);
    customers = customers.sort();

    sheetWithCustomerList.getRange(
        firstLineWithCustomers,
        columnNumberWithAllCustomers,
        customers.length,
        1
    ).setValues(customers.map(c => [c]));

    return message = 'New Customer: ' + newCustomerName + ', has been aded to your database';
}
