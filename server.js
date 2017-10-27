const express = require('express');
const ejs = require('ejs');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

const port = process.argv[2] || 8080;

const app = express();

let idUser = 0;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));

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
  response.render('list', {users: request.session.users});
});

app.get('/update/:id', (request, response) => {
  console.log(`${request.method} ${request.url}`);
  response.render('update', {user: request.session.users[request.params.id]});
});

app.get('*', (request, response) => {
  console.log(`The URL ${request.url} doesn't exist`);
  response.render('404');
});

app.post('/add-user', (request, response) => {
  if (!request.session.users) {
    request.session.users = [];
  }
  request.body.id = idUser++;
  request.session.users.push(request.body);

  console.log(request.session.users);
  console.log(`${request.method} ${request.url}`);
  response.redirect('/list');
});

app.put('/update-user/:id', (request, response) => {
  
  console.log(`${request.method} ${request.url}`);
  response.redirect('list');
});

app.delete('/delete-user/:id', (request, response) => {
  console.log(`${request.method} ${request.url}`);
  response.end();
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
