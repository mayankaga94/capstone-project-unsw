import React, {useState} from 'react'





export default function Comments(props) {

const [comment, setComment] = useState([])
    return (
        <div className = "comment">
                <input  className = "commentBox" type = "textbox" placeholder = "Enter your review"></input>
                <button  className = "commentButton" onClick={()=>props.callReviewFunction("Rishabh")}>Comment</button>
        </div>
    )
}
