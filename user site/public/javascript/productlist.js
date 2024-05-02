function getQueryParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

const category = getQueryParam("category");

function fetchProducts() {
  showLoading();
  const productscontainer = document.getElementById("products");
  const dbRef = firebase.database().ref("products");
  dbRef
    .once("value")
    .then((snapshot) => {
      snapshot.forEach((product) => {
        const productdata = product.val();
        if (productdata.category === category) {
          const productdiv = document.createElement("div");
          productdiv.className = "product";
          productdiv.innerHTML = `
                <img src="${productdata.image}"></img>
                <p class="truncate">${productdata.name}</p>
                <p class="price">₹${productdata.price}</p>
            `;
          productscontainer.appendChild(productdiv);
          productdiv.onclick = () => {
            openProductDetail(product.key);
          };
        }
      });
      hideLoading();
    })
    .catch((error) => {
      alert(error);
    });
}

function openProductDetail(productkey) {
  const destinationURL = `product-detail.html?productkey=${encodeURIComponent(
    productkey
  )}`;
  window.location.href = destinationURL;
}

fetchProducts();

function showLoading() {
  document.getElementById("loading").style.display = "block";
}

function hideLoading() {
  document.getElementById("loading").style.display = "none";
}
