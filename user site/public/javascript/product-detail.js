function getQueryParam(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(param);
}

const productkey = getQueryParam('productkey');

function fetchProduct(key) {
    showLoading();
    const dbRef = firebase.database().ref('products/' + key);

    dbRef.once('value').then((snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            setProduct(data);
            // Do something with the data
        } else {
            alert('No product found');
        }
    }).catch((error) => {
        console.error('Error fetching data:', error);
    });
}


function setProduct(data) {
    const img = document.getElementById("productimage");
    const title = document.getElementById("product-title");
    const price = document.getElementById("product-price");
    img.src = data.image;
    title.innerText = data.name;
    price.innerText=data.price;
    hideLoading();
}

function showLoading(){
    document.getElementById("loading").style.display='block';
}

function hideLoading(){
    document.getElementById("loading").style.display='none';
}

fetchProduct(productkey);

