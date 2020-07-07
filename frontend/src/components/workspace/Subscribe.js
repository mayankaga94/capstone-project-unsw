import React, { Component } from 'react'
import styled from 'styled-components'

const SubscribeWrap = styled.div`
background: rgb(241, 241, 241);
padding: 70px 0 70px 0;
margin: 75px 0 75px 0;
color : black;
`
export class Subscribe extends Component {
    render() {
        return (
            <SubscribeWrap>
                <h1 style = {{fontSize :"20px" ,color :"black", letterSpacing : "3px"  }}>Sign IN to our  to revieve inspiration quotes </h1>
            </SubscribeWrap>
        )
    }
}

export default Subscribe
