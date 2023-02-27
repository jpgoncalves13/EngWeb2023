var http = require('http')
var url = require('url')
var fs = require('fs')
const re = new RegExp("\/c[1-9][0-9]?[0-9]?")

var myServer = http.createServer(function(req, res) {
    console.log(req.method + " " + req.url)
    var pedido = url.parse(req.url, true).pathname

    if (pedido === '/') {
        fs.readFile("./Pages/index.html", function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            if(err){
                res.write("ERRO: na leitura do ficheiro :: " + err)
            }
            else {
                res.write(data)
            }
            res.end() 
            })
        }
    else if (pedido.match(re) != null){
        fs.readFile('./Pages' + pedido + '.html', function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
            if(err){
                res.write("ERRO: na leitura do ficheiro :: " + err)
            }
            else {
                res.write(data)
            }
            res.end() 
            })
        }
    else {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
        res.write("ERRO: pathname inválido")
        res.end()
    }
    }

).listen(7777)