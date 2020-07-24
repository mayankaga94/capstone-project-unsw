import React, { Component } from 'react'
import styled from 'styled-components'

const DetailsWrap = styled.div`
    margin: 20px;
    display:inline-block;
    font-size: 14px;
    background-color: white;
    border : 1px solid #ccc;
    border-radius : 5px;
    adding: 60px;
    font-weight :600;
    padding:50px;
    
    box-shadow: 0 0 8px 2px #888;
`
export class Details extends Component {

    state = {
                name : "Peter",
                Upvotes : "20",
                Downvotes : "20",
                Level : "Gold",
                Points : "100"

    }

    render() {

        const {name , Upvotes, Downvotes, Level, Points} =  this.state
        return (
            <div>
                <DetailsWrap>
                    <h1>Details</h1>
                    <div>Name :{name}</div> 
                    <div>Level : {Level} ({Points} points)</div>
                    <div>Upvote {Upvotes} <span> Downvotes : {Downvotes} </span></div>

                </DetailsWrap>
            </div>
        )
    }
}

export default Details
