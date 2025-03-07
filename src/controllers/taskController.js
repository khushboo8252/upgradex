const Task = require('../models/taskModel');

exports.addTask = async (req, res) => {
    try {
        const task = await Task.create({ ...req.body, user: req.user.id });
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getTasks = async (req, res) => {
    const tasks = req.query.category_id
        ? await Task.find({ category: req.query.category_id })
        : await Task.find();
    res.json(tasks);
};

exports.getTask = async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.json(task);
};

exports.updateTask = async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
};

exports.deleteTask = async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
};
