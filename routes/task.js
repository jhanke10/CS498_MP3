var secrets = require('../config/secrets'),
	Task = require('../models/task'),
	mongoose = require('mongoose');

//http://mongoosejs.com/docs/index.html
module.exports = function (router) {

    var route = router.route('/tasks');

    route.get(function(req, res) {
        
        var where = req.query.where != undefined ? JSON.parse(req.query.where) : undefined,
        	sort = req.query.sort != undefined ? JSON.parse(req.query.sort) : undefined,
        	select = req.query.select != undefined ? JSON.parse(req.query.select) : undefined,
        	skip = req.query.skip != undefined ? JSON.parse(req.query.skip) : undefined,
        	limit = req.query.limit != undefined ? JSON.parse(req.query.limit) : 100;
       		count = req.query.count != undefined ? req.query.count : false;

        if(count) {
        	Task.count(where)
        		.sort(sort)
        		.select(select)
        		.skip(skip)
        		.limit(limit)
        		.exec(function(error, result) {
        			if(error) {
        				res.status(500).send({
        					message: 'Failed to get Task count',
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
        	Task.find(where)
        		.sort(limit)
        		.select(select)
        		.skip(skip)
        		.limit(limit)
        		.exec(function(error, result) {
        			if(error) {
        				res.status(500).send({
        					message: 'Failed to get Task list',
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
    	var task = new Task({
    		name: req.body.name,
    		description: req.body.description,
    		deadline: req.body.deadline,
    		completed: req.body.completed,
    		assignedUser: req.body.assignedUser,
    		assignedUserName: req.body.assignedUserName
    	});

    	task.save(function(error, result) {
    		if(error) {
				res.status(500).send({
					message: 'Failed to create Task',
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