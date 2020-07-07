import React, { Component } from 'react'
import styled from 'styled-components'

export const Tabs = styled.div`

color:black;
display: inline-block;
margin:20px;
padding: 20px 0 20px 0;

`
export class Footer extends Component {
    render() {
        return (
            <div>
                <div>
                    <ul>
                        <Tabs>Home</Tabs>
                        <Tabs>about</Tabs>
                        <Tabs>blog</Tabs>
                        <Tabs>contactus</Tabs>
                    </ul>
                </div>
                
             </div>
        )
    }
}

export default Footer
