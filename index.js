document.addEventListener("DOMContentLoaded", () => {
  
  const login = document.getElementById('login-btn');
  login.addEventListener('click', () => {
    apiCall();
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    verifyCredentials(username.value, password.value)
  })
})

const userData = {
  username: 'emilys',
  password: 'emilyspass',
};

async function apiCall() {
  const url = 'https://dummyjson.com/auth/login';
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const result = await response.json();
      throw new Error(result.message || 'Login failed');
    }
    const result = await response.json();
    const token = await result.token;
   
    localStorage.setItem('token', token);
    // console.log("Token stored => ", token);
  } catch (error) {
    console.error('Error during API call:', error);
  }
}


const storedToken = localStorage.getItem('token');


function verifyCredentials(username, password) {
  if (!storedToken) {
    console.log('No token found. Please log in.');
    return;
  }
  if (storedToken && username === userData.username && password === userData.password) {
    console.log('Login successful:');
      const popup = document.getElementById('popup');
      popup.style.display = 'flex';
      localStorage.clear()
      setTimeout(() => {
        location.href = './allUser.html'
      }, 1000);
  } else {
    console.log('Invalid credentials.');
  }
}    
   


