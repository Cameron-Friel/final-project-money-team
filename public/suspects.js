//for suspect page

var getModal = document.getElementById('add-suspect-button');
var backdrop = document.getElementById('modal-backdrop');
var twitModal = document.getElementById('create-twit-modal');
var closeButton = document.querySelector('.modal-close-button');
var cancelButton = document.querySelector('.modal-cancel-button');
var acceptButton = document.querySelector('.modal-accept-button');
var suspectNameContent = document.getElementById('twit-text-input');
var suspectAgeContent = document.getElementById('twit-attribution-input');

getModal.addEventListener('click', function()
{
  backdrop.classList.remove('hidden');
  twitModal.classList.remove('hidden');
});


closeButton.addEventListener('click', function () {
  backdrop.classList.add('hidden');
  twitModal.classList.add('hidden');
  suspectNameContent.value = '';
  suspectAgeContent.value = '';
});

cancelButton.addEventListener('click', function () {
  backdrop.classList.add('hidden');
  twitModal.classList.add('hidden');
  suspectNameContent.value = '';
  suspectAgeContent.value = '';
});

acceptButton.addEventListener('click', function () {
  if (suspectAgeContent.value === "" || suspectNameContent.value === "") {
  suspectNameContent.value = '';
  suspectAgeContent.value = '';
  alert("Please Enter All Fields!");
  }
  else {
    //Add user input to the json file
  }
});
