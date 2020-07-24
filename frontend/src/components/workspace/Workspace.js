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

useEffect(() => {
    getUser();
    // loadDataOnlyOnce();
}, [userData])

const getUser = async() =>{
    const url = "http://localhost:5000/user/getUser"
    fetch(url,
    { method : "Get",
    headers: {
        "Accept": "application/json , text/plain ,*/*",
        "Content-type": "application/json",
        "auth_token" : "eyJhbGciOiJIUzI1NiJ9.bmVlbGFAZ21haWwuY29t.dCrpsCXGEMME3qpJw_bQACMJLM3ixV248P6SRPN3fJo"
     }
    })
    .then((response) => {
        response.json().then((data) => {
            // console.log("hiiiii")
            setdetails({
                user : data
              })
            });
        });
    }
        return (

            
            <div>
                {/* <div>{userData}</div> */}
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
                    {/* const { userData, setUserData } = useContext(UserContext);         */}
                        <Allbooks />     
                        <Discoverbook />
                        <Subscibe />
                        <Categorybased />
                        <Topauthors />
                        <PostLogin />
                        <Dashboard />
            </div>
        )
    }
