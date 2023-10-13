module.exports = app => {
    const tasks = require("../controllers/task.controller.js");
    var router = require("express").Router();

    router.get("/status", (req, res) => {
        res.send({
            "Status": 200
        });
    });

    // create task
    router.post('/', tasks.create)

    // get all tasks
    router.get('/', tasks.findAll)

    // get all completed tasks
    router.get('/completed', tasks.getCompleted)

    // get single task by id
    router.get('/:id', tasks.findOne)

    // update task
    router.put('/:id', tasks.update);

    // mark task as completed
    router.put('/markcompleted/:id', tasks.markCompleted);

    // delete a task
    router.delete('/:id', tasks.delete);

    // delete all tasks
    router.delete('/', tasks.deleteAll)

    app.use('/api/tasks', router)
}