import React, { Component } from 'react'
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import axios from 'axios'
import {getUsers, createUser, deleteUser, updateUser} from './store'
import { connect } from 'react-redux';
import Users from './Users'
import CreateUser from './CreateUser'
import Navbar from './Navbar'

const mapStateToProps = (state) => {
    return {
        users: state.users,
        topUsers: state.topUsers
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUsers: () => {
            return dispatch(getUsers())
        },
        createUser: (user) => {
            return dispatch(createUser(user))
        },
        updateUser: (user) => {
            return dispatch(updateUser(user))
        },
        deleteUser: (id) => {
            return dispatch(deleteUser(id))
        }
    }
}

class App extends Component {

    componentDidMount() {
        this.props.getUsers()
    }

    render () {
        const {users} = this.props
        const topUsers = users.length > 0 ? users.reduce((acc, user, index) => {
            if (index === 0) acc.push(user)
            else if (user.rank < acc[0].rank) acc = [user]
            else if (user.rank === acc[0].rank) acc.push(user)
            return acc
            }, []) : []

        return (
            <div>
                <main>
                    <h1>Acme Users With Ranks</h1>
                    <Router>
                        <Navbar users={users.length} topUsers={topUsers.map(user => user.name)} />
                        <Switch >
                            <Route exact path ="/users" render={(() => <Users users={users} deleteUser={this.props.deleteUser} />)} />
                            <Route exact path ="/users/topRanked" render={(() => <Users users={topUsers} deleteUser={this.props.deleteUser} />)} />
                            <Route
                                exact path ="/users/create"
                                render={(({history}) => (
                                    <CreateUser
                                        createOrUpdate={this.props.createUser}
                                        history={history}
                                    />)
                                )}
                            />
                            <Route
                                exact path="/users/:id"
                                render={(({match, history}) => (
                                    <CreateUser
                                        user={users.find(user => user.id === match.params.id * 1)}
                                        createOrUpdate={this.props.updateUser}
                                        history={history}
                                    />)
                                )}
                            />
                            <Route path="/" render={() => <h1>We have {users.length} users!</h1>} />
                        </Switch>
                    </Router>
                </main>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

