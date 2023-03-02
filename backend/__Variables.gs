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
        "dataToTransferToGoogleSheets": [
            {
                "name": "Product Plan",
                "fileType": "file",
                "ColumnNumberToSetData": 15
            },
            {
                "name": " System FDP",
                "fileType": "file",
                "ColumnNumberToSetData": 14
            },
            {
                "name": "R&D Hours Estimates",
                "fileType": "file",
                "ColumnNumberToSetData": 13
            },

        ],
        "dataToSetInBOM": [
            {
                "name": "Technical Description",
                "fileType": "folder",
                "cellAddressToSetData": 11
            }
        ]
    },
    {
        "serverName": "Mechanical",
        "sourceFolderUrl": "https://drive.google.com/drive/folders/1yruQkqyJ6ZGxq7_i5n2kGPK3l5d-VHAR",
        "targetFolderUrl": "https://drive.google.com/drive/folders/1nvPsryxuHD4C-Cy60e0O1deCIREkzEeR",
        "sourceFolderID": "",
        "targetFolderID": "",
        "projectsList": [],
        "dataToTransferToGoogleSheets": [],
        "dataToSetInBOM": [
            {
                "name": "Blade and Rubber Design Toolkit",
                "fileType": "file",
                "cellAddressToSetData": "A1"
            },
            {
                "name": "FWS Linkage Pre-Sizing Tool",
                "fileType": "file",
                "cellAddressToSetData": "A2"
            },
            {
                "name": "VWS System Sizing",
                "fileType": "file",
                "cellAddressToSetData": "A3"
            },
            {
                "name": "04. VD",
                "fileType": "folder",
                "cellAddressToSetData": "A4"
            },
            {
                "name": "05. Arm Calculations",
                "fileType": "folder",
                "cellAddressToSetData": "A5"
            },
            {
                "name": "Grease Quantity Calculation",
                "fileType": "file",
                "cellAddressToSetData": "A6"
            },
            {
                "name": "07. Stack-up",
                "fileType": "folder",
                "cellAddressToSetData": "A7"
            },
        ],
    },
    {
        "serverName": "Simulation",
        "sourceFolderUrl": "https://drive.google.com/drive/folders/1ptZ4G8YKg3D7o6Yh9sQNO8_-nTGvSw4Q",
        "targetFolderUrl": "https://drive.google.com/drive/folders/1mnnYO33h1vtEbQTIHM2tfI5nD2Xd6Oor",
        "sourceFolderID": "",
        "targetFolderID": "",
        "projectsList": [],
        "dataToTransferToGoogleSheets": [],
        "dataToSetInBOM": [
            {
                "name": "SIMULATION-PLAN",
                "fileType": "folder",
                "cellAddressToSetData": "A8"
            },
        ],
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
}



async function transferServersInformationToHTML() {
    generateIDsforServersFromURL();
    return serversInformation;
}

async function transferProjectsSpreadSheetToHTML() {
    return projectsSpreadSheet;
}