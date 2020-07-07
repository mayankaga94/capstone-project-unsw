import React, { Component } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Styling.css'
export class carous extends Component {
    render() {
        return (
            <div className = "carouselSection">
                <Carousel>
                    <Carousel.Item>
                      <img style = {{height:"380px"}}
                        className="d-block w-100"
                        src="https://cdn.hipwallpaper.com/m/3/77/zWf8Kl.jpg"
                        alt="First slide"
                      />
                      <Carousel.Caption>
                        <h3>Over 1000 Books available </h3>
                        <p>Read Anytime, Anywhere !!!</p>
                      </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                      <img  style = {{height:"380px"}}
                        className="d-block w-100"
                        src="https://cdn.hipwallpaper.com/m/56/74/Fs1UV5.jpg"
                        alt="Third slide"
                      />
                      <Carousel.Caption>
                        <h3>Book Recommendation</h3>
                        <p>Books Recommended  Based on your Reading</p>
                      </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                      <img   style = {{height:"380px"}}
                        className="d-block w-100"
                        src="https://cdn.hipwallpaper.com/m/75/79/OjP4Ym.jpg"
                        alt="Third slide"
                      />
                      <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                      </Carousel.Caption>
                    </Carousel.Item>
              </Carousel>
            </div>
        )
    }
}

export default carous
