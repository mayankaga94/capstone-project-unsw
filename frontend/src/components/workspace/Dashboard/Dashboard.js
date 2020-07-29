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


        // console.log(library)
        // const filter = library.genre
        // console.log(filter)
        // const [genre, setGenre] = useState([])

        // const dataToShow = filter
        //   ? data.filter(d => d.id === filter)
        //   : data
        return (
            <div>
                <div className ="row">
                   
                {loggedINUser ? (
                <>
                    <Details  className=" upperSection col-xs-12 col-lg-3 col-md-3 col-sm-12" /> 
                    <GoalSummary  className =" upperSection col-xs-12 col-lg-3 col-md-3 col-sm-12"  />
                    <Cart  className ="col-xs-12 col-lg-4 col-md-4 col-sm-12"  />  
                    <CustomWishlist className =" col-xs-12 col-lg-4 col-md-4 col-sm-12"  />
                    <ToDolist className =" col-xs-12 col-lg-4 col-md-4 col-sm-12"  />  
                    </>
                    )      
                : null
                }
                </div>            
            </div>
        )
    }

