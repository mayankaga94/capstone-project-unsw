import React from 'react'

export default function Cart(props) {

    const genre = props.genre
    const ISBN = props.ISBN
    const read = props.read
    const readbook = props.readBook

    return (
        <div className ="goalset col-xs-12 col-lg-4 col-md-4 col-sm-4">

                <div className ="library">
                     <span>{genre}</span> <span>{ISBN} </span> 
                     <span>{readbook}</span><span>{read}</span> 
                 </div>
            
        </div>
    )
}
