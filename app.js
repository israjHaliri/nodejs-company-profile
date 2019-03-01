var config = require("./resources/config.js");

config.app.use(config.express.static(config.path_project.join(__dirname, '/public')));
config.app.use("/backend", config.express.static(__dirname + '/public'));
config.app.use("/public", config.express.static(__dirname + '/public'));

config.app.use(config.bodyParser.json()); // support json encoded bodies
config.app.use(config.bodyParser.urlencoded({
	extended: true
}));
config.app.set('view engine', 'ejs');
config.app.use(config.cookieParser())
config.app.use(config.session({
	secret: "israjHaliri",
	resave: true,
	saveUninitialized: true
}));
config.app.use(config.flash());
const isset = require('isset');



var module_home_js = require("./resources/frontend/module_home.js");
var module_login_js = require("./resources/frontend/module_login.js");
var module_dashboard_js = require("./resources/backend/module_dashboard.js");
var module_user_js = require("./resources/backend/module_user.js");
var module_content_js = require("./resources/backend/module_content.js");




//frontend
config.app.get("/",function(req,res){
	module_home_js.index(req,res);
});

config.app.get("/login",function(req,res){
	module_login_js.index(req,res);
});
config.app.post("/auth",function(req,res){
	module_login_js.auth(req,res);
});
config.app.get('/logout', function(req, res){ 
	req.session.destroy(function(){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
		res.redirect('/');                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
	});                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
}); 

//backend
var authorize = function(req, res, next) {
	console.log(!isset(req.session.name));
	
	if(!isset(req.session.name) == true) {
        return res.render('frontend/login',{ message : "Please Login Firts"});
    }
    next();
}

config.app.get("/backend/dashboard",authorize, function(req,res){
	module_dashboard_js.index(req,res);
});

config.app.get("/backend/user",authorize,function(req,res){
	module_user_js.index(req,res);
});
config.app.get("/backend/user/insert",authorize,function(req,res){
	module_user_js.insert(req,res);
});
config.app.post("/backend/user/save",authorize,function(req,res){
	module_user_js.save(req,res);
});
config.app.get("/backend/user/edit/:id",authorize,function(req,res){
	module_user_js.edit(req,res);
});
config.app.post("/backend/user/update/:id",authorize,function(req,res){
	module_user_js.update(req,res);
});
config.app.get("/backend/user/delete/:id",authorize,function(req,res){
	module_user_js.delete(req,res);
});

config.app.get('/backend/content',authorize, module_content_js.index);
config.app.get('/backend/content/insert',authorize, module_content_js.insert);
config.app.post('/backend/content/save',authorize, config.multipartMiddleware, module_content_js.save);
config.app.get('/backend/content/edit/:id',authorize, module_content_js.edit);
config.app.post('/backend/content/update/:id',authorize,config.multipartMiddleware, module_content_js.update);
config.app.get('/backend/content/delete/:id',authorize, module_content_js.delete);

config.app.get('*', function(req, res){
	var html = config.swig.compileFile("./views/404.html")();
	res.writeHead(404,{"Content-Type":"text/html"})		
	res.end(html);
});

var create_server = config.app.listen(8000);

console.log("Server is running at 8000");