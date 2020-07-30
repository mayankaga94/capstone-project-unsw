import React, { useContext, useState } from 'react'
import UserContext from '../../../context/usercontext'
import styled from 'styled-components'

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
    const loggedINUser = userData && userData.user && userData.user.userid
    const firstName  =  userData.user.firstname
    const lastName  =  userData.user.lastname
    const emailId = userData.user.emailid
    const level =  userData.user.level
    const dob =  userData.user.dob
    const points =  userData.user.points


        return (
            <div className ="upperSection  col-xs-12 col-lg-8 col-md-8 col-sm-8">
                <div className = "common-marginborder">
                <DetailsWrap>
                <div className ="col-lg-12 col-md-12 col-sm-12 col-xs-12 details"> Your Details </div>
                    <div className = "myDetails row">
                        {/* My details     */}
                        
                            <div className = "col-lg-5 col-md-5 col-sm-5">
                           
                                <div className = "title">Name : <span>{firstName}</span></div>
                                <div  className = "title"> Name : <span>{lastName} </span></div>
                                <div  className = "title">Email ID:<span>{emailId} </span> </div>


                            </div>

                            <div className = "col-lg-3 col-md-3 col-sm-3 border-right">
                                    <div className = "title">Level: <span>{level}</span></div>
                                    <div className = "title">Total Points: <span>{points}</span></div>
                                    <div className = "title">Total Upvotes: <span><i class="fa fa-arrow-up" aria-hidden="true"></i></span> <span>50 </span></div>


                            </div>
                            <div className = "col-lg-4 col-md-4 col-sm-4">
                                <div>
                                {level === 0 ? <img className = "avatar" src = "https://png.pngtree.com/png-clipart/20190620/ourlarge/pngtree-blue-baby-boy-sleeping-png-image_1507070.jpg"></img>
                                :null}
                                {level === 1 ? <img className = "avatar" src = "https://i.dlpng.com/static/png/6933155_preview.png"></img>:null}
                                {level >= 2 ? <img  className = "avatar"src = "https://png.pngtree.com/png-clipart/20190412/ourlarge/pngtree-young-muslim-reading-al-quran-png-image_934610.jpg"></img>:null}     
                                </div>
                                <div>
                               
                                </div>
                            </div>
                    </div>
                  
                </DetailsWrap>
                </div>
            </div>
        )
    }