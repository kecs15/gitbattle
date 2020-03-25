import React from 'react'
import PropTypes from 'prop-types'

const languagesNav = props => {
    const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']
    const { selected, onUpdateLanguage } = props

    return (
        <ul className='flex-center'>
            {languages.map((language, index) => (
                <li key={index}>
                    <button
                        className='btn-clear nav-link'
                        style={language === selected ? {color: 'rgb(187, 46, 31)'} : null}
                        onClick={() => onUpdateLanguage(language)}>
                            {language}
                        </button>
                </li>
            ))}
        </ul>
    )
}

languagesNav.propTypes = {
    selected: PropTypes.string.isRequired,
    onUpdateLanguage: PropTypes.func.isRequired
}

export default languagesNav