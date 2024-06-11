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
function searchProduct() {
  const key = document.getElementById("productkey").value;
  const dbRef = firebase.database().ref("products/" + key);

  dbRef
    .once("value")
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        document.getElementById("productname").value = data.name;
        document.getElementById("productimage").value = data.image;
        document.getElementById("productcategory").value = data.category;
        document.getElementById("bestseller").value = data.bestseller;
        document.getElementById("featured").value = data.featured;
        document.getElementById("price").value = data.price;
        document.getElementById("description").value = data.description;
      } else {
        alert("No product found");
      }
    })
    .catch((error) => {
      alert("Error fetching data:", error);
    });
}
function updateProduct() {
  const key = document.getElementById("productkey").value;
  const dbRef = firebase.database().ref("products/" + key);

  var name = document.getElementById("productname").value;
  var image = document.getElementById("productimage").value;
  var category = document.getElementById("productcategory").value;
  var bestseller = document.getElementById("bestseller").value;
  var featured = document.getElementById("featured").value;
  var price = document.getElementById("price").value;
  var description = document.getElementById("description").value;

  dbRef
    .update({
      name: name,
      image: image,
      category: category,
      bestseller: bestseller,
      featured: featured,
      price: price,
      description: description,
    })
    .then(() => {
      alert("Data updated successfully!");
      emptyFields();
    })
    .catch((error) => {
      alert("Error uploading data:" + error);
    });
}

function emptyFields() {
  document.getElementById("productname").value = "";
  document.getElementById("productimage").value = "";
  document.getElementById("productcategory").value = "";
  document.getElementById("bestseller").value = "";
  document.getElementById("featured").value = "";
  document.getElementById("price").value = "";
  document.getElementById("description").value = "";
}

function uploadData(
  name,
  image,
  category,
  bestseller,
  featured,
  price,
  description
) {
  const dbRef = firebase.database().ref("products");

  dbRef
    .push({
      name: name,
      image: image,
      category: category,
      bestseller: bestseller,
      featured: featured,
      price: price,
      description: description,
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
  var description = document.getElementById("description").value;

  const isLoggedIn = localStorage.getItem("isAdminLoggedIn");

  if (isLoggedIn) {
    if (
      productname === "" ||
      productimage === "" ||
      productcategory === "" ||
      price === "" ||
      description === ""
    ) {
      alert("Input is blank!");
    } else {
      uploadData(
        productname,
        productimage,
        productcategory,
        bestseller,
        featured,
        price,
        description
      );
    }
  } else {
    alert("User is not logged in");
  }
}

const searchbutton = document.getElementById("search");
const productkey = document.getElementById("productkeydiv");
const updatebutton = document.getElementById("update");
const submitbutton = document.getElementById("submit");
searchbutton.style.display = "none";
productkey.style.display = "none";
updatebutton.style.display = "none";

document.getElementById("addtype").addEventListener("change", function () {
  var selectedValue = this.value;

  if (selectedValue === "update") {
    searchbutton.style.display = "block";
    productkey.style.display = "flex";
    updatebutton.style.display = "block";
    submitbutton.style.display = "none";
  } else if (selectedValue === "new") {
    searchbutton.style.display = "none";
    productkey.style.display = "none";
    updatebutton.style.display = "none";
    submitbutton.style.display = "block";
  }
});

document.getElementById("submit").onclick = uploadProduct;
document.getElementById("search").onclick = searchProduct;
document.getElementById("update").onclick = updateProduct;
