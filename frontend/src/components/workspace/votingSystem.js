import React from 'react'

export default function VotingSystem(props) {
    
   const voterID =  props.voterID
    const loggedInUser = props.userID
    const reviewID = props.reviewID
    const votes  = props.votes
    const notUpdateVote =  0 
    const updateVote =  1 
    const notUpdateDownVote =  0 
    const updatedownVote =  -1 

    const upVote = () =>{

        let counter = 0
        try{
            if (voterID == loggedInUser) {
                alert("you cannot upvote your own comment")
                return <h1>you cannot upvote your own vote</h1>
            }
            else{
                let vote = 1,
                voteInfo = {
                    vote: 1,
                    userid: voterID,
                    reviewid: props.reviewID
                }

                var raw = JSON.stringify({voteInfo});
                var requestOptions = {
                method: 'POST',
                headers : {
                    "Content-type": "application/json"
                },
                body: raw,
                };
                fetch("http://localhost:5000/review/vote", requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));
            }
        }
        catch{
    
        }
    }
    const downVote = () =>{

        try{
            if (voterID == loggedInUser) {

                alert("you cannot downvote your own comment")
                return <h1>you cannot downvote your own vote</h1>
            }
            else{
                let vote = -1,
                voteInfo = {
                    vote: -1,
                    userid: voterID,
                    reviewid: props.reviewID
                }
                var raw = JSON.stringify({voteInfo});
                var requestOptions = {
                method: 'POST',
                headers : {
                    "Content-type": "application/json"
                },
                body: raw,
                };
                fetch("http://localhost:5000/review/vote", requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));
            }
        }
        catch{
    
        }
    }
  
    return (
        <div>
            <div className = "reviewRating">
                 <span className = "reviewSubheading">{votes}</span>
                    <div className = "upvotes">
                        <span className = "reviewStart">   
                        {loggedInUser === voterID ? 
                        <button onClick={() =>{props.callupFunction({
                            votes : notUpdateVote
                                }, reviewID);upVote()}}> 
                            <span> <i className="fa fa-thumbs-up" aria-hidden="true"></i></span>
                            
                            </button>
                            :       
                             <button onClick={() =>{props.callupFunction({
                                votes : updateVote
                                    }, reviewID);upVote()}}> 
                                <span> <i className="fa fa-thumbs-up" aria-hidden="true"></i></span>
                                </button> }                   
                        </span>
                    </div>
                    <div className = "downvotes">
                            <span className = "reviewStart"> 
                            {loggedInUser === voterID  ? 
                            <button onClick={() =>{props.calldownFunction({
                            votes : notUpdateDownVote
                                }, reviewID);downVote()}}> 
                            <span> <i className="fa fa-thumbs-down" aria-hidden="true"></i></span>
                            
                            </button>
                            :       
                             <button onClick={() =>{props.calldownFunction({
                                votes : updatedownVote
                                    }, reviewID);downVote()}}> 
                                <span> <i className="fa fa-thumbs-down" aria-hidden="true"></i></span>
                                </button> }   
                        </span>
                     </div>
            </div>
        </div>
    )
}
