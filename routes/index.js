var express = require('express');
var router = express.Router();

/*	GET home page. */
router.get('/', function(req, res) {
  res.render('pages/index', { title: 'Express' });
});

/*	GET Hello World page. */
/*router.get('/helloworld', function(req, res){
	res.render('helloworld', {title: 'Hello, World!'});
});*/

/*	GET Userlist page. */
router.get('/userlist', function(req, res){
	var db = req.db;
	var collection = db.get('usercollection');
	collection.find({},{}, function(e, docs){
		res.render('pages/userlist', {
			"userlist" : docs
		});
	});
});

router.get('/newuser', function(req, res){
	res.render('pages/newuser', {title: 'Add New User'})
});

/* POST Add User Service */
router.post('/adduser', function(req, res){

	//Setting internal DB variable
	var db = req.db;

	//Getting values from the form; relying on the name attributes of the items; from newuser.jade
	var userName = req.body.username;
	var userEmail = req.body.useremail;

	//Getting the user collection from MongoDB
	var collection = db.get("usercollection");

	//Submitting data to the DB
	collection.insert({
		"username" : userName,
		"email" : userEmail
	}, function(err, doc){
			if(err){
				//Send an error message if an error is encountered
				res.send("Problem adding to the DB");
			}else{
				//If successful, set the header bar to read /userlist instead of /adduser
				res.location("userlist");
				//Then redirect to the success page
				res.redirect("/userlist");
			}
		}	
	);
});

module.exports = router;
