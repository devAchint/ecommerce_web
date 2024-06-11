function uploadComplaint() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;

    if (name === '' || email === '' || message === '') {
        alert('Input is blank!');
    } else {
        uploadData(name, email, message);
    }
}

function uploadData(name, email, message) {
    showLoading();
    const dbRef = firebase.database().ref("queries");

    dbRef.push({
        name: name,
        email: email,
        message: message
    }).then(() => {
        hideLoading();
        alert("Message Received successfully!");
        emptyFields();
    }).catch((error) => {
        hideLoading();
        alert("Error uploading data:" + error);
    });
}

function emptyFields() {
    document.getElementById("name").value="";
    document.getElementById("email").value="";
    document.getElementById("message").value="";
  }

document.getElementById("submit").onclick =uploadComplaint;

function showLoading(){
    document.getElementById("loading").style.display='block';
}

function hideLoading(){
    document.getElementById("loading").style.display='none';
}