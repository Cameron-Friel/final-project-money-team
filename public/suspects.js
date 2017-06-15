//for suspect page

function addModal()
{
  var backdrop = document.getElementById('modal-backdrop');
  var suspectModal = document.getElementById('create-twit-modal');

  backdrop.classList.remove('hidden');
  suspectModal.classList.remove('hidden');
}

function closeModal()
{
  var backdrop = document.getElementById('modal-backdrop');
  var suspectModal = document.getElementById('create-twit-modal');

  backdrop.classList.add('hidden');
  suspectModal.classList.add('hidden');

  clearInputs();
}

function clearInputs()
{
  var suspectNameContent = document.getElementById('twit-text-input');
  var suspectAgeContent = document.getElementById('twit-attribution-input');

  suspectNameContent.value = '';
  suspectAgeContent.value = '';
}

function createSuspect()
{
  question = document.getElementById('twit-text-input').value || '';
  //url = document.getElementById('twit-attribution-input').value || '';

  //console.log(name);
  //console.log(age);

  if (question != '')
  {
    //storeSuspect(url)

    closeModal();
  }
  else
  {
    alert("You need to input a question.");
  }
}

function storeSuspect()
{

}

/*var getModal = document.getElementById('add-suspect-button');
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
});*/

window.addEventListener('DOMContentLoaded', function (event) {

  var getModal = document.getElementById('add-suspect-button');
  if (getModal) {
    getModal.addEventListener('click', addModal);
  }

  var closeButton = document.querySelector('.modal-close-button');
  if (closeButton) {
    closeButton.addEventListener('click', closeModal);
  }

  var cancelButton = document.querySelector('.modal-cancel-button');
  if (cancelButton) {
    cancelButton.addEventListener('click', closeModal);
  }

  var acceptButton = document.querySelector('.modal-accept-button');
  if (acceptButton) {
    acceptButton.addEventListener('click', createSuspect);
  }

});
