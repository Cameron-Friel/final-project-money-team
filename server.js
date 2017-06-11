var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var fs = require('fs');

var suspectData = require('./suspectData');
var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/main', function(req, res, next) //Renders main page for use
{
  var peopleList = Object.keys(suspectData);
  var index = Math.floor(Math.random() * peopleList.length)
  var randMurderIndex = peopleList[index];

  var murderData = suspectData[randMurderIndex];

  console.log(murderData);

  murderData.murderer +=1;

  console.log(murderData);

  var suspectArgs =
  {
    suspectPeople: murderData.hints,
    murdererName: JSON.stringify(murderData),
    murdererIndex: index,
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
  res.render('about');
  res.status(200);
});

app.get('/statistics', function(req, res, next)
{
  var peopleList = Object.keys(suspectData);

  var leadersArray = []; //initilize storage for convicts

  for (var i = 0; i < peopleList.length; i++)
  {
    leadersArray[i] = suspectData[peopleList[i]]; //populate with suspect's data
  }

  for (var i = 0; i < peopleList.length; i++) //bubble sort the suspects in order of greatest murder rate
  {
    for (var j = 0; j < peopleList.length - i - 1; j++)
    {
      if (leadersArray[j].murderer < leadersArray[j + 1].murderer)
      {
        var temp = leadersArray[j];
        leadersArray[j] = leadersArray[j + 1];
        leadersArray[j + 1] = temp;
      }
    }
  }

  var suspectArgs =
  {
    suspect: leadersArray
  }

  res.render('statistics', suspectArgs);
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
