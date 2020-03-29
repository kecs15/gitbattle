import React, { Component, Fragment } from 'react'
import { battle } from '../utils/api'
import { updateObject } from '../utils/updateObject'
import Card from './Card'
import ProfileList from './ProfileList'
import PropTypes from 'prop-types'
import Loading from './Loading'
import queryString from 'query-string'
import { Link } from 'react-router-dom'


class Result extends Component {
    state = {
        winner: null,
        loser: null,
        error: null,
        loading: true
    }
    componentDidMount() {
        const { playerOne, playerTwo } = queryString.parse(this.props.location.search)
        let updatedObject
        battle([playerOne, playerTwo])
            .then(players => {
                updatedObject = updateObject(this.state, {winner: players[0], loser: players[1], error: null, loading: false})
                this.setState(updatedObject)
            })
            .catch(({ message }) => {
                updatedObject = updateObject(this.state, { error: message, loading: false})
                this.setState(updatedObject)
            })
    }
    render() {
        const { winner, loser, error, loading } = this.state

        if(loading) {
            return <Loading text='Battling' />
        }

        if(error) {
            return (
                <p className='center-text error'>{error}</p>
            )
        }
        return (
            <Fragment>            
                <div className='grid space-around container-sm'>
                    <Card
                        header={winner.score === loser.score ? 'Tie' : 'Winner'}
                        subheader={`Score: ${winner.score.toLocaleString()}`}
                        avatar={winner.profile.avatar_url}
                        href={winner.profile.html_url}
                        name={winner.profile.login}
                    >
                        <ProfileList profile={winner.profile} />
                    </Card>
                    
                    <Card
                        header={winner.score === loser.score ? 'Tie' : 'Loser'}
                        subheader={`Score: ${loser.score.toLocaleString()}`}
                        avatar={loser.profile.avatar_url}
                        name={loser.profile.login}
                        href={loser.profile.html_url}
                    >
                        <ProfileList profile={loser.profile} />
                    </Card>
                </div>
                <Link
                    to='/battle'
                    className='btn dark-btn btn-space'
                >
                    Reset    
                </Link> 
            </Fragment>
        )
    }
}


export default Result