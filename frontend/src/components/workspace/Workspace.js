import React, { useContext, useEffect, useState } from 'react'
import Subscibe from './Subscribe';
import Categorybased from './Categorybased'
import Allbooks from './Allbooks'
import Topauthors from './Topauthors'
import PostLogin from './PostLogin'
// import Container from './components/workspace/container';
import Caros from './carous'
import Discoverbook from './discoverbook'
import Registration from './Registration'
// import UserContext from '../../context/usercontext'
import Dashboard from './Dashboard/Dashboard'
import UserContext from '../../context/usercontext'



export default function  Workspace (){

const  { userData, setUserData } = useContext(UserContext);
const [details, setdetails]= useState();

        return ( 
            <div>
                <div className = " clearfix registrationSection">
                    <h1 style = {{ margin: "0 auto", marginBottom : "20px", fontSize:"28px", color : " black"}}>Meet Your Next Favorite Book</h1>
                    <h1 style = {{fontSize : "18px"}}>
                     {userData.user ?( <></>) :(<>    
                     </>)}
                    “Good friends, good books, and a sleepy conscience: this is the ideal life.”</h1>
                    <h1 style = {{fontSize : "14px"}}>
                        ― Mark Twain</h1>
                   
                 {!userData.user ?(
                 
                 <>
                 <Caros /> ,<Registration/>
                 </>
                 ):
(
                 <>
                 </>
                )}
                </div>  
                        <Allbooks />     
                        <Discoverbook />
                        <Subscibe />
                        <Categorybased />
                        <Topauthors />
            </div>
        )
    }
