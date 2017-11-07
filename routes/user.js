var secrets = require('../config/secrets'),
	User = require('../models/user'),
	mongoose = require('mongoose');

module.exports = function (router) {

    var route = router.route('/users');

    route.get(function(req, res) {
        
        var where = req.query.where != undefined ? JSON.parse(req.query.where) : undefined,
        	sort = req.query.sort != undefined ? JSON.parse(req.query.sort) : undefined,
        	select = req.query.select != undefined ? JSON.parse(req.query.select) : undefined,
        	skip = req.query.skip != undefined ? JSON.parse(req.query.skip) : undefined,
        	limit = req.query.limit != undefined ? JSON.parse(req.query.limit) : 100;
       		count = req.query.count != undefined ? req.query.count : false;

        if(count) {
        	User.count(where)
        		.sort(sort)
        		.select(select)
        		.skip(skip)
        		.limit(limit)
        		.exec(function(error, result) {
        			if(error) {
        				res.status(500).send({
        					message: 'Failed to get User count',
        					data: []
        				});
        			} else {
        				res.status(200).send({
        					message: 'OK',
        					data: result
        				});
        			}
        		});
        } else {
        	User.find(where)
        		.sort(sort)
        		.select(select)
        		.skip(skip)
        		.limit(limit)
        		.exec(function(error, result) {
        			if(error) {
        				res.status(500).send({
        					message: 'Failed to get User list',
        					data: []
        				});
        			} else {
        				res.status(200).send({
        					message: 'OK',
        					data: result
        				});
        			}
        		});
        }
    });

    route.post(function(req, res) {
    	var user = new User({
    		name: req.body.name,
    		email: req.body.email
    	});

    	user.save(function(error, result) {
    		if(error) {
				res.status(500).send({
					message: 'Failed to create User',
					data: []
				});
			} else {
				res.status(201).send({
					message: 'OK',
					data: result
				});
			}
    	});
    });

    return router;
}
