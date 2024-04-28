function login() {
  var email = document.getElementById("login-email").value;
  var password = document.getElementById("login-password").value;

  if (email === '' || password === '') {
    alert("Input is blank!");
  } else if (email != "admin@gmail.com" && password!="admin2093@") {
    alert("wrong user id and password");
  } else {
    showLoading();
    localStorage.setItem('isAdminLoggedIn', 'true');
    window.location.href = 'pages/category.html';
  }
}

document.getElementById("submit").onclick = login;

function showLoading() {
  document.getElementById("loading").style.display = "block";
}

function hideLoading() {
  document.getElementById("loading").style.display = "none";
}
