var config = require("../config.js");

exports.index = function(req,res){
	config.connection.query("select * from content",function(err,rows,field){
		if (err) 
		{
			throw err;
		}
		else
		{
			res.render('backend/content/index',{data:rows,name : req.session.name});
		}
	});
}

exports.insert = function(req,res){

	res.render('backend/content/insert',{name : req.session.name});

}

exports.save = function(req,res){


	console.log("=====================================");
	console.log("req =",req.body);
	console.log("=====================================");
	console.log("=====================================");
	console.log("req =",req.files.image);
	console.log("=====================================");


	var title = req.body.title;
	var category = req.body.category;
	var description = req.body.description;
	var date = new Date();




	var data_post = {
		category : category,
		title : title,
		description : description,
		date : date,
		image : req.files.image.path,
	}

	config.connection.query("insert into content set ?",data_post,function(err,field){
		if (err) {throw err}
			res.writeHead(302,{Location:"/backend/content"});
		res.end();		
	});

}


exports.edit = function(req,res){

	config.connection.query("select * from content where ?",{ id : req.params.id},function(err,rows,field){
		console.log(rows);

		if (rows.length) 
		{
			res.render('backend/content/edit',{data:rows,name : req.session.name});
		}
	});
}

exports.update = function(req,res){


	var title = req.body.title;
	var category = req.body.category;
	var description = req.body.description;
	var date = new Date();

	console.log("=====================================");
	console.log("req update =",req.files.image.originalFilename);
	console.log("=====================================");


	var data_post = {
		category : category,
		title : title,
		description : description,
		date : date,
		image : req.files.image.path,
	}

	config.connection.query("select * from content where ?",{ id : req.params.id},function(err,rows,field)
	{
		if (err) 
		{
			throw err;
		}
		else
		{
			config.fs_extra.remove(rows[0].image, function (err) {
				if (err) return console.error(err)

					config.connection.query("update content set ? where ?",
						[data_post,{ id :  req.params.id}],
						function(err,field){
							if (err) 
							{
								throw err
							}
							else
							{
								res.writeHead(302,{Location:"/backend/content"});
								res.end();		
							}
						});

			});	
		}
	});
}

exports.delete = function (req,res){


	config.connection.query("select * from content where ?",{ id : req.params.id},function(err,rows,field){
		if (err) 
		{
			throw err;
		}
		else
		{

			config.fs_extra.remove(rows[0].image, function (err) {
				if (err) return console.error(err)

					config.connection.query("delete from content where ?",{ id :  req.params.id},
						function(err,field)
						{
							if (err) {
								throw err
							}
							res.writeHead(302,{Location:"/backend/content"});
							res.end();		
						});	
			});
		}
	});

}