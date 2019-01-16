import React, {Component} from 'react';
import InputCustom from './components/InputCustom';
import ButtonCustom from './components/ButtonCustom';
import PubSub from 'pubsub-js'
import ErrorHandler from './components/ErrorHandler'
import LabelCustom from './components/LabelCustom';
import Constants from './components/Constants';

class DNAForm extends Component {
    
    constructor(){
        super();
        this.state = {list : [], dna : "",msg : ""}
    }

    listenOnChange(nameInput, evento){
        this.setState({[nameInput]: evento.target.value});
    }

    handlerDNA(response){
        this.setState({msg: ""});

        if(this.state.dna === ""){
            this.setState({msg: "DNA Field cannot be blank"});
        } else if(response.ok){
            this.setState({msg: "IT IS A MUTANT"})
            return response;
        }else if(response.status === 403){
            this.setState({msg: "IT IS A HUMAN"}) 
            return response;
        }
        if(response){
            response.json().then(bodyAsJson => {
                console.log(bodyAsJson);
                this.setState({msg: bodyAsJson.message});  
            });
        } 
        else{
            throw Error("Error sendind data to api "+ this.props.urlApiPostTestDnas);
        } 
    }

    testDna(evento){
        evento.preventDefault();
        PubSub.publish('clean-errors');                  

          return fetch(this.props.urlApiPostTestDnas ,{
                  method: 'POST',
                  body: JSON.stringify({'Dna': this.state.dna.split(',')}),
                  headers:{
                      'Content-Type': 'application/json'
                  }
              })
               .then(response => this.handlerDNA(response))
               .then(response => response.json())
               .then(responseAsJson => {
                   PubSub.publish('update-dna-list', responseAsJson)
                   this.setState({dna: ''});
                })
               .catch(erro =>{
                   console.log(erro);
               }) ;
    }

    render(){
        return (
            <form className="pure-form pure-form-aligned" onSubmit={this.testDna.bind(this)} method="post">
                <div>      
                    <LabelCustom  label="DNA" />
                    <InputCustom id="dna" type="textarea" name="dna" value={this.state.dna} onChange={this.listenOnChange.bind(this,"dna")}/>
                </div><br />
                <div>
                    <ButtonCustom className="Form-dna" id="submit" type="submit" label="Test" />
                </div>
                <div> 
                    <p className="error">{this.state.msg}</p> 
                </div>
          </form>     
        );
    }
}

class DNATable extends Component {
    render(){
        return (
            <center>
            <div>            
            <table className="pure-table">
              <thead>
                <tr>
                  <th>Specie</th>
                  <th>DNA</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.props.list.map(function(sample){
                    return (<tr key={sample.dna}>
                      <td>{sample.specieType}</td>
                      <td>{sample.Dna.join(",")}</td>                                 
                    </tr>)
                  })
                }
              </tbody>
            </table> 
          </div>
          </center>              
        );
    }
}

export default class DNABox extends Component {
    constructor(){
        super();
        this.state = {list : []}
        this.urlApiPostTestDnas = Constants.getUrlApiPostTestDnas();
        this.urlApiGetDnas = Constants.getUrlApiGetDnas(); 
    }

    componentDidMount(){
        fetch(this.urlApiGetDnas)
                .then(response => response.json())
                .then(responseAsJson => {
                    this.setState({list: responseAsJson});
                    PubSub.subscribe('update-dna-list', 
                    (topic, data) => { 
                        this.setState({list: data})
                    })}) 
                .catch(erro => {
                  console.log(erro);
                  throw Error("Não foi possível receber os dados  "+ this.urlApiGetDnas); 
                });
    }

    render(){
       return (
       <div>
            <div className="header">
                <h1>Test of DNA</h1>
            </div>
            <div className="header pure-form pure-form-aligned">
                <DNAForm urlApiPostTestDnas = {this.urlApiPostTestDnas}  />
                <br /> 
                <DNATable list={this.state.list}/>
            </div>
        </div>  
    )}

}