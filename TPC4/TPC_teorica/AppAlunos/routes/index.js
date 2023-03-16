var express = require('express');
var router = express.Router();
var Aluno = require('../controllers/aluno')

/* GET home page. */
router.get('/', function(req, res, next) {
  var data = new Date().toISOString().substring(0,16)
  Aluno.getAluno(req.params.idAluno)
  .then(alunos => {
    res.render('index', {slist: alunos, d: data }); //recebe a template que vai usar, e um dicionário que vai usar com os dados
  })
  .catch(erro => {
    res.render('error',{error:erro, message: "Erro na obtenção do registo do aluno"})
  })
});

module.exports = router;
