const express = require('express')
const { randomUUID } = require('crypto')

const app = express()
const port = 5000

// API REST receba e espere um body em JSON
app.use(express.json())

// Lista Usuarios
let usuarios = [
  { id: randomUUID(), name: "Eberton", city: "Pato Branco" },
  { id: randomUUID(), name: "DaviZAO", city: "Pato Branco" },
  { id: randomUUID(), name: "Murilinho", city: "Pato Branco" },
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
  const { name, city } = request.body
  usuarios.push({
    id: randomUUID(),
    name,
    city
  })
  response.send({ users: usuarios })
})

// Rota PUT - /users/:id
app.put('/users/:id', (request, response) => {
  const id = request.params.id;
  const { name, city } = request.body


  if (!name || !city) {
    response.send({ "message": "name or city is invalid" })
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
  // recupero o id dos parametros enviados na URL
  const id = request.params.id;

  const { name, city } = request.body;

  let userFound;
  for (let user of usuarios) {
    // se o usuario com o id for igual ao id da requisicao
    // vai validar os campos para fazer a alteração
    if (user.id === id) {
      if (name) { //se vier um name na requisicao, vai alterar o name
        user.name = name;
      }
      if (city) { //se vier um city na requisicao, vai alterar o city
        user.city = city;
      }
      // devolver como resposta o usuario alterado
      userFound = user;
    }
  }

  // Forma menos verbosa
  // if (userFound === undefined) {
  //   response.send({ "message": "Usuário não encontrado" })
  // }
  if (!userFound) {
    response.send({ "message": "Usuário não encontrado" })
  }
  response.send(userFound)

  // Forma mais simples
  // if (userFound !== undefined) {
  //   response.send(userFound)
  // } else {
  //   response.send({ "message": "Usuário não encontrado" })
  // }
})


// Rota DELETE  - /users/:id
app.delete('/users/:id', (request, response) => {
  const { id } = request.params;

  // filtro da lista sem o item com o id a ser removido e atualizar a lista
  // usuarios = usuarios.filter((user) => user.id !== id);

  // buscar o indice do item com o id e usar o metodo splice
  // const indexUser = usuarios.findIndex((user) => user.id === id)

  let indexUser = -1;
  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].id === id) {
      indexUser = i;
      break;
    }
  }

  const [userDeleted] = usuarios.splice(indexUser, 1)

  response.send({
    "message": "Usuário Excluído",
    userDeleted
  })
})

// Roda o servidor
app.listen(port, () => {
  console.log(`API rodando na porta ${port}`)
})

