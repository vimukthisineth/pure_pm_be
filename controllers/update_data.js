const dataCollectingService = require('../services/data_collecting_service');

module.exports = {
    updateData : function(){
        dataCollectingService.dataCollectFromTenantturner().then(r => {});
    }
}
