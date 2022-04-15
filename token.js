var axios = require('axios');
var data = '';

var config = {
  method: 'post',
  url: 'http://ppst.botswanapost.co.bw/apitest/api/token/createtoken',
  headers: { 
    'Auth': '{"ClientName":"","Password":""}', 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});