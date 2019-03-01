var config = require("../config.js");

function index(req,res){

	res.render('frontend/login',{ message : ""});
}

function auth(req,res){


	var email = req.body.email;
	var password = req.body.password;

	var password = config.crypto.createHash('md5').update(password).digest('hex');

	// console.log("-------------------------");
	// console.log(password);
	// console.log("-------------------------");
	
	config.connection.query("select * from user where ? and ?",[
		{ email :  email},
		{ password:  password}],
		function(err,rows,field)
		{
			if (err) throw err;
			if (rows.length) 
			{		
					req.session.name = email
					req.session.password = password

					res.redirect('/backend/dashboard');

			}
			else
			{
				res.render('frontend/login',{ message : "Username or Password is Wrong"});
			}
		});
}

module.exports = {
	index : index,
	auth : auth
}