import React from 'react'
import Review from './Review';

export default function DeleteReview(props) {

    const deleteAction = ()=>{
        let deletez = {
            delete: props.deleteid
        }
        var raw = JSON.stringify(deletez);

        var requestOptions = {
          method: 'DELETE',
          headers : {
            "Content-type": "application/json"
        },
          body: raw,
          redirect: 'follow'
        };
        
        fetch("http://localhost:5000/book/review", requestOptions)
          .then(response => response.text())
          .then((result) => {
            // setReview (...Review, )
          })
    }
    return (
        <div>
           <button  className = "deleteComment" onClick= {()=> (deleteAction(),
           props.callreviewDeleteFunction({
            delete : props.deleteid
           }
           ))
          }>Delete</button>
        </div>
    )
}
