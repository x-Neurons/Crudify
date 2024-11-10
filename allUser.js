let myArray = [];

// Function to fetch data from API and merge with existing data
async function UserApiFetch() {
    const url = 'https://dummyjson.com/users';

    try {
        // Check if myArray exists in local storage
        const storedArray = localStorage.getItem('myArray');
        if (storedArray) {
            myArray = JSON.parse(storedArray);
        } else {
            // Fetch data from API if myArray is not in local storage
            const response = await fetch(url);
            const data = await response.json();
            const apiArray = data.users;

            myArray = apiArray.map(user => ({
                id: user.id,
                image: user.image,
                phone: user.phone,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                birthDate: user.birthDate,
                address: user.address.address,
                gender: user.gender,
                age: user.age,
            }));

            // Store initial data in local storage
            localStorage.setItem('myArray', JSON.stringify(myArray));
        }

        console.log("Data Rendered From API or Local Storage");
        DataRender(myArray);
    } catch (error) {
        console.error('Fetch operation error:', error);
    }
}

// Call UserApiFetch to start the process on page load
window.addEventListener("load", () => UserApiFetch());

// Data Manipulation On DOM
function DataRender(myArray) {
    const cardsContainer = document.getElementById('cards');
    cardsContainer.innerHTML = ''; // Clear existing content
    myArray.map((user, index) => {
        // Create a card element
        const card = document.createElement('div');
        card.classList.add('card');
        card.id = 'card';
        card.setAttribute('data-index', index);
        // Populate the card with user data
        if (user) {
            card.innerHTML = `<span><img src="${user.image}" id="img" alt="Icon"></span>

            <span id="number-icon">
                <svg width="24" height="24" viewBox="0 0 24 30" fill="none">
                    <path
                        d="M22 12C22 10.6868 21.7413 9.38647 21.2388 8.1731C20.7362 6.95996 19.9997 5.85742 19.0711 4.92896C18.1425 4.00024 17.0401 3.26367 15.8268 2.76123C14.6136 2.25854 13.3132 2 12 2V4C13.0506 4 14.0909 4.20703 15.0615 4.60889C16.0321 5.01099 16.914 5.60034 17.6569 6.34326C18.3997 7.08594 18.989 7.96802 19.391 8.93848C19.7931 9.90918 20 10.9495 20 12H22Z"
                        fill="blue" />
                    <path
                        d="M2 10V5C2 4.44775 2.44772 4 3 4H8C8.55228 4 9 4.44775 9 5V9C9 9.55225 8.55228 10 8 10H6C6 14.4182 9.58173 18 14 18V16C14 15.4478 14.4477 15 15 15H19C19.5523 15 20 15.4478 20 16V21C20 21.5522 19.5523 22 19 22H14C7.37259 22 2 16.6274 2 10Z"
                        fill="blue" />
                    <path
                        d="M17.5433 9.70386C17.8448 10.4319 18 11.2122 18 12H16.2C16.2 11.4485 16.0914 10.9023 15.8803 10.3928C15.6692 9.88306 15.3599 9.42017 14.9698 9.03027C14.5798 8.64014 14.1169 8.33081 13.6073 8.11963C13.0977 7.90869 12.5515 7.80005 12 7.80005V6C12.7879 6 13.5681 6.15527 14.2961 6.45679C15.024 6.7583 15.6855 7.2002 16.2426 7.75732C16.7998 8.31445 17.2418 8.97583 17.5433 9.70386Z"
                        fill="blue" />
                </svg>
            </span>
            <p class="number" id="number">${user.phone}</p>
            <span id="email-icon">
                <svg width="24" height="24" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M3.00977 5.83789C3.00977 5.28561 3.45748 4.83789 4.00977 4.83789H20C20.5523 4.83789 21 5.28561 21 5.83789V17.1621C21 18.2667 20.1046 19.1621 19 19.1621H5C3.89543 19.1621 3 18.2667 3 17.1621V6.16211C3 6.11449 3.00333 6.06765 3.00977 6.0218V5.83789ZM5 8.06165V17.1621H19V8.06199L14.1215 12.9405C12.9499 14.1121 11.0504 14.1121 9.87885 12.9405L5 8.06165ZM6.57232 6.80554H17.428L12.7073 11.5263C12.3168 11.9168 11.6836 11.9168 11.2931 11.5263L6.57232 6.80554Z"
                        fill="blue" />
                </svg>
            </span>
            <p id="email">${user.email}</p>

            <span id="name-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7ZM14 7C14 8.10457 13.1046 9 12 9C10.8954 9 10 8.10457 10 7C10 5.89543 10.8954 5 12 5C13.1046 5 14 5.89543 14 7Z"
                        fill="blue" />
                    <path
                        d="M16 15C16 14.4477 15.5523 14 15 14H9C8.44772 14 8 14.4477 8 15V21H6V15C6 13.3431 7.34315 12 9 12H15C16.6569 12 18 13.3431 18 15V21H16V15Z"
                        fill="blue" />
                </svg>
            </span>
            <p id="name">${user.firstName}  ${user.lastName}</p>

            <span id="dob-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M8 13C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11C8.55228 11 9 11.4477 9 12C9 12.5523 8.55228 13 8 13Z"
                        fill="blue" />
                    <path
                        d="M8 17C7.44772 17 7 16.5523 7 16C7 15.4477 7.44772 15 8 15C8.55228 15 9 15.4477 9 16C9 16.5523 8.55228 17 8 17Z"
                        fill="blue" />
                    <path
                        d="M11 16C11 16.5523 11.4477 17 12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16Z"
                        fill="blue" />
                    <path
                        d="M16 17C15.4477 17 15 16.5523 15 16C15 15.4477 15.4477 15 16 15C16.5523 15 17 15.4477 17 16C17 16.5523 16.5523 17 16 17Z"
                        fill="blue" />
                    <path
                        d="M11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12Z"
                        fill="blue" />
                    <path
                        d="M16 13C15.4477 13 15 12.5523 15 12C15 11.4477 15.4477 11 16 11C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13Z"
                        fill="blue" />
                    <path
                        d="M8 7C7.44772 7 7 7.44772 7 8C7 8.55228 7.44772 9 8 9H16C16.5523 9 17 8.55228 17 8C17 7.44772 16.5523 7 16 7H8Z"
                        fill="blue" />
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M6 3C4.34315 3 3 4.34315 3 6V18C3 19.6569 4.34315 21 6 21H18C19.6569 21 21 19.6569 21 18V6C21 4.34315 19.6569 3 18 3H6ZM18 5H6C5.44772 5 5 5.44772 5 6V18C5 18.5523 5.44772 19 6 19H18C18.5523 19 19 18.5523 19 18V6C19 5.44772 18.5523 5 18 5Z"
                        fill="blue" />
                </svg>
            </span>
            <p id="dob">${user.birthDate}</p>

            <span id="address-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M6 22.8787C4.34315 22.8787 3 21.5355 3 19.8787V9.87866C3 9.84477 3.00169 9.81126 3.00498 9.77823H3C3 9.20227 3.2288 8.64989 3.63607 8.24262L9.87868 2.00002C11.0502 0.828445 12.9497 0.828445 14.1213 2.00002L20.3639 8.24264C20.7712 8.6499 21 9.20227 21 9.77823H20.995C20.9983 9.81126 21 9.84477 21 9.87866V19.8787C21 21.5355 19.6569 22.8787 18 22.8787H6ZM12.7071 3.41423L19 9.70713V19.8787C19 20.4309 18.5523 20.8787 18 20.8787H15V15.8787C15 14.2218 13.6569 12.8787 12 12.8787C10.3431 12.8787 9 14.2218 9 15.8787V20.8787H6C5.44772 20.8787 5 20.4309 5 19.8787V9.7072L11.2929 3.41423C11.6834 3.02371 12.3166 3.02371 12.7071 3.41423Z"
                        fill="blue" />
                </svg>
            </span>
            <p id="address">${user.address}</p>
            <p id="gender">Gender: ${user.gender} <span></span></p>
            <p id="age">Age: ${user.age} <span></span></p>
            <button id="edit-btn">Edit</button>
            <button id="delete-btn">Delete</button>`

        } else {
            console.warn("Invalid Data at " + index)
        }

        // Append the card to the container
        cardsContainer.appendChild(card);

    });
    currentUser(myArray);
}

//Current Users
function currentUser(myArray) {
    const count = myArray.length;
    document.getElementById('accounts').innerHTML = count;
}

// Delete Button
document.getElementById('cards').addEventListener('click', (event) => {
    const btn = event.target.closest('#delete-btn');
    if (btn) {
        const index = btn.closest('.card').getAttribute('data-index'); // Get the index from the card element
        const name = myArray[index].firstName + ' ' + myArray[index].lastName;
        document.getElementById('user-fullname').innerHTML = name;
        console.log(name);
        console.log("Delete Pressed at " + index);

        const deleteWarningPopup = document.getElementById('delete-warning-box');
        if (deleteWarningPopup.style.display === 'none' || deleteWarningPopup.style.display === '') {
            deleteWarningPopup.style.display = 'block';
            deleteWarningPopup.setAttribute('data-index', index); // Set the index to the popup for reference
        }
    }
});

// Delete warning box event listener
document.getElementById('delete-warning-box').addEventListener('click', (event) => {
    const deleteWarningPopup = document.getElementById('delete-warning-box');

    const cancelBtn = event.target.closest('#delete-cancel-btn');
    if (cancelBtn) {
        deleteWarningPopup.style.display = 'none';
        console.log("Cancel Btn Pressed");
    }

    const deleteBtn = event.target.closest('#delete-warning-btn');
    if (deleteBtn) {
        const index = deleteWarningPopup.getAttribute('data-index'); // Retrieve the index from the popup

        // Data Delete Logic
        myArray.splice(index, 1);
        localStorage.setItem('myArray', JSON.stringify(myArray));
        DataRender(myArray); // Re-render the array to reflect changes
        currentUser(myArray);


        //Delete Api Fetch
        function fetchDeleteApi(index) {
            const url = `https://dummyjson.com/users/${index}`;
            fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Network error: " + response.statusText);
                    }
                    console.log("Response is OK", response.status);
                    return response.json();
                })
                .then(data => {
                    console.log("Data sent to API: ", data);
                })
                .catch(error => {
                    console.error("There is an error: ", error);
                });
        }

        fetchDeleteApi(1);

        // Delete PopUp
        const deletePopup = document.getElementById('delete-popup');
        if (deletePopup) {
            deletePopup.style.display = 'block';
            setTimeout(() => {
                deletePopup.style.display = 'none';
            }, 1000);
        }

        // Display none delete warning box
        deleteWarningPopup.style.display = 'none';
    }
});

// Cancel Button to close PopUp
document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('edit').addEventListener('click', (event) => {
        const btn = event.target.closest('#cancel-btn')
        const editPopup = document.querySelector('.edit');
        if (btn) {
            if (editPopup.style.display === 'grid' || editPopup.style.display === '') {
                editPopup.style.display = 'none';
            }
        }
    })

})

//User Click Logout Option
const user = document.getElementById('user');
user.addEventListener('click', () => {
    const logout = document.querySelector('#logout');
    if (logout.style.display === 'none' || logout.style.display === '') {
        logout.style.display = 'block';
    }
    else if (logout.style.display === 'block') {
        logout.style.display = 'none'
    }
})

//Search Function
const searchBtn = document.getElementById('search-btn');
searchBtn.addEventListener('click', () => {
    const input = document.getElementById('search').value; {

        const filteredArray = myArray.filter(user => {
            // Convert all user properties to lowercase for case-insensitive search
            const lowerCaseQuery = input.toLowerCase();
            return (
                user.firstName.toLowerCase().includes(lowerCaseQuery) ||
                user.lastName.toLowerCase().includes(lowerCaseQuery) ||
                user.gender.toLowerCase().includes(lowerCaseQuery) ||
                user.age.toString().includes(lowerCaseQuery) ||
                user.email.toString().includes(lowerCaseQuery) ||
                user.phone.toString().includes(lowerCaseQuery) ||
                user.address.toString().includes(lowerCaseQuery) ||
                user.birthDate.toString().includes(lowerCaseQuery)
            );
        });

        DataRender(filteredArray); // Re-render the filtered data
    }
})

document.addEventListener("DOMContentLoaded", () => {
    let currentIndex;

    // Handle edit button click
    document.getElementById('cards').addEventListener('click', (event) => {
        const btn = event.target.closest('#edit-btn');
        const editPopup = document.querySelector('.edit');
        if (btn) {
            if (editPopup.style.display === 'none' || editPopup.style.display === '') {
                editPopup.style.display = 'grid';
            }

            //Data Show on Edit PopUp
            currentIndex = btn.closest('.card').getAttribute('data-index');
            const userData = myArray[currentIndex];

            //Displaying the data
            document.querySelector('#image-url-edit').value = userData.image;
            document.querySelector('#f-name-edit').value = userData.firstName;
            document.querySelector('#l-name-edit').value = userData.lastName;
            document.querySelector('#phone-number-edit').value = userData.phone;
            document.querySelector('#email-edit').value = userData.email;
            document.querySelector('#address-edit').value = userData.address;
            document.querySelector('#dob-edit').value = userData.birthDate;
            document.querySelector('#age-edit').value = userData.age;
            document.querySelector('#gender-edit').value = userData.gender;
        }
    });

    // Save button click handler
    const saveDataHandler = (event) => {
        const saveBtn = event.target.closest('#save-btn');
        const editPopup = document.querySelector('.edit');
        if (saveBtn) {
            const userData = myArray[currentIndex];

            userData.image = document.querySelector('#image-url-edit').value;
            userData.firstName = document.querySelector('#f-name-edit').value;
            userData.lastName = document.querySelector('#l-name-edit').value;
            userData.phone = document.querySelector('#phone-number-edit').value;
            userData.email = document.querySelector('#email-edit').value;
            userData.address = document.querySelector('#address-edit').value;
            userData.birthDate = document.querySelector('#dob-edit').value;
            userData.age = document.querySelector('#age-edit').value;
            userData.gender = document.querySelector('#gender-edit').value;

            //Saving Data in Array
            myArray[currentIndex] = userData;
            console.log("My Array Data " + myArray[currentIndex].firstName);
            console.log("userData " + userData.firstName);
            DataRender(myArray);

            // Fetch Data from API
            function fetchUpdateApi() {
                const url = 'https://dummyjson.com/users/1'; // Adjust the URL if needed
                fetch(url, {
                    method: 'GET', // Use GET method to retrieve data without making changes
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Network error: " + response.statusText);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log("Data received from API:", data);
                })
                .catch(error => {
                    console.error("There is an error: ", error);
                });
            }

            fetchUpdateApi();

            //Save PopUp
            const savePopup = document.getElementById('save-popup');
            if (savePopup) {
                savePopup.style.display = 'block';
                setTimeout(() => {
                    savePopup.style.display = 'none';
                }, 1000);
            }
            if (editPopup.style.display === 'grid') {
                editPopup.style.display = 'none';
            }
        }
    };

    // Add the save button event listener once
    document.getElementById('edit').addEventListener('click', saveDataHandler);
});



// Add User push to array and Render
function addUserAndRender() {
    const storedUser = localStorage.getItem('newUser');
    if (storedUser) {
        const newUser = JSON.parse(storedUser);
        console.log('User data retrieved:', newUser);

        // Retrieve current myArray from localStorage
        const storedArray = localStorage.getItem('myArray');
        if (storedArray) {
            myArray = JSON.parse(storedArray);
        }

        // Push newUser to myArray
        myArray.push(newUser);
        console.log('My array after push->', myArray.length);

        // Update localStorage with new myArray
        localStorage.setItem('myArray', JSON.stringify(myArray));

        // Render updated myArray
        DataRender(myArray);
        currentUser(myArray);

        // Remove newUser from localStorage
        localStorage.removeItem('newUser');
        //   localStorage.clear()
    } else {
        console.log('No user data found in storage.');
    }
}

// Call addUserAndRender after fetching data
document.addEventListener('DOMContentLoaded', addUserAndRender);


