const express = require('express')

const app = express()
const port = 5000

// API REST receba e espere um body em JSON
app.use(express.json())

// Lista Usuarios
let usuarios = [
  { id: "1", name: "Eberton", city: "Pato Branco" },
  { id: "2", name: "DaviZAO", city: "Pato Branco" },
  { id: "3", name: "Murilinho", city: "Pato Branco" },
]

// ROTA GET - /
app.get('/', (request, response) => {
  response.send('Olá pessoal');
})

// ROTA GET - /users
app.get('/users', (request, response) => {
  response.send({ users: usuarios });
})

// ROTA GET - /users/1
app.get('/users/:id', (request, response) => {
  const id = request.params.id

  let user; //undefined

  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].id === id) {
      user = usuarios[i];
      break;
    }
  }

  response.send({ user: user });
})

// Rota POST - /users
app.post('/users', (request, response) => {
  const user = request.body
  usuarios.push(user)
  response.send({ users: usuarios })
})

// Rota PUT - /users/:id
app.put('/users/:id', (request, response) => {
  const id = request.params.id;
  const { name, city } = request.body


  if (!name || !city) {
    response.send({"message": "name or city is invalid"})
  }

  let user;
  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].id === id) {
      usuarios[i].name = name;
      usuarios[i].city = city;
      user = usuarios[i];
      break;
    }
  }
  response.send(user)
})

// Rota PATCH  - /users/:id
app.patch('/users/:id', (request, response) => {
  const id = request.params.id;

})


// Rota DELETE  - /users/:id
app.delete('/users/:id', (request, response) => {
  const id = request.params.id;

  let user;
  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].id === id) {

      user = usuarios[i];
      break;
    }
  }
})

// Roda o servidor
app.listen(port, () => {
  console.log(`API rodando na porta ${port}`)
})

