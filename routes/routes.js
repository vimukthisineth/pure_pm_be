const express = require('express');
const Model = require('../model/model');
const IndexModel = require('../model/indexModel');
const router = express.Router();

//Post Method
router.post('/post', async (req, res) => {
    const data = new Model(req.body)
    console.log(data);

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.post('/filter', async (req, res) => {
    try {
        const filterDto = req.body;
        if (!filterDto.email) {
            filterDto.email = '';
        }
        if (!filterDto.companyName) {
            filterDto.companyName = '';
        }
        if (!filterDto.phone) {
            filterDto.phone = '';
        }
        if (!filterDto.propertyType) {
            filterDto.propertyType = '';
        }
        if (!filterDto.address) {
            filterDto.address = '';
        }
        if (!filterDto.city) {
            filterDto.city = '';
        }
        if (!filterDto.state) {
            filterDto.state = '';
        }
        if (!filterDto.zip) {
            filterDto.zip = '';
        }
        if (!filterDto.title) {
            filterDto.title = '';
        }
        if (!filterDto.description) {
            filterDto.description = '';
        }
        if (!filterDto.bathsMin) {
            filterDto.bathsMin = 0.01;
        }
        if (!filterDto.bathsMax) {
            filterDto.bathsMax = 100;
        }
        if (!filterDto.bedsMin) {
            filterDto.bedsMin = 0.01;
        }
        if (!filterDto.bedsMax) {
            filterDto.bedsMax = 100;
        }
        if (!filterDto.rentMin) {
            filterDto.rentMin = 0.01;
        }
        if (!filterDto.rentMax) {
            filterDto.rentMax = 100000;
        }
        if(!filterDto.cats){
            filterDto.cats = 'false';
        }
        if(!filterDto.dogs){
            filterDto.dogs = 'false';
        }
        console.log(filterDto);
        let responseData = [];
        if (filterDto.startDate && filterDto.endDate) {
            const data = await Model.find(
                {$and :
                        [
                            { "companyName" : { $regex: '.*' + filterDto.companyName.toLowerCase() + '.*', $options : 'i' } },
                            { "email" : { $regex: '.*' + filterDto.email.toLowerCase() + '.*', $options : 'i' } },
                            { "phone" : { $regex: '.*' + filterDto.phone + '.*', $options : 'i' } },
                            { "address" : { $regex: '.*' + filterDto.address.toLowerCase() + '.*', $options : 'i' } },
                            { "city" : { $regex: '.*' + filterDto.city.toLowerCase() + '.*', $options : 'i' } },
                            { "state" : { $regex: '.*' + filterDto.state.toLowerCase() + '.*', $options : 'i' } },
                            { "zip" : { $regex: '.*' + filterDto.zip + '.*', $options : 'i' } },
                            { "title" : { $regex: '.*' + filterDto.title.toLowerCase() + '.*', $options : 'i' } },
                            { "description" : { $regex: '.*' + filterDto.description.toLowerCase() + '.*', $options : 'i' } },
                            {"$expr" : {"$gt" : [{"$toDouble" :"$rentAmount"} , filterDto.rentMin]}},
                            {"$expr" : {"$lt" : [{"$toDouble" :"$rentAmount"} , filterDto.rentMax]}},
                            { "baths" : { $lt: filterDto.bathsMax } },
                            { "baths" : { $gt: filterDto.bathsMin } },
                            { "beds" : { $lt: filterDto.bedsMax } },
                            { "beds" : { $gt: filterDto.bedsMin } },
                            { "cats" : { $eq: filterDto.cats } },
                            { "dogs" : { $eq: filterDto.dogs } },
                            {"$expr" : {"$gte" : [
                                {
                                    $dateFromString: {
                                        dateString: "$dateAvailable",
                                        format: "%m/%d/%Y"
                                    }
                                },
                                {
                                    $dateFromString: {
                                    dateString: filterDto.startDate,
                                    format: "%m/%d/%Y"
                                }
                                        }
                                    ]}},
                            {"$expr" : {"$lt" : [
                                {
                                    $dateFromString: {
                                        dateString: "$dateAvailable",
                                        format: "%m/%d/%Y"
                                    }
                                },
                                {
                                    $dateFromString: {
                                        dateString: filterDto.endDate,
                                        format: "%m/%d/%Y"
                                    }
                                }
                                    ]}},
                        ]
                })
                .then(function (data, err) {
                    console.log('error',err);
                    responseData = data;
                });
            res.json(responseData);
        }else {
            const data = await Model.find(
                {$and :
                        [
                            { "companyName" : { $regex: '.*' + filterDto.companyName.toLowerCase() + '.*', $options : 'i' } },
                            { "email" : { $regex: '.*' + filterDto.email.toLowerCase() + '.*', $options : 'i' } },
                            { "phone" : { $regex: '.*' + filterDto.phone + '.*', $options : 'i' } },
                            { "address" : { $regex: '.*' + filterDto.address.toLowerCase() + '.*', $options : 'i' } },
                            { "city" : { $regex: '.*' + filterDto.city.toLowerCase() + '.*', $options : 'i' } },
                            { "state" : { $regex: '.*' + filterDto.state.toLowerCase() + '.*', $options : 'i' } },
                            { "zip" : { $regex: '.*' + filterDto.zip + '.*', $options : 'i' } },
                            { "title" : { $regex: '.*' + filterDto.title.toLowerCase() + '.*', $options : 'i' } },
                            { "description" : { $regex: '.*' + filterDto.description.toLowerCase() + '.*', $options : 'i' } },
                            {"$expr" : {"$gt" : [{"$toDouble" :"$rentAmount"} , filterDto.rentMin]}},
                            {"$expr" : {"$lt" : [{"$toDouble" :"$rentAmount"} , filterDto.rentMax]}},
                            { "baths" : { $lt: filterDto.bathsMax } },
                            { "baths" : { $gt: filterDto.bathsMin } },
                            { "beds" : { $lt: filterDto.bedsMax } },
                            { "beds" : { $gt: filterDto.bedsMin } },
                            { "cats" : { $eq: filterDto.cats } },
                            { "dogs" : { $eq: filterDto.dogs } },
                        ]
                })
                .then(function (data, err) {
                    console.log('error',err);
                    responseData = data;
                });
            res.json(responseData);
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/filterAddress', async (req, res) => {
    try {
        const filterDto = req.body;
        if (!filterDto.email) {
            filterDto.email = '';
        }
        if (!filterDto.address) {
            filterDto.address = '';
        }
        if (!filterDto.city) {
            filterDto.city = '';
        }
        if (!filterDto.zip) {
            filterDto.zip = '';
        }
        if (!filterDto.companyName) {
            filterDto.companyName = '';
        }
        if (!filterDto.phone) {
            filterDto.phone = '';
        }
        if (!filterDto.propertyType) {
            filterDto.propertyType = '';
        }
        if (!filterDto.addressKey) {
            filterDto.addressKey = '';
        }else {
            if (filterDto.addressKey.includes(', ')) {
                filterDto.city = filterDto.addressKey.split(', ')[0];
                filterDto.state = filterDto.addressKey.split(', ')[1];
            }else{
                filterDto.city = filterDto.addressKey;
                filterDto.state = filterDto.addressKey;
                filterDto.address = filterDto.addressKey;
                filterDto.zip = filterDto.addressKey;
            }
        }

        if (!filterDto.state) {
            filterDto.state = '';
        }
        if (!filterDto.title) {
            filterDto.title = '';
        }
        if (!filterDto.description) {
            filterDto.description = '';
        }
        if (!filterDto.bathsMin) {
            filterDto.bathsMin = 0.01;
        }
        if (!filterDto.bathsMax) {
            filterDto.bathsMax = 100;
        }
        if (!filterDto.bedsMin) {
            filterDto.bedsMin = 0.01;
        }
        if (!filterDto.bedsMax) {
            filterDto.bedsMax = 100;
        }
        if (!filterDto.rentMin) {
            filterDto.rentMin = 0.01;
        }else{
            filterDto.rentMin =  filterDto.rentMin - 0.01;
        }
        if (!filterDto.rentMax) {
            filterDto.rentMax = 100000;
        }else{
            filterDto.rentMax = filterDto.rentMax + 0.01;
        }
        if(!filterDto.cats){
            filterDto.cats = '';
        }
        if(!filterDto.dogs){
            filterDto.dogs = '';
        }
        if (!filterDto.latFrom) {
            filterDto.latFrom = -90;
        }
        if (!filterDto.latTo) {
            filterDto.latTo = 90;
        }
        if (!filterDto.lngFrom) {
            filterDto.lngFrom = -180;
        }
        if (!filterDto.lngTo) {
            filterDto.lngTo = 180;
        }
        if (!filterDto.limit) {
            filterDto.limit = 100000;
        }
        console.log(filterDto);
        let responseData = [];
        if (filterDto.startDate && filterDto.endDate) {
            if (filterDto.addressKey.includes(', ')) {
                const data = await Model.find(
                    {$and :
                            [
                                { "companyName" : { $regex: '.*' + filterDto.companyName.toLowerCase() + '.*', $options : 'i' } },
                                { "email" : { $regex: '.*' + filterDto.email.toLowerCase() + '.*', $options : 'i' } },
                                { "phone" : { $regex: '.*' + filterDto.phone + '.*', $options : 'i' } },
                                { "city" : { $regex: '.*' + filterDto.city + '.*', $options : 'i' } },
                                { "state" : { $regex: '.*' + filterDto.state + '.*', $options : 'i' } },
                                { "title" : { $regex: '.*' + filterDto.title.toLowerCase() + '.*', $options : 'i' } },
                                { "description" : { $regex: '.*' + filterDto.description.toLowerCase() + '.*', $options : 'i' } },
                                {"$expr" : {"$gt" : [{"$toDouble" :"$rentAmount"} , filterDto.rentMin]}},
                                {"$expr" : {"$lt" : [{"$toDouble" :"$rentAmount"} , filterDto.rentMax]}},
                                { "baths" : { $lt: filterDto.bathsMax } },
                                { "baths" : { $gt: filterDto.bathsMin } },
                                { "beds" : { $lt: filterDto.bedsMax } },
                                { "beds" : { $gt: filterDto.bedsMin } },
                                { "latitude" : { $lt: filterDto.latTo } },
                                { "latitude" : { $gt: filterDto.latFrom } },
                                { "longitude" : { $lt: filterDto.lngTo } },
                                { "longitude" : { $gt: filterDto.lngFrom } },
                                { "cats" : { $regex: '.*' + filterDto.cats + '.*', $options : 'i' } },
                                { "dogs" : { $regex: '.*' + filterDto.dogs + '.*', $options : 'i' } },
                                {"$expr" : {"$gte" : [
                                            {
                                                $dateFromString: {
                                                    dateString: "$dateAvailable",
                                                    format: "%m/%d/%Y"
                                                }
                                            },
                                            {
                                                $dateFromString: {
                                                    dateString: filterDto.startDate,
                                                    format: "%m/%d/%Y"
                                                }
                                            }
                                        ]}},
                                {"$expr" : {"$lt" : [
                                            {
                                                $dateFromString: {
                                                    dateString: "$dateAvailable",
                                                    format: "%m/%d/%Y"
                                                }
                                            },
                                            {
                                                $dateFromString: {
                                                    dateString: filterDto.endDate,
                                                    format: "%m/%d/%Y"
                                                }
                                            }
                                        ]}},
                            ]
                    }).limit(filterDto.limit)
                    .then(function (data, err) {
                        console.log('error',err);
                        console.log('data',data);
                        responseData = data;
                    });

                res.json(responseData);


            }else {
                const data = await Model.find(
                    {$and :
                            [
                                { "companyName" : { $regex: '.*' + filterDto.companyName.toLowerCase() + '.*', $options : 'i' } },
                                { "email" : { $regex: '.*' + filterDto.email.toLowerCase() + '.*', $options : 'i' } },
                                { "phone" : { $regex: '.*' + filterDto.phone + '.*', $options : 'i' } },
                                {
                                    $or : [
                                        { "address" : { $regex: '.*' + filterDto.address.toLowerCase() + '.*', $options : 'i' } },
                                        { "city" : { $regex: '.*' + filterDto.city.toLowerCase() + '.*', $options : 'i' } },
                                        { "zip" : { $regex: '.*' + filterDto.zip.toLowerCase() + '.*', $options : 'i' } },
                                        { "state" : { $regex: '.*' + filterDto.state.toLowerCase() + '.*', $options : 'i' } }
                                    ]
                                },
                                { "title" : { $regex: '.*' + filterDto.title.toLowerCase() + '.*', $options : 'i' } },
                                { "description" : { $regex: '.*' + filterDto.description.toLowerCase() + '.*', $options : 'i' } },
                                {"$expr" : {"$gt" : [{"$toDouble" :"$rentAmount"} , filterDto.rentMin]}},
                                {"$expr" : {"$lt" : [{"$toDouble" :"$rentAmount"} , filterDto.rentMax]}},
                                { "baths" : { $lt: filterDto.bathsMax } },
                                { "baths" : { $gt: filterDto.bathsMin } },
                                { "beds" : { $lt: filterDto.bedsMax } },
                                { "beds" : { $gt: filterDto.bedsMin } },
                                { "latitude" : { $lt: filterDto.latTo } },
                                { "latitude" : { $gt: filterDto.latFrom } },
                                { "longitude" : { $lt: filterDto.lngTo } },
                                { "longitude" : { $gt: filterDto.lngFrom } },
                                { "cats" : { $regex: '.*' + filterDto.cats + '.*', $options : 'i' } },
                                { "dogs" : { $regex: '.*' + filterDto.dogs + '.*', $options : 'i' } },
                                {"$expr" : {"$gte" : [
                                            {
                                                $dateFromString: {
                                                    dateString: "$dateAvailable",
                                                    format: "%m/%d/%Y"
                                                }
                                            },
                                            {
                                                $dateFromString: {
                                                    dateString: filterDto.startDate,
                                                    format: "%m/%d/%Y"
                                                }
                                            }
                                        ]}},
                                {"$expr" : {"$lt" : [
                                            {
                                                $dateFromString: {
                                                    dateString: "$dateAvailable",
                                                    format: "%m/%d/%Y"
                                                }
                                            },
                                            {
                                                $dateFromString: {
                                                    dateString: filterDto.endDate,
                                                    format: "%m/%d/%Y"
                                                }
                                            }
                                        ]}},
                            ]
                    }).limit(filterDto.limit)
                    .then(function (data, err) {
                        console.log('error',err);
                        console.log('data',data);
                        responseData = data;
                    });

                res.json(responseData);

            }
        }else {
            if (filterDto.addressKey.includes(', ')) {
                const data = await Model.find(
                    {$and :
                            [
                                { "companyName" : { $regex: '.*' + filterDto.companyName.toLowerCase() + '.*', $options : 'i' } },
                                { "email" : { $regex: '.*' + filterDto.email.toLowerCase() + '.*', $options : 'i' } },
                                { "phone" : { $regex: '.*' + filterDto.phone + '.*', $options : 'i' } },
                                { "city" : { $regex: '.*' + filterDto.city + '.*', $options : 'i' } },
                                { "state" : { $regex: '.*' + filterDto.state + '.*', $options : 'i' } },
                                { "title" : { $regex: '.*' + filterDto.title.toLowerCase() + '.*', $options : 'i' } },
                                { "description" : { $regex: '.*' + filterDto.description.toLowerCase() + '.*', $options : 'i' } },
                                {"$expr" : {"$gt" : [{"$toDouble" :"$rentAmount"} , filterDto.rentMin]}},
                                {"$expr" : {"$lt" : [{"$toDouble" :"$rentAmount"} , filterDto.rentMax]}},
                                { "baths" : { $lt: filterDto.bathsMax } },
                                { "baths" : { $gt: filterDto.bathsMin } },
                                { "beds" : { $lt: filterDto.bedsMax } },
                                { "beds" : { $gt: filterDto.bedsMin } },
                                { "latitude" : { $lt: filterDto.latTo } },
                                { "latitude" : { $gt: filterDto.latFrom } },
                                { "longitude" : { $lt: filterDto.lngTo } },
                                { "longitude" : { $gt: filterDto.lngFrom } },
                                { "cats" : { $regex: '.*' + filterDto.cats + '.*', $options : 'i' } },
                                { "dogs" : { $regex: '.*' + filterDto.dogs + '.*', $options : 'i' } },
                            ]
                    }).limit(filterDto.limit)
                    .then(function (data, err) {
                        console.log('error',err);
                        responseData = data;
                    });

                res.json(responseData);

            }else {
                const data = await Model.find(
                    {$and :
                            [
                                { "companyName" : { $regex: '.*' + filterDto.companyName.toLowerCase() + '.*', $options : 'i' } },
                                { "email" : { $regex: '.*' + filterDto.email.toLowerCase() + '.*', $options : 'i' } },
                                { "phone" : { $regex: '.*' + filterDto.phone + '.*', $options : 'i' } },
                                {
                                    $or : [
                                        { "address" : { $regex: '.*' + filterDto.addressKey.toLowerCase() + '.*', $options : 'i' } },
                                        { "city" : { $regex: '.*' + filterDto.addressKey.toLowerCase() + '.*', $options : 'i' } },
                                        { "zip" : { $regex: '.*' + filterDto.addressKey.toLowerCase() + '.*', $options : 'i' } },
                                        { "state" : { $regex: '.*' + filterDto.addressKey.toLowerCase() + '.*', $options : 'i' } }
                                    ]
                                },
                                { "title" : { $regex: '.*' + filterDto.title.toLowerCase() + '.*', $options : 'i' } },
                                { "description" : { $regex: '.*' + filterDto.description.toLowerCase() + '.*', $options : 'i' } },
                                {"$expr" : {"$gt" : [{"$toDouble" :"$rentAmount"} , filterDto.rentMin]}},
                                {"$expr" : {"$lt" : [{"$toDouble" :"$rentAmount"} , filterDto.rentMax]}},
                                { "baths" : { $lt: filterDto.bathsMax } },
                                { "baths" : { $gt: filterDto.bathsMin } },
                                { "beds" : { $lt: filterDto.bedsMax } },
                                { "beds" : { $gt: filterDto.bedsMin } },
                                { "latitude" : { $lt: filterDto.latTo } },
                                { "latitude" : { $gt: filterDto.latFrom } },
                                { "longitude" : { $lt: filterDto.lngTo } },
                                { "longitude" : { $gt: filterDto.lngFrom } },
                                { "cats" : { $regex: '.*' + filterDto.cats + '.*', $options : 'i' } },
                                { "dogs" : { $regex: '.*' + filterDto.dogs + '.*', $options : 'i' } },
                            ]
                    }).limit(filterDto.limit)
                    .then(function (data, err) {
                        console.log('error',err);
                        responseData = data;
                    });

                res.json(responseData);

            }
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Get all Method
router.get('/getAll', async (req, res) => {
    try {
        // const data = await Model.find();
        let responseData = [];
        var colName="companyName";
            const data = await Model.find({ "a" : { $regex: '.*' + colName + '.*', $options : 'i' } })
            .then(function (data, err) {
                console.log('error',err);
                console.log('data',data);
                responseData = data;
            });
        res.json(responseData)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Get all Method
router.get('/getAllIndex', async (req, res) => {
    try {
        // const data = await Model.find();
        let responseData = [];
        var colName="companyName";
        const data = await IndexModel.find()
            .then(function (data, err) {
                console.log('error',err);
                console.log('data',data);
                responseData = data;
            });
        res.json(responseData)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
    try {
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Update by ID Method
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;
