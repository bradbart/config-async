var express = require('express')
var app = express()
app.use(express.static('www'));

var timesSent = 0;

app.get('/api/clientConfig', function (req, res) {
  res.json({configProp:"config prop 1"});
  console.log('sent property ' + ++timesSent);
})

app.listen(3000, function () {
  console.log('Listening on port 3000!')
})