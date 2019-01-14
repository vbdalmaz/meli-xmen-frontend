import React, {Component} from 'react'

export default class ButtonCustom extends Component{

    render(){
        return(
                    <button id={this.props.id}  type={this.props.type} className="pure-button pure-button-primary">{this.props.label}</button>                                    
        )
    }
}