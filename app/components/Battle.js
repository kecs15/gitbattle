import React, { Component, Fragment } from 'react'
import Instructions from './Instructions'
import PlayerInput from './PlayerInput'
import { updateObject } from '../utils/updateObject'
import PlayerPreview from './PlayerPreview'
import { Link } from 'react-router-dom'

class Battle extends Component {
    state = {
        playerOne: null,
        playerTwo: null
    }

    handleSubmit = (id, player) => {
        let updatedObject = updateObject(this.state, {[id]: player})
        this.setState(updatedObject)
    }

    handleReset = id => {
        let updatedObject = updateObject(this.state, {[id]: null})
        this.setState(updatedObject)
    }

    setBattleTrue = () => {
        let updatedObject = updateObject(this.state, {battle: true})
        this.setState(updatedObject)
    }

    render() {
        const { playerOne, playerTwo } = this.state
        
        return (
            
            <Fragment>
                <Instructions />
                <div className='player-container'>
                    <h1 className='center-text header-lg'>Players</h1>
                    <div className='row space-around'>
                        {playerOne === null 
                            ? (
                                <PlayerInput
                                    label='Player One'
                                    onSubmit={(player) => this.handleSubmit('playerOne', player)}
                                />                                
                              )
                            : <PlayerPreview 
                                username={playerOne} 
                                label='Player Two' 
                                onReset={() => this.handleReset('playerOne')}
                              />
                        }

                        {playerTwo === null 
                            ? (
                                <PlayerInput
                                    label='Player Two'
                                    onSubmit={(player) => this.handleSubmit('playerTwo', player)}
                                />                                
                              )
                            : <PlayerPreview 
                                username={playerTwo} 
                                label='Player Two' 
                                onReset={() => this.handleReset('playerTwo')}
                             />
                        }
                    </div>
                    {playerOne && playerTwo && (
                        <Link
                            className='btn dark-btn btn-space'
                            onClick={this.setBattleTrue}
                            to={{
                                pathname: '/battle/results',
                                search: `?playerOne=${playerOne}&playerTwo=${playerTwo}`
                            }}
                        >
                            Battle
                        </Link>
                    )}
                </div>
            </Fragment>
        )
    }
}

export default Battle