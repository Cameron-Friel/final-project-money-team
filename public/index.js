var suspects = document.getElementsByClassName('suspect-container');
var suspectHolder = []; //array to hold suspect containers

for (var i = suspects.length - 1; i >= 0; i--)
{
  suspects[i].addEventListener('click', guessSuspect(i));
}

function guessSuspect(i) //function to delete suspects as they are clicked
{

  return function()
  {
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

window.addEventListener('DOMContentLoaded', function () {

  var temp = document.getElementsByClassName('suspect-container'); //hold suspect containers
  for (var i = 0; i < temp.length; i++) {
    suspectHolder.push(temp[i]); //push them into array to be fetched while game goes on
  }
});
