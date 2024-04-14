function fetchProfile(key) {
    const dbRef = firebase.database().ref('users/' + key);

    dbRef.once('value').then((snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            setProfile(data);
        } else {
            alert('No Profile found');
        }
    }).catch((error) => {
        console.error('Error fetching data:', error);
    });
}

function setProfile(data) {
    var profilename = document.getElementById("name");
    var profilemail = document.getElementById("email");
    var profileaddress = document.getElementById("address");

    profilename.innerText=data.name;
    profileaddress.innerText=data.address;
    profilemail.innerText=data.email;
}

const userkey = localStorage.getItem('userkey');
fetchProfile(userkey);