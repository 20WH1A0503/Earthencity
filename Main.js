const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore} = require('firebase-admin/firestore');

var serviceAccount = require("./ServiceAccountKey.json");

initializeApp({
  credential: cert(serviceAccount)
});
const math=
{
	add:function(a,b)
	{
		return a+b;
	}
}
const db = getFirestore();
var express=require('express');
var app=express();
app.set('view engine', 'ejs');
app.get('/', function(req,res) {
   res.render('Home');
});
app.get('/LoginRegister',function(req,res) {
    res.render("LoginRegister");
});
app.get('/signupSubmit',function(req,res) {
  console.log(req.query.UserId)
  console.log(req.query.Email);
 db.collection('todo').add({
      UserName:req.query.UserId,
      email:req.query.Email,
      passWord:req.query.PassWord
  })
  .then(()=>{
      res.render("SignUpSucess")
      
  });

});

app.get('/loginSubmit',function(req,res){
  var name=req.query.Username
  var pass=req.query.Pwd
  db.collection('todo').where('UserName','==',name).where('passWord','==',pass).get().then((docs)=>{
      if(docs.size>0){
          res.render("Home1")
      }
      else{
          res.render("loginfail");
      }
  });

});
app.get('/send',function(req,res) {
  
  
 db.collection('Message').add({
      first_name:req.query.firname,
      last_name:req.query.lasname,
      mail_id:req.query.gmail,
      MobilleNo:req.query.mobile,
      Msg:req.query.message,


  })
  .then(()=>{
      res.render('Inforeceive')
  });
});
app.get("/Home",function(req,res){
  res.render("Home");
});
app.get("/Home1",function(req,res){
  res.render("Home1");
});
app.get("/Shop",function(req,res){
  res.render("Shop");
});

app.get("/Flowerseeds",function(req,res){
  res.render("Flowerseeds");
});
app.get("/Fruits",function(req,res){
  res.render("Fruits");
})
app.get("/Bonsai",function(req,res){
  res.render("Bonsai");
})
app.get("/Homedecor",function(req,res){
  res.render("Homedecor");
})
app.get("/Contact",function(req,res){
  res.render("Contact");
})
app.get("/About",function(req,res){
  res.render("About");
})
app.get("/OrderConfirmed",function(req,res){
  res.render("OrderConfirmed");
});

const arr=[];
const costs=[];
var amount=0;
app.get("/addedToCart",(req,res)=>{
	const val=req.query.item;
	var c=req.query.cost;
	costs.push(c);
	c=eval(c.slice(0,c.length-2));
	console.log(c);
	amount=math.add(amount,c);
	arr.push(val);
	
});
app.get("/cart",(req,res)=>{
	if(typeof(arr) != "undefined"){
		db.collection("cart").add({
			Cart : arr,
			Costs : costs,
			TotalCost : amount,
		}).then(()=>{
			res.render("cart",{booksData : arr, amount : amount, costs : costs});
		});
	}
});
app.get("/OrderConfirmed",(req,res)=>{
  res.render("OrderConfirmed")
});
app.listen(3000);