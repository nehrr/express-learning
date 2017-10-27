const express = require('express');
const ejs = require('ejs');
const path = require('path');
const port = process.argv[2] || 8080;

const app = express();

app.set('view engine', 'ejs');

app.get('/', (request, response) => {
  console.log(`${request.method} ${request.url}`);
  response.render(path.join(__dirname, 'public', 'index'))
});

app.get('/create', (request, response) => {
  console.log(`${request.method} ${request.url}`);
  response.render(path.join(__dirname, 'public', 'create'));
});

app.get('/list', (request, response) => {
  console.log(`${request.method} ${request.url}`);
  response.render(path.join(__dirname, 'public', 'list'))
});

app.get('/update/:id', (request, response) => {
  console.log(`${request.method} ${request.url}`);
  response.render(path.join(__dirname, 'public', `update`))
});

app.get('*', (request, response) => {
  console.log(`The URL ${request.url} doesn't exist`);
  response.render(path.join(__dirname, 'public', '404'))
});

app.post('/add-user', (request, response) => {
  console.log(`${request.method} ${request.url}`);
});

app.put('/update-user/:id', (request, response) => {
  console.log(`${request.method} ${request.url}`);
});

app.delete('/delete-user/:id', (request, response) => {
  console.log(`${request.method} ${request.url}`);
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
