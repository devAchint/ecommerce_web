function login() {
  var adminemail, adminpass;
  var email = document.getElementById("login-email").value;
  var password = document.getElementById("login-password").value;

  const dbRef = firebase.database().ref("admin");

  dbRef
    .once("value")
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        adminemail = data.email;
        adminpass = data.password;
        if (adminemail != "" || adminpass != "") {
          if (email === "" || password === "") {
            alert("Input is blank!");
          } else if (email === adminemail && password === adminpass) {
            showLoading();
            localStorage.setItem("isAdminLoggedIn", "true");
            window.location.href = "pages/category.html";
          
          } else {
            alert("wrong user id and password");
          }
        }else{
          alert("wait and try again");
        }
      } else {
        alert("No user found");
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

document.getElementById("submit").onclick = login;

function showLoading() {
  document.getElementById("loading").style.display = "block";
}

function hideLoading() {
  document.getElementById("loading").style.display = "none";
}

