import React, { useState , useEffect, useContext} from 'react'
import Details from './Summary'
// import Task from './Task'
import Readlist from './Readlist'
import ToDolist from './ToDolist'
import Calend from './Calendar'
import Owncomments from './Owncomments'
import History from './History'
import Cart from './cart'
import GoalSummary from './goalSummary'
import CustomWishlist from './customWishlist'


export default function  Dashboard(){

        return (
            <div>
                {/* <Details /> */}
                <Cart />
                <CustomWishlist />
                <GoalSummary  />
                <ToDolist />                
            </div>
        )
    }

