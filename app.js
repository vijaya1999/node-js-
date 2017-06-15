const express = require('express')
const app = express()
app.use(express.static(__dirname+''))
app.use(express.static(__dirname+''))
app.set('view engine','ejs');
app.get('/',function (req, res) {
   res.sendFile(__dirname+'/signup.html');
 })
var Datastore =require('nedb')
var db = new Datastore({filename:'exp.db',autoload:true});

app.get('/formsubmit',function(req,res){
var v=req.query.na;
var i=req.query.la;
var j =req.query.emai;
var k =req.query.pass;
var l=req.query.mob;
  var a ={
    'name':v,
    'last':i,
    'emai':j,
     'pass':k,
      'mobileno':l}
   db.find({"emai":j,"pass":k},function(err,result) {
     
      if(result.length>0) {
   // alert("account already exists");
    res.redirect('/login')}
     else {
         db.insert(a,function(err,newDoc){
  
  res.redirect('/login');
})  }
 }) })   
var j,k;
app.get('/login',function (req, res) {
  res.sendFile(__dirname+'/form.html');})
app.get('/forms',function(req,res){
  j =req.query.emai;
  k =req.query.pass;
 var we={
  'email':j,
  'password':k
 }
db.find({"emai":j,"pass":k},function(err,result){
if(result.length>0){
  res.redirect('/home')
 res.render('profile',{result:result})
 }
else {
res.sendFile(__dirname+'/success.html')}
})
})
app.get('/home',function (req, res) {
db.find({},function(err,result){
res.render('home',{'result':result});
})
})
  app.get('/forme/:name',function (req, res) {
   var a= req.params.name;
   console.log(a);
      db.find({},function(err,result){
        res.render('take',{result:result[a]})
      })
})
app.get('/formi',function (req, res) {
  db.find({"emai":j,"pass":k},function(err,result){
if(result.length>0){
res.render('profile',{result:result})
} 
})
})/*
app.listen(3000,function(){
  console.log(3000);
})*/

app.set('port',process.env.PORT||3000)
app.listen(app.get('port'),function(){
  console.log(3000);
})
