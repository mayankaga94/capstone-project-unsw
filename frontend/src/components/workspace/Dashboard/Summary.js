import React, { useContext, useState } from 'react'
import UserContext from '../../../context/usercontext'
import styled from 'styled-components'
import { ProgressBar} from 'react-bootstrap'
const DetailsWrap = styled.div`
    margin:20px;
    // margin: 20px;
    // display:inline-block;
    // font-size: 14px;
    // background-color: white;
    // border : 1px solid #ccc;
    // border-radius : 5px;
    // adding: 60px;
    // font-weight :600;
    // padding:50px;
    
    // box-shadow: 0 0 8px 2px #888;
`
export default function  Details() {

    const { userData, setUserData } = useContext(UserContext);

    // const loggedINUser = userData && userData.user && userData.user.userid



    const loggedINUser = userData && userData.user && userData.user.userid
    const firstName  =  userData.user.firstname
    const lastName  =  userData.user.lastname
    const emailId = userData.user.emailid
    const level =  userData.user.level
    const dob =  userData.user.dob
    const vote =  userData.user.vote
    const points =  userData.user.points
console.log(loggedINUser)

        return (
            <div className ="upperSection col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                <div className = "common-marginborder">
                <DetailsWrap>

         {loggedINUser ? 
                ( <><div className =" details"> Your Details </div>
                    <div className = "myDetails row">
                        {/* My details     */}
                        
                            <div className = "col-lg-5 col-md-5 col-sm-5">
                           
                                <div className = "title">Name : <span className = "titleDescriptio">  {firstName} {lastName}</span></div>
                                <div  className = "title">Email ID:<span className = "titleDescriptio">{emailId} </span> </div>


                            </div>

                            <div className = "col-lg-3 col-md-3 col-sm-3 border-right">
                                    <div className = "title">Level: <span className = "titleDescriptio">{level}</span></div>
                                    <div className = "title">Total Points: <span className = "titleDescriptio">{points}</span></div>
                                    <ProgressBar now={points} />
                                    <div className = "title">Total Upvotes: <span className = "titleDescriptio"><i class="fa fa-arrow-up" aria-hidden="true"></i></span> <span>{vote} </span></div>


                            </div>
                            <div className = "col-lg-4 col-md-4 col-sm-4">
                                <div className = "avatarHeading">Avatar</div>
                                <div>
                                { loggedINUser && level < 1 ? <img className = "avatar" src = "https://png.pngtree.com/png-clipart/20190620/ourlarge/pngtree-blue-baby-boy-sleeping-png-image_1507070.jpg"></img>
                                :null}
                                {loggedINUser && level === 1 ? <img className = "avatar" src = "https://i.dlpng.com/static/png/6933155_preview.png"></img>:null}
                                {loggedINUser && level >= 2 ? <img  className = "avatar"src = "https://png.pngtree.com/png-clipart/20190412/ourlarge/pngtree-young-muslim-reading-al-quran-png-image_934610.jpg"></img>:null}     
                                </div>
                                <div>
                                </div>
                            </div>
                    </div> </>) : null}
                </DetailsWrap>
                </div>
            </div>
        )
    }