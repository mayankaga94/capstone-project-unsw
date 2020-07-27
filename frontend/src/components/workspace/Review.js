import React from 'react'

export default function Review(props) {
    return (
        <>
         <div className = "reviewHeader">
             <span> <img className = "reviewImg" src = "https://c.pxhere.com/photos/61/21/mouse_rodent_cute_mammal_nager_nature_animal_wood_mouse-794461.jpg!d"></img> </span>
                <span className = "userName"> {props.userID}</span>
         </div>
         <div className = "reviewContent">
                                        <div className = "reviewContenHeader">
                                            <span className = "reviewSubheading"> Review</span>

                                        </div>
                                        <div className = "reviewContenHeader">
                                            <p className = "reviewDescription"> {props.comment}</p>                
                                        <div className = "reviewRating">
                                            <div className = "upvotes">
                                                <span className = "reviewSubheading"> 51</span>
                                                    <span className = "reviewStart">                 
                                                        <span>
                                                        <i class="fa fa-thumbs-up" aria-hidden="true"></i>
                                                        </span>
                                                    </span>
                                            </div>
                                            <div className = "downvotes">
                                                <span className = "reviewSubheading"> 51</span>
                                                    <span className = "reviewStart">                 
                                                        <span>
                                                        <i class="fa fa-thumbs-down" aria-hidden="true"></i>
                                                        </span>
                                                    </span>
                                            </div>
                                        </div>
                                        </div>
             </div>

           
        </>
    )
}
