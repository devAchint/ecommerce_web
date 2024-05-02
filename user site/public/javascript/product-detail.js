const productkey = getQueryParam("productkey");
var image;

fetchProduct(productkey);
document.getElementById("buyNow").onclick = buyNow;

document.getElementById("minus-button").onclick = reduceQuantity;
document.getElementById("plus-button").onclick = increaseQuantity;

function increaseQuantity() {
    var quantity = document.getElementById("quantity-text");
    var value = parseInt(quantity.innerHTML);
    quantity.innerHTML = value + 1;
}

function reduceQuantity() {
    var quantity = document.getElementById("quantity-text");
    var value = parseInt(quantity.innerHTML);
    if (value > 1) {
        quantity.innerHTML = value - 1;
    }
}

function getQueryParam(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(param);
}

function fetchProduct(key) {
    showLoading();
    const dbRef = firebase.database().ref("products/" + key);

    dbRef
        .once("value")
        .then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                setProduct(data);
                // Do something with the data
            } else {
                alert("No product found");
            }
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
}

function setProduct(data) {
    const img = document.getElementById("productimage");
    const title = document.getElementById("product-title");
    const price = document.getElementById("product-price");
    image = data.image;
    img.src=image;
    title.innerText = data.name;
    price.innerText = "₹" + data.price;
    hideLoading();
}

function showLoading() {
    document.getElementById("loading").style.display = "block";
}

function hideLoading() {
    let container = document.getElementById("product-container");
    container.classList.toggle("load");
    document.getElementById("loading").style.display = "none";
}



function buyNow() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
        const user = firebase.auth().currentUser;
        if (user) {
            const email = user.email;
            const dbRef = firebase.database().ref('users').orderByChild("email").equalTo(email);

            dbRef.once('value').then((snapshot) => {
                if (snapshot.exists()) {
                    snapshot.forEach((childSnapshot) => {
                        const userData = childSnapshot.val();
                        const productName = document.getElementById("product-title").innerHTML;
                        const quantity = document.getElementById("quantity-text").innerHTML;
                        const price = document.getElementById("product-price").innerHTML.trim().replace('₹', '');
                        const totalPrice = parseInt(price) * quantity;
                        placeOrder(userData.name, userData.email, userData.address, productName, productkey, quantity, totalPrice,image);

                    });
                } else {
                    alert('No user found');
                }
            }).catch((error) => {
                console.error(error);
            });



        } else {
            alert("login again");
            window.location.href = "login.html";
        }
    } else {
        alert("Login first");
        window.location.href = "login.html";
    }
}

function placeOrder(name, email, address, productName, productId, Quantity, TotalOrderPrice,productimage) {

    const dbRef = firebase.database().ref("orders");

    dbRef.push({
        name: name,
        email: email,
        address: address,
        productName: productName,
        productId: productId,
        quantity: Quantity,
        TotalOrderPrice: TotalOrderPrice,
        productimage:productimage
    }).then(() => {
        alert("Order placed successfully!");
    }).catch((error) => {
        alert("Error placing order:" + error);
    });

}
