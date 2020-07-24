import React, { Component } from 'react'
import Calendar  from 'react-calendar'
import 'react-calendar/dist/Calendar.css';


export class Calend extends Component {

    state = {
        date: new Date(),
      }  
      onChange = date => this.setState({ date })
   
    render() {   
        return (
            <div>
                  <div>
                     <Calendar onChange={this.onChange} value={this.state.date}/>
                  </div>
            </div>
        )
    }
}

export default Calend
