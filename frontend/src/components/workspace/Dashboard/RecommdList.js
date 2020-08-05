import React from 'react'
import { Link } from 'react-router-dom'


export default function RecommdList(props) {


    return (
        <div className = "clearfix margin-bottom-20">
                <div className = "pull-left" >
                    <div className = "booktitle"> 
                    {props.title}</div>
                    <div className = "bookauthor">
                        {props.author}
                    </div>
                    <div className = "bookgenre">
                        {props.genre}
                    </div>
                    
                </div>

                <div className = "pull-right button-buy">
                 <Link to  ={'/bookdetails/' + props.isbn}>  <div className = "GetBook" >Get Book</div></Link>
                </div>
        </div>
    )
}
