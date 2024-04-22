showLoading();
fetchSliders();
fetchFeatured();
fetchBestSellers();
fetchCategories();
function fetchSliders() {
    const sliderContainer = document.getElementById("sliders");
    const dbRef = firebase.database().ref("sliders");
    dbRef.once('value').then((snapshot) => {
        snapshot.forEach((slider) => {
            const sliderData = slider.val();
            const sliderImg = document.createElement("img");
            sliderImg.src = sliderData.image;
            sliderContainer.appendChild(sliderImg);
        });
    }).catch((error) => {
        console.error("Error fetching sliders:", error);
    });
}

fetchSliders();

let currentSlide = 0;
const slides = document.querySelectorAll('.sliders img');
const slideInterval = setInterval(nextSlide, 3000); // Change slide every 3 seconds

function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}

function fetchCategories() {
    const categoriesContainer = document.getElementById("categoriesContainer");

    const dbRef = firebase.database().ref("product-categories");
    dbRef.once('value').then((snapshot) => {
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
    }).catch((error) => {
        console.error("Error fetching categories:", error);
    });
};

function fetchBestSellers() {
    const bestsellercontainer = document.getElementById("bestseller");
    const dbRef = firebase.database().ref("products");
    dbRef.once('value').then((snapshot) => {
        snapshot.forEach((product) => {
            const productdata = product.val();
            if (productdata.bestseller === "true") {
                const productdiv = document.createElement("div");
                productdiv.className = "product";
                productdiv.innerHTML = `
                  <img src="${productdata.image}"></img>
                  <p>${productdata.name}</p>
                  <p class="price">₹${productdata.price}</p>
                `;
                bestsellercontainer.appendChild(productdiv);
            }
        });
    }).catch((error) => {
        console.error("Error fetching products:", error);
    });
};

function fetchFeatured() {
    const featuredcontainer = document.getElementById("featured");
    const dbRef = firebase.database().ref("products");
    dbRef.once('value').then((snapshot) => {
        snapshot.forEach((product) => {
            const productdata = product.val();
            if (productdata.featured === "true") {
                const productdiv = document.createElement("div");
                productdiv.className = "product";
                productdiv.innerHTML = `
                  <img src="${productdata.image}"></img>
                  <p>${productdata.name}</p>
                  <p class="price">₹${productdata.price}</p>
                `;
                featuredcontainer.appendChild(productdiv);
            }
        });
        hideLoading();
    }).catch((error) => {
        console.error("Error fetching products:", error);
    });
};

function openProductPage(category) {
    const destinationURL = `product_list.html?category=${encodeURIComponent(category)}`;
    window.location.href = destinationURL;
}


function goToProfile() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn) {
        window.location.href = 'profile.html';
    } else {
        window.location.href = 'login.html';
    }
}

function showMenu() {
    let submenu = document.getElementById("subMenu");
    submenu.classList.toggle("open-menu");
}

document.getElementById("profile").onclick = showMenu;


function showLoading() {
    document.getElementById("loading").style.display = 'block';
}

function hideLoading() {
    let container = document.getElementById("container");
    container.classList.toggle("load");
    document.getElementById("loading").style.display = 'none';
}
