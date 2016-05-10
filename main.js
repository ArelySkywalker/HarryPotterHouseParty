//var express = require("express");
//var getJSON = require("get-json");
var http = require("http");
var app = require("./app.js");
//var teamdata = getJSON("./teamdata.json");
var users = [
    { name: 'Duncan',   email: 'duncan@email.com'},
    { name: 'Bob',  email: 'bob@email.com'}
];
//http.createServer(function (request, response) {
	////Send the HTTP header
	////HTTP status: 200: OK
	////Content type: text/html
	//response.writeHead(200, {'Content-Type': 'text/html'});

	////send the response body as "Hello World"
	////response.end('Hello World \n');
	
//}).listen(8081);
app.listen(8081, function() {
    console.log('server running at http://127.0.0.1:8081');
});
