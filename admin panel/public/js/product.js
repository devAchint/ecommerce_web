
function uploadData(name, image, category) {
    const dbRef = firebase.database().ref("products");

    dbRef.push({
        name: name,
        image: image,
        category: category
    }).then(() => {
        alert("Data uploaded successfully!");
    }).catch((error) => {
        alert("Error uploading data:" + error);
    });
}

function uploadProduct() {
    var productname = document.getElementById("productname").value;
    var productimage = document.getElementById("productimage").value;
    var productcategory = document.getElementById("productcategory").value;

    if (productname === '' || productimage === '' || productcategory === '') {
        alert('Input is blank!');
    } else {
        uploadData(productname, productimage, productcategory);
    }
}

document.getElementById("submit").onclick = uploadProduct;