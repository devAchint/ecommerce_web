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
                <button class="deleteBtn">Delete</button>
            `;
            categoriesContainer.appendChild(categoryDiv);

            const deleteBtn = categoryDiv.querySelector('.deleteBtn');
            deleteBtn.onclick = () => {
                deleteCategory(category.key, categoryDiv);
            };
        });
    }).catch((error) => {
        alert("Error fetching categories:", error);
        console.log(error);
    });
};

fetchCategories();

function deleteCategory(categoryKey, categoryDiv) {
    const dbRef = firebase.database().ref("product-categories").child(categoryKey);
    dbRef.remove()
        .then(() => {
            alert("Category deleted successfully.");
            categoryDiv.remove();
        })
        .catch((error) => {
            alert("Error deleting category:", error);
        });
}