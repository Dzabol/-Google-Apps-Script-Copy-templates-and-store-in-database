const scriptVersion = "1.0.9";
const scriptOwner = "sebastian.jablecki@gmail.com"

/* 
*********************************************************************
                      IMPUT AND OUTPUT FOLDERS 
*********************************************************************
*/
let serversInformation = [
    {
        "serverName": "RD",
        "sourceFolderUrl": "https://drive.google.com/drive/folders/1hj9O5QAQdBaSiisd10BCRIH-vmJ9Zckq",
        "targetFolderUrl": "https://drive.google.com/drive/folders/1jwsroENMFggtVHiLCccKV4gES3hlRPtH",
        "sourceFolderID": "",
        "targetFolderID": "",
        "projectsList": [],
    },
    {
        "serverName": "Mechanical",
        "sourceFolderUrl": "https://drive.google.com/drive/folders/1yruQkqyJ6ZGxq7_i5n2kGPK3l5d-VHAR",
        "targetFolderUrl": "https://drive.google.com/drive/folders/1nvPsryxuHD4C-Cy60e0O1deCIREkzEeR",
        "sourceFolderID": "",
        "targetFolderID": "",
        "projectsList": [],
    },
    {
        "serverName": "Simulation",
        "sourceFolderUrl": "https://drive.google.com/drive/folders/1ptZ4G8YKg3D7o6Yh9sQNO8_-nTGvSw4Q",
        "targetFolderUrl": "https://drive.google.com/drive/folders/1mnnYO33h1vtEbQTIHM2tfI5nD2Xd6Oor",
        "sourceFolderID": "",
        "targetFolderID": "",
        "projectsList": [],
    }
];

/* 
*********************************************************************
                      DATA SHEET
*********************************************************************
*/
let projectsSpreadSheet = {
    "SpreadSheetURL": "https://docs.google.com/spreadsheets/d/1mYZbt3pHHh1teoka1m0J61OS-m4JGO0SupSeZpQCJ3E/edit#gid=1646998880",
    "dataTabName": "Skawina",
    "tabWithAditionalInformations": "Sheet_Information",
    "strDataTabName": "DataFromStr",
    "columnNameWithAllCustomers": "Customer",
    "projectBasicInformations": ["Project_Code", "Project_Name", "Customer"],
    "userAccesRights": "",
    "creationDateColumnName": "Created_Package",
    "erorLogTabName": "ErrorLogs"
}



async function transferServersInformationToHTML() {
    generateIDsforServersFromURL();
    return serversInformation;
}

async function transferProjectsSpreadSheetToHTML() {
    return projectsSpreadSheet;
}

/* 
*********************************************************************
                      BOM TEMPLATE
*********************************************************************
*/

let bomTemplateSpreadSheet = {
    "folderURLWithAllBOMS": "https://drive.google.com/drive/u/0/folders/1Pcu56BlVMxglH99qQWfage2WXmOwDkK5",
    "templateURL": "https://docs.google.com/spreadsheets/d/1D_ZTEOrPG7S3Cy40bsP2QWlEloj4UsLlUbREu1gTZM8/edit#gid=134104279",
    "tabNameToSetBasicData": "MAIN SHEET",
    "tabNameWithAllTemplates": "TEMPLATE",
    "tabNameWithaditionalInformations": "Sheet information",
    "rowToKeepInTemplate": "MAIN SYSTEM END",
    "cellToSetProjectName": "A1",
    "cellToSetProjectCode": "E14",
    "cellToSetProjectSheetURL": "F28",

}

/* 
*********************************************************************
                      Data to set in BOM and Data Sheet
*********************************************************************
*/

let dataToExportToBOM = [
    {
        "name": "Projects Informations",
        "fileType": "file",
        "cellAddressToSetData": "F28",
        "URL": projectsSpreadSheet.SpreadSheetURL
    },
    {
        "name": "Mechanical",
        "fileType": "folder",
        "cellAddressToSetData": "F29",
        "URL": ""
    },
    {
        "name": "RD",
        "fileType": "folder",
        "cellAddressToSetData": "F30",
        "URL": ""
    },
    {
        "name": "Simulation",
        "fileType": "folder",
        "cellAddressToSetData": "F31",
        "URL": ""
    },
    {
        "name": "Technical Description",
        "fileType": "folder",
        "cellAddressToSetData": "F32",
        "URL": ""
    },
    {
        "name": "Blade and Rubber Design Toolkit",
        "fileType": "file",
        "cellAddressToSetData": "F36",
        "URL": ""
    },
    {
        "name": "FRONT ARM ASSEMBLY TOOLKIT",
        "fileType": "file",
        "cellAddressToSetData": "F39",
        "URL": ""
    },
    {
        "name": "05. Arm Calculations",
        "fileType": "folder",
        "cellAddressToSetData": "F40",
        "URL": ""
    },
    {
        "name": "04. VD",
        "fileType": "folder",
        "cellAddressToSetData": "F41",
        "URL": ""
    },
    {
        "name": "VWS System Sizing",
        "fileType": "file",
        "cellAddressToSetData": "F42",
        "URL": ""
    },
    {
        "name": "FWS Linkage Pre-Sizing Tool",
        "fileType": "file",
        "cellAddressToSetData": "F43",
        "URL": ""
    },
    {
        "name": "06. Grease Calculations",
        "fileType": "folder",
        "cellAddressToSetData": "F44",
        "URL": ""
    },
    {
        "name": "Simulation Plan",
        "fileType": "file",
        "cellAddressToSetData": "F45",
        "URL": ""
    },
    {
        "name": "SIMULATION-INPUT DATA",
        "fileType": "folder",
        "cellAddressToSetData": "F46",
        "URL": ""
    },

]

let dataToExportToProjectList = [
    {
        "name": "BOM",
        "fileType": "file",
        "ColumnNumberToSetData": 6,
        "URL": ""
    },
    {
        "name": "R&D Hours Estimates",
        "fileType": "file",
        "ColumnNumberToSetData": 15,
        "URL": ""
    },
    {
        "name": "System FDP",
        "fileType": "file",
        "ColumnNumberToSetData": 16,
        "URL": ""
    },
    {
        "name": "Product Plan",
        "fileType": "file",
        "ColumnNumberToSetData": 17,
        "URL": ""
    },
]






