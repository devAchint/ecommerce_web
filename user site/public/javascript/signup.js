function signUp() {
    var email = document.getElementById("signup-email").value;
    var password = document.getElementById("signup-password").value;
    var name = document.getElementById("name").value;
    var address = document.getElementById("address").value;

    if (email === "" || password === "" || name === "" || address === "") {
        alert("Input is blank!");
    } else {
        showLoading();
        disableButton('submit');
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                uploadUser(name, email, address);
            })
            .catch((error) => {
                enableButton('submit');
                hideLoading();
                var errorMessage = error.message;
                alert(errorMessage);
            });
    }
}
document.getElementById("submit").onclick = signUp;

function uploadUser(name, email, address) {
    const dbRef = firebase.database().ref("users");

    dbRef
        .push({
            name: name,
            email: email,
            address: address,
        })
        .then((userCredential) => {
            hideLoading();
            enableButton('submit');
            alert("Signup Successful!");
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userkey',userCredential.key);
        })
        .catch((error) => {
            enableButton('submit');
            hideLoading();
            alert("Error uploading data:" + error);
        });
}

function showLoading() {
    document.getElementById("loading").style.display = 'block';
}

function hideLoading() {
    document.getElementById("loading").style.display = 'none';
}


function disableButton(buttonId) {
    const button = document.getElementById(buttonId);
    if (button) {
        button.disabled = true;
    } else {
        console.error("Button with id '" + buttonId + "' not found.");
    }
}

function enableButton(buttonId) {
    const button = document.getElementById(buttonId);
    if (button) {
        button.disabled = false;
    } else {
        console.error("Button with id '" + buttonId + "' not found.");
    }
}