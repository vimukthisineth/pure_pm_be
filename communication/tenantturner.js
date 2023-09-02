const https = require('https');
const Model = require('../model/model');
const IndexModel = require('../model/indexModel');

module.exports = {
    getData : function(id){

        https.get(`https://app.tenantturner.com/listings/group/${id}`, (resp) => {
            let data = '';

            // A chunk of data has been received.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', async () => {
                try {
                    // console.log(JSON.parse(data));
                    const dataArr = JSON.parse(data);
                    var newDataIds = [];
                    for (let i = 0; i < dataArr.length; i++) {
                        const data = new Model(dataArr[i]);
                        const indexData = new IndexModel({
                            id: dataArr[i].id,
                            companyName: dataArr[i].companyName,
                            address: dataArr[i].address,
                            city: dataArr[i].city,
                            state: dataArr[i].state,
                            zip: dataArr[i].zip
                        });
                        data._id = dataArr[i].id;
                        indexData._id = dataArr[i].id;
                        newDataIds.push(dataArr[i].id);
                        var doc = await Model.findOne({id: dataArr[i].id});
                        var indexDoc = await IndexModel.findOne({id: dataArr[i].id});

                        data.save();
                        indexData.save();
                        // await data.update( {upsert: true});
                    }

                    id++;
                    this.getData(id);
                }catch (e) {
                    console.log("Error: " + e);
                }
            });

        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
    }


    // getData : function(id){
    //
    //     https.get(`https://app.tenantturner.com/listings/group/${id}`, (resp) => {
    //         let data = '';
    //
    //         // A chunk of data has been received.
    //         resp.on('data', (chunk) => {
    //             data += chunk;
    //         });
    //
    //         // The whole response has been received. Print out the result.
    //         resp.on('end', async () => {
    //             try {
    //                 // console.log(JSON.parse(data));
    //                 const dataArr = JSON.parse(data);
    //                 var newDataIds = [];
    //                 for (let i = 0; i < dataArr.length; i++) {
    //                     const data = new Model(dataArr[i]);
    //                     const indexData = new IndexModel({
    //                         id: dataArr[i].id,
    //                         companyName: dataArr[i].companyName,
    //                         address: dataArr[i].address,
    //                         city: dataArr[i].city,
    //                         state: dataArr[i].state,
    //                         zip: dataArr[i].zip
    //                     });
    //                     data._id = dataArr[i].id;
    //                     indexData._id = dataArr[i].id;
    //                     newDataIds.push(dataArr[i].id);
    //                     var doc = await Model.findOne({id: dataArr[i].id});
    //                     var indexDoc = await IndexModel.findOne({id: dataArr[i].id});
    //
    //                     if (doc) {
    //                         Model.findOneAndUpdate({id: dataArr[i].id}, data);
    //                     }else {
    //                         data.save();
    //                     }
    //
    //                     if (indexDoc) {
    //                         IndexModel.findOneAndUpdate({id: dataArr[i].id}, indexData);
    //                     }else {
    //                         indexData.save();
    //                     }
    //                     // await data.update( {upsert: true});
    //                 }
    //
    //
    //                 const allIdList = await Model.find({},{ _id:1 });
    //                 var deletedIdList = [];
    //                 allIdList.forEach(function (item) {
    //                     if(!newDataIds.includes(item._id)){
    //                         deletedIdList.push(item._id);
    //                     }
    //                 })
    //
    //
    //                 if(deletedIdList.length !=0){
    //                     for (let i = 0; i < deletedIdList.length; i++) {
    //                         await Model.findByIdAndDelete(deletedIdList[i])
    //                         await IndexModel.findByIdAndDelete(deletedIdList[i])
    //                     }
    //                 }
    //
    //                 id++;
    //                 this.getData(id);
    //             }catch (e) {
    //                 console.log("Error: " + e);
    //             }
    //         });
    //
    //     }).on("error", (err) => {
    //         console.log("Error: " + err.message);
    //     });
    // }
}
