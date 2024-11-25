const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});


// sign up api start
document.getElementById('signUpForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Gather form data
    const formData = new FormData(event.target);
    const data = {};
    console.log(data)
    formData.forEach((value, key) => {
        data[key] = value;
    });
    const token = localStorage.getItem('token');
    try {
        // Send a POST request to your signup API
        const response = await fetch('http://192.168.1.6:3000/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        // Handle response
        if (response.ok) {
            const result = await response.json();
            console.log('Signup successful:', result);
            alert('Signup successful!');
            // You can redirect the user or show a success message here
        } else {
            const error = await response.json();
            console.error('Signup failed:', error);
            alert(data.error || 'Signup failed!');
            // Handle errors here
        }
    } catch (error) {
        console.error('Network error:', error);
        // Handle network errors here
    }
});

// sign up api end

// ctreate candidate start
document.getElementById('addCandidateForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Gather form data
    const formData = new FormData(event.target);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    const token = localStorage.getItem('token');
    try {
        // Send a POST request to your signup API
        const response = await fetch('http://192.168.1.6:3000/candidate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        // Handle response
        if (response.ok) {
            const result = await response.json();
            console.log('Candidate Add successful:', result);
            alert('Created successful!');
            // You can redirect the user or show a success message here
        } else {
            const error = await response.json();
            console.error('Add failed:', error);
            alert(data.error || 'Creation failed!');
            // Handle errors here
        }
    } catch (error) {
        console.error('Network error:', error);
        // Handle network errors here
    }
});
// ctreate candidate end