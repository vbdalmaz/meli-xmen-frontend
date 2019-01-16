import React, {Component} from 'react';
import PubSub from 'pubsub-js'
import ErrorHandler from './components/ErrorHandler'
import Constants from './components/Constants';

export default class Stats extends Component{
    constructor(){
        super();
        this.state = {count_human_dna: 0, count_mutant_dna : 0, ratio: 0};
        this.urlApiGetStats = Constants.getUrlApiGetStats();  
    }

    handler(response){
        if(response.ok || response.status === 403){
            return response;
        }else{
            if(response.status === 400){
                response.json().then(responseAsJson => {new ErrorHandler().manageError(responseAsJson)});
                throw Error("Error retriving data from api "+ this.urlApiGetStats); 
            }
        }
    }

    componentDidMount(){
        fetch(this.urlApiGetStats)
        .then(response => this.handler(response))
        .then(response => response.json())
        .then(dados => {
            this.setState({count_human_dna: dados.count_human_dna, count_mutant_dna :dados.count_mutant_dna, ratio: dados.ratio});
            PubSub.subscribe('update-dna-list', 
            (topic, dados) => { 
                this.setState({count_human_dna: dados.count_human_dna, count_mutant_dna :dados.count_mutant_dna
                            , ratio: dados.ratio} )
                })}) 
        .catch(erro => {
            console.log(erro);
            throw Error("Error retriving data from api  "+ erro + this.urlApiGetStats); 
        });
    }


    render(){
        return (
            <div>
            <center>            
            <table className="pure-table">
              <thead>
                <tr>
                  <th>Quantity of Mutants</th>
                  <th>Quantity of Humans</th>
                  <th>% Mutantats</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                    <td>{this.state.count_mutant_dna}</td>
                    <td>{this.state.count_human_dna}</td>
                    <td>{(this.state.ratio*100).toFixed(2)} %</td>
                </tr>  
              </tbody>
            </table>
            </center> 
          </div>              
        );
    }
}

