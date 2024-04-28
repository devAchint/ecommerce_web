function fetchOrders() {
  const orderscontainer = document.getElementById("orderscontainer");
  const dbRef = firebase.database().ref("orders");
  dbRef
    .once("value")
    .then((snapshot) => {
      snapshot.forEach((order) => {
        const orderData = order.val();
        const orderDiv = document.createElement("div");
        orderDiv.className = "order";
        orderDiv.innerHTML = `
               <p>Name :${orderData.name}</p>
                <p>Email :${orderData.email}</p>
                <p>Address :${orderData.address}</p>
                <p>Product name :${orderData.productName}</p>
                <p>Product Id :${orderData.productId}</p>
                <p>Quantity :${orderData.quantity}</p>
                <p>TotalPrice :${orderData.TotalOrderPrice}</p>
                <button class="deleteBtn">Remove Order</button>
            `;
        orderscontainer.appendChild(orderDiv);

        const deleteBtn = orderDiv.querySelector(".deleteBtn");
        deleteBtn.onclick = () => {
          deleteOrder(order.key, orderDiv);
        };
      });
    })
    .catch((error) => {
      alert("Error fetching orders:", error);
      console.log(error);
    });
}

fetchOrders();

function deleteOrder(categoryKey, categoryDiv) {
  const isLoggedIn = localStorage.getItem("isAdminLoggedIn");

  if (isLoggedIn) {
    const dbRef = firebase
      .database()
      .ref("orders")
      .child(categoryKey);
    dbRef
      .remove()
      .then(() => {
        alert("Category deleted successfully.");
        categoryDiv.remove();
      })
      .catch((error) => {
        alert("Error deleting category:", error);
      });
  } else {
    alert("User is not logged in");
  }
}
