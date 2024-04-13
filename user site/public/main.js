
// script.js
function handleClick() {
    alert('You clicked the heading!');
}

function navigateToLogin() {
    window.location.href = "login.html"
}

function navigateToSignUp() {
    window.location.href = "signup.html"
}

function navigateToProductList() {
    window.location.href = "product_list.html"
}

function navigateToAboutUs() {
    window.location.href = "about.html";
}

function navigateToHomePage() {
    alert("welcome");
    window.location.href = "pages/homepage.html";
}

// signup code

function signUp() {
    var email = document.getElementById("signup-email").value;
    var password = document.getElementById("signup-password").value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var user = userCredential.user;
            alert(`${user.email} is successfully registered`);
            navigateToHomePage();
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        });
}


// login using Firebase authentication
function login() {
    var email = document.getElementById("login-email").value;
    var password = document.getElementById("login-password").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var user = userCredential.user;
            alert(`Welcome back, ${user.email}!`);
            navigateToHomePage();
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        });
}

