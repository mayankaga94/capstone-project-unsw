import React, {  } from 'react'
import Booknew from './booknew'

export default function  Categorybased() {

        return (
            <div>
                <h1> Books based on Genres</h1>
                    <ul className = "genresWrap">
                        <li className = "genresList">
                            <div className = "genresBased">
                                <img src = "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1394178867l/4138.jpg"></img>
                                <div className = "genresBasedHeading">
                                    <h1>Sci-fi</h1>
                                </div>                  
                            </div>
                        </li>
                        <li className = "genresList">
                            <div className = "genresBased">
                                <img src = "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1429229158l/33457.jpg"></img>
                                <div className = "genresBasedHeading">
                                    <h1>Adventure</h1>
                                </div>                     
                            </div>
                        </li>
                        <li className = "genresList">
                            <div className = "genresBased">
                                <img src = "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1473956249l/30268522._SY475_.jpg"></img>
                                <div className = "genresBasedHeading">
                                    <h1>Fiction</h1>
                                </div>
                           
                            </div>
                        </li>
                        <li className = "genresList">
                            <div className = "genresBased">
                                <img src = "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1558869586l/227443._SY475_.jpg"></img>
                                <div className = "genresBasedHeading">
                                    <h1>History</h1>
                                </div>
                            </div>
                        </li>

                        


                    </ul>
            </div>
        )
}


