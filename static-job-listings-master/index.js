const newsletterForm = document.getElementById('newsletterForm');
const emailInput = document.getElementById('emailInput');
const successMessage = document.getElementById('successMessage');
const emailDisplay = document.getElementById('emailDisplay');

newsletterForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const email = emailInput.value;

  if (email === '') {
    // Display validation message for empty email
    alert('Please enter your email address.');
  } else if (!validateEmail(email)) {
    // Display validation message for invalid email format
    alert('Please enter a valid email address.');
  } else {
    // Show success message with the entered email
    emailDisplay.textContent = email;
    successMessage.classList.remove('hidden');
  }
});

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
