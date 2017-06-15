//for suspect page

var getModal = document.getElementById('add-suspect-button');
var backdrop = document.getElementById('modal-backdrop');
var twitModal = document.getElementById('create-twit-modal');
var closeButton = document.querySelector('.modal-close-button');
var cancelButton = document.querySelector('.modal-cancel-button');

getModal.addEventListener('click', function()
{
  backdrop.classList.remove('hidden');
  twitModal.classList.remove('hidden');
});


closeButton.addEventListener('click', function () {
  backdrop.classList.add('hidden');
  twitModal.classList.add('hidden');
});

cancelButton.addEventListener('click', function () {
  backdrop.classList.add('hidden');
  twitModal.classList.add('hidden');
});
