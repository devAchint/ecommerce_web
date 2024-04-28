function fetchProducts() {
  const productscontainer = document.getElementById("products");
  const dbRef = firebase.database().ref("products");
  dbRef
    .once("value")
    .then((snapshot) => {
      const count = snapshot.numChildren();
      if (count == 0) {
        alert("empty");
      }
      snapshot.forEach((product) => {
        const productdata = product.val();
        const productdiv = document.createElement("div");
        productdiv.className = "product";
        productdiv.innerHTML = `
                <img src="${productdata.image}"></img>
                <p>${productdata.name}</p>
                <p>${productdata.category}</p>
                <p>Bestseller: ${productdata.bestseller}</p>
                <p>Featured: ${productdata.featured}</p>
                <p>price:${productdata.price}</p>
                <button class="deleteBtn">Delete</button>
            `;
        productscontainer.appendChild(productdiv);

        const deleteBtn = productdiv.querySelector(".deleteBtn");
        deleteBtn.onclick = () => {
          deleteProduct(product.key, productdiv);
        };
      });
    })
    .catch((error) => {
      alert("Error fetching categories:", error);
      console.log(error);
    });
}

fetchProducts();

function deleteProduct(productkey, productdiv) {
  const isLoggedIn = localStorage.getItem("isAdminLoggedIn");

  if (isLoggedIn) {
    const dbRef = firebase.database().ref("products").child(productkey);
    dbRef
      .remove()
      .then(() => {
        alert("product deleted successfully.");
        productdiv.remove();
      })
      .catch((error) => {
        alert("Error deleting product:", error);
      });
  } else {
    alert("User is not logged in");
  }
}
