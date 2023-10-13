const db = require("../models")
const Task = db.tasks;
const Op = db.Sequelize.Op;

// create amd save Task
exports.create = (req, res) => {
    // validation
    if(!req.body.task_name) {
        res.status(400).send({
            message: "Content can't be empty!"
        });
        return;
    }

    // create a task
    const task = { task_name: req.body.task_name, completed: false };
    
    // save in db
    Task.create(task).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Server error"
        })
    })
}

// get all tasks
exports.findAll = (req, res) => {
    const task_name = req.query.task_name;
    var condition = task_name ? { task_name: { [Op.like]: `%${task_name}%` } } : {};

    Task.findAll({where: condition }).then(data => res.send(data))
    .catch(err => {
        res.status(500).send({
            message: err.message || "Server error"
        })
    })
}

// get single task
exports.findOne = (req, res) => {
    const id = req.params.id;

    Task.findByPk(id).then(data => {
        if(data) {
            res.send(data);
        } else {
            res.status(404).send({
                message: `Cannot find task with id ${id}`
            })
        }
    })
}

// update task
exports.update = (req, res) => {
    const id = req.params.id;

    Task.update(req.body, {
        where: {id: id}
    }).then(num => {
        if(num[0] === 1){
            res.send({
                message: "Task updated successfully"
            })
        } else {
            res.send({
                message: "Cannot update task."
            })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Server error'
        })
    })
}

exports.markCompleted = (req, res) => {
    const id = req.params.id;

    Task.update({completed: true}, {
        where: {id: id}
    }).then(num => {
        if(num[0] === 1){
            res.send({
                message: "Task marked as completed."
            })
        } else {
            res.send({
                message: 'Could not mark task as completed'
            })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Server error'
        })
    })
}

// delete
exports.delete = (req, res) => {
    const id = req.params.id;

    Task.destroy({
        where: {id: id}
    }).then(num => {
        if(num === 1){
            res.send({
                message: "Task deleted successfully"
            })
        } else {
            res.send({
                message: "Could not delete task"
            })
        }
    }).catch(err => {
        res.status(500).send({
            message: 'Server error'
        })
    })
}

// delete all tasks
exports.deleteAll = (req, res) => {
    Task.destroy({
        where: {},
        truncate: false
    }).then(nums => {
        res.send({ message: `${nums} tasks were successfully deleted.`})
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Server error'
        })
    })
}

// get completed tasks
exports.getCompleted = (req, res) => {
    Task.findAll({where: { completed: true }}).then(data => {
        res.send(data)
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Server error'
        })
    })
}