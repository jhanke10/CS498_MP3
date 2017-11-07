var secrets = require('../config/secrets'),
	Task = require('../models/task'),
	mongoose = require('mongoose');

module.exports = function (router) {

    var route = router.route('/tasks/:id');

    route.get(function(req, res) {
        Task.findById(req.params.id, function(error, result) {
        	if(error) {
				res.status(500).send({
					message: 'Failed to get specific Task',
					data: []
				});
			} else if(result) {
				res.status(200).send({
					message: 'OK',
					data: result
				});
			} else {
				res.status(400).send({
					message: 'Page Not Found',
					data: []
				});
			}
        });
    });

    route.put(function(req, res) {
    	var changes = {
    		name: req.body.name,
    		description: req.body.description,
    		deadline: req.body.deadline,
    		completed: req.body.completed,
    		assignedUser: req.body.assignedUser,
    		assignedUserName: req.body.assignedUserName
    	};

    	Task.findByIdAndUpdate(req.params.id, {$set: changes}, function(error, result) {
    		if(error) {
				res.status(500).send({
					message: 'Failed to update specific Task',
					data: []
				});
			} else if(result) {
				res.status(200).send({
					message: 'OK',
					data: result
				});
			} else {
				res.status(400).send({
					message: 'Page Not Found',
					data: []
				});
			}
    	});
    });

    route.delete(function(req, res) {
    	Task.findByIdAndRemove(req.params.id, function(error, result) {
    		if(error) {
				res.status(500).send({
					message: 'Failed to delete specific Task',
					data: []
				});
			} else if(result) {
				res.status(200).send({
					message: 'OK',
					data: result
				});
			} else {
				res.status(400).send({
					message: 'Page Not Found',
					data: []
				});
			}
    	});
    });

    return router;
}