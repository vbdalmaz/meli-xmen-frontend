import React, {Component} from 'react';
import PubSub from 'pubsub-js';

export default class LabelCustom extends Component {

    constructor(){
        super();
        this.state = {msg : ""}
    }

    render(){
        return(
            <label htmlFor={this.props.id}> {this.props.label} </label>
        )
    }

    componentDidMount(){
        PubSub.subscribe("validation-error", (topic,erro) =>{
            if(erro.field === this.props.id)
                this.setState({msg: erro.defaultMessage});
        });

        PubSub.subscribe('clean-errors', topic => this.setState({msg: ''}));     
    }

}