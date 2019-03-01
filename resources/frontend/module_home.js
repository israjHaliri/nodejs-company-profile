var config = require("../config.js");

function index(req,res){

	config.connection.query("select * from content where category = 1 ",function(err,rows1,field){
		if (err) 
		{
			console.log("err rows1",err);
		}
		
		config.connection.query("select * from content where category = 2 ",function(err,rows2,field){
			if (err) 
			{
				console.log("err rows2",err);
			}
			res.render('frontend/home',{data_about_us:rows1,data_services:rows2});

		});	
	});	
}

module.exports = {
	index : index
}