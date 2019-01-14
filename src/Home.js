import React, {Component} from 'react';
import Stats from './Stats'

export default class Home extends Component{
    constructor(){
        super();
    }

    render(){
       return (
       <div>
            <div className="header">
                <h1>Meli-Xmen</h1>
            </div> 
            <div className="pure-form pure-form-aligned">
            <br />
                <Stats />
            </div>
        </div>  
    )}
}
