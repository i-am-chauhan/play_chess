const fs = require('fs');
const App = require('./sheeghra.js');

const app = new App();

const requestListener= function(req, res){
  let url = req.url;
  console.log(` Request receive for ${url}`);
  if(url != '/favicon.ico') {
    const file = fs.readFileSync("./public" +url);
    res.statusCode = 200;
    res.write(file);
    res.end()
    console.log('Request completed');
    return;
  }
  res.statusCode = 404;
  res.end();
}

app.get(requestListener);
module.exports = app.handleRequest.bind(app);