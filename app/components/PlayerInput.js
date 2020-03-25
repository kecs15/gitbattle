import React, { Component } from 'react'
import { updateObject } from '../utils/updateObject'
import PropTypes from 'prop-types'

class PlayerInput extends Component {
    state = {
        username: ''
    }

    handleSubmit = event => {
        event.preventDefault()

        this.props.onSubmit(this.state.username)
    }

    handleChange = event => {
        const updatedObject = updateObject(this.state, {username: event.target.value})
        this.setState(updatedObject)
    }

    render() {
        return (
            <form className='column player' onSubmit={this.handleSubmit}>
                <label htmlFor='username' className='player-label'>
                    {this.props.label}
                </label>
                <div className='row player-inputs'>
                    <input
                        type='text'
                        id='username'
                        className='input-light'
                        placeholder='github username'
                        autoComplete='off'
                        value={this.state.username}
                        onChange={this.handleChange}
                    />
                    <button 
                        className='btn dark-btn'
                        type='submit'
                        disabled={!this.state.username}
                    >
                        Submit
                    </button>
                </div>
            </form>
        )
    }
}

PlayerInput.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
}

export default PlayerInput