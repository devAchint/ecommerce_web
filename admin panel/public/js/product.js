function fetchCategories() {
  const categoriesContainer = document.getElementById("productcategory");
  const dbRef = firebase.database().ref("product-categories");
  dbRef
    .once("value")
    .then((snapshot) => {
      snapshot.forEach((category) => {
        const categoryData = category.val();
        const option = document.createElement("option");
        option.value = categoryData.name;
        option.textContent = categoryData.name;
        categoriesContainer.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Error fetching categories:", error);
    });
}

fetchCategories();

function uploadData(name, image, category, bestseller, featured, price) {
  const dbRef = firebase.database().ref("products");

  dbRef
    .push({
      name: name,
      image: image,
      category: category,
      bestseller: bestseller,
      featured: featured,
      price: price,
    })
    .then(() => {
      alert("Data uploaded successfully!");
    })
    .catch((error) => {
      alert("Error uploading data:" + error);
    });
}

function uploadProduct() {
  var productname = document.getElementById("productname").value;
  var productimage = document.getElementById("productimage").value;
  var productcategory = document.getElementById("productcategory").value;
  var bestseller = document.getElementById("bestseller").value;
  var featured = document.getElementById("featured").value;
  var price = document.getElementById("price").value;

  const isLoggedIn = localStorage.getItem("isAdminLoggedIn");

  if (isLoggedIn) {
    if (
      productname === "" ||
      productimage === "" ||
      productcategory === "" ||
      price === ""
    ) {
      alert("Input is blank!");
    } else {
      uploadData(
        productname,
        productimage,
        productcategory,
        bestseller,
        featured,
        price
      );
    }
  } else {
    alert("User is not logged in");
  }
}

document.getElementById("submit").onclick = uploadProduct;
