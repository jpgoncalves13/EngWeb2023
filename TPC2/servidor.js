var http = require('http')
var url = require('url')
var fs = require('fs')

var myServer = http.createServer(function(req, res) {
    console.log(req.method + " " + req.url)
    var pathname = req.
})