import React, { Component } from 'react'
import Details from './Summary'
import Task from './Task'
import Readlist from './Readlist'
import ToDolist from './ToDolist'
import Calend from './Calendar'
import Owncomments from './Owncomments'
import History from './History'


export class Dashboard extends Component {
    render() {
        return (
            <div>
                <Details />
                {/* <Readlist /> */}
                {/* <Task />
                <Readlist />  */}
                <Calend />
                <ToDolist />
                {/* <Owncomments />
                <History />  */}
            </div>
        )
    }
}

export default Dashboard
