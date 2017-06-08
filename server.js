var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');

var suspectData = require('./suspectData');
var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/main', function(req, res, next)
{
  var suspectArgs =
  {
    suspect: suspectData
  }

  res.render('mainPage', suspectArgs);
  res.status(200);
});

app.get('/suspects', function(req, res, next)
{
  var suspectArgs =
  {
    suspect: suspectData
  }

  res.render('suspects', suspectArgs);
  res.status(200);
});

app.get('*', function (req, res)
{
  res.render('404Page');
  res.status(404);
});

app.listen(port, function ()
{
  console.log("Server is running.", port);
});
