var secrets = require('../config/secrets'),
	User = require('../models/user'),
	mongoose = require('mongoose');

module.exports = function (router) {

    var route = router.route('/users/:id');

    route.get(function(req, res) {
        User.findById(req.params.id, function(error, result) {
        	if(error) {
				res.status(500).send({
					message: 'Failed to get specific User',
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
    		email: req.body.email,
    		pendingTasks: req.body.pendingTasks
    	};

    	if(req.body.name == null) delete changes.name;
    	if(req.body.email == null) delete changes.email;
    	if(req.body.pendingTasks == null) delete changes.pendingTasks;

    	User.findByIdAndUpdate(req.params.id, {$set: changes}, function(error, result) {
    		if(error) {
				res.status(500).send({
					message: 'Failed to update specific User',
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

    route.delete(function(req, res) {
    	User.findByIdAndRemove(req.params.id, function(error, result) {
    		if(error) {
				res.status(500).send({
					message: 'Failed to delete specific User',
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