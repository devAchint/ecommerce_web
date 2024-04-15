function uploadData(category,imageurl) {
    const dbRef = firebase.database().ref("product-categories");
    dbRef.push({
        name: category,
        image: imageurl
    }).then(() => {
        alert("Data uploaded successfully!");
    }).catch((error) => {
        alert("Error uploading data:" + error);
    });
}

function addcategory(){
    var category=document.getElementById("categoryname").value;
    var imageurl=document.getElementById("imageurl").value;
    if (category === ''||imageurl==='') {
        alert('Input is blank!');
    } else {
        uploadData(category,imageurl);
    }

}

document.getElementById("submit").onclick = addcategory;