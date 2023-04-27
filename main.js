// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
const likeButtons = document.querySelectorAll('.like');
likeButtons.forEach(button => {
  button.addEventListener('click', handleLike);
});

// Function to handle the like button click
function handleLike(event) {
  // Get the heart icon element and its current state (empty or full)
  const heartIcon = event.target.querySelector('.like-glyph');
  const isFull = heartIcon.innerText === FULL_HEART;

  // Simulate server call
  mimicServerCall()
    .then(() => {
      if (isFull) {
        // If the heart is full, change it back to empty and remove the activated-heart class
        heartIcon.innerText = EMPTY_HEART;
        event.target.classList.remove('activated-heart');
      } else {
        // If the heart is empty, change it to full and add the activated-heart class
        heartIcon.innerText = FULL_HEART;
        event.target.classList.add('activated-heart');
      }
    })
    .catch(error => {
      // If the server returns an error, display the modal with the error message for 3 seconds
      const modal = document.getElementById('modal');
      const modalMessage = modal.querySelector('#modal-message');
      modalMessage.innerText = error;
      modal.classList.remove('hidden');
      setTimeout(() => {
        modal.classList.add('hidden');
      }, 3000);
    });
}



//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
