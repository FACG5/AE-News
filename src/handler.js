const fs = require('fs');
const path = require('path');
const http = require('http');

function handlePage(requiredPage, req, res) {
  const endponit = req.url;
  const pageName = {
    home: '/public/index.html',
    static: endponit,
  };
  fs.readFile(
    path.join(__dirname, '..', pageName[requiredPage]),
    (err, file) => {
      if (err) {
        res.end("File Not Found !");
      } else {
        res.end(file);
      }
    },
  );
}

const requestFromApi = (url, cb) => {
  http.get(url, (response) => {
    if (response.statusCode !== 200) {
      cb(new TypeError('Page Not Found ! '), response);
    } else {
      let data = '';
      response.on('data', (chunk) => {
        data += chunk;
      });
      response.on('end', () => {
        const finalData = JSON.parse(data);
        cb(null, response, finalData);
      });
      response.on('error', () => {
        cb(new TypeError('Something is error in data ! '));
      });
    }
  });
};

const getData = (req, res) => {
  let language = '';
  req.on('data', (data) => {
    language += data;
  });
  req.on('end', () => {
    if (language) {
      const url = `http://newsapi.org/v2/top-headlines?country=${language}&apiKey=8176698cc9224b469e99934f78203b7b`;

      requestFromApi(url, (err, response, data) => {
        if (err) {
          res.writeHead(response.statusCode);
          res.end(response.statusMessage);
        } else {
          if(data.articles.length!=0){
            let finalData ={err: null , news:JSON.stringify(data)} 
            res.end(JSON.stringify(finalData))

          }
          else{
            res.end(JSON.stringify({err: "Country Not Found !", news: null}))
            
          }
          
        }
      });
    } else {
 res.end(JSON.stringify({err: "Choose Country!", news: null}))
    }
  });
};

const errorPage = (res) => {
  res.writeHead(404, { 'Content-Type': 'text/html' });
  fs.readFile(path.join(__dirname, '..', 'public', '404.html'), (err, file) => {
    if (file) res.end(file);
  });
};
module.exports = { handlePage, getData, errorPage };
