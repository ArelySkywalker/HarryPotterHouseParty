//var express = require("express");
//var getJSON = require("get-json");
var http = require("http");
var app = require("./app.js");

app.listen(80, function() {
    console.log('server running at http://127.0.0.1:80');
});
