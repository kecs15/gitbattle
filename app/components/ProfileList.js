import React from 'react'
import { FaCompass, FaBriefcase, FaUsers, FaUserFriends, FaUser } from 'react-icons/fa'
import PropTypes from 'prop-types'
import Tooltip from './Tooltip'

const profileList = props => {
    const { profile } = props

    return (
        <ul className='card-list'>
            <li>
                <Tooltip text="User's name">
                    <FaUser color='rgb(239, 115, 115)' size={22} />
                    {profile.name}
                </Tooltip>
            </li>
            {profile.location && (
                <li>
                    <Tooltip text="User's location">
                        <FaCompass color='rgb(144, 115, 255)' size={22} />
                        {profile.location}
                    </Tooltip>
                </li>
            )}
            {profile.company && (
                <li>
                    <Tooltip text="User's company">
                        <FaBriefcase color='#795548' size={22} />
                        {profile.company}                        
                    </Tooltip>
                </li>
            )}
            <li>
                <Tooltip text="User's followers">
                    <FaUsers color='rgb(129, 195, 245)' size={22} />
                    {profile.followers.toLocaleString()} followers
                </Tooltip>
            </li>
            <li>
                <Tooltip text="User's following">
                    <FaUserFriends color='rgb(64, 183, 95)' size={22} />
                    {profile.following.toLocaleString()} following
                </Tooltip>
            </li>
      </ul>        
    )
}

profileList.propTypes = {
    profile: PropTypes.object.isRequired
}

export default profileList