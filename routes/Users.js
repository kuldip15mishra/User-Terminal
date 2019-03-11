var express = require('express');
var router = express.Router();
var Users=require('../models/Users');
var db = require('../dbconnection');
router.get('/:id?',function(req,res,next){
    if(req.params.id){
            Users.getUserById(req.params.id,function(err,rows){
                if(err){ res.json(err); }
                else{ res.json(rows);  }
            });}
    else{
           Users.getAllUsers(function(err,rows){
                if(err) { res.json(err); }
                else    { res.json(rows); } });}
});

//Comment New code Added
router.put('/:id', function (req, res, next) {
    Users.updateUser(req.params.id, req.body, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

router.post('/', function (req, res, next) {
    Users.addUser(req.body, function (err, count) {
        if (err) { res.json(err);}
        else { res.json(req.body); }
    });
});

router.delete('/:id', function (req, res, next) {
    Users.deleteUser(req.params.id, req.body, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

router.get('/signin/:cardnumber/:password', function (req, res, next) {  
    Users.signinUser(req.params.cardnumber, req.params.password, function (err, rows) {
        if (err) { res.json(err); }
       else { if(rows[0]){
				     var data=rows[0];
					 res.send({"status":true,"code":200,"message":"Card Detail Found","data":data}); 
					//res.json(rows[0]);
					}
				else{
				    res.send({"status":false,"code":404,"message":"User Not Register"}); 
				} }
    });
});

router.post('/createcode', function (req, res, next) {
    Users.createCodebyMobile(req.body, function (err, count) {
        if (err) { res.json(err); }
        else { res.json(req.body); }
    });
});
router.post('/verifycode', function (req, res, next) {
    Users.verifyCodebyMobile(req.body, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows[0]); }
    });
});
router.post('/signup', function (req, res, next) {
   
			 db.query("select FirstName, LastName, Email, Mobile, City, State, Pincode, CardNumber, Age, Gender, MaritalStatus, Profession, UserID, isOTP from user where CardNumber=?", [req.body.CardNumber], function (err, rows, fields) {
				 if (err) { res.json(err); }
                else { 
				
				  var data=rows[0];
				if(data){
				    
					// body_mobile=req.body.Mobile;
					 if(data.Mobile)
					 {
						  res.send({"status":false,"code":404,"message":"Card Number is Already Register"});  
						  
					 }
					 else
					 {
						 // first check mobile no 
						     db.query("select id from user where Mobile=?", [req.body.Mobile], function (err, rows, fields) {
								if (err) { res.json(err); }
								  var data=rows[0];
								if(data){
									res.send({"status":false,"code":404,"message":"Mobile No is Already used"}); 
								}
								else
								{
									Users.signupUser(req.body, function (err, rows) {
									data.Mobile=req.body.Mobile;
							  
									res.send({"status":true,"code":200,"message":"Card Detail Found","data":data}); 
							   });
								}
							 });
						   
					 }
					
					//res.json(rows[0]);
					}
				else{
				    res.send({"status":false,"code":404,"message":"Card No Not Registerd"}); 
				} }
			  });
           
        
    });   

router.post('/signupBySocial', function (req, res, next) {
    Users.getUserBySocial(req.body, function (err, rows) {
        if (err) { res.json(err); }
        else {
            if(rows.length >0)
            {
                res.json(rows[0])
            }else{
                Users.signupBySocial(req.body, function(err, rows){
                    if(err) {res.json(err);}
                    else {
                        Users.getUserBySocial(req.body, function (err, rows) {
                            if (err) { res.json(err); }
                            else {res.json(rows[0])}
                        });
                    }
                });
            } 
        }
    });
});

module.exports=router;
