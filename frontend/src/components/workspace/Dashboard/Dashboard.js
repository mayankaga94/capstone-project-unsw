import React, { useState , useEffect, useContext} from 'react'
import Details from './Summary'
import Readlist from './Readlist'
import ToDolist from './ToDolist'
import Calend from './Calendar'
import Owncomments from './Owncomments'
import History from './History'
import Cart from './cart'
import GoalSummary from './goalSummary'
import CustomWishlist from './customWishlist'
import UserContext from '../../../context/usercontext'

export default function  Dashboard(){

        const [library, setLibrary ] =useState([])

    const { userData, setUserData } = useContext(UserContext);
    const loggedINUser = userData && userData.user && userData.user.userid

    useEffect(() => {
        if (loggedINUser){
              console.log("hi")
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
            .then(response => response.json())
            // ((data) => {
            .then((result) =>{
                console.log(result.userShelf)
                        setLibrary(result.userShelf)
            })
            .catch(error => console.log('error', error));
        }
        },[])
    
        return (
            <div>
                {/* <Details /> */}
                    {library.map((library,index) => (
                    <Cart key = {"library"+index}  ISBN = {library.ISBN} readBook = {library.readBook}  userid = {library.userid}  /> 
                    ))}

                <CustomWishlist />
                <GoalSummary  />
                <ToDolist />                
            </div>
        )
    }

