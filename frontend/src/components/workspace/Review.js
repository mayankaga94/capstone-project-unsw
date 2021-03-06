import React, {useContext} from 'react'
import Delete  from './DeleteReview'
import VotingSystem from './votingSystem'
import UserContext from '../../context/usercontext'

export default function Review(props) {

    const { userData, setUserData } = useContext(UserContext);
    const checkUser = props.userid 
    const loggedINUser = userData && userData.user && userData.user.userid
    const acessLevel = userData && userData.user && userData.user.level
    const firstname = props.firstname
    const username = props.user
    const reviewid = props.reviewid 
  
    return (
        <>
         <div className = "reviewHeader">
             <span> <img className = "reviewImg" src = "https://c.pxhere.com/photos/61/21/mouse_rodent_cute_mammal_nager_nature_animal_wood_mouse-794461.jpg!d"></img> </span>
                <span className = "userName"> {firstname}</span>
         </div>
         <div className = "reviewContent">
                    <div className = "reviewContenHeader">
                        <span className = "reviewSubheading"> Review</span>
                    </div>
                    <div className = "reviewContenHeader">
                            <h1> </h1>
                        <p className = "reviewDescription"> {props.comment}</p>   
                        {userData.user ?
                            < VotingSystem  acessLevel = {acessLevel}  userid = {props.userid} callDelete = {props.delete} calldownFunction = {props.calldownFunction }  callupFunction = {props.callupFunction} reviewID = {reviewid} voterID = {checkUser} loggedINUser={ loggedINUser } votes = {props.votes} />     
                        :null  }
                      { loggedINUser && checkUser  &&  acessLevel >1   ||  loggedINUser === checkUser  ? 
                        <Delete  deleteid = {reviewid}  callreviewDeleteFunction =  {props.callreviewDeleteFunction } />:null}
                    </div>
             </div>      
        </>
    )
}
