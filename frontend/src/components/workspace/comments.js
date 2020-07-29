import React, {useState, useContext} from 'react'
import { useParams} from 'react-router-dom'
import UserContext from '../../context/usercontext'





export default function Comments(props) {

    const { userData, setUserData } = useContext(UserContext);

    const [comm, setcomment] =useState([])

    const resetValue = () =>{

        setcomment("")}

    const {id}  = useParams();
    const postComment =()=>{
    
       let  details ={
            bookid: id,
            userid:  userData.user.userid,
            comment : comm
        }
        // console.log(details)
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
    // const [comment, setComment] = useState([])

    return (
        <div className = "comment">
                <input  className = "commentBox" type = "textbox" placeholder = "Enter your review" onChange = {(e) =>setcomment(e.target.value)}></input>
                <button  className = "commentButton" onClick={()=>{props.callReviewFunction({
              bookid: id,
              userid:  userData.user.userid,
              comment : comm
        }); 
                postComment();resetValue()}}>Comment</button>
        </div>
    )
}
