var config = require("../config.js");
function index(req,res){
	
	res.render('backend/dashboard/index',{name : req.session.name});
}

module.exports = {
	index : index
}