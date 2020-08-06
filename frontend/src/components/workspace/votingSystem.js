import React, { useState} from 'react'


export default function VotingSystem(props) {
    
    const [upvoteTrack, setupvoteTrack] = useState(true)
    const [downvoteTrack, setdownVoteTrack] = useState(true)
    const voterID =  props.voterID
    const userid = props.userid
    const loggedInUser = props.loggedINUser
    const reviewID = props.reviewID
    const acessLevel =props.acessLevel
    const votes  = props.votes
    const notUpdateVote =  0 
    const updateVote =  1 
    // const updateVote =  1

    const voteUpdate = votes
    const notUpdateDownVote =  0 
    const updatedownVote =  -1 


    
    const upVote = () =>{


        
        try{
            if (voterID === loggedInUser) {
                alert("you cannot Upvote your own comment")
            }
            else{
                setupvoteTrack(!upvoteTrack)
        setdownVoteTrack(true)
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
            if (voterID === loggedInUser) {
                alert("you cannot downVote your own comment")
            }
            else if (acessLevel <1){
                alert("you cannot downVote at this level")
            }
            else{
                setdownVoteTrack(!downvoteTrack)
                setupvoteTrack(true)
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
                         { loggedInUser === userid ? 


                                   <>
                                       <button onClick={() =>{props.callupFunction({
                                            votes : voteUpdate
                                                }, reviewID);upVote()}}> 
                                            <span> <i className="fa fa-thumbs-up" aria-hidden="true"></i></span>
                                            
                                            </button>
                                          
                                        </>
                                    :
                                    
                                    <>  
                                    {upvoteTrack? 
                                                    <>
                                                <button onClick={() =>{props.callupFunction({
                                                    votes :  votes + updateVote
                                                        }, reviewID);upVote()}}> 
                                                    <span> <i className="fa fa-thumbs-up" aria-hidden="true"></i></span>
                                                    </button>   
                                                    
                                                    </>
                                           :   
                                            <span> <i className="fa fa-thumbs-up" aria-hidden="true"></i></span>
                                           

                                                    }

                                    </>   


                                }                   
                        </span>
                    </div>
                    <div className = "downvotes">
                            <span className = "reviewStart"> 
                            { loggedInUser === voterID   ? 
                                    <>
                                        <button onClick={() =>{props.calldownFunction({
                                        votes : votes -  notUpdateDownVote
                                            }, reviewID);downVote()}}> 
                                        <span> <i className="fa fa-thumbs-down" aria-hidden="true"></i></span>
                                        </button>
                                        </>
                            :     <>  

                                {downvoteTrack?  
                                
                                        <>

                                        {acessLevel <1 ?

                                         <button onClick={() =>{props.calldownFunction({
                                            votes : votes  +  notUpdateDownVote
                                                }, reviewID);downVote()}}> 
                                            <span> <i className="fa fa-thumbs-down" aria-hidden="true"></i></span>
                                            </button>   
                                            :
                                            <button onClick={() =>{props.calldownFunction({
                                                votes : votes  +  updatedownVote
                                                    }, reviewID);downVote()}}> 
                                                <span> <i className="fa fa-thumbs-down" aria-hidden="true"></i></span>
                                                </button>   
                                            
                                            }

                                        </>
                                            :
                                                      <span> <i className="fa fa-thumbs-down" aria-hidden="true"></i></span>
                                                    }        

                                 </>
                        }   
                        </span>
                     </div>
            </div>
        </div>
    )
}
