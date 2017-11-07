var secrets = require('../config/secrets'),
	Task = require('../models/task'),
	mongoose = require('mongoose');

// http://mongoosejs.com/docs/index.html
// https://books.google.com/books?id=8kTCAwAAQBAJ&pg=PA302&lpg=PA302&dq=what+happens+when+you+create+an+object+in+mongodb+without+all+requirements&source=bl&ots=Hg3fc4QHfG&sig=joXp3Lamo0QVHveBTFBiLHaQ6v8&hl=en&sa=X&ved=0ahUKEwil4rX1-qzXAhWp7YMKHfihDz0Q6AEIRDAF#v=onepage&q=what%20happens%20when%20you%20create%20an%20object%20in%20mongodb%20without%20all%20requirements&f=false
// https://stackoverflow.com/questions/14154337/how-to-send-a-custom-http-status-message-in-node-express
// https://d1b10bmlvqabco.cloudfront.net/attach/j6w8seisaez4gs/idkapl9ozos5l5/j8nr80duxen7/mongodbmongoose.png
// https://stackoverflow.com/questions/17007997/how-to-access-the-get-parameters-after-in-express
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
module.exports = function (router) {

    var route = router.route('/tasks');

    route.get(function(req, res) {
        
        var where = req.query.where != null ? JSON.parse(req.query.where) : null,
        	sort = req.query.sort != null ? JSON.parse(req.query.sort) : null,
        	select = req.query.select != null ? JSON.parse(req.query.select) : null,
        	skip = req.query.skip != null ? JSON.parse(req.query.skip) : null,
        	limit = req.query.limit != null ? JSON.parse(req.query.limit) : 100;
       		count = req.query.count != null ? req.query.count : false;

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
        		.sort(sort)
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