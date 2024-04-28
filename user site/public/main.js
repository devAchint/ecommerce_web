checkLogin();
function checkLogin() {
  var login = document.getElementById("menu-login");
  var logout = document.getElementById("menu-logOut");
  var profile = document.getElementById("menu-profile");


  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      login.style.display = 'none';
      logout.style.display = 'block';
      profile.style.display = 'block';
    } else {
      login.style.display = 'block';
      logout.style.display = 'none';
      profile.style.display = 'none';
    }
  });

}

function logout() {
  firebase.auth().signOut()
    .then(function () {
      localStorage.setItem('isLoggedIn', 'false');
     window.location.href = 'homepage.html';
    })
    .catch(function (error) {
      alert(error);
    });
}

function openContact() {
  window.location.href = 'contact.html';
}
function openLogin() {
  window.location.href = 'login.html';
}

function goToProfile() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn) {
    window.location.href = "profile.html";
  } else {
    window.location.href = "login.html";
  }
}

function showMenu() {
  let submenu = document.getElementById("subMenu");
  submenu.classList.toggle("open-menu");
}

function goToAbout(){
  window.location.href = 'about.html';
}
function goToContact(){
  window.location.href = 'contact.html';
}
function goToHome(){
  window.location.href = 'homepage.html';
}

document.getElementById("profile").onclick = showMenu;
document.getElementById("menu-login").onclick = openLogin;
document.getElementById("menu-profile").onclick = goToProfile;
document.getElementById("menu-help").onclick = openContact;
document.getElementById("menu-logOut").onclick = logout;
document.getElementById("home").onclick = goToHome;
document.getElementById("contact").onclick = goToContact;
document.getElementById("about").onclick = goToAbout;