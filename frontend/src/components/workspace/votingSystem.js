import React from 'react'



export default function VotingSystem(props) {
    console.log("comentzzzzz",props)
   const voterID =  props.voterID
    const loggedInUser = props.userID
    const reviewID = props.reviewID

    
    // console.log(voterID, loggedInUser)

    const upVote = () =>{
        try{

            if (voterID == loggedInUser) {
                console.log("hi")
                return <h1>you cannot upvote your own vote</h1>
            }
            else{
                    console.log("comentzzzzz",props)
                // console.log("bye")
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
                return <h1>you cannot downvote your own vote</h1>
            }
            else{
                // console.log("bye")
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

    const votes  = props.votes
    return (
        <div>
            <div className = "reviewRating">
                 <span className = "reviewSubheading">{votes}</span>
                    <div className = "upvotes">
                        <span className = "reviewStart">             
                        
                            <button onClick={ ()=>upVote()} > 
                            <span> <i class="fa fa-thumbs-up" aria-hidden="true"></i></span>
                            </button>
                            
                        </span>
                    </div>
                    <div className = "downvotes">
                            <span className = "reviewStart"> 
                            <button onClick={ ()=>downVote() }> 
                                    <span><i class="fa fa-thumbs-down" aria-hidden="true"></i></span>
                            </button>
                           
                        </span>
                     </div>
            </div>

        </div>
    )
}
