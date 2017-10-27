const express = require('express');
const ejs = require('ejs');
const path = require('path');
const bodyParser = require('body-parser');

const port = process.argv[2] || 8080;

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public'));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));


app.get(/^\/(index)?$/, (request, response) => {
  console.log(`${request.method} ${request.url}`);
  response.render('index');
});

app.get('/create', (request, response) => {
  console.log(`${request.method} ${request.url}`);
  response.render('create');
});

app.get('/list', (request, response) => {
  console.log(`${request.method} ${request.url}`);
  response.render('list');
});

app.get('/update/:id', (request, response) => {
  console.log(`${request.params}`);
  console.log(`${request.method} ${request.url}`);
  response.render(`update/${request.params}`);
});

app.get('*', (request, response) => {
  console.log(`The URL ${request.url} doesn't exist`);
  response.render('404');
});

app.post('/add-user', (request, response) => {
  console.log(request.body);
  console.log(`${request.method} ${request.url}`);
  response.end();
});

app.put('/update-user/:id', (request, response) => {
  console.log(`${request.method} ${request.url}`);
  response.end();
});

app.delete('/delete-user/:id', (request, response) => {
  console.log(`${request.method} ${request.url}`);
  response.end();
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
