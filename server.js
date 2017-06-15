var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var fs = require('fs');
var bodyParser = require('body-parser');

var suspectData = require('./suspectData');
var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res, next) //Renders main page for use
{
  if (req.url === '/')
  {
    var peopleList = Object.keys(suspectData);
    var index = Math.floor(Math.random() * peopleList.length)
    var randMurderIndex = peopleList[index];

    var murderData = suspectData[randMurderIndex];

    murderData.murderer +=1;

    var hintArray = murderData; //array to hold randomly chosen hints

    if (hintArray.hints.length !== 3) //loop through and randomly delete hints until three are sent to be served to page
    {
      for (var i = 0; i < hintArray.hints.length - 3; i++)
      {
        console.log("in");
        var random = Math.floor(Math.random() * hintArray.hints.length)
        hintArray.hints.splice(random, 1);
      }
    }
    console.log("Murderer: ", murderData);
    console.log("hintsArray: ", hintArray.hints);

    var suspectArgs =
    {
      suspectPeople: hintArray.hints,
      murdererName: JSON.stringify(murderData),
      murdererIndex: index,
      suspect: suspectData
    }

    res.render('mainPage', suspectArgs);
    res.status(200);
  }
  else
  {
    next();
  }
});

app.get('/main', function(req, res, next) //Renders main page for use
{
  if (req.url === '/main')
  {
    var peopleList = Object.keys(suspectData);
    var index = Math.floor(Math.random() * peopleList.length)
    var randMurderIndex = peopleList[index];

    var murderData = suspectData[randMurderIndex];

    murderData.murderer +=1;

    var hintArray = murderData; //array to hold randomly chosen hints

    if (hintArray.hints.length !== 3) //loop through and randomly delete hints until three are sent to be served to page
    {
      for (var i = 0; i < hintArray.hints.length - 3; i++)
      {
        console.log("in");
        var random = Math.floor(Math.random() * hintArray.hints.length)
        hintArray.hints.splice(random, 1);
      }
    }
    console.log("Murderer: ", murderData);
    console.log("hintsArray: ", hintArray.hints);

    var suspectArgs =
    {
      suspectPeople: hintArray.hints,
      murdererName: JSON.stringify(murderData),
      murdererIndex: index,
      suspect: suspectData
    }

    res.render('mainPage', suspectArgs);
    res.status(200);
  }
  else
  {
    next();
  }
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

app.get('/suspectInfo/:suspect', function(req, res, next)
{
  var suspect = req.params.suspect;
  var singleData = suspectData[suspect];

  var peopleList = Object.keys(suspectData);
  var suspectsArray = [];

  if (singleData)
  {
    for (var i = 0; i < suspectData.length; i++)
    {
      suspectsArray[i] = suspectData[peopleList[i]]; //populate holder array
    }

    for (var i = 0; i < suspectsArray.length; i++)
    {
        if (singleData === suspectsArray[i])
        {
          suspectsArray.splice(i, 1);
          break;
        }
    }

    var suspectArgs =
    {
      name: singleData.name,
      url: singleData.url,
      about: singleData.about,
      suspect: singleData,
      suspects: suspectsArray
    }

    res.render('suspectInfo', suspectArgs);
    res.status(200);
  }
  else
  {
    next();
  }
});

app.post('/suspect/:suspect/addSuspect', function(req, res, next)
{
  var editSuspect = suspectData[req.params.suspect];
  console.log(editSuspect);
  if (editSuspect)
  {
    if (req.body)
    {
      var newHint =
      {
        hint: req.body.hint
      };
      console.log(newHint);
      editSuspect.hints = editSuspect.hints || [];

      editSuspect.hints.push(newHint);
      fs.writeFile('suspectData.json', JSON.stringify(suspectData), function (err)
      {
        if (err)
        {
          res.status(500).send("Unable to save hint to \"database\".");
        }
        else
        {
          res.status(200).send();
        }
      });
    }
    else
    {
      res.status(400).send("Hint field is missing.");
    }
  }
  else
  {
    console.log("In the else.");
    next();
  }
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
