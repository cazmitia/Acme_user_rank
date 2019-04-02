import React, { Component } from 'react'
import {Link} from 'react-router-dom'

const Users = ({users, deleteUser}) => (
    <ul className="list-group">
        {users.map(user => (
            <li key={user.id} className="list-group-item">
                <div>
                    {user.name}
                </div>
                <div>
                    {user.bio}
                </div>
                <div className="badge badge-success">
                    Ranked: {user.rank}
                </div>
                <div className="d-flex justify-content-between">
                    <button className="btn btn-danger" onClick={() => deleteUser(user.id)} >Delete</button>
                    <Link to={`/users/${user.id}`}>Edit</Link>
                </div>
            </li>
        ))}
    </ul>
)

export default Users
