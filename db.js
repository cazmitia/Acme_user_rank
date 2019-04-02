const Sequelize = require('sequelize')
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_user_rank_db')

const User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    bio: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    rank: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

const getUsers = () => {
    return User.findAll({
        attributes: ['id', 'name', 'bio', 'rank']
    })
}

const createUser = (newUser) => {
    User.create(newUser)
}

// const updateUser = (id, name, bio, rank) => {
//     User.findAll()
//     .then(user => console.log(user))
// }

const initDb = (force = false) => {
    db.sync({force})
    .then(() => {User.create({name: 'Moe', bio: 'Moe is a maniac', rank: 1})})
    .then(() => {User.create({name: 'Larry', bio: 'Larry is lazy', rank: 2})})
    .then(() => {User.create({name: 'Curly', bio: 'Curly is crazy', rank: 3})})
    .catch(e => { console.error(e) })
}

module.exports = {
    User,
    getUsers,
    createUser,
    initDb
}
