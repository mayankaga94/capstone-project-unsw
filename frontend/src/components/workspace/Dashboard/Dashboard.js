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
        return (
            <div className = "setWidth">
                   <h1 className = "dashboardHeading">Dashboard</h1>
                <div className ="row margin-top-100">
                
                {loggedINUser ? (
                <>
                <div className=" upperSection col-xs-12 col-lg-8 col-md-8 col-sm-8">
                <div className=" row">
                    <Details  className=" upperSection col-xs-12 col-lg-3 col-md-3 col-sm-12" /> 
                    {/* <GoalSummary  className =" upperSection col-xs-12 col-lg-3 col-md-3 col-sm-12"  /> */}
                    <Cart  className ="col-xs-12 col-lg-4 col-md-4 col-sm-12"  />  
                    <CustomWishlist className =" col-xs-12 col-lg-4 col-md-4 col-sm-12"  />
                </div>
                </div>
                <div className =" col-xs-12 col-lg-4 col-md-4 col-sm-4"> 
                 <ToDolist className =" col-xs-12 col-lg-4 col-md-4 col-sm-12"  />  </div>
                  
                    </>
                    )      
                : null
                }
                </div>            
            </div>
        )
    }

