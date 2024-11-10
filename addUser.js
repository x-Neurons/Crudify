//User Click Logout Option
const loginUser = document.getElementById('user');
loginUser.addEventListener('click', () => {
  const logout = document.querySelector('#logout');
  if (logout.style.display === 'none' || logout.style.display === '') {
    logout.style.display = 'block';
  }
  else if (logout.style.display === 'block') {
    logout.style.display = 'none'
  }
})

//API Fetch

function fetchApi(userData) {
    const url = 'https://dummyjson.com/users/add'
    fetch(url,{
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(userData) 
    }).then(response=>{
      if (response.ok) {
        console.log("Response is Ok" , response.status);
      }
      if (!response.ok) {
        throw new Error("Network error: " + response.statusText)
      }
      return response.json()
      
    }).then(data => {
      console.log("Data Send to APi: " + data);
    })
    .catch(error=>{
      console.log("There is an error "+ error);
    })
  }  
  
//Add New User
const addBtn = document.getElementById('addUser-btn');
addBtn.addEventListener('click', () => {
  const newUser = {
    "id": 1,
    "firstName": "Emily",
    "lastName": "Johnson",
    "maidenName": "Smith",
    "age": 28,
    "gender": "female",
    "email": "emily.johnson@x.dummyjson.com",
    "phone": "+81 965-431-3024",
    "username": "emilys",
    "password": "emilyspass",
    "birthDate": "1996-5-30",
    "image": "https://dummyjson.com/icon/emilys/128",
    "address": {
      "address": "626 Main Street",
    },
    
  }
  if (addBtn) {
    console.log("Saved Clicked");
    newUser.id = '';
    newUser.image = document.querySelector('#image-url').value
    newUser.firstName = document.querySelector('#f-name').value
    newUser.lastName = document.querySelector('#l-name').value
    newUser.phone = document.querySelector('#phone-number').value
    newUser.email = document.querySelector('#email-addUser').value
    newUser.address = document.querySelector('#address-addUser').value
    newUser.birthDate = document.querySelector('#dob').value
    newUser.age = document.querySelector('#age').value
    newUser.gender = document.querySelector('#gender').value
    
    console.log(newUser);
    
    fetchApi(newUser)
    
    // Store newUser object in localStorage
    localStorage.setItem('newUser', JSON.stringify(newUser));

    const savePopup = document.getElementById('save-popup')
    if (savePopup) {
      savePopup.style.display = 'block';

      setTimeout(() => {
        savePopup.style.display = 'none';
      }, 1000);
    }
    document.querySelector('#image-url').value = '';
    document.querySelector('#f-name').value = ''
    document.querySelector('#l-name').value = ''
    document.querySelector('#phone-number').value = ''
    document.querySelector('#email-addUser').value = ''
    document.querySelector('#address-addUser').value = ''
    document.querySelector('#dob').value = ''
    document.querySelector('#age').value = ''
    document.querySelector('#gender').value = ''
    
    
  }
})
