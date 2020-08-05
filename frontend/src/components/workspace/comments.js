import React, {useState, useContext} from 'react'
import { useParams} from 'react-router-dom'
import UserContext from '../../context/usercontext'

export default function Comments(props) {

    const { userData, setUserData } = useContext(UserContext);
    const [comm, setcomment] =useState([])
    const {id}  = useParams();


    const userlogged =   userData && userData.user && userData.user.userid


    console.log("ddddddddddddd",userlogged)
    const resetValue = () =>{
      alert("bii")
        setcomment([""])
      }

    const postComment =()=>{
    
       let  details ={
            bookid: id,
            userid:  userData.user.userid,
            comment : comm
        }
        var raw = JSON.stringify(details);
        var requestOptions = {
          method: 'POST',
          headers : {
            "Content-type": "application/json"
        },
          body: raw,
        };
        fetch("http://localhost:5000/book/review", requestOptions)
          .then(response => response.text())
          .then(result => console.log("hiii",result))
          .catch(error => console.log('error', error));
    }
    
    return (
        <div className = "comment">
                <input  className = "commentBox" type = "textbox" placeholder = "Enter your review" onChange = {(e) =>setcomment(e.target.value)}></input>
                <button  className = "commentButton" onClick={()=>{props.callReviewFunction({
              bookid: id,
              userid:  userlogged,
              comment : comm,
              votes : 0
        }); 
                postComment();resetValue()}}>Comment</button>
        </div>
    )
}
