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

function getSuspect()
{
  var pathComponents = window.location.pathname.split('/');
  if (pathComponents[0] !== '' && pathComponents[1] !== 'suspect')
  {
    return null;
  }
  return pathComponents[2];
}

function createSuspect()
{
  hint = document.getElementById('twit-text-input').value || '';
  //url = document.getElementById('twit-attribution-input').value || '';
  console.log(hint);
  //console.log(name);
  //console.log(age);

  if (hint != '')
  {
    var suspectID = getSuspect();
    if (suspectID)
    {
      console.log("Suspect: ", suspectID);
      storeSuspect(suspectID, hint, function(err)
      {
        if (err)
        {
         alert("Unable to save question.  Got this error:\n\n" + err);
        }
      });
    }

    closeModal();
  }
  else
  {
    alert("You need to input a question.");
  }
}

function storeSuspect(suspectID, hint)
{
  var postURL = "/suspect/" + suspectID + "/addSuspect";

  var postRequest = new XMLHttpRequest();
  postRequest.open('POST', postURL);
  postRequest.setRequestHeader('Content-Type', 'application/json');

  postRequest.addEventListener('load', function (event)
  {
    var error;
    if (event.target.status !== 200)
    {
      error = event.target.response;
    }
    callback(error);
  });

  var postBody =
  {
    hint: hint
  };

  postRequest.send(JSON.stringify(postBody));
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
