/* 
*********************************************************************
                      IMPUT AND OUTPUT FOLDERS 
*********************************************************************
*/
let serversInformation = [
    {
        "serverName": "RD",
        "sourceFolderID": "1hj9O5QAQdBaSiisd10BCRIH-vmJ9Zckq",
        "targetFolderID": "1jwsroENMFggtVHiLCccKV4gES3hlRPtH",
        "projectsList": [],
    },
    {
        "serverName": "Mechanical",
        "sourceFolderID": "1yruQkqyJ6ZGxq7_i5n2kGPK3l5d-VHAR",
        "targetFolderID": "1nvPsryxuHD4C-Cy60e0O1deCIREkzEeR",
        "projectsList": [],
    },
    {
        "serverName": "Simulation",
        "sourceFolderID": "1ptZ4G8YKg3D7o6Yh9sQNO8_-nTGvSw4Q",
        "targetFolderID": "1mnnYO33h1vtEbQTIHM2tfI5nD2Xd6Oor",
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
}


async function transferServersInformationToHTML() {
    return serversInformation;
}

async function transferProjectsSpreadSheetToHTML() {
    return projectsSpreadSheet;
}