var suspects = document.getElementsByClassName('suspect-container');
var firstX = document.getElementById('x1');
var secondX = document.getElementById('x2');
var thirdX = document.getElementById('x3');
var suspectHolder = []; //array to hold suspect containers
var counter = 0; //var to keep track of how many guesses user has used up (max = 3)

suspects[murderIndex].addEventListener('click', function()
{
  alert('Congratulations! You Won!');
  location.href = "statistics"; //WE WANT THIS TO ROUTE TO WINNER PAGE SENDING MURDERER DATA TO PAGE!
});

for (var i = suspects.length - 1; i >= 0; i--) //iterate backwards so data is not lost
{
  suspects[i].addEventListener('click', guessSuspect(i));
}

function guessSuspect(i) //function to delete suspects as they are clicked
{
  return function()
  {
    console.log("Index: ", murderIndex);
    counter++; //Increment for each guess that is wrong
    addX(counter);

    if (counter == 3 && murderIndex != i)
    {
      alert('Sorry You LOSE!');
      location.reload();
    }

    for (var j = 0; j < suspects.length; j++)
    {
      if (suspects[j] == suspectHolder[i]) //Compares
      {
        suspects[j].remove();
        break;
      }
    }
  };
}

function addX(counter)
{
  if (counter == 1)
  {
    firstX.classList.remove('hidden');
  }
  else if (counter == 2)
  {
    secondX.classList.remove('hidden');
  }
  else if (counter == 3)
  {
    thirdX.classList.remove('hidden');
  }
}

window.addEventListener('DOMContentLoaded', function () {

  var temp = document.getElementsByClassName('suspect-container'); //hold suspect containers
  for (var i = 0; i < temp.length; i++) {
    suspectHolder.push(temp[i]); //push them into array to be fetched while game goes on
  }
});
