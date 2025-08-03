const showLoader =()=>{
  document.getElementById('loader').classList.remove('hidden')
  document.getElementById('video-container').classList.add('hidden')
}
const hideLoader =()=>{
  document.getElementById('loader').classList.add('hidden')
  document.getElementById('video-container').classList.remove('hidden')
}

function removeActiveClass (){
  const activeButtons = document.getElementsByClassName('active')

  for (let btn of activeButtons){
    btn.classList.remove('active')
  }
  console.log(activeButtons)
}

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
        <button id="btn-${c.category_id}" onclick="categoryLoadVideos(${c.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${c.category}</button>
        `;
    categoryContainer.appendChild(categoryDiv);
  }
}

function loadVideos(searchtext = "") {
  showLoader()
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchtext}`)
    .then((response) => response.json())
    .then((data) => {
      removeActiveClass()
      document.getElementById('btn-all').classList.add('active')
      displayVideos(data.videos)
    }
    );
}

const categoryLoadVideos = (id) => {
  showLoader()
  const url = `
  https://openapi.programming-hero.com/api/phero-tube/category/${id}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass()
      const clickedButton = document.getElementById(`btn-${id}`);
      clickedButton.classList.add("active");
      displayVideos(data.category);
    });
};

const loadVideoDetails =(videoId)=>{
  console.log(videoId)
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
  fetch(url)
  .then(res=> res.json())
  .then(data=> displayVideoDetails(data.video))

}

const displayVideoDetails =(video)=>{
  console.log(video)
  document.getElementById("video_details").showModal()
  const detailsContainer = document.getElementById('details_container')

  detailsContainer.innerHTML = `
  <div class="card bg-base-100 shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.title}</h2>
    <p>${video.description}">
    <h5 class="text-sm font-bold">${video.authors[0].profile_name}</h5>
      
    </div>
  </div>
</div>`
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
  videoContainer.innerHTML = "";

  if (videos.length === 0) {
    videoContainer.innerHTML = `<div class="col-span-full flex flex-col justify-center items-center py-20 text-center">
        <img class="w-[200px]" src="./Assets/Icon.png" alt="">
        <h2 class="font-bold text-2xl">Oops!! Sorry, There is no content here</h2>
      </div>`;
      hideLoader()
    return;
  }

  videos.forEach((video) => {
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
              ${video.authors[0].verified === true ? `<img class="w-6 h-6" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" alt="">` : ``}
            </div>
            <p class="text-sm text-gray-400">${video.others.views} views</p>

          </div>
        </div>
        <button onclick="loadVideoDetails('${video.video_id}')" class="btn">Show Details</button>
      </div>
    `;
    videoContainer.appendChild(videoCard);
  });
  hideLoader()
};

document.getElementById('search-input').addEventListener('keyup', (e)=>{
  const input = e.target.value
  loadVideos(input)
})
loadData();
