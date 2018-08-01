const xhrRequest = (url, data, cb) => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const result = JSON.parse(xhr.responseText);
        cb(null, result);
      } else {
        cb(new TypeError(xhr.responseText));
      }
    }
  };

  xhr.open('POST', url, true);
  xhr.send(data);
};

