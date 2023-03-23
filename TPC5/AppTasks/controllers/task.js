var axios = require('axios')

// Get the tasks list
module.exports.list = () => {
    return axios.get('http://localhost:3000/tasks?_sort=nome')
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })
}

// Get task by id
module.exports.getTask = id => {
    return axios.get('http://localhost:3000/tasks/' + id)
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })
}

// Add a new task
module.exports.addTask = t => {
    return axios.post('http://localhost:3000/tasks', t)
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })
}

// Update a task
module.exports.updateTask = t => {
    return axios.put('http://localhost:3000/tasks/' + t.id, t)
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })
}

// Delete a task
module.exports.deleteTask = id => {
    return axios.delete('http://localhost:3000/tasks/' + id)
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })
}
