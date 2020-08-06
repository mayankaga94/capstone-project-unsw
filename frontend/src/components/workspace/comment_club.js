import React, { Component } from 'react'
import styled from 'styled-components'

const CommentsWrapper = styled.div`
    margin: 20px;
    display:inline-block;
    font-size: 14px;
    background-color: red;
`
const button = styled.button`
    color:blue;
`
class  Comments extends Component{
    state = {
        count :2
    }
    
   incrementVote = () => {
    this.setState({

        count : this.state.count + 1,
        flag : true
    });
   }
    decrementVote = () => {
    this.setState({
        count : this.state.count - 1 ,
        
        flag : true
    });
    }
    render(){
        return(
            <div>
                <button onClick  ={this.incrementVote}>Upvote </button> 
                <button onClick  ={this.decrementVote}>Downvote</button> 
                <span>{this.state.count}</span>
                {this.props.commentDetails.name}
                {this.props.commentDetails.desc}
            </div>
        );
    }






}
//  const Comments = ({commentDetails}) => {
  
//     state ={
//         count :1
//     }
//     handleIncrement = () => {
//        this.setState({
//            count : this.state.count + 1,
//            counter : this.state.counter + 1,
//            flag : true
//        });
//    }
// //    handeleDecrement = () =>{
// //         this.setState({
// //            count : this.state.count - 1,
// //            counter : this.state.counter - 1,
// //        })

// //    }
//     const  {name, desc} = commentDetails

//     return (
//         <Wrapper>
//         <button onClick  ={handleIncrement}   >Upvote</button> */}
//         {/* <button onClick ={handeleDecrement}  >Decrement</button> */}
//          <div>{this.state.count}</div>
//         <CommentsWrapper>{name} </CommentsWrapper>
//         <CommentsWrapper>{name} </CommentsWrapper>
//         <CommentsWrapper>{desc}</CommentsWrapper>
//         </Wrapper>

//     )
// }
export default Comments;
