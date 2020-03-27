import React, { Component } from 'react'
import { updateObject } from '../utils/updateObject'

class Hover extends Component {
    state = {
        hovering: false
    }

    mouseOver = () => {
        let updatedObject = updateObject(this.state, {hovering: true})
        this.setState(updatedObject)
    }

    mouseOut = () => {
        let updatedObject = updateObject(this.state, {hovering: false})
        this.setState(updatedObject)
    }

    render() {
        return (
            <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
                {this.props.children(this.state.hovering)}
            </div>
        )
    }
}

export default Hover