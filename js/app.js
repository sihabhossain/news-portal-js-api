
let fetchData = [];

const fetchCategories = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => showCategories(data))
}

const showCategories = data => {

    const categoriesContainer = document.getElementById('categories-container');
    data.data.news_category.forEach(singleCategory => {
        const linkContainer = document.createElement('p');
        linkContainer.innerHTML = `<a class="nav-link" href="#" onclick="fetchCategoryNews('${singleCategory.category_id}', '${singleCategory.category_name}' )">${singleCategory.category_name}</a>`

        categoriesContainer.appendChild(linkContainer);
    });

}

// fetch all the news by category
const fetchCategoryNews = (category_id, category_name) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`
    // console.log(url)
    fetch(url)
        .then(res => res.json())
        .then(data => {
            fetchData = data.data;
            showAllNews(data.data, category_name)
        })
}

const showAllNews = (data, category_name) => {

    document.getElementById('news-count').innerText = data.length;
    document.getElementById('category-name').innerText = category_name;

    const newsContainer = document.getElementById('all-news');
    newsContainer.innerHTML = '';
    data.forEach(singleNews => {
        const { _id, image_url, title, details, author, total_view } = singleNews;

        console.log(singleNews)
        newsContainer.innerHTML += `<div class="card mb-3" >
         <div class="row g-0">
           <div class="col-md-4 d-flex flex-column">
             <img src=${image_url} class="img-fluid rounded-start" alt="...">
           </div>
           <div class="col-md-8">
             <div class="card-body">
               <h5 class="card-title">${title}</h5>
              <p > ${details.slice(0, 200)}.....</p>
             </div>
            <div class="card-footer border-0 card-body d-flex justify-content-between">
                    <div class="d-flex gap-2">
                        <img src=${author.img} class="img-fluid rounded-start rounded-circle" alt="..." height="40px" width="40px">
                        <div>
                        <p class="m-0 p-0">${author.name ? author.name : "Unknown"}</p>
                        <p class="m-0 p-0">${author.published_date ? author.published_date : "unknown"}</p>
                        </div>
                    </div>
                    <div class="d-flex align-items-center">
                        <i class="fas fa-eye"></i>
                        <p class="m-0 p-0">${total_view ? total_view : "Not Avaliable"}</p>
                    </div>
                    <div>
                        <i class="fas fa-star"></i>
                    </div>
                    <div>
                         <i class="fas fa-arrow-right" onclick="fetchNewsDetail('${_id}')" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
                    </div>
            </div>
         </div>
         
       </div>`
    })
}

const fetchNewsDetail = news_id => {
    let url = `https://openapi.programming-hero.com/api/news/${news_id}`
    fetch(url).then(res => res.json()).then(data => showNewsDetail(data.data[0]))
}


const showNewsDetail = newsDetail => {
    const { _id, image_url, title, details, author, total_view, others_info } = newsDetail;
    // console.log(newsDetail)

    document.getElementById("modal-body").innerHTML = `
        <div class="card mb-3">
            
        <div class="card mb-3" >
        <div class="row g-0">
          <div class="col-md-12 d-flex flex-column">
            <img src=${image_url} class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-12">
            <div class="card-body">
              <h5 class="card-title">${title} <span class="badge text-bg-warning">${others_info.is_trending ? "Trending" : "Todays Pick"}</span></h5>
             <p > ${details}....</p>
            </div>
           <div class="card-footer border-0 card-body d-flex justify-content-between">
                   <div class="d-flex gap-2">
                       <img src=${author.img} class="img-fluid rounded-start rounded-circle" alt="..." height="40px" width="40px">
                       <div>
                       <p class="m-0 p-0">${author.name ? author.name : "Unknown"}</p>
                       <p class="m-0 p-0">${author.published_date ? author.published_date : "unknown"}</p>
                       </div>
                   </div>
                   <div class="d-flex align-items-center">
                       <i class="fas fa-eye"></i>
                       <p class="m-0 p-0">${total_view ? total_view : "Not Avaliable"}</p>
                   </div>
                   <div>
                       <i class="fas fa-star"></i>
                   </div>
                   
           </div>
        </div>
        
      </div>

        </div>
    `
}


// trending and todays pick

const showTrending = () => {
    const trendingNews = fetchData.filter(singleData => singleData.others_info.is_trending === true);
    const category = document.getElementById('category-name').innerText;
    showAllNews(trendingNews, category);
}

const showTodaysPick = () => {
    const todaysPick = fetchData.filter(singleData => singleData.others_info.is_todays_pick === true);
    const category = document.getElementById('category-name').innerText;
    showAllNews(todaysPick, category)
}