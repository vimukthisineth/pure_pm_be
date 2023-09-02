const cron = require("node-cron");
const updateDataController = require('../controllers/update_data');

module.exports = {

    db_check : function(){
        
                cron.schedule("0 0 */4 * * *", function () {
                    console.log("check for new entries");
                    updateDataController.updateData();
                });
    }
}



