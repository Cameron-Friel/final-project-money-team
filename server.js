var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');

var suspectData = require('./suspectData');
var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/main', function(req, res, next) //Renders main page for use
{
  var peopleList = Object.keys(suspectData);
  var randMurderIndex = peopleList[Math.floor(Math.random() * peopleList.length)];
  console.log(randMurderIndex);
  for(var i=0; i<peopleList.length; i++)
  {
    console.log(suspectData[i]);
    if(randMurderIndex === suspectData[i])
    {
      console.log(suspectData[i].hints[0]);
    }
  }
/*
  var randMurderHints=
  {
    hint: randMurder
  }
*/
  var suspectArgs =
  {
    //suspectPeople: randMurder.hints,
    suspect: suspectData
  }

  res.render('mainPage', suspectArgs);
  res.status(200);
});

app.get('/suspects', function(req, res, next) //Renders page which shows suspects
{
  var suspectArgs =
  {
    suspect: suspectData
  }

  res.render('suspects', suspectArgs);
  res.status(200);
});

app.get('/about', function(req, res, next) //Renders about page
{
  res.render('about')
  res.status(200);
});

app.get('*', function (req, res) //If file is not found catches and displays 404 error
{
  res.render('404Page');
  res.status(404);
});

app.listen(port, function ()
{
  console.log("Server is running.", port);
});
