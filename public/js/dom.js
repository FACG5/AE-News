let mainDiv = document.getElementById("viewsection");
let submit = document.getElementById("submit");
const showNews = language => {
  let loading = document.getElementById("loading");

  xhrRequest("/getNews", language, (err, result) => {
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
submit.addEventListener("click", e => {
  e.preventDefault();
  loading.style.display = "block";

  let input = document.getElementById("lang");

  const language = input.value;
  clearDiv(mainDiv);
  let more = document.createElement("div");
  more.setAttribute("id", "more");
  more.classList = "more";
  mainDiv.appendChild(more);
  showNews(language);
});

const createNews = news => {
  let article = document.createElement("article");
  article.classList = "view-item";
  let img = document.createElement("img");
  img.setAttribute("src", news.urlToImage);
  img.setAttribute("alt", "image");
  let hr = document.createElement("hr");
  let title = document.createElement("h3");
  title.textContent = news.title;
  let viewMore = document.createElement("a");
  viewMore.textContent = "Read More";
  viewMore.addEventListener("click", e => {
    e.preventDefault();
    readMore(news);
  });
  article.appendChild(img);
  article.appendChild(title);
  article.appendChild(viewMore);
  mainDiv.appendChild(article);
  mainDiv.appendChild(hr);
};
const readMore = news => {
  let more = document.getElementById("more");
  more.innerHTML = "";
  let head = document.createElement("div");
  head.classList = "more-head";
  let headText = document.createElement("h3");
  headText.textContent = news.title;
  head.appendChild(headText);
  more.appendChild(head);
  let close = document.createElement("a");
  close.textContent = "X";
  head.appendChild(close);

  let body = document.createElement("div");
  body.classList = "more-body";
  let divImg = document.createElement("div");
  divImg.classList = "img";
  let img = document.createElement("img");
  img.setAttribute("src", news.urlToImage);
  divImg.appendChild(img);
  body.appendChild(divImg);

  let details = document.createElement("div");
  details.classList = "data";
  let paragraph = document.createElement("p");
  paragraph.textContent = news.description;
  let link = document.createElement("a");
  link.setAttribute("href", news.url);
  link.textContent = "Go to Origin site";
  details.appendChild(paragraph);
  details.appendChild(link);
  body.appendChild(details);
  more.appendChild(body);
  more.style.display = "block";

  close.addEventListener("click", e => {
    more.style.display = "none";
  });
};

const clearDiv = div => {
  div.textContent = "";
};
