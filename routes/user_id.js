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

    	var changes = {};

    	if(req.body.name != undefined) changes.push({[name] : req.body.name});
    	if(req.body.email != undefined) changes.push({[email] : req.body.email});
    	if(req.body.pendingTasks != undefined) changes.push({[pendingTasks] : req.body.pendingTasks});

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