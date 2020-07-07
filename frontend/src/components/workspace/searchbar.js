import React, { Component } from 'react'
import styled from 'styled-components'




export const SearchbarInput = styled.input`
    width :400px;
    min-height :50px;
    border : 1px solid #c2c2c2;
    padding-left : 5px;
    outline : none;

`

export const Seatchbutton = styled.button`

min-height :50px;
color: white;
padding : 15px;
font-weight  : 600;
border : 2px solid #ccc;
background  : #d1d1d1;
border : none;
outline  : none;
font-size: 14px;
transition: 0.3s;
&:hover  {
    
    background :#a6a1a1 ;
}

`

export class Searchbar extends Component {
    render() {
        return (
            <div style= {{paddingBottom: "30px"}}>     
                <SearchbarInput  type="text" placeholder="Search for a book" aria-label="Search" />
                <Seatchbutton color="unique" type="submit">Search  </Seatchbutton>
            </div>
        )
    }
}

export default Searchbar
