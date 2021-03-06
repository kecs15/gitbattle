import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { updateObject } from '../utils/updateObject'

const styles = {
    content: {
      fontSize: '35px',
      position: 'absolute',
      left: '0',
      right: '0',
      marginTop: '20px',
      textAlign: 'center',
    }
  }

class Loading extends Component {
    state = {
        content: this.props.text
    }

    componentDidMount() {
        const { text, speed } = this.props
        this.interval = window.setInterval(() => {
            this.state.content === text + '...'
                ? this.setState(updateObject(this.state, {content: text}))
                : this.setState(updateObject(this.state, {content: this.state.content + '.'})) 
        }, speed)
    }

    componentWillUnmount() {
        window.clearInterval(this.interval)
    }

    render() {
        return (
            <p style={styles.content}>
                {this.state.content}
            </p>
        )
    }
}

Loading.propTypes = {
    text: PropTypes.string.isRequired,
    speed: PropTypes.number.isRequired
}

Loading.defaultProps = {
    text: 'Loading',
    speed: 300
}

export default Loading