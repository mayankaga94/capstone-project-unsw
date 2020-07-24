import React from 'react'

export default function Comments() {
    return (
        <div className = "comment">
                <input  className = "commentBox" type = "textbox" placeholder = "Enter your review"></input>
                <button  className = "commentButton">Comment</button>
        </div>
    )
}
