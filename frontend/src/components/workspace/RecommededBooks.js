import React from 'react'
import {useState, useEffect} from 'react'

export default function RecommededBooks(props) {

    const ISBN = props.ISBN
    const [recommendedISBN, setRecommededISN] = useState([])
    useEffect(() => {
            var requestOptions = {
            method: 'POST',
            headers : {
                "Content-type": "application/json"
            },
            body: JSON.stringify({"ISBN":ISBN,"count":10}),
            redirect: 'follow'
            };
            fetch("http://localhost:5000/getRecommendation", requestOptions)
            .then(response => response.json())
            .then(result => console.log(result))
            // .then(response => response.json())
            // .then(result => (console.log(result.result),
            // setRecommededISN(result.result)
               
            // )      
            //     )
            .catch(error => console.log('error', error));

        },[])
    return (
        <div>

           <h1> Books similar to {props.bookName}

           <div className  = "row">
               <div className = "col-xs-12 col-md-12 col-sm-12 col-lg-12">

                    {/* {getRecommendation(ISBN)} */}
               </div>
           </div>


           </h1>            
        </div>
    )
}
