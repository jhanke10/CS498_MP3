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
				res.status(404).send({
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

    	//https://stackoverflow.com/questions/3455405/how-do-i-remove-a-key-from-a-javascript-object
    	// if(req.body.name == null) delete changes.name;
    	// if(req.body.description == null) delete changes.description;
    	// if(req.body.deadline == null) delete changes.deadline;
    	// if(req.body.completed == null) delete changes.completed;
    	// if(req.body.assignedUser == null) delete changes.assignedUser;
    	// if(req.body.assignedUserName == null) delete changes.assignedUserName;

    	//https://stackoverflow.com/questions/28104325/how-to-use-findbyidandupdate-on-mongodb2-4
    	Task.findByIdAndUpdate(req.params.id, {$set: changes}, {new: true}, function(error, result) {
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
				res.status(404).send({
					message: 'Page Not Found',
					data: []
				});
			}
    	});
    });

    return router;
}