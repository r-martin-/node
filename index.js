var express = require('express');
var app = express()


var massive=require("massive");
var connectionString = "postgres://ross:password@localhost:/pgguide";

var massiveInstance = massive.connectSync({connectionString:connectionString});


var http = require('http');



app.set('db',massiveInstance);


var db = app.get('db');

// Part 1 Display all users from the users table
app.get('/users',function(req,res){
       db.run("Select * from users",function(err,result){
	res.send(result);
	})
});

// part 2 display a user with a specfic id from users table

app.get('/users/:id',function(req,res){
	var id = req.params.id;
	db.users.find({id:id},function(err,users){
	res.send(users);
	})

})

// part 3 get all products from the products table
app.get('/products',function(req,res){
	db.run("Select * from products",function(err,result){
		res.send(result);
	})
});

// part 4 display a specific product id from the product table

app.get('/products/:id/',function(req,res){
	 var id = req.params.id;
	db.products.find({id:id},function(err,product){
	res.send(product);
	})
});

// part 5 display all purchases from the purchases table

app.get('/purchases',function(req,res){
        db.run("Select * from purchases",function(err,result){
                res.send(result);
        })
});



// part 6 display a specfic id from purchases using the purchases table

app.get('/purchases/:id/',function(req,res){
        var id = req.params.id;
        db.purchases.find({id:id},function(err,purchases){
        res.send(purchases);
        })

})



app.get('/', function(req,res){
	res.send('Hey, boi!!');
})



app.listen(3000, function(){
	console.log('Listening on port 3000')
})


