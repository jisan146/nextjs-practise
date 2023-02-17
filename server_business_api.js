module.exports = function (app) {
    /********** Start Include Module  ***********/
    allApi = require('./businessLogic/pos/pos')(app);
    allApi = require('./businessLogic/pos/productPurchase')(app);
    allApi = require('./businessLogic/accounts/accounts')(app);
    allApi = require('./businessLogic/pos/sale')(app);
    allApi = require('./businessLogic/BWDB/device_api')(app);
    allApi = require('./businessLogic/BWDB/deshboard')(app);
    allApi = require('./businessLogic/accounts/accountsLedger')(app);
    allApi = require('./businessLogic/edu/subjectAssignToClass')(app);
    allApi = require('./businessLogic/edu/subjectAssignToTeacher')(app);
    allApi = require('./businessLogic/edu/attendance')(app);
    allApi = require('./businessLogic/edu/stdResultEntry')(app);
    allApi = require('./businessLogic/system/clientDetails')(app);
    allApi = require('./businessLogic/edu/stdPromotion')(app);
    allApi = require('./businessLogic/edu/payment')(app);
    allApi = require('./businessLogic/edu/dataImport')(app);
    allApi = require('./businessLogic/edu/stdAssignment')(app);
    allApi = require('./businessLogic/edu/routine')(app);
    allApi = require('./businessLogic/edu/Dashboard/AdminDashboard')(app);
    allApi = require('./businessLogic/edu/Dashboard/InspectorDashBoard')(app);
    allApi = require('./businessLogic/edu/dataEntryPreveliege')(app);
    

    

    
    

    
    

    
    
    
    
    /********** End Include Module  ***********/
};