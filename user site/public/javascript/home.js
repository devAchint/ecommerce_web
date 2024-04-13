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
        });
    }).catch((error) => {
        console.error("Error fetching categories:", error);
    });
};

fetchCategories();