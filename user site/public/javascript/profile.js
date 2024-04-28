function fetchProfile(key) {
    showLoading();
    const dbRef = firebase.database().ref('users/' + key);

    dbRef.once('value').then((snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            setProfile(data);
        } else {
            alert('No Profile found');
        }
    }).catch((error) => {
        hideLoading();
        console.error('Error fetching data:', error);
    });
}

function setProfile(data) {
    var profilename = document.getElementById("name");
    var profilemail = document.getElementById("email");
    var profileaddress = document.getElementById("address");

    profilename.innerText=data.name;
    profileaddress.innerText="Address:"+data.address;
    profilemail.innerText=data.email;
    hideLoading();
}

const userkey = localStorage.getItem('userkey');
fetchProfile(userkey);

function showLoading(){
    document.getElementById("loading").style.display='block';
}

function hideLoading(){
    let container = document.getElementById("maincontainer");
    container.classList.toggle("load");
    document.getElementById("loading").style.display = "none";
}