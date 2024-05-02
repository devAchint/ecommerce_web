function fetchProfile(key) {
    showLoading();
    const dbRef = firebase.database().ref("users/" + key);

    dbRef
        .once("value")
        .then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                setProfile(data);
            } else {
                alert("No Profile found");
            }
        })
        .catch((error) => {
            hideLoading();
            console.error("Error fetching data:", error);
        });
}

function setProfile(data) {
    var profilename = document.getElementById("name");
    var profilemail = document.getElementById("email");
    var profileaddress = document.getElementById("address");
  
    profilename.innerHTML = `<p>Hello, ${data.name}!<p>`;
    profileaddress.innerHTML = `<p><span class="span">Address:</span> ${data.address}<p>`;
    profilemail.innerHTML = `<p><span class="span">Email:</span> ${data.email}<p>`;
    fetchOrders(data.email);
    hideLoading();
}

function fetchOrders(email) {
    const orderscontainer = document.getElementById("ordercontainer");
    const dbRef = firebase.database().ref("orders");
    dbRef
        .once("value")
        .then((snapshot) => {
            snapshot.forEach((order) => {
                const orderdata = order.val();
                if (orderdata.email === email) {
                    const orderdiv = document.createElement("div");
                    orderdiv.className = "order";
                    orderdiv.innerHTML = `
                    <div class="orderdetails">
                    <p><span class="span">Name:</span> ${orderdata.name}<p>
                    <p><span class="span">Email:</span> ${orderdata.email}<p>
                    <p><span class="span">Product:</span> ${orderdata.productName}<p>
                    <p><span class="span">Address:</span> ${orderdata.address}<p>
                    <p><span class="span">Total:</span> ₹${orderdata.TotalOrderPrice}<p></div>
                <div class="orderimage"><img src="${orderdata.productimage}"></img></div>
                
            `;
                    orderscontainer.appendChild(orderdiv);
                }
            });
        })
        .catch((error) => {
            alert(error);
            console.error("Error fetching categories:", error);
        });
}

const userkey = localStorage.getItem("userkey");
fetchProfile(userkey);

function showLoading() {
    document.getElementById("loading").style.display = "block";
}

function hideLoading() {
    let container = document.getElementById("maincontainer");
    container.classList.toggle("load");
    document.getElementById("loading").style.display = "none";
}
