function fetchUsers() {
  const usercontainer = document.getElementById("usercontainer");
  const dbRef = firebase.database().ref("users");
  dbRef
    .once("value")
    .then((snapshot) => {
      snapshot.forEach((user) => {
        const userdata = user.val();
        const userdiv = document.createElement("div");
        userdiv.className = "user";
        userdiv.innerHTML = `
                <h4>Name: ${userdata.name}</h4>
                <h4>Email: ${userdata.email}</h4>
                <button class="deleteBtn">Delete</button>
            `;
        usercontainer.appendChild(userdiv);
        const deleteBtn = userdiv.querySelector(".deleteBtn");
        deleteBtn.onclick = () => {
          deleteUser(user.key, userdiv);
        };
      });
    })
    .catch((error) => {
      console.error("Error fetching categories:", error);
    });
}

function deleteUser(userkey, userdiv) {
  const isLoggedIn = localStorage.getItem("isAdminLoggedIn");
  var user = firebase.auth().getUser(uid);
  if (isLoggedIn) {
    const dbRef = firebase.database().ref("users").child(userkey);
    dbRef
      .remove()
      .then(() => {
        alert("user deleted successfully.");
        userdiv.remove();
      })
      .catch((error) => {
        alert("Error deleting user:", error);
      });
  } else {
    alert("admin is not logged in");
  }
}

fetchUsers();
