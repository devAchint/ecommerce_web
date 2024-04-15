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

document.getElementById("submit").onclick = login;