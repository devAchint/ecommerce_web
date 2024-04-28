function fetchSliders() {
  const sliderContainer = document.getElementById("slidercontainer");
  const dbRef = firebase.database().ref("sliders");
  dbRef
    .once("value")
    .then((snapshot) => {
      snapshot.forEach((slide) => {
        const sliderData = slide.val();
        const sliderdiv = document.createElement("div");
        sliderdiv.className = "slide";
        sliderdiv.innerHTML = `
                <img src="${sliderData.image}"></img>
                <button class="deleteBtn">Delete</button>
            `;
        sliderContainer.appendChild(sliderdiv);
        const deleteBtn = sliderdiv.querySelector(".deleteBtn");
        deleteBtn.onclick = () => {
          deleteSlide(slide.key, sliderdiv);
        };
      });
    })
    .catch((error) => {
      console.error("Error fetching categories:", error);
    });
}

function deleteSlide(slidekey, slidediv) {
  const isLoggedIn = localStorage.getItem("isAdminLoggedIn");

  if (isLoggedIn) {
    const dbRef = firebase.database().ref("sliders").child(slidekey);
    dbRef
      .remove()
      .then(() => {
        alert("slide deleted successfully.");
        slidediv.remove();
      })
      .catch((error) => {
        alert("Error deleting slide:", error);
      });
  } else {
    alert("User is not logged in");
  }
}
fetchSliders();
