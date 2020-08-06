import React, { useState , useEffect, useContext} from 'react'
import Details from './Summary'
import ToDolist from './ToDolist'

import Cart from './cart'
import GoalSummary from './goalSummary'
import CustomWishlist from './customWishlist'
import UserContext from '../../../context/usercontext'
import RecommendationList from './recommendationList'

export default function  Dashboard(){
     const [library, setLibrary ] =useState([])
    const { userData, setUserData } = useContext(UserContext);
    const loggedINUser = userData && userData.user && userData.user.userid
        return (
            <div className = "setWidth">
                   <h1 className = "dashboardHeading">Dashboard</h1>
                   <h1 className = "dashboard-Heading"> Your Details</h1>
                <div className ="row ">
                
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

                 <h1 className = "dashboard-Heading"> Your Recommendations</h1>
                 <div className =" col-xs-12 col-lg-12 col-md-12 col-sm-12"> 
                 <RecommendationList />
                 </div>
                    </>
                    )      
                : null
                }
                </div>            
            </div>
        )
    }

