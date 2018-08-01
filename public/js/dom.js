let mainDiv = document.getElementById("viewsection");
let submit = document.getElementById("submit");
const showNews = language => {
  let loading = document.getElementById("loading");

  xhrRequest("/get", language, (err, result) => {
    if (err) {
      loading.style.display = "none";

      let error = document.createElement("h1");
      error.textContent = err.message;
      mainDiv.appendChild(error);
    } else {
      loading.style.display = "none";
      result.articles.forEach(element => {
        createNews(element);
      });
    }
  });
};
showNews("us");
submit.addEventListener("click", () => {
  loading.style.display = "block";

  let input = document.getElementById("lang");

  const language = input.value;
  clearDiv(mainDiv);
  showNews(language);
});

const createNews = news => {
  let article = document.createElement("article");
  article.classList = "view-item";
  let img = document.createElement("img");
  img.setAttribute("src", news.urlToImage);
  let hr = document.createElement("hr");
  let title = document.createElement("h3");
  title.textContent = news.title;
  let viewMore = document.createElement("a");
  viewMore.textContent = "Read More";
  viewMore.addEventListener("click", () => {
    readMore(news);
  });
  article.appendChild(img);
  article.appendChild(title);
  article.appendChild(viewMore);
  mainDiv.appendChild(article);
  mainDiv.appendChild(hr);
};
const readMore = news => {
  console.log(news.description);
};

const clearDiv = div => {
  div.textContent = "";
};
