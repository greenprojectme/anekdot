function api(method, data = {}) {
  data.method = method;
  let  URL    = 'server.php';
  let POST    = {method: 'post'};

  return $.ajax(data, URL, POST)
    .then(response => response.json());
}
