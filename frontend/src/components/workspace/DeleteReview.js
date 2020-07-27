import React from 'react'
import Review from './Review';

export default function DeleteReview(reviewid) {

    const deleteAction = ()=>{


        let deletez = {
            delete: reviewid.deleteid
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
          } 
          
          )
    }


    return (
        <div>
           <button  onClick= {()=> deleteAction() }></button>
        </div>
    )
}
