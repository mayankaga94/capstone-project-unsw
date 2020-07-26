import { useState } from 'react'
import Calendar  from 'react-calendar'
import 'react-calendar/dist/Calendar.css';


import React from 'react'

export default function Calendarclass() {

    const [value, onChange] = useState(new Date());
    console.log(onChange)
    return (
        <>
      <div>
        <Calendar
            onChange={onChange}
            value={value}
            />
        </div>
        <div>hiii{onChange.value}</div>
      </>
    );

}
