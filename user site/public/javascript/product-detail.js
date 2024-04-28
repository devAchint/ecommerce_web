const productkey = getQueryParam("productkey");
fetchProduct(productkey);
document.getElementById("addToCart").onclick = addToCart;
document.getElementById("buyNow").onclick =buyNow; 

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
    img.src = data.image;
    title.innerText = data.name;
    price.innerText = data.price;
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

function addToCart() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    alert(isLoggedIn);
    if (isLoggedIn === "true") {
        const user = firebase.auth().currentUser;
        if (user) {
            const displayName = user.displayName;
            const email = user.email;
            const uid = user.uid;
            alert(email);
        } else {
            alert("login again");
            window.location.href = "login.html";
        }
    } else {
        alert("Login first");
        window.location.href = "login.html";
    }
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
                        alert(JSON.stringify(userData));
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
