import React from 'react'
import {NavLink} from 'react-router-dom'

const Navbar = ({users, topUsers}) => {
    return (
        <nav>
            <ul className="nav nav-tabs">
                <li>
                    <NavLink className="nav-link" activeClassName="nav-link active" exact to="/">
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink className="nav-link" activeClassName="nav-link active" exact to="/users">
                        users ({users})
                    </NavLink>
                </li>
                <li>
                    <NavLink className="nav-link" activeClassName="nav-link active" to="/users/create">
                        Create A User
                    </NavLink>
                </li>
                {users > 0 ?
                <li>
                    <NavLink className="nav-link" activeClassName="nav-link active" to="/users/topranked">
                        Top Ranked ({topUsers.join(' ')})
                    </NavLink>
                </li> : null}

            </ul>
        </nav>
    )
}

export default Navbar
