var suspects = document.getElementsByClassName('suspect-container');
console.log(suspects[0]);
for (var i = suspects.length - 1; i >= 0; i--)
{
  suspects[i].addEventListener('click', function()
  {
    console.log("hit");
    suspects.remove(suspects.i); //WHY DOES THIS NOT REMOVE MY SELECTED SUSPECT!?!??
  });
}
