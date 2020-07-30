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


      

    return (
                <div className ="library goalset col-xs-12 col-lg-4 col-md-4 col-sm-4">
                    <div className = "common-marginborder">     
                      {! library ? (<>cart is empty</>) : (library.map((library,index)=>(
                            <Bookshelf id = {library } key  = {"library" + index } library = {library}/ >)
                        ))
                      }
                      </div>
                 </div>

    )
}
