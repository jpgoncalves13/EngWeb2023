var express = require('express')
var router = express.Router()
var Task = require('../controllers/task')


/* GET home page. */
router.get('/', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Task.list()
    .then(tasks => {
      res.render('index', { taskList: tasks, d: data})
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção da lista de tarefas."})
    })
})

/* GET edit task page. */
router.get('/edit/:id', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Task.getTask(req.params.id)
    .then(task => {
      Task.list()
        .then(tasks => {
          res.render('editTask', { taskList: tasks, editTask: task, d: data})
        })
        .catch(error => {
          res.render('error', {error: error, message: "Erro na obtenção na lista de tarefas."})
        })
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção da tarefa com id" + req.params.id + "para ser editada."})
    })
})

/* GET delete task page. */
router.get('/delete/:id', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Task.getTask(req.params.id)
    .then(task => {
      Task.list()
        .then(tasks => {
          res.render('deleteTask', { taskList: tasks, deleteTask: task, d: data})
        })
        .catch(error => {
          res.render('error', {error: error, message: "Erro na obtenção na lista de tarefas."})
        })
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção da tarefa com id" + req.params.id + "para ser apagada."})
    })
})

/* GET task done request. */
router.get('/done/:id', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Task.getTask(req.params.id)
    .then(task => {
      task["done"] = "1"
      Task.updateTask(task)
        .then(resposta => { 
          res.redirect('/')
        })
        .catch(error => {
          res.render('error', {error: error, message: "Erro na atualização da tarefa."})
        })
     })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção da lista de tarefas."})
    })
})

/* GET task undo request. */
router.get('/undo/:id', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Task.getTask(req.params.id)
    .then(task => {
      delete task["done"]
      Task.updateTask(task)
        .then(resposta => { 
            res.redirect('/')
          })
        .catch(error => {
          res.render('error', {error: error, message: "Erro na atualização da tarefa."})
        })
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção da lista de tarefas."})
    })
})


/* Post new task. */
router.post('/', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Task.addTask(req.body)
    .then(resposta => {
      res.redirect('/')
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na adição da tarefa."})
    })
})

/* Post edit task. */
router.post('/edit', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Task.updateTask(req.body)
    .then(resposta => {
      res.redirect('/')
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na atualização da tarefa."})
    })
})

/* Post delete task. */
router.post('/delete', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Task.deleteTask(req.body.id)
    .then(resposta => {
      res.redirect('/')
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na eliminação da tarefa."})
    })
})

module.exports = router;
