const getElementById = (id)=>{

  document.getElementById(id)
}
let submit =  document.getElementById('submit');
submit.addEventListener('click', () => {
  let input = document.getElementById('lang');
  const language = input.value;

  xhrRequest('/get', language, (err, result) => {
    if (err) {
      console.log(err.message);
    } else {
      result.articles.forEach((element) => {
        news = document.createElement('div');
        news.textContent = element.title;
        document.getElementById('news').appendChild(news);
        news.addEventListener('click', () => {
          console.log(element.description);
        });
      });
    }
  });
});
