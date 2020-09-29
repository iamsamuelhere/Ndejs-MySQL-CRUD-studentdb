const express=require('express')
const ejs=require('ejs')
const bodyParser=require('body-parser')
const mtsql=require('my-sql')
const app=express()
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine','ejs')
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'student_db',
  multipleStatements:true

});


// q='create table student (sno int primary key auto_increment,name varchar(255) not null,gender char(10) not null,class int not null,sub1 decimal(4,2),sub2 decimal(4,2));'
// connection.query(q, function (error, results, fields) {
//   if (error) throw error;
//   console.log('database created');
// });
app.get('/',function(req,res){
connection.query('select count(*)as count from student;',function(err,results,fields){
    if(err) throw err
    res.render('home',{no:results}) 
}) 
})
app.post('/',function(req,res){
    console.log(req.body.student)
    data=req.body
    connection.query('insert into student set ?;',data,function(error,results,fields){
        if(error) throw error
        console.log(results)
        res.redirect('/content')
    })
})
app.get('/content',function(req,res){
  connection.query('select * from student ;',function(err,results,fields){
      if (err) throw err;
      res.render('content',{results:results})

  })
})

app.get('/v/:id',function(req,res){
    id=req.params.id

    connection.query('select * from student where sno= ?;',id,function(err,results,fields){
        if(err)throw err;
        res.render('indi',{results:results})
    })
})
app.get('/edit/:id',function(req,res){
    id=req.params.id
    res.render('update',{id:id})
})
app.get('/del/:id',function(req,res){
    id=req.params.id
    connection.query('delete from student where sno=?;',id,function(err,results,fields){
        if(err)throw err;
        res.redirect('/content')
    })
})
app.post('/update',function(req,res){
    data=req.body
    id=req.body.sno
    u='update student set ? where sno=?'
    connection.query(u,[data,id],function(err,results,fields){
        if(err)throw err
        res.redirect('/content')
    
    })
  
    })
app.listen(3000,function(req,res){
    console.log("server started at 3000")
})