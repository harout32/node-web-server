const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
// using the midleware
app.use( (req, res, next) => {
  var now = new Date().toString();
  var log = `${now} : ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) =>{
    if(err){
      console.log('unable to append to server.log');
    }
  });

  next();
});
// again midleWare
app.use( (req, res, next) => {
res.render('maintenance.hbs');
next();
});
// declaring helpers they are avalable for every hbs files
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

//this is the first directory
app.get('/', (req, res) => {
  res.render('Home.hbs', {
    pageTitle:'About Page',
    welcomeMessage : 'Welocme to the Home Page'
  });
});

// about directory
app.get('/about', (req, res) => {
    res.render('about.hbs', {
      pageTitle:'About Page'

    });
});

// //  /bad
// app.get('/bad', (req, res) => {
//   res.send({
//     errorMessage: 'unable to fulfill the request'
//   });
// });

app.listen(4000, () => {
  console.log('server is up');
});
