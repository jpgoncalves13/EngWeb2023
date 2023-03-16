// alunos_server.js
// RPCW2023: 2023-03-05
// by jcr

var http = require('http')
var axios = require('axios')
var templates = require('./templates')
var static = require('./static.js')
const { parse } = require('querystring');

// Aux functions
function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

function getTasks(){
    return axios.get("http://localhost:3000/tasks")
        .then(response => {
            var tasks = response.data

            test = axios.get("http://localhost:3000/users")
                .then(response => {
                    var users = response.data

                    var users_dict = {}
                    for(let user of users){
                        users_dict[user.id] = user
                    }

                    for(let task of tasks){
                        task.who = users_dict[task.who].name
                    }

                    already_done = []
                    to_be_done = []

                    for(let task of tasks){
                        if(task.done == "false"){
                            already_done.push(task)
                        }
                        else{
                            to_be_done.push(task)
                        }
                    }

                    return [already_done, to_be_done]
                })
                .catch(function(erro){
                    console.log(erro)
                })
            // Render page with the student's list
            return test
        })
        .catch(function(erro){
            console.log(erro)
        })
}

// Server creation

var alunosServer = http.createServer(function (req, res) {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Handling request
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET":
                getTasks()
                    .then(tasks => {
                        let test = [1, 2, 3]
                        console.log(test)
                        console.log(tasks[0])
                    })
                // GET /alunos --------------------------------------------------------------------
                if(req.url == "/"){
                    getTasks()
                        .then(tasks => {
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(templates.indexPage(tasks[0], tasks[1], false, false, false, d))
                            res.end()
                        })
                        .catch(function(erro){
                            console.log(erro)
                        })
                }
                // GET /alunos/:id --------------------------------------------------------------------
                else if(/\/alunos\/(A|PG)[0-9]+$/i.test(req.url)){
                    var idAluno = req.url.split("/")[2]
                    axios.get("http://localhost:3000/alunos/" + idAluno)
                        .then( response => {
                            let a = response.data
                            // Add code to render page with the student record
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.end(templates.studentPage(a, d))
                        })
                }
                // GET /alunos/registo --------------------------------------------------------------------
                else if(req.url == "/insertTask"){
                    getTasks()
                        .then(tasks => {
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(templates.indexPage(tasks[0], tasks[1], true, false, false, d))
                            res.end()
                        })
                        .catch(function(erro){
                            console.log(erro)
                        })
                }
                // GET /alunos/edit/:id --------------------------------------------------------------------
                else if(/\/editTask\/.*$/i.test(req.url)){
                    // Get aluno record
                    var idTask = req.url.split("/")[2] // pegar o id do aluno

                    axios.get('http://localhost:3000/alunos/' + idAluno)
                    .then(function(resp){
                        var aluno = resp.data

                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.end(templates.studentFormEditPage(aluno, d))
                    })
                    .catch(erro => {
                        console.log("Erro: " + erro)

                        res.writeHead(404, {'Content-Type': 'text/html;charset=utf-8'})
                        res.end(templates.errorPage("Unable to collect record: " + idAluno, d))
                    })
                }
                else if(/\/deleteTask\/.*$/i.test(req.url)){
                    // Get aluno record
                    var idTask = req.url.split("/")[2] // pegar o id do aluno

                    axios.delete('http://localhost:3000/tasks/'+idTask)
                        .then(function(resp){
                            console.log("Delete" + idTask + " :: " + resp.status)

                            getTasks()
                                .then(tasks => {
                                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.write(templates.indexPage(tasks[0], tasks[1], false, false, true, d))
                                    res.end()
                                })
                                .catch(function(erro){
                                    console.log(erro)
                                })
                        })
                        .catch(erro => {
                            console.log("Erro: " + erro)

                            res.writeHead(404, {'Content-Type': 'text/html;charset=utf-8'})
                            res.end('<p>Unable to delete record: ' + idTask)
                        })
                }
                else{
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write("<p>" + req.method + " " + req.url + " unsupported on this server.</p>")
                    res.end()
                }
                break
            case "POST":
                if(req.url == '/insertTask'){
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.post("http://localhost:3000/tasks", result)
                            .then(resp => {
                                console.log(resp.data)

                                getTasks()
                                    .then(tasks => {
                                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                        res.write(templates.indexPage(already_done, to_be_done, false, true, false, d))
                                        res.end()
                                    })
                                    .catch(function(erro){
                                        console.log(erro)
                                    })
                            })
                            .catch(error => {
                                console.log('Erro: '+ error)

                                res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write("<p>Unable to collect data from body...</p>")
                                res.end()
                            });
                        }
                        else{
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                    })
                }
                else if(/\/editTask\/.*$/i.test(req.url)){
                    collectRequestBodyData(req, result => {
                        if(result){
                            console.dir(result)

                            axios.put("http://localhost:3000/alunos/" + result.id, result)
                            .then(resp => {
                                console.log(resp.data)

                                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                // res.write(studentFormPage(d))
                                res.end('<p>Registo alterado' + JSON.stringify(resp.data) + '</p>')
                            })
                            .catch(error => {
                                console.log('Erro: '+ error)

                                res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'})
                                res.end(templates.errorPage("Unable to insert record...", d))
                            });
                        }
                        else{
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                    });
                }
                else{
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write('<p>Unsupported POST request: ' + req.url + '</p>')
                    res.write('<p><a href="/">Return</a></p>')
                    res.end()
                }
                break
            default:
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p>" + req.method + " unsupported in this server.</p>")
                res.end()
        }
    }

})

alunosServer.listen(7777, ()=>{
    console.log("Servidor à escuta na porta 7777...")
})
