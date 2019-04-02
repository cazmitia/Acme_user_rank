const express = require('express');
const app = express();
const path = require('path');
const {User, getUsers, createUser, initDb} = require('./db')

const port = process.env.PORT || 3000;

app.use(express.json())

app.get('/app.js', (req, res, next)=> res.sendFile(path.join(__dirname, 'dist', 'main.js')));

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/users', (req, res, next) => {
    getUsers()
    .then(users => {res.send(users)})
})

app.post('/api/users', (req, res, next) => {
    console.log('test')
    User.create(req.body)
    .then(user => res.send(user))
    .catch(e => {res.send(e)})
})

app.put(`/api/users/:id`, (req, res, next) => {
    User.findOne({where: {id: req.params.id}})
    .then(user => user.update(req.body))
    .then(user => res.send(user))
    .catch(e => {res.send(e)})
})

app.delete('/api/users/:id', (req, res, next) => {
    User.destroy({
        where: {id: req.params.id}
    })
    .then(() => res.sendStatus(204))
    .catch(next);
})


app.listen(port, () => console.log(`listening on port ${port}`))

initDb(true)
