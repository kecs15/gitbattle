import React, { Component, Fragment } from 'react'
import Instructions from './Instructions'
import PlayerInput from './PlayerInput'
import { updateObject } from '../utils/updateObject'
import PlayerPreview from './PlayerPreview'
import Result from './Result'

class Battle extends Component {
    state = {
        playerOne: null,
        playerTwo: null,
        battle: false
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

    resetBattle = () => {
        let updatedObject = updateObject(this.state, {
            playerOne: null,
            playerTwo: null,
            battle: false
        })
        this.setState(updatedObject)
    }

    render() {
        const { playerOne, playerTwo, battle } = this.state

        if(battle === true) {
            return <Result 
                        playerOne={playerOne} 
                        playerTwo={playerTwo} 
                        onReset={this.resetBattle}
                    />
        }
        
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
                        <button
                            className='btn dark-btn btn-space'
                            onClick={this.setBattleTrue}
                        >
                            Battle
                        </button>
                    )}
                </div>
            </Fragment>
        )
    }
}

export default Battle