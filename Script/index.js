function loadData() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((response) => response.json())
    .then((data) => categories(data.categories));
}

// "category_id": "1001",
// "category": "Music"

function categories(cat) {
  const categoryContainer = document.getElementById("category-container");
  for (const c of cat) {
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
        <button class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${c.category}</button>
        `;
    categoryContainer.appendChild(categoryDiv);
  }
}

function loadVideos() {
    
}

loadData();
loadVideos();
