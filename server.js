const express= require ('express');
const hbs =require ('hbs');
const fs = require('fs');
var app = express();
const port = process.env.PORT || 3000;
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine','hbs');

// app.use((req,res,next)=>{
//   res.render('maintenance.hbs',{
//     pageTitle: 'Website is in maintenance'
//   });
//
// });

app.use(express.static(__dirname + '/public'));
app.use((req, res, next)=>{

var now = new Date().toString();
var log = `${now}:${req.method} ${req.url}`;
console.log(log);

fs.appendFile('server.log',log + '\n' , (err)=>{ // store all the logins in the server.log wit a time stamp and http
  if (err){
    console.log('Unable to append to server.log.');
  }
});

  next();
});


hbs.registerHelper('getCurrentYear',()=>{
   return new Date().getFullYear()
});
hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});
app.get('/',(req, res) =>{
  // res.send('<h1>Hello world</h1>');
  // res.send({name: 'Hafiz',
  //           likes:  [
  //           'running','gaming','moveis'
  //           ]
  res.render('home.hbs',{
    welcomeMesage:'Hello New User',
    pageTitle:'Home'
  });
});


app.get('/about',(req,res)=>{
res.render('about.hbs',{
  pageTitle:'About',

});
});

app.get('/bad',(req,res)=>{
  res.send ({
    errorMessage:'Error 404 Can not found'}
  );

});

app.listen(port,()=> {
  console.log(`server is up on port ${port}`);
});
