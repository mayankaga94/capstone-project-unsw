import React, { Component } from 'react'
import  Comments from './comment_club';

 class Counter  extends Component{
     state = {
         commentDetails : [{
            name : "mark",
            desc : "hi"
         },
         {
            name : "mark",
            desc : "hi"
         },
         {
            name : "mark",
            desc : "hi"
         }],
     };


     render(){
        return (
                <div>
                     { this.state.commentDetails.map((commentDetails, index) => <Comments commentDetails = {commentDetails} />)}
                </div>
        );
    }         
 }

 export default Counter;


 /*
 <Comment commentDetails = {commentDetails}  dfdfdf = {fgcg}/>
 */