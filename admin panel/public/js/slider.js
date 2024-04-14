function uploadData(image) {
  const dbRef = firebase.database().ref("sliders");

  dbRef
    .push({
      image: image,
    })
    .then(() => {
      alert("Data uploaded successfully!");
    })
    .catch((error) => {
      alert("Error uploading data:" + error);
    });
}

function uploadSlider() {
  var image = document.getElementById("productimage").value;

  if (image === "") {
    alert("Input is blank!");
  } else {
    uploadData(image);
  }
}
document.getElementById("submit").onclick = uploadSlider;
