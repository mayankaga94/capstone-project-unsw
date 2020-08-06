import React, {useState, useContext, useEffect} from 'react'
import UserContext from '../../../context/usercontext';

import Bookshelf from './bookshelf'
import {v1 as uuid} from "uuid"

export default function Cart(props) {

    let  genre = props.genre
    const [library, setLibrary ] =useState([])

    const { userData, setUserData } = useContext(UserContext);
    const loggedINUser = userData && userData.user && userData.user.userid

    useEffect(() => {
        if (loggedINUser){
              console.log(loggedINUser)
        const shelfDetails = {"userid":loggedINUser}
        var raw = JSON.stringify(shelfDetails);

            var requestOptions = {
            method: 'POST',
            headers : {
                "Content-type": "application/json"
            },
            body: raw,
            redirect: 'follow'
            };

            fetch("http://localhost:5000/user/library/cart", requestOptions)
            .then(response => response.json()
            )
            // ((data) => {
            .then((result) =>{
                console.log(result)
                        setLibrary(result.userShelf)
                       
            })
            .catch(error => console.log('error', error));
        }
        },[])

        const markRead = () =>{

        }


    return (
                <div className ="library goalset col-xs-12 col-lg-6 col-md-6 col-sm-6">
                  
                    <div className = "common-marginborder">     
                    <div className = "libraryHeader">Your Shelf </div>

                    {library?
                    <div className = "totalBooks"><span className = "">Total Books:</span>{library.length}</div>
:
                     <div className = "totalBooks"><span className = "">Total Books:</span>Cart is Empty</div>
                    }
                      {!library ? (<>  <i class="fa fa-cart-plus emptylibrary"  aria-hidden="true"></i></>) : library && (library.map((library,index)=>(
                            <Bookshelf markRead = {markRead} id = {library } key  = {"library" + index } library = {library}/ >)
                        ))
                      }
                      </div>
                     
                 </div>

    )
}
