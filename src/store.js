import {createStore, applyMiddleware} from 'redux'
import axios from 'axios';
import thunkMiddleware from 'redux-thunk'

const GOT_USERS_FROM_SERVER = 'GOT_USERS_FROM_SERVER'
const GOT_TOP_RANKED_FROM_SERVER = 'GOT_TOP_RANKED_FROM_SERVER'

const initialState = {
    users: [],
    topUsers: []
}

const gotUsersFromServer = (users) => {
    return {
        type: GOT_USERS_FROM_SERVER,
        users
    }
}

export const getUsers = () => {
    return (dispatch) => {
        axios.get('/api/users')
        .then(response => response.data)
        .then(users => gotUsersFromServer(users))
        .then(action => dispatch(action))
    }
}

export const createUser = (newUser) => {
    return (dispatch) => {
        return axios.post('api/users', newUser)
        .then(() => axios.get('/api/users'))
        .then(response => response.data)
        .then(users => gotUsersFromServer(users))
        .then(action => dispatch(action))
        .catch(e => e)
    }
}

export const deleteUser = (id) => {
    return (dispatch) => {
        return axios.delete(`api/users/${id}`)
        .then(() => axios.get('/api/users'))
        .then(response => response.data)
        .then(users => gotUsersFromServer(users))
        .then(action => dispatch(action))
    }
}

export const updateUser = (user) => {
    return (dispatch) => {
        return axios.put(`/api/users/${user.id}`, user)
        .then(() => axios.get('/api/users'))
        .then(response => response.data)
        .then(users => gotUsersFromServer(users))
        .then(action => dispatch(action))
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GOT_USERS_FROM_SERVER:
            return {
                ...state,
                users: action.users,
                topUsers: (action.users.length > 0 ? action.users.reduce((acc, user, index) => {
                    console.log(acc)
                    if (index === 0) acc.push(user)
                    else if (user.rank < acc[0].rank) acc = [user]
                    else if (user.rank === acc[0].rank) acc.push(user)
                    return acc
                }, []) : [])
            }
        default:
            return state;
    }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware))

export default store
