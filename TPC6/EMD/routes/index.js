var express = require('express');
var router = express.Router();
var Exame = require('../controllers/emd');

/* GET home page. */
router.get('/emd', function(req, res) {
  Exame.list()
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(520).json({erro: erro, mensagem: "Não consegui obter a lista de Exames."}))
});

router.get('/emd/modalidades', function(req, res, next) {
  Exame.getModalidades()
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(522).json({erro: erro, mensagem: 'Não foi possível obter as modalidades dos atletas.'}))
})

router.get('/emd/atletas', function(req, res, next) {
  Exame.getAtletas()
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(522).json({erro: erro, mensagem: 'Não foi possível obter os nomes dos atletas.'}))
})

router.get('/emd/aptos', function(req, res, next) {
  Exame.getAptos()
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(522).json({erro: erro, mensagem: 'Não foi possível obter o número de records dos atletas.'}))
})

router.get('/emd/:id', (req,res) => {
  Exame.getExame(req.params._id)
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(521).json({erro: erro, mensagem: "Não consegui obter o exame."}))
})

router.post('/emd', (req,res) => {
  Exame.addExame(req.body)
    .then(dados => res.status(201).json(dados))
    .catch(erro => res.status(522).json({erro: erro, mensagem: "Não consegui inserir o exame."}))
})

router.put('/emd/:id', (req,res) => {
  Exame.updateExame(req.body)
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(523).json({erro: erro, mensagem: "Não consegui alterar o exame."}))
})

router.delete('/emd/:id', (req,res) => {
  Exame.deleteExame(req.params._id)
    .then(dados => res.status(200).json(dados))
    .catch(erro => res.status(524).json({erro: erro, mensagem: "Não consegui apagar o exame."}))
})


module.exports = router;
