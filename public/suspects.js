//for suspect page

var getModal = document.getElementById('add-suspect-button');
var backdrop = document.getElementById('modal-backdrop');
var twitModal = document.getElementById('create-twit-modal');

getModal.addEventListener('click', function()
{
  backdrop.classList.remove('hidden');
  twitModal.classList.remove('hidden');
});
