document.getElementById('registerForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const formData = {
      username: this.username.value,
      password: this.password.value
  };
  fetch('/register', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
  })
  .then(response => response.json())
  .then(data => {
      alert(data.message);
  })
  .catch((error) => {
      console.error('Error:', error);
  });
});

document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const formData = {
      username: this.username.value,
      password: this.password.value
  };
  fetch('/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
  })
  .then(response => response.json())
  .then(data => {
      alert(data.message);
  })
  .catch((error) => {
      console.error('Error:', error);
  });
});
