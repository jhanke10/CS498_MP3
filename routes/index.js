/*
 * Connect all of your endpoints together here.
 */
module.exports = function (app, router) {
    app.use('/api', require('./home.js')(router));
    app.use('/api/users', require('./user.js')(router));
    app.use('/api/users/:id', require('./user_id.js')(router));
    app.use('/api/tasks', require('./task.js')(router));
    app.use('/api/tasks/:id', require('./task_id.js')(router));
};
