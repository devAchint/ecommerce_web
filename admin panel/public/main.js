function login() {
  var email = document.getElementById("login-email").value;
  var password = document.getElementById("login-password").value;

  if (email === '' || password === '') {
    alert("Input is blank!");
  } else if (email != "admin@gmail.com") {
    alert("wrong user id");
  } else {
    showLoading();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        hideLoading();
        var user = userCredential.user;
        window.location.href = 'pages/category.html';
      })
      .catch((error) => {
        hideLoading();
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
      });
  }
}

document.getElementById("submit").onclick = login;

function showLoading() {
  document.getElementById("loading").style.display = "block";
}

function hideLoading() {
  document.getElementById("loading").style.display = "none";
}
