const functions = require('./handler');

const router = (req, res) => {
  const endpoint = req.url;
  if (endpoint === '/') {
    functions.handlePage('home', req, res);
  } else if (endpoint.split('/')[1] === 'public') {
    functions.handlePage('static', req, res);
  } else if (endpoint === '/getNews' && req.method === 'POST') {
    functions.getData(req, res);
  } else {
    functions.errorPage(res);
  }
};
module.exports = router;