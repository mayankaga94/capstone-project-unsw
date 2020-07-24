import React, { Component } from 'react'
import { useState } from 'react';
import Searchbar from '../searchbar'
import { Seatchbutton } from '../searchbar';

export class ToDolist extends Component {
    render() {
        return (
            <div>
                <form onSubmit = {this.addItem}>
                   <Searchbar props = "dfddf" />
                    <button> Add Task</button>
                </form>
            </div>
        )
    }
}

export default ToDolist
