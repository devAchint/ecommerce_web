showLoading();
fetchSliders();
fetchFeatured();
fetchBestSellers();
fetchCategories();

function fetchSliders() {
    const sliderContainer = document.getElementById("sliderContainer");
    const dbRef = firebase.database().ref("sliders");
    dbRef
        .once("value")
        .then((snapshot) => {
            snapshot.forEach((category) => {
                const sliderdata = category.val();
                const sliderdiv = document.createElement("div");
                sliderdiv.className = "carousel-item";
                sliderdiv.innerHTML = `
                <img src="${sliderdata.image}"></img>
            `;
                sliderContainer.appendChild(sliderdiv);
            });
        })
        .catch((error) => {
            console.error("Error fetching categories:", error);
        });
}

function fetchCategories() {
    const categoriesContainer = document.getElementById("categoriesContainer");

    const dbRef = firebase.database().ref("product-categories");
    dbRef
        .once("value")
        .then((snapshot) => {
            snapshot.forEach((category) => {
                const categoryData = category.val();
                const categoryDiv = document.createElement("div");
                categoryDiv.className = "category";
                categoryDiv.innerHTML = `
                <img src="${categoryData.image}"></img>
                <p>${categoryData.name}</p>
            `;
                categoriesContainer.appendChild(categoryDiv);
                categoryDiv.onclick = () => {
                    openProductPage(categoryData.name);
                };
            });
        })
        .catch((error) => {
            console.error("Error fetching categories:", error);
        });
}

function fetchBestSellers() {
    const bestsellercontainer = document.getElementById("bestseller");
    const dbRef = firebase.database().ref("products");
    dbRef
        .once("value")
        .then((snapshot) => {
            snapshot.forEach((product) => {
                const productdata = product.val();
                if (productdata.bestseller === "true") {
                    const productdiv = document.createElement("div");
                    productdiv.className = "product";
                    productdiv.innerHTML = `
                  <img src="${productdata.image}"></img>
                  <p class="truncate">${productdata.name}</p>
                  <p class="price">₹${productdata.price}</p>
                `;
                    bestsellercontainer.appendChild(productdiv);
                    productdiv.onclick = () => {
                        openProductDetail(product.key);
                    };
                }
            });
        })
        .catch((error) => {
            console.error("Error fetching products:", error);
        });
}

function fetchFeatured() {
    const featuredcontainer = document.getElementById("featured");
    const dbRef = firebase.database().ref("products");
    dbRef
        .once("value")
        .then((snapshot) => {
            snapshot.forEach((product) => {
                const productdata = product.val();
                if (productdata.featured === "true") {
                    const productdiv = document.createElement("div");
                    productdiv.className = "product";

                    productdiv.innerHTML = `
                  <img src="${productdata.image}"></img>
                  <p class="truncate">${productdata.name}</p>
                  <p class="price">₹${productdata.price}</p>
                `;
                    featuredcontainer.appendChild(productdiv);
                    productdiv.onclick = () => {
                        openProductDetail(product.key);
                    };
                }
            });
            hideLoading();
        })
        .catch((error) => {
            console.error("Error fetching products:", error);
        });
}


function openProductPage(category) {
    const destinationURL = `product_list.html?category=${encodeURIComponent(
        category
    )}`;
    window.location.href = destinationURL;
}

function openProductDetail(productkey) {
    const destinationURL = `product-detail.html?productkey=${encodeURIComponent(
        productkey
    )}`;
    window.location.href = destinationURL;
}


function showLoading() {
    document.getElementById("loading").style.display = "block";
}

function hideLoading() {
    let container = document.getElementById("mycontainer");
    container.classList.toggle("load");
    document.getElementById("loading").style.display = "none";
}

