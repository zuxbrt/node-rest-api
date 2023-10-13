module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("task", {
        task_name: {
          type: Sequelize.STRING
        },
        completed: {
          type: Sequelize.BOOLEAN
        }
      });
    
    return Task;
}