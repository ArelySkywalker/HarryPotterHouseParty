//var express = require("express");
//var getJSON = require("get-json");
var http = require("http");
var app = require("./app.js");

//var teamdata used to get created here, but now it gets created in the router
//that handles top-levels requests, routes/index.

//http.createServer(function (request, response) {
	////Send the HTTP header
	////HTTP status: 200: OK
	////Content type: text/html
	//response.writeHead(200, {'Content-Type': 'text/html'});

	////send the response body as "Hello World"
	////response.end('Hello World \n');
	
//}).listen(80);
app.listen(80, function() {
    console.log('server running at http://127.0.0.1:80');
});
