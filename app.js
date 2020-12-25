// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyDF3MX00Oj6VZA59c_kOYc0d3WyhrghRio',
  authDomain: 'contact-form-submit.firebaseapp.com',
  projectId: 'contact-form-submit',
  storageBucket: 'contact-form-submit.appspot.com',
  messagingSenderId: '492294044748',
  appId: '1:492294044748:web:768aae2f939d71e3d988e9',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// References messages collection
let messageRef = firebase.database().ref('messages');

const form = document.getElementById('contactForm');
const fullnameEl = document.getElementById('fullname');
const emailEl = document.getElementById('email');
const phoneNumberEl = document.getElementById('phonenumber');
const messageEl = document.getElementById('message');

// Show error
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.textContent = message;
}

// Show success
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// Get field name
function getFieldName(input) {
  return input.id[0].toUpperCase() + input.id.slice(1);
}

// Check required field
function checkRequiredField(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value === '') {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

// Submit form
const submitForm = (e) => {
  e.preventDefault();
  checkRequiredField([fullnameEl, emailEl, phoneNumberEl, messageEl]);

  // Get values
  const fullname = fullnameEl.value.trim();
  const email = emailEl.value.trim();
  const phoneNumber = phoneNumberEl.value.trim();
  const message = messageEl.value.trim();

  if (fullname !== '' && email !== '' && phoneNumber !== '' && message !== '') {
    form.reset();

    // Remove success borders
    const allFormControl = document.querySelectorAll('.form-control');
    const formControlArr = Array.from(allFormControl);
    formControlArr.forEach((formControl) => {
      formControl.classList.remove('success');
    });

    // Save message
    saveMessage(fullname, email, phoneNumber, message);

    // Show Alert
    document.querySelector('.alert').style.display = 'block';

    // Hide Alert after 3s
    setTimeout(() => {
      document.querySelector('.alert').style.display = 'none';
    }, 3000);
  }
};

// Listen for form submit
form.addEventListener('submit', submitForm);

// Save message to firebase
const saveMessage = (fullname, email, phoneNumber, message) => {
  let newMessageRef = messageRef.push();
  newMessageRef.set({
    fullname: fullname,
    email: email,
    phoneNumber: phoneNumber,
    message: message,
  });
};
