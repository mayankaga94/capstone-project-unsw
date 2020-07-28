import React, {useContext} from 'react'
import Delete  from './DeleteReview'
import VotingSystem from './votingSystem'
import UserContext from '../../context/usercontext'
// import Allbooks from './Allbooks'


export default function Review(props) {
    const { userData, setUserData } = useContext(UserContext);
    const checkUser = props.userid
    // const loggedINUser = userData.user.userid
    const reviewid = props.reviewid 
    return (

        <>
         <div className = "reviewHeader">
             <span> <img className = "reviewImg" src = "https://c.pxhere.com/photos/61/21/mouse_rodent_cute_mammal_nager_nature_animal_wood_mouse-794461.jpg!d"></img> </span>
                <span className = "userName"> {checkUser}</span>
         </div>
         <div className = "reviewContent">
                                        <div className = "reviewContenHeader">
                                            <span className = "reviewSubheading"> Review</span>
                                        </div>
                                        <div className = "reviewContenHeader">
                                             <h1> </h1>
                                            <p className = "reviewDescription"> {props.comment}</p>   

                                            {userData.user ?
                                                < VotingSystem   callReviewFunction = {props.callReviewFunction} reviewID = {reviewid} voterID = {checkUser} userID={ userData.user.userid} votes = {props.votes} />
                                            //  userData.user.userID == checkUser ? <Delete  deleteid = {reviewid} />
                                            :null  }

{/*                               
                                        < VotingSystem   callReviewFunction = {props.callReviewFunction} reviewID = {reviewid} voterID = {checkUser} userID={loggedINUser} votes = {props.votes} />
                                         { loggedINUser == checkUser ? <Delete  deleteid = {reviewid} />: null }               */}
                                        </div>
             </div>

           
        </>
    )
}
