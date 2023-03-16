// form_server.js
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
                if(req.url == "/"){
                    getTasks()
                        .then(tasks => {
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(templates.indexPage(tasks[0], tasks[1], null, false, false, false, false, d))
                            res.end()
                        })
                        .catch(function(erro){
                            console.log(erro)
                        })   
                }
                else if(req.url == "/insertTask"){
                    getTasks()
                        .then(tasks => {
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(templates.indexPage(tasks[0], tasks[1], null, true, false, false, false, d))
                            res.end()
                        })
                        .catch(function(erro){
                            console.log(erro)
                        })   
                }
                else if(/\/editTask\/.*$/i.test(req.url)){
                    // Get aluno record
                    var idTask = req.url.split("/")[2] // pegar o id do aluno
                    
                    getTasks()
                        .then(tasks => {
                            axios.get('http://localhost:3000/tasks/' + idTask)
                                .then(response =>{
                                    var task_to_edit = response.data

                                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.write(templates.indexPage(tasks[0], tasks[1], task_to_edit, false, false, false, false, d))
                                    res.end()
                                })
                                .catch(function(erro){
                                    console.log(erro)
                                })
                        })
                        .catch(function(erro){
                            console.log(erro)
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
                                    res.write(templates.indexPage(tasks[0], tasks[1], null, false, false, true, false, d))
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
                else if(/\/done\/.*$/i.test(req.url)){
                    var idTask = req.url.split("/")[2]

                    axios.get('http://localhost:3000/tasks/'+idTask)
                        .then(resp1 => {
                            var task = resp1.data
                            task["done"] = "true"

                            axios.put('http://localhost:3000/tasks/'+idTask, task)
                                .then(resp2 => {
                                    getTasks()
                                        .then(tasks => {
                                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                            res.write(templates.indexPage(tasks[0], tasks[1], null, false, false, true, false, d))
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
                        })
                        .catch(erro => {
                            console.log(erro)
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
                    console.log("------")
                    console.log(req.data)
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.post("http://localhost:3000/tasks", result)
                                .then(resp => {
                                    console.log(resp.data)
                                    
                                    getTasks()
                                        .then(tasks => {
                                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                            res.write(templates.indexPage(tasks[0], tasks[1], null, false, true, false, false, d))
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
                            console.log(result)
                            axios.put("http://localhost:3000/tasks/" + result.id, result)
                                .then(resp => {
                                    console.log(resp)

                                    getTasks()
                                        .then(tasks => {
                                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                            res.write(templates.indexPage(tasks[0], tasks[1], null, false, false, false, true, d))
                                            res.end()
                                        })
                                        .catch(function(erro){
                                            console.log(erro)
                                        })  
                                })
                                .catch(error => {
                                    console.log('Erro: '+ error)

                                    res.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.end("<p>Unable to insert record</p>")  
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