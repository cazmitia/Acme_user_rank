import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class CreateUser extends Component {
    constructor(props) {
        super(props)
        this.state = props.user ? props.user : {name: '', bio: '', rank: ''}
    }

    changeHandler = ({target}) => {
            this.setState({[target.name]: target.value})
    }

    submitForm = (evt) => {
        evt.preventDefault()
        this.props.createOrUpdate(this.state)
        .then(() => this.props.history.push('/users'))
    }

    render () {

        return (
            <form onSubmit={this.submitForm}>
                <label>Name</label>
                <input className="form-control" name="name" onChange={this.changeHandler} value={this.state.name} />
                <label>Bio</label>
                <input className="form-control" name="bio" onChange={this.changeHandler} value={this.state.bio} />
                <label>Rank</label>
                <input className="form-control" name="rank" type="number" onChange={this.changeHandler} value={this.state.rank} />
                <div className="btn-group">
                    <button type="submit" className="btn btn-primary">{this.state.id ? 'Update' : 'Create'}</button>
                    <Link to="/users" className="btn btn-info">Cancel</Link>
                </div>
            </form>
        )
    }
}
