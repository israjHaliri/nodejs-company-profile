var http = require("http");
var routes = require("routes")();
var url = require("url");
var swig = require("swig");
var mysql = require("mysql");
var qString = require("querystring");
var fs = require("fs");
var express = require('express');
var app = express();
var path_project = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser')
var crypto = require('crypto');
var passwordHash = require('password-hash');
var multer = require('multer');
var fileupload = require('fileupload').createFileUpload('/public').middleware
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './public/image/landing_page' });
var fs_extra = require('fs-extra');
var redirect = require("express-redirect");
var flash = require('connect-flash');



var connection = mysql.createConnection({
	host:"localhost",
	port:3306,
	database:"testing",
	user:"root",
	password:"root"
});

module.exports = {
	http :http,
	routes : routes,
	url	: url,
	swig : swig,
	mysql : mysql,
	qString : qString,
	express : express,
	app : app,
	path_project : path_project,
	bodyParser : bodyParser,
	session : session,
	cookieParser : cookieParser,
	passwordHash : passwordHash,
	multer : multer,
	fileupload : fileupload,
	multipart : multipart,
	crypto : crypto,
	multipartMiddleware : multipartMiddleware,
	fs_extra : fs_extra,
	redirect : redirect,
	flash : flash,
	connection : connection
}

