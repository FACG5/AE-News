const xhrRequest = (url, data, cb) => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
       const result = JSON.parse(xhr.responseText);
       if(result.err){
        cb(new TypeError(result.err));

       }
       else{
         
        cb(null, JSON.parse(result.news));
        

       }
      } else {
        cb(new TypeError(result.err));
      }
    }
  };

  xhr.open('POST', url, true);
  xhr.send(data);
};

