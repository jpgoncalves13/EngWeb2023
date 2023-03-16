var axios = require('axios')

//Student list
module.exports.list = () => {
    return axios.get('http://localhost:3000/alunos?_sort=nome')
        .then(resposta =>{
            return resposta.data
        })
        .catch(erro =>{
            return erro
        })
}

module.exports.getAluno = id => {
    return axios.get('http://localhost:3000/alunos/' + id)
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })
}