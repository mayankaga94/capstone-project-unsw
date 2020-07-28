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
                {/* <Details /> */}

                <div className ="goalset col-xs-12 col-lg-4 col-md-4 col-sm-4">
                    <div className = "libraryHeader"> Your Collection</div>
                {loggedINUser ?<Cart  /> : null
                }
                </div>
                <CustomWishlist />
                {loggedINUser ? <GoalSummary  />:null}
                 {loggedINUser ?  <ToDolist />  :null }              
            </div>
        )
    }

