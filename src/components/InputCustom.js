import React, {Component} from 'react';

export default class InputCustom extends Component {
    render(){
        return(
                <input {...this.props} />
        )
    }
}