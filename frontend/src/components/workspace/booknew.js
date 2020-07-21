import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
export const Wrapper = styled.div`
font-size:20px;
text-align :left;
cursor :pointer;
display:inline-block;
transition: transform .3s;
margin:15px 0 15px 0;
&:hover  {
    transform: scale(1.1);
    background : #faf7f7 ;
}
`
export const Bookname = styled.div`
margin-top : ${props => props.author ? 0 : "10px" };
color: ${props => props.author ? "#292929" : "#b6b6b6"};
padding: ${props => props.author ? "2px" : "2px"};
font-size: ${props => props.author ? "14px" : "14px"};
line-height: ${props => props.author ? "1.1" : "1"};
`
export const Bookimg = styled.img`
height: 210px;
// width: 150px;
`
export const Price = styled.div`
    font-size :14px;
    // padding : 5px 5px 5px 0;
    color :#00bfc5;

`

export  const Rating = styled.div`
    font-size :16px;
    color :#ccc;
    padding :5px 5px 5px 0;
`
export class Booknew extends Component {
    render() {
        return (
            <Wrapper>
                  <Link to  ={'/bookdetails/' + this.props.id}>
                        <div><Bookimg src ={this.props.url}></Bookimg></div>
                        <div className = "book_description">
                            <Bookname>{this.props.name}</Bookname>
                            <Bookname author>{this.props.author}</Bookname>                       
                        </div>       
                </Link> 
            </Wrapper>
        )
    }
}

export default Booknew
