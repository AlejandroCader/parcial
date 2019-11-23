const express = require("express");
const router = express.Router();
const Task = require("../model/task");

router.get("/", (req, res) => {
  const tasks = Task.find();
  res.render("index", {
    tasks
  });
});

router.post("/add", (req, res, next) => {
  const task = new Task(req.body);
  task.save();
  res.redirect("/");
});

router.get("/turn/:id", (req, res, next) => {
  let { id } = req.params;
  const task = Task.findById(id);
  task.status = !task.status;
  task.save();
  res.redirect("/");
});

router.get("/edit/:id", (req, res, next) => {
  const task = Task.findById(req.params.id);
  console.log(task);
  res.render("edit", { task });
});

router.post("/edit/:id", (req, res, next) => {
  const { id } = req.params;
  Task.update({ _id: id }, req.body);
  res.redirect("/");
});

router.get("/delete/:id", (req, res, next) => {
  let { id } = req.params;
  Task.remove({ _id: id });
  res.redirect("/");
});

module.exports = router;
