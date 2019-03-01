var config = require("../config.js");

function index(req,res){
	config.connection.query("select * from user",function(err,rows,field){
		if (err) 
		{
			throw err;
		}
		else
		{
			res.render('backend/user/index',{data:rows,name : req.session.name});
		}
	});
}

function insert(req,res){

	res.render('backend/user/insert',{name : req.session.name});
	
}

function save(req,res){

	var name = req.body.name;
	var email = req.body.email;
	var password = req.body.password;

	var password = config.crypto.createHash('md5').update(password).digest('hex');

	var data_post = {
		name : name,
		email : email,
		password : password
	}
	
	config.connection.query("insert into user set ?",data_post,function(err,field){
		if (err) {throw err}
			res.writeHead(302,{Location:"/backend/user"});
		res.end();		
	});
	
}


function edit(req,res){

	config.connection.query("select * from user where ?",{ id : req.params.id},function(err,rows,field){
		console.log(rows);

		if (rows.length) 
		{
			res.render('backend/user/edit',{data:rows,name : req.session.name});
		}
	});
}

function update(req,res){
	

	var name = req.body.name;
	var email = req.body.email;
	var password = req.body.password;

	var password = config.crypto.createHash('md5').update(password).digest('hex');

	if (req.body.password != "") 
	{
		var data_post = {
			name : name,
			email : email,
			password : password
		}
	}
	else
	{
		var data_post = {
			name : name,
			email : email
		}	
	}

	config.connection.query("update user set ? where ?",
		[data_post,{ id :  req.params.id}],
		function(err,field){
			if (err) 
			{
				throw err
			}
			else
			{
				res.writeHead(302,{Location:"/backend/user"});
				res.end();		
			}
		});

}

function erase(req,res){

	console.log(req.params.id);

	config.connection.query("delete from user where ?",{ id :  req.params.id},
		function(err,field)
		{
			if (err) {
				throw err
			}
			res.writeHead(302,{Location:"/backend/user"});
			res.end();		
		});	
}


module.exports = {
	index : index,
	insert : insert,
	save : save,
	edit : edit,
	update : update,
	delete : erase,
}