firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      window.location.href = 'pages/homepage.html';
    } else {
      // No user is signed in.
      window.location.href = 'pages/login.html';
    }
  });
  
  
  
  document.getElementById("loading").style.display = 'block';
  
  
  