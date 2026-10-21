const form = document.getElementById('contact-form');

const successMessage = document.createElement('p');
successMessage.classList.add('success-message');
successMessage.style.display = 'none';
successMessage.textContent = 'Message sent successfully! Thank you for contacting me.';

const errorMessage = document.createElement('p');
errorMessage.classList.add('error-message');
errorMessage.style.display = 'none';
errorMessage.textContent = 'Sorry, something went wrong. Please try again.';

form.appendChild(successMessage);
form.appendChild(errorMessage);

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const formData = new FormData(form);

  fetch(form.action, {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      successMessage.style.display = 'block';
      errorMessage.style.display = 'none';
      form.reset();
    } else {
      response.json().then(data => {
        if (data.errors) {
          errorMessage.textContent = data.errors.map(error => error.message).join(', ');
        }
        successMessage.style.display = 'none';
        errorMessage.style.display = 'block';
      })
    }
  }).catch(() => {
    successMessage.style.display = 'none';
    errorMessage.style.display = 'block';
  });
});
