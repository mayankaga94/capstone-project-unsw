import React, { Component } from 'react'
import { link } from 'react-router-dom'
export class admin extends Component {
    render() {
        return (
            <div>
                <h1>admin page only......</h1>
                <link to = "/logout">Log Out</link>
            </div>
        )
    }
}

export default admin
