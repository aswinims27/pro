function showNurseLogin() {
    document.getElementById('nurseLogin').style.display = 'block';
    document.getElementById('userLogin').style.display = 'none';
}

function showUserLogin() {
    document.getElementById('nurseLogin').style.display = 'none';
    document.getElementById('userLogin').style.display = 'block';
}

function nurseLogin() {
    const username = document.getElementById('nurseUsername').value;
    const password = document.getElementById('nursePassword').value;

    if (username === 'nurse1' && password === 'password123') {
        alert('Nurse logged in');
        // Redirect to health report page
        window.location.href = 'healthreport.html';
    } else {
        alert('Invalid nurse credentials');
    }
}

function userLogin() {
    const username = document.getElementById('userUsername').value;
    const password = document.getElementById('userPassword').value;

    if (username === 'user1' && password === 'password123') {
        alert('User logged in');
        // Redirect to user home page
        window.location.href = 'swipper.html';
    } else {
        alert('Invalid user credentials');
    }
}
