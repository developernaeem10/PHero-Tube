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
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((response) => response.json())
    .then((data) => displayVideos(data.videos));
}

// {category_id: '1003', video_id: 'aaak', thumbnail: 'https://i.ibb.co/ZNggzdm/cake.jpg', title: 'Beyond The Pale', authors: Array(1), …}
// authors
// :
// [{…}]
// category_id
// :
// "1003"
// description
// :
// "'Beyond The Pale' by Jim Gaffigan, with 2.6K views, is a comedic gem that explores everyday observations and family life with a light-hearted and witty approach. Jim's humor is accessible and delightful, making this show perfect for anyone who enjoys clean, observational comedy."
// others
// :
// {views: '2.6K', posted_date: '15400'}
// thumbnail
// :
// "https://i.ibb.co/ZNggzdm/cake.jpg"
// title
// :
// "Beyond The Pale"
// video_id
// :
// "aaak"
// [[Prototype]]
// :
// Object

const displayVideos = (videos) => {
  const videoContainer = document.getElementById("video-container");

  videos.forEach((video) => {
    console.log(video);
    const videoCard = document.createElement("div");
    videoCard.innerHTML = `
        <div class="card bg-base-100 shadow-sm">
        <figure class="relative">
          <img class="w-full h-[250px] object-cover" src="${video.thumbnail}" alt="Shoes" />
          <span
            class="absolute bottom-2 right-2 text-white bg-black px-2 rounded text-sm"
          >
            3hrs 56 min ago
          </span>
        </figure>
        <div class="flex py-5 gap-5">
          <div>
            <div class="avatar">
              <div
                class="ring-primary ring-offset-base-100 w-12 rounded-full ring-2 ring-offset-2"
              >
                <img
                  src="${video.authors[0].profile_picture}"
                />
              </div>
            </div>
          </div>
          <div>
            <h2 class="text-lg font-semibold">${video.title}</h2>
            <div class="flex gap-1">
              <p class="text-gray-400">${video.authors[0].profile_name}</p>
              <img class="w-6 h-6" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" alt="">
            </div>
            <p class="text-sm text-gray-400">${video.others.views} views</p>

          </div>
        </div>
      </div>
    `;
    videoContainer.appendChild(videoCard);
  });
};

loadData();
loadVideos();
